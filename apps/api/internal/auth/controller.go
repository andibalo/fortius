package auth

import "github.com/gin-gonic/gin"

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) Register(c *gin.Context) {}
func (h *Handler) Login(c *gin.Context)    {}
func (h *Handler) Logout(c *gin.Context)   {}

func RegisterRoutes(rg *gin.RouterGroup, h *Handler) {
	g := rg.Group("/auth")
	g.POST("/register", h.Register)
	g.POST("/login", h.Login)
	g.POST("/logout", h.Logout)
}
