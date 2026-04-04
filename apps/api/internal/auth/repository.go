package auth

import (
	"context"

	"github.com/fortius/api/internal/shared/db"
)

type repository interface {
	findUserByEmail(ctx context.Context, email string) (*User, error)
	findUserByID(ctx context.Context, id string) (*User, error)
	createUser(ctx context.Context, user *User) error
	createSession(ctx context.Context, session *Session) error
	findSessionByToken(ctx context.Context, token string) (*Session, error)
	deleteSession(ctx context.Context, token string) error
}

func NewRepository(d db.DB) repository {
	return &pgRepository{db: d}
}

type pgRepository struct {
	db db.DB
}

func (r *pgRepository) findUserByEmail(ctx context.Context, email string) (*User, error) {
	panic("not implemented")
}

func (r *pgRepository) findUserByID(ctx context.Context, id string) (*User, error) {
	panic("not implemented")
}

func (r *pgRepository) createUser(ctx context.Context, user *User) error {
	panic("not implemented")
}

func (r *pgRepository) createSession(ctx context.Context, session *Session) error {
	panic("not implemented")
}

func (r *pgRepository) findSessionByToken(ctx context.Context, token string) (*Session, error) {
	panic("not implemented")
}

func (r *pgRepository) deleteSession(ctx context.Context, token string) error {
	panic("not implemented")
}
