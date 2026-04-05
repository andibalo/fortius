package commerce

import "time"

type orderModel struct {
	ID        string           `bson:"_id"        json:"id"`
	UserID    string           `bson:"user_id"    json:"user_id"`
	Status    string           `bson:"status"     json:"status"`
	Items     []orderItemModel `bson:"items"      json:"items"`
	CreatedAt time.Time        `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time        `bson:"updated_at" json:"updated_at"`
}

type orderItemModel struct {
	ID        string `bson:"_id"        json:"id"`
	OrderID   string `bson:"order_id"   json:"order_id"`
	ProductID string `bson:"product_id" json:"product_id"`
	Quantity  int    `bson:"quantity"   json:"quantity"`
	Price     int64  `bson:"price"      json:"price"`
}

type paymentModel struct {
	ID        string    `bson:"_id"        json:"id"`
	OrderID   string    `bson:"order_id"   json:"order_id"`
	UserID    string    `bson:"user_id"    json:"user_id"`
	Status    string    `bson:"status"     json:"status"`
	Amount    int64     `bson:"amount"     json:"amount"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
}
