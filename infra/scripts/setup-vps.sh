#!/bin/bash
set -euo pipefail

REPO_URL="https://github.com/andibalo/fortius.git"
DEPLOY_DIR="/opt/fortius"

# ── Guards ───────────────────────────────────────────────────────────────────

# Must run as root
if [[ "$EUID" -ne 0 ]]; then
  echo "[!] Please run as root: sudo bash setup-vps.sh"
  exit 1
fi

# Must be Ubuntu or Debian
if [[ ! -f /etc/os-release ]]; then
  echo "[!] Cannot detect OS. This script supports Ubuntu/Debian only."
  exit 1
fi

. /etc/os-release
if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
  echo "[!] Unsupported OS: $ID. This script supports Ubuntu/Debian only."
  exit 1
fi

echo "==> Detected OS: $PRETTY_NAME"

# ── 1. Install dependencies ──────────────────────────────────────────────────

echo "==> Installing dependencies (git, curl, gnupg)..."
apt-get update -y -qq
apt-get install -y -qq git curl ca-certificates gnupg

# ── 2. Install Docker ────────────────────────────────────────────────────────

echo "==> Installing Docker..."
if command -v docker &>/dev/null; then
  echo "    Docker $(docker --version) already installed, skipping"
else
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL "https://download.docker.com/linux/$ID/gpg" \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/$ID $VERSION_CODENAME stable" \
    | tee /etc/apt/sources.list.d/docker.list > /dev/null

  apt-get update -y -qq
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

  systemctl enable docker
  systemctl start docker
  echo "    Docker installed: $(docker --version)"
fi

# ── 3. Clone or update repo ──────────────────────────────────────────────────

echo "==> Setting up repository at $DEPLOY_DIR..."
if [[ -d "$DEPLOY_DIR/.git" ]]; then
  echo "    Repo already exists, pulling latest..."
  git -C "$DEPLOY_DIR" pull origin master
else
  git clone "$REPO_URL" "$DEPLOY_DIR"
  echo "    Cloned to $DEPLOY_DIR"
fi

# ── 4. Create Docker proxy network ───────────────────────────────────────────

echo "==> Creating Docker proxy network..."
docker network create proxy 2>/dev/null || echo "    proxy network already exists, skipping"

# ── 5. Create data directories ───────────────────────────────────────────────

echo "==> Creating data directories..."
mkdir -p /data/postgres-prod /data/postgres-stg /data/backups

# 999 is the postgres user UID inside the official postgres container
chown -R 999:999 /data/postgres-prod /data/postgres-stg
echo "    /data/postgres-prod, /data/postgres-stg, /data/backups created"

# ── 6. Create Traefik acme.json ──────────────────────────────────────────────

echo "==> Setting up Traefik acme.json..."
ACME_FILE="$DEPLOY_DIR/infra/traefik/acme.json"
if [[ ! -f "$ACME_FILE" ]]; then
  touch "$ACME_FILE"
fi
# Always enforce correct permissions — Traefik refuses to start otherwise
chmod 600 "$ACME_FILE"
echo "    acme.json ready (chmod 600)"

# ── 7. Check for .env files ──────────────────────────────────────────────────

echo "==> Checking for .env files..."
INFRA_DIR="$DEPLOY_DIR/infra"
MISSING_ENV=0

for ENV in prod stg; do
  if [[ ! -f "$INFRA_DIR/.env.$ENV" ]]; then
    echo "  [!] Missing $INFRA_DIR/.env.$ENV"
    echo "      Run: cp $INFRA_DIR/.env.$ENV.example $INFRA_DIR/.env.$ENV"
    MISSING_ENV=1
  else
    echo "    .env.$ENV found"
  fi
done

# ── Done ─────────────────────────────────────────────────────────────────────

echo ""
echo "========================================"
echo " Setup complete. Repo at: $DEPLOY_DIR"
echo "========================================"
echo ""

if [[ $MISSING_ENV -eq 1 ]]; then
  echo "  [!] Fill in the missing .env files before starting containers."
  echo ""
fi

echo "Next steps:"
echo "  1. Fill in $INFRA_DIR/.env.prod and $INFRA_DIR/.env.stg"
echo "  2. Update $INFRA_DIR/traefik/traefik.yml (email + domain)"
echo "  3. cd $DEPLOY_DIR"
echo "  4. docker compose -f infra/docker-compose.yml up -d"
echo "  5. docker compose -f infra/docker-compose.yml -f infra/docker-compose.prod.yml up -d"
echo "  6. docker compose -f infra/docker-compose.yml -f infra/docker-compose.stg.yml up -d"
