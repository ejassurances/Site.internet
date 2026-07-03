-- ═══════════════════════════════════════════════════════════════════════════════
--  Migration: Classeur Conformité + Documents avec date d'expiration
--  Tasks #24 & #25 — EJ Assurances
-- ═══════════════════════════════════════════════════════════════════════════════

-- ── 1. google_drive_folder_id sur mandataires ──────────────────────────────────
ALTER TABLE public.mandataires
  ADD COLUMN IF NOT EXISTS google_drive_folder_id TEXT;

-- ── 2. Table cabinet_info (une seule ligne : le cabinet lui-même) ──────────────
CREATE TABLE IF NOT EXISTS public.cabinet_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL DEFAULT 'EJ Assurances',
  google_drive_folder_conformite_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insérer la ligne cabinet si elle n'existe pas
INSERT INTO public.cabinet_info (nom)
SELECT 'EJ Assurances'
WHERE NOT EXISTS (SELECT 1 FROM public.cabinet_info);

ALTER TABLE public.cabinet_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin peut gérer cabinet_info" ON public.cabinet_info
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── 3. Table documents_conformite ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.documents_conformite (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type      TEXT    NOT NULL CHECK (entity_type IN ('cabinet', 'mandataire')),
  entity_id        UUID,   -- NULL pour le cabinet
  document_type    TEXT    NOT NULL CHECK (document_type IN (
    'carte_identite',
    'attestation_rcpro',
    'attestation_orias',
    'extrait_kbis',
    'convention_mandat',
    'rapport_formation_dda',
    'autre'
  )),
  libelle          TEXT,
  date_emission    DATE,
  date_expiration  DATE,
  drive_file_id    TEXT,
  drive_file_url   TEXT,
  statut           TEXT    NOT NULL DEFAULT 'valide' CHECK (statut IN ('valide', 'expire', 'a_renouveler', 'manquant')),
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_docs_conformite_entity
  ON public.documents_conformite(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_docs_conformite_expiration
  ON public.documents_conformite(date_expiration)
  WHERE date_expiration IS NOT NULL;

ALTER TABLE public.documents_conformite ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin courtier gère documents_conformite" ON public.documents_conformite
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'courtier')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'courtier')
    )
  );

-- ── 4. Table alertes_conformite ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.alertes_conformite (
  id            UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id   UUID    NOT NULL REFERENCES public.documents_conformite(id) ON DELETE CASCADE,
  type_alerte   TEXT    NOT NULL CHECK (type_alerte IN ('90_jours', '30_jours', '7_jours', 'expire')),
  date_alerte   DATE    NOT NULL,
  envoyee       BOOLEAN NOT NULL DEFAULT false,
  envoyee_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_alertes_conformite_date
  ON public.alertes_conformite(date_alerte)
  WHERE envoyee = false;

ALTER TABLE public.alertes_conformite ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin courtier gère alertes_conformite" ON public.alertes_conformite
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'courtier')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'courtier')
    )
  );

-- ── 5. Trigger : auto-update statut selon date_expiration ─────────────────────
CREATE OR REPLACE FUNCTION public.update_statut_doc_conformite()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.date_expiration IS NOT NULL THEN
    IF NEW.date_expiration < CURRENT_DATE THEN
      NEW.statut := 'expire';
    ELSIF NEW.date_expiration <= (CURRENT_DATE + INTERVAL '30 days') THEN
      NEW.statut := 'a_renouveler';
    ELSE
      NEW.statut := 'valide';
    END IF;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_statut_doc_conformite ON public.documents_conformite;
CREATE TRIGGER trg_statut_doc_conformite
  BEFORE INSERT OR UPDATE ON public.documents_conformite
  FOR EACH ROW EXECUTE FUNCTION public.update_statut_doc_conformite();

-- ── 6. Trigger : générer les alertes quand date_expiration est définie/modifiée
CREATE OR REPLACE FUNCTION public.generate_alertes_doc_conformite()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- Uniquement si la date d'expiration a changé
  IF NEW.date_expiration IS DISTINCT FROM (CASE WHEN TG_OP = 'UPDATE' THEN OLD.date_expiration ELSE NULL END)
     AND NEW.date_expiration IS NOT NULL THEN

    -- Supprimer les alertes non encore envoyées
    DELETE FROM public.alertes_conformite
    WHERE document_id = NEW.id AND envoyee = false;

    -- Créer les nouvelles alertes (seulement pour les dates à venir ou aujourd'hui)
    INSERT INTO public.alertes_conformite (document_id, type_alerte, date_alerte)
    SELECT NEW.id, t.type_alerte, t.date_alerte
    FROM (VALUES
      ('90_jours'::TEXT, (NEW.date_expiration - INTERVAL '90 days')::DATE),
      ('30_jours'::TEXT, (NEW.date_expiration - INTERVAL '30 days')::DATE),
      ('7_jours'::TEXT,  (NEW.date_expiration - INTERVAL '7 days')::DATE),
      ('expire'::TEXT,   NEW.date_expiration)
    ) AS t(type_alerte, date_alerte)
    WHERE t.date_alerte >= CURRENT_DATE;

  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_generate_alertes_conformite ON public.documents_conformite;
CREATE TRIGGER trg_generate_alertes_conformite
  AFTER INSERT OR UPDATE OF date_expiration ON public.documents_conformite
  FOR EACH ROW EXECUTE FUNCTION public.generate_alertes_doc_conformite();

-- ── 7. Trigger pg_net : créer dossier Drive lors d'un INSERT mandataire ────────
-- (Requiert l'extension pg_net et les paramètres supabase.url + supabase.service_role_key)
CREATE OR REPLACE FUNCTION public.trigger_mandataire_drive_folder()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _fn_url TEXT := 'https://huneukcmqaftwhidyegi.supabase.co/functions/v1/create-drive-folder';
BEGIN
  PERFORM net.http_post(
    url     := _fn_url,
    body    := json_build_object('table', 'mandataires', 'record', row_to_json(NEW))::text::jsonb,
    headers := json_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('supabase.service_role_key', true)
    )::jsonb
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Ne pas bloquer le INSERT si pg_net échoue
  RAISE WARNING '[trigger_mandataire_drive_folder] Erreur pg_net : %', SQLERRM;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_create_mandataire_drive_folder ON public.mandataires;
CREATE TRIGGER trg_create_mandataire_drive_folder
  AFTER INSERT ON public.mandataires
  FOR EACH ROW EXECUTE FUNCTION public.trigger_mandataire_drive_folder();

