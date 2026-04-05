package commerce

import "context"

type Service struct {
	repo             repository
	userReader       userReader
	tournamentReader tournamentReader
}

func NewService(repo repository, users userReader, tournaments tournamentReader) *Service {
	return &Service{
		repo:             repo,
		userReader:       users,
		tournamentReader: tournaments,
	}
}

func (s *Service) CreateOrder(ctx context.Context, userID string, items []OrderItem) (*Order, error) {
	panic("not implemented")
}

func (s *Service) GetOrder(ctx context.Context, orderID string) (*Order, error) {
	panic("not implemented")
}

func (s *Service) HasPaid(ctx context.Context, userID, referenceID string) (bool, error) {
	panic("not implemented")
}
