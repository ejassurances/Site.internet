#!/bin/bash
set -e
BLUE='\033[0;34m'; GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
log()  { echo -e "${BLUE}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
fail() { echo -e "${RED}✗ $1${NC}"; exit 1; }

export $(grep -v '^#' .env.local | xargs)
PROJECT_ID="huneukcmqaftwhidyegi"

log "Migration SQL..."
supabase db push --project-ref $PROJECT_ID

log "Secrets Supabase..."
supabase secrets set \
  GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID" \
  GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET" \
  GOOGLE_REFRESH_TOKEN="$GOOGLE_REFRESH_TOKEN" \
  GOOGLE_DRIVE_ROOT_FOLDER_ID="$GOOGLE_DRIVE_ROOT_FOLDER_ID" \
  GEMINI_API_KEY="$GEMINI_API_KEY" \
  ADVISOR_EMAIL="$ADVISOR_EMAIL" \
  ADVISOR_NAME="$ADVISOR_NAME" \
  SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  SUPABASE_SERVICE_ROLE_KEY="$SUPABASE_SERVICE_ROLE_KEY" \
  --project-ref $PROJECT_ID

log "Edge Function create-drive-folder..."
supabase functions deploy create-drive-folder --project-ref $PROJECT_ID --no-verify-jwt

log "Edge Function send-email..."
supabase functions deploy send-email --project-ref $PROJECT_ID --no-verify-jwt

log "Edge Function ai-agent-gemini..."
supabase functions deploy ai-agent-gemini --project-ref $PROJECT_ID --no-verify-jwt

log "Git push..."
git add .
git commit -m "feat: CRM complet + Gemini + Drive + workflow AE" || true
git push origin brouillon

echo -e "${GREEN}✓ DÉPLOIEMENT TERMINÉ${NC}"
echo "Site → https://ej-assurances.fr"
echo "CRM  → https://ej-assurances.fr/admin"
