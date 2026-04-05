#!/bin/bash
set -e

ENV=${1:-prod}

if [[ "$ENV" != "prod" && "$ENV" != "stg" ]]; then
  echo "Usage: ./deploy.sh [prod|stg]"
  exit 1
fi

INFRA_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Deploying $ENV..."

# Pull latest code
git -C "$INFRA_DIR/.." pull origin master

# Authenticate with GHCR
echo "$GHCR_TOKEN" | docker login ghcr.io -u andibalo --password-stdin

# Pull latest image
docker pull ghcr.io/andibalo/fortius-api:$ENV

# Restart only the API container (leaves DB untouched)
docker compose -f "$INFRA_DIR/docker-compose.yml" \
               -f "$INFRA_DIR/docker-compose.$ENV.yml" \
               up -d --no-deps api-$ENV

# Clean up old images
docker image prune -f

echo "==> Done. $ENV is live."
