package db

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect(ctx context.Context, connString string) (DB, error) {
	pool, err := pgxpool.New(ctx, connString)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, err
	}
	return &pgxDB{pool: pool}, nil
}

type pgxDB struct {
	pool *pgxpool.Pool
}

func (d *pgxDB) Query(ctx context.Context, sql string, args ...any) (Rows, error) {
	rows, err := d.pool.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	return &pgxRows{rows: rows}, nil
}

func (d *pgxDB) QueryRow(ctx context.Context, sql string, args ...any) Row {
	return &pgxRow{row: d.pool.QueryRow(ctx, sql, args...)}
}

func (d *pgxDB) Exec(ctx context.Context, sql string, args ...any) (int64, error) {
	tag, err := d.pool.Exec(ctx, sql, args...)
	return tag.RowsAffected(), err
}

func (d *pgxDB) Begin(ctx context.Context) (Tx, error) {
	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	return &pgxTx{tx: tx}, nil
}

func (d *pgxDB) Close() {
	d.pool.Close()
}

type pgxTx struct {
	tx pgx.Tx
}

func (t *pgxTx) Query(ctx context.Context, sql string, args ...any) (Rows, error) {
	rows, err := t.tx.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	return &pgxRows{rows: rows}, nil
}

func (t *pgxTx) QueryRow(ctx context.Context, sql string, args ...any) Row {
	return &pgxRow{row: t.tx.QueryRow(ctx, sql, args...)}
}

func (t *pgxTx) Exec(ctx context.Context, sql string, args ...any) (int64, error) {
	tag, err := t.tx.Exec(ctx, sql, args...)
	return tag.RowsAffected(), err
}

func (t *pgxTx) Commit(ctx context.Context) error   { return t.tx.Commit(ctx) }
func (t *pgxTx) Rollback(ctx context.Context) error { return t.tx.Rollback(ctx) }

type pgxRows struct {
	rows pgx.Rows
}

func (r *pgxRows) Next() bool             { return r.rows.Next() }
func (r *pgxRows) Scan(dest ...any) error { return r.rows.Scan(dest...) }
func (r *pgxRows) Close()                 { r.rows.Close() }
func (r *pgxRows) Err() error             { return r.rows.Err() }

type pgxRow struct {
	row pgx.Row
}

func (r *pgxRow) Scan(dest ...any) error { return r.row.Scan(dest...) }
