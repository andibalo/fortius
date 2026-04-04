package commerce

import (
	"context"

	"github.com/fortius/api/internal/shared/db"
)

type repository interface {
	createOrder(ctx context.Context, order *Order) error
	findOrderByID(ctx context.Context, id string) (*Order, error)
	findOrdersByUserID(ctx context.Context, userID string) ([]*Order, error)
	updateOrderStatus(ctx context.Context, id, status string) error
	createPayment(ctx context.Context, payment *Payment) error
	findPaymentByOrderID(ctx context.Context, orderID string) (*Payment, error)
}

func NewRepository(d db.DB) repository {
	return &pgRepository{db: d}
}

type pgRepository struct {
	db db.DB
}

func (r *pgRepository) createOrder(ctx context.Context, order *Order) error {
	panic("not implemented")
}

func (r *pgRepository) findOrderByID(ctx context.Context, id string) (*Order, error) {
	panic("not implemented")
}

func (r *pgRepository) findOrdersByUserID(ctx context.Context, userID string) ([]*Order, error) {
	panic("not implemented")
}

func (r *pgRepository) updateOrderStatus(ctx context.Context, id, status string) error {
	panic("not implemented")
}

func (r *pgRepository) createPayment(ctx context.Context, payment *Payment) error {
	panic("not implemented")
}

func (r *pgRepository) findPaymentByOrderID(ctx context.Context, orderID string) (*Payment, error) {
	panic("not implemented")
}
