package commerce

import "github.com/gin-gonic/gin"

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) CreateOrder(c *gin.Context) {}
func (h *Handler) GetOrder(c *gin.Context)    {}
func (h *Handler) ListOrders(c *gin.Context)  {}

func RegisterRoutes(rg *gin.RouterGroup, h *Handler) {
	g := rg.Group("/commerce")
	g.POST("/orders", h.CreateOrder)
	g.GET("/orders/:id", h.GetOrder)
	g.GET("/orders", h.ListOrders)
}
