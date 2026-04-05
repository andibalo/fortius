#!/bin/bash
set -e

ENV=${1:-prod}

if [[ "$ENV" != "prod" && "$ENV" != "stg" ]]; then
  echo "Usage: ./backup.sh [prod|stg]"
  exit 1
fi

DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="/data/backups"
mkdir -p "$BACKUP_DIR"

echo "==> Backing up postgres-$ENV..."

# Dump the database
docker exec postgres-$ENV pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" \
  | gzip > "$BACKUP_DIR/${ENV}_${DATE}.sql.gz"

echo "==> Uploading to Google Drive..."

# Upload via rclone (configure rclone with: rclone config)
rclone copy "$BACKUP_DIR/${ENV}_${DATE}.sql.gz" gdrive:fortius-backups/$ENV/

# Keep only last 7 local backups per env
ls -t "$BACKUP_DIR"/${ENV}_*.sql.gz | tail -n +8 | xargs -r rm

echo "==> Backup complete: ${ENV}_${DATE}.sql.gz"
