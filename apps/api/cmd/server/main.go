package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"

	"github.com/fortius/api/internal/auth"
	"github.com/fortius/api/internal/commerce"
	"github.com/fortius/api/internal/config"
	"github.com/fortius/api/internal/shared/db"
	"github.com/fortius/api/internal/shared/middleware"
	"github.com/fortius/api/internal/tournament"
	"github.com/fortius/api/pkg/logger"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	l, err := logger.New(cfg.Env)
	if err != nil {
		log.Fatalf("logger: %v", err)
	}
	logger.Set(l)

	database, err := db.Connect(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db: %v", err)
	}
	defer database.Close()

	authRepo := auth.NewRepository(database)
	authSvc := auth.NewService(authRepo)
	authHandler := auth.NewHandler(authSvc)

	tournamentRepo := tournament.NewRepository(database)
	tournamentSvc := tournament.NewService(tournamentRepo, authSvc)
	tournamentHandler := tournament.NewHandler(tournamentSvc)

	commerceRepo := commerce.NewRepository(database)
	commerceSvc := commerce.NewService(commerceRepo, authSvc, tournamentSvc)
	commerceHandler := commerce.NewHandler(commerceSvc)

	r := gin.Default()

	r.Use(requestid.New())
	r.Use(middleware.LogRequestAndResponse(logger.With()))

	api := r.Group("/api/v1")

	auth.RegisterRoutes(api, authHandler)
	tournament.RegisterRoutes(api, tournamentHandler)
	commerce.RegisterRoutes(api, commerceHandler)

	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: r,
	}

	go func() {
		logger.Info("server starting", "port", cfg.Port, "env", cfg.Env)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Fatal("server error", "error", err)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("shutting down gracefully...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("forced shutdown", "error", err)
	}
	logger.Info("server stopped")
}
