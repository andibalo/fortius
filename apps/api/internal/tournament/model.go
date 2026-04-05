package tournament

import "time"

type tournamentModel struct {
	ID        string    `bson:"_id"        json:"id"`
	Name      string    `bson:"name"       json:"name"`
	Status    string    `bson:"status"     json:"status"`
	StartDate time.Time `bson:"start_date" json:"start_date"`
	EndDate   time.Time `bson:"end_date"   json:"end_date"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
}

type matchModel struct {
	ID           string    `bson:"_id"           json:"id"`
	TournamentID string    `bson:"tournament_id" json:"tournament_id"`
	Player1ID    string    `bson:"player1_id"    json:"player1_id"`
	Player2ID    string    `bson:"player2_id"    json:"player2_id"`
	WinnerID     string    `bson:"winner_id"     json:"winner_id"`
	Status       string    `bson:"status"        json:"status"`
	ScheduledAt  time.Time `bson:"scheduled_at"  json:"scheduled_at"`
}

type registrationModel struct {
	ID           string    `bson:"_id"           json:"id"`
	TournamentID string    `bson:"tournament_id" json:"tournament_id"`
	UserID       string    `bson:"user_id"       json:"user_id"`
	RegisteredAt time.Time `bson:"registered_at" json:"registered_at"`
}
