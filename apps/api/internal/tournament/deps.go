package tournament

import (
	"context"

	"github.com/fortius/api/internal/auth"
)

type userReader interface {
	GetByID(ctx context.Context, id string) (*auth.User, error)
}
