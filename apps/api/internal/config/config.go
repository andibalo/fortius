package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	Env         string
	Port        string
	DatabaseURL string
}

func Load() (*Config, error) {
	viper.SetDefault("ENV", "development")
	viper.SetDefault("PORT", "8080")

	viper.SetConfigFile(".env")
	viper.SetConfigType("env")
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, fmt.Errorf("error reading .env file: %w", err)
		}
	}

	viper.AutomaticEnv()

	cfg := &Config{
		Env:         viper.GetString("ENV"),
		Port:        viper.GetString("PORT"),
		DatabaseURL: viper.GetString("DATABASE_URL"),
	}

	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	return cfg, nil
}
