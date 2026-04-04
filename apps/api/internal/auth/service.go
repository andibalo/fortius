package auth

import "context"

type Service struct {
	repo repository
}

func NewService(repo repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Register(ctx context.Context, email, password string) (*User, error) {
	panic("not implemented")
}

func (s *Service) Login(ctx context.Context, email, password string) (*Session, error) {
	panic("not implemented")
}

func (s *Service) Logout(ctx context.Context, token string) error {
	panic("not implemented")
}

func (s *Service) ValidateToken(ctx context.Context, token string) (*User, error) {
	panic("not implemented")
}

func (s *Service) GetByID(ctx context.Context, id string) (*User, error) {
	panic("not implemented")
}
