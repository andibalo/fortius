package tournament

import "github.com/gin-gonic/gin"

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) CreateTournament(c *gin.Context) {}
func (h *Handler) GetTournament(c *gin.Context)    {}
func (h *Handler) ListTournaments(c *gin.Context)  {}
func (h *Handler) Register(c *gin.Context)         {}

func RegisterRoutes(rg *gin.RouterGroup, h *Handler) {
	g := rg.Group("/tournaments")
	g.POST("", h.CreateTournament)
	g.GET("", h.ListTournaments)
	g.GET("/:id", h.GetTournament)
	g.POST("/:id/register", h.Register)
}
