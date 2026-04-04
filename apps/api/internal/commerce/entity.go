package commerce

import "time"

type Order struct {
	ID        string
	UserID    string
	Status    string
	Items     []OrderItem
	CreatedAt time.Time
	UpdatedAt time.Time
}

type OrderItem struct {
	ID        string
	OrderID   string
	ProductID string
	Quantity  int
	Price     int64
}

type Payment struct {
	ID        string
	OrderID   string
	UserID    string
	Status    string
	Amount    int64
	CreatedAt time.Time
}
