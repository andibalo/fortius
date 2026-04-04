package tournament

import (
	"context"

	"github.com/fortius/api/internal/shared/db"
)

type repository interface {
	createTournament(ctx context.Context, t *Tournament) error
	findTournamentByID(ctx context.Context, id string) (*Tournament, error)
	listTournaments(ctx context.Context) ([]*Tournament, error)
	updateTournamentStatus(ctx context.Context, id, status string) error
	createRegistration(ctx context.Context, reg *Registration) error
	findRegistration(ctx context.Context, tournamentID, userID string) (*Registration, error)
	createMatch(ctx context.Context, match *Match) error
	updateMatch(ctx context.Context, match *Match) error
}

func NewRepository(d db.DB) repository {
	return &pgRepository{db: d}
}

type pgRepository struct {
	db db.DB
}

func (r *pgRepository) createTournament(ctx context.Context, t *Tournament) error {
	panic("not implemented")
}

func (r *pgRepository) findTournamentByID(ctx context.Context, id string) (*Tournament, error) {
	panic("not implemented")
}

func (r *pgRepository) listTournaments(ctx context.Context) ([]*Tournament, error) {
	panic("not implemented")
}

func (r *pgRepository) updateTournamentStatus(ctx context.Context, id, status string) error {
	panic("not implemented")
}

func (r *pgRepository) createRegistration(ctx context.Context, reg *Registration) error {
	panic("not implemented")
}

func (r *pgRepository) findRegistration(ctx context.Context, tournamentID, userID string) (*Registration, error) {
	panic("not implemented")
}

func (r *pgRepository) createMatch(ctx context.Context, match *Match) error {
	panic("not implemented")
}

func (r *pgRepository) updateMatch(ctx context.Context, match *Match) error {
	panic("not implemented")
}
