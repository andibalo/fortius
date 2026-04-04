package tournament

import "context"

type Service struct {
	repo       repository
	userReader userReader
}

func NewService(repo repository, users userReader) *Service {
	return &Service{
		repo:       repo,
		userReader: users,
	}
}

func (s *Service) CreateTournament(ctx context.Context, t *Tournament) error {
	panic("not implemented")
}

func (s *Service) Register(ctx context.Context, tournamentID, userID string) error {
	panic("not implemented")
}

func (s *Service) GetTournamentByID(ctx context.Context, id string) (*Tournament, error) {
	panic("not implemented")
}

func (s *Service) ListTournaments(ctx context.Context) ([]*Tournament, error) {
	panic("not implemented")
}
