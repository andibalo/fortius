package tournament

import "time"

type Tournament struct {
	ID        string
	Name      string
	Status    string
	StartDate time.Time
	EndDate   time.Time
	CreatedAt time.Time
}

type Match struct {
	ID           string
	TournamentID string
	Player1ID    string
	Player2ID    string
	WinnerID     string
	Status       string
	ScheduledAt  time.Time
}

type Registration struct {
	ID           string
	TournamentID string
	UserID       string
	RegisteredAt time.Time
}
