package commerce

import (
	"context"

	"github.com/fortius/api/internal/auth"
	"github.com/fortius/api/internal/tournament"
)

type userReader interface {
	GetByID(ctx context.Context, id string) (*auth.User, error)
}

type tournamentReader interface {
	GetTournamentByID(ctx context.Context, id string) (*tournament.Tournament, error)
}
