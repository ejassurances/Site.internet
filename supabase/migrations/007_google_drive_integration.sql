-- ============================================================
-- Migration 007 : Intégration Google Drive × CRM
-- ============================================================
-- Ajoute les colonnes google_drive_folder_id sur clients et projects
-- Crée le trigger pour les projets (clients déjà géré)
-- Crée la table ia_document_analyses pour les résultats Claude
-- ============================================================

-- ─── 1. Colonnes Google Drive ─────────────────────────────────────────────────

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS google_drive_folder_id TEXT,
  ADD COLUMN IF NOT EXISTS google_drive_folder_url TEXT GENERATED ALWAYS AS (
    CASE
      WHEN google_drive_folder_id IS NOT NULL
      THEN 'https://drive.google.com/drive/folders/' || google_drive_folder_id
      ELSE NULL
    END
  ) STORED;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS google_drive_folder_id TEXT,
  ADD COLUMN IF NOT EXISTS google_drive_folder_url TEXT GENERATED ALWAYS AS (
    CASE
      WHEN google_drive_folder_id IS NOT NULL
      THEN 'https://drive.google.com/drive/folders/' || google_drive_folder_id
      ELSE NULL
    END
  ) STORED;

-- ─── 2. Table des analyses IA de documents ────────────────────────────────────

CREATE TABLE IF NOT EXISTS ia_document_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Référence document
  drive_file_id TEXT NOT NULL,
  file_name TEXT,
  file_mime_type TEXT,
  document_id UUID REFERENCES documents_cabinet(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  -- Type et résultat d'analyse
  analysis_type TEXT NOT NULL DEFAULT 'general'
    CHECK (analysis_type IN ('kyc', 'contrat', 'offre_pret', 'tableau_amortissement', 'general')),
  summary TEXT,
  key_data JSONB DEFAULT '{}',
  action_items TEXT[] DEFAULT '{}',
  compliance_flags TEXT[] DEFAULT '{}',
  risk_score INTEGER DEFAULT 0 CHECK (risk_score BETWEEN 0 AND 100),
  -- RGPD
  anonymisation_required BOOLEAN DEFAULT false,
  detected_pii_categories TEXT[] DEFAULT '{}',
  -- Métadonnées
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_ia_analyses_client ON ia_document_analyses(client_id);
CREATE INDEX IF NOT EXISTS idx_ia_analyses_drive_file ON ia_document_analyses(drive_file_id);
CREATE INDEX IF NOT EXISTS idx_ia_analyses_type ON ia_document_analyses(analysis_type);
CREATE INDEX IF NOT EXISTS idx_ia_analyses_risk ON ia_document_analyses(risk_score DESC);

-- RLS
ALTER TABLE ia_document_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture analyses authentifiés" ON ia_document_analyses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Écriture analyses service role" ON ia_document_analyses
  FOR INSERT TO authenticated USING (true) WITH CHECK (true);

-- ─── 3. Activation pg_net (si pas encore fait) ───────────────────────────────

CREATE EXTENSION IF NOT EXISTS pg_net;

-- ─── 4. Fonction trigger pour les clients ────────────────────────────────────
-- (Peut déjà exister — utilise CREATE OR REPLACE pour être idempotent)

CREATE OR REPLACE FUNCTION public.on_client_created_create_drive_folder()
RETURNS TRIGGER AS $$
DECLARE
  anon_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
BEGIN
  -- Appel asynchrone via pg_net (ne bloque pas l'INSERT)
  PERFORM net.http_post(
    url     := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body    := jsonb_build_object(
      'table',  'clients',
      'record', jsonb_build_object(
        'id',        NEW.id,
        'full_name', NEW.full_name,
        'email',     NEW.email
      )
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer l'ancien trigger s'il existe, puis recréer
DROP TRIGGER IF EXISTS trigger_client_drive_folder ON public.clients;

CREATE TRIGGER trigger_client_drive_folder
  AFTER INSERT ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.on_client_created_create_drive_folder();

-- ─── 5. Fonction et trigger pour les projets ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.on_project_created_create_drive_folder()
RETURNS TRIGGER AS $$
DECLARE
  anon_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1bmV1a2NtcWFmdHdoaWR5ZWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDE3MDQsImV4cCI6MjA5NzE3NzcwNH0.PSP_vEvqjJkBuQPNHHwLHNZz9jqKCTheSaiu5ebmUQM';
BEGIN
  PERFORM net.http_post(
    url     := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body    := jsonb_build_object(
      'table',  'projects',
      'record', jsonb_build_object(
        'id',           NEW.id,
        'client_id',    NEW.client_id,
        'title',        NEW.title,
        'project_type', NEW.project_type
      )
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_project_drive_folder ON public.projects;

CREATE TRIGGER trigger_project_drive_folder
  AFTER INSERT ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.on_project_created_create_drive_folder();

-- ─── 6. Vue utilitaire : clients avec statut Drive ────────────────────────────

CREATE OR REPLACE VIEW public.clients_drive_status AS
SELECT
  c.id,
  c.full_name,
  c.email,
  c.created_at,
  c.google_drive_folder_id,
  c.google_drive_folder_url,
  CASE
    WHEN c.google_drive_folder_id IS NOT NULL THEN 'configuré'
    ELSE 'en attente'
  END AS drive_status,
  COUNT(DISTINCT p.id) AS nb_projets,
  COUNT(DISTINCT p.google_drive_folder_id) AS nb_projets_drive
FROM public.clients c
LEFT JOIN public.projects p ON p.client_id = c.id
GROUP BY c.id, c.full_name, c.email, c.created_at, c.google_drive_folder_id, c.google_drive_folder_url;

-- ─── 7. Requêtes de vérification (à exécuter manuellement après déploiement) ──

-- Vérifier les appels pg_net récents :
-- SELECT id, status_code, content::text, created FROM net._http_response ORDER BY created DESC LIMIT 10;

-- Vérifier les dossiers Drive créés :
-- SELECT id, full_name, google_drive_folder_id, google_drive_folder_url FROM public.clients ORDER BY created_at DESC LIMIT 10;

-- Tester manuellement l'Edge Function :
-- SELECT net.http_post(
--   url := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder',
--   headers := '{"Content-Type":"application/json","Authorization":"Bearer ANON_KEY"}'::jsonb,
--   body := '{"table":"clients","record":{"id":"test-uuid","full_name":"Test Client","email":"test@example.com"}}'::jsonb
-- );
