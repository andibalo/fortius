package auth

import "time"

type userModel struct {
	ID           string    `bson:"_id"           json:"id"`
	Email        string    `bson:"email"         json:"email"`
	PasswordHash string    `bson:"password_hash" json:"-"`
	Roles        []string  `bson:"roles"         json:"roles"`
	CreatedAt    time.Time `bson:"created_at"    json:"created_at"`
	UpdatedAt    time.Time `bson:"updated_at"    json:"updated_at"`
}

type sessionModel struct {
	ID        string    `bson:"_id"        json:"id"`
	UserID    string    `bson:"user_id"    json:"user_id"`
	Token     string    `bson:"token"      json:"token"`
	ExpiresAt time.Time `bson:"expires_at" json:"expires_at"`
}
