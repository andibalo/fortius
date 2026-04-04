package middleware

import (
	"time"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"

	"github.com/fortius/api/pkg/logger"
)

func LogRequestAndResponse(log logger.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		log.Info("request",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"query", c.Request.URL.RawQuery,
			"ip", c.ClientIP(),
			"user_agent", c.Request.UserAgent(),
			"request_id", requestid.Get(c),
		)

		c.Next()

		status := c.Writer.Status()
		latency := time.Since(start)
		size := c.Writer.Size()

		kvs := []any{
			"status", status,
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"latency_ms", latency.Milliseconds(),
			"size_bytes", size,
			"request_id", requestid.Get(c),
			"ip", c.ClientIP(),
		}

		if len(c.Errors) > 0 {
			log.Error("response", append(kvs, "errors", c.Errors.String())...)
		} else if status >= 500 {
			log.Error("response", kvs...)
		} else {
			log.Info("response", kvs...)
		}
	}
}
