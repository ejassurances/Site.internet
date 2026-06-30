-- ============================================================
-- Migration 002 : Centre Documentaire & Anonymisation RGPD
-- ============================================================

-- Table des compagnies d'assurance
CREATE TABLE IF NOT EXISTS compagnies_assurance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  logo_emoji TEXT DEFAULT '🏛️',
  couleur_hex TEXT DEFAULT '#1e3a5f',
  gammes TEXT[] DEFAULT '{}',
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des typologies documentaires
CREATE TABLE IF NOT EXISTS typologies_documentaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  icon TEXT DEFAULT '📄',
  description TEXT,
  sous_types TEXT[] DEFAULT '{}',
  ordre INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table principale des documents
CREATE TABLE IF NOT EXISTS documents_cabinet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  description TEXT,
  compagnie_id UUID REFERENCES compagnies_assurance(id) ON DELETE SET NULL,
  typologie_id UUID REFERENCES typologies_documentaires(id) ON DELETE SET NULL,
  sous_type TEXT,
  -- Stockage Supabase Storage
  storage_path TEXT, -- chemin dans le bucket Supabase Storage
  storage_bucket TEXT DEFAULT 'documents-cabinet',
  url_publique TEXT,
  -- Métadonnées
  type_mime TEXT,
  taille_octets INTEGER,
  version TEXT,
  tags TEXT[] DEFAULT '{}',
  -- Auteur
  cree_par UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  -- Statut
  statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'archive', 'brouillon')),
  -- Dates
  date_validite DATE, -- date d'expiration du document
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des journaux d'anonymisation (traçabilité RGPD)
CREATE TABLE IF NOT EXISTS journaux_anonymisation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Utilisateur qui a lancé l'anonymisation
  utilisateur_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  -- Document source (optionnel si texte manuel)
  document_id UUID REFERENCES documents_cabinet(id) ON DELETE SET NULL,
  nom_fichier_original TEXT,
  type_fichier TEXT,
  taille_octets INTEGER,
  -- Résultat
  mode_anonymisation TEXT DEFAULT 'ia' CHECK (mode_anonymisation IN ('ia', 'regex')),
  total_detections INTEGER DEFAULT 0,
  score_rgpd INTEGER DEFAULT 0,
  categories_detectees JSONB DEFAULT '{}',
  -- Texte anonymisé stocké temporairement (supprimé après 24h)
  texte_anonymise TEXT,
  -- Statut
  statut TEXT DEFAULT 'termine' CHECK (statut IN ('en_cours', 'termine', 'erreur')),
  erreur_message TEXT,
  -- Dates
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- ─── Index ────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_documents_compagnie ON documents_cabinet(compagnie_id);
CREATE INDEX IF NOT EXISTS idx_documents_typologie ON documents_cabinet(typologie_id);
CREATE INDEX IF NOT EXISTS idx_documents_statut ON documents_cabinet(statut);
CREATE INDEX IF NOT EXISTS idx_documents_tags ON documents_cabinet USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_journaux_utilisateur ON journaux_anonymisation(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_journaux_expires ON journaux_anonymisation(expires_at);

-- ─── RLS (Row Level Security) ─────────────────────────────────────────────

ALTER TABLE compagnies_assurance ENABLE ROW LEVEL SECURITY;
ALTER TABLE typologies_documentaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_cabinet ENABLE ROW LEVEL SECURITY;
ALTER TABLE journaux_anonymisation ENABLE ROW LEVEL SECURITY;

-- Lecture : utilisateurs authentifiés seulement
CREATE POLICY "Lecture documents authentifiés" ON documents_cabinet
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Lecture compagnies authentifiés" ON compagnies_assurance
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Lecture typologies authentifiés" ON typologies_documentaires
  FOR SELECT TO authenticated USING (true);

-- Écriture : utilisateurs authentifiés
CREATE POLICY "Écriture documents authentifiés" ON documents_cabinet
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Écriture compagnies authentifiés" ON compagnies_assurance
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Journaux : chaque utilisateur voit ses propres journaux
CREATE POLICY "Journaux propres utilisateur" ON journaux_anonymisation
  FOR ALL TO authenticated
  USING (utilisateur_id = auth.uid())
  WITH CHECK (utilisateur_id = auth.uid());

-- ─── Données initiales ────────────────────────────────────────────────────

INSERT INTO compagnies_assurance (slug, nom, logo_emoji, couleur_hex, gammes) VALUES
  ('generali', 'Generali', '🏛️', '#c8102e', ARRAY['Assurance emprunteur', 'Prévoyance', 'Épargne']),
  ('allianz', 'Allianz', '🔵', '#003781', ARRAY['Assurance emprunteur', 'Prévoyance', 'Retraite']),
  ('axa', 'AXA', '🔷', '#00008f', ARRAY['Assurance emprunteur', 'Prévoyance', 'Santé']),
  ('cardif', 'BNP Cardif', '🟢', '#00965e', ARRAY['Assurance emprunteur', 'Prévoyance']),
  ('cnp', 'CNP Assurances', '🟡', '#f5a623', ARRAY['Assurance emprunteur', 'Prévoyance', 'Retraite']),
  ('metlife', 'MetLife', '🔴', '#0066cc', ARRAY['Assurance emprunteur', 'Prévoyance']),
  ('swiss-life', 'Swiss Life', '⚪', '#e30613', ARRAY['Assurance emprunteur', 'Prévoyance', 'Retraite']),
  ('april', 'APRIL', '🟠', '#ff6600', ARRAY['Assurance emprunteur', 'Prévoyance', 'Santé'])
ON CONFLICT (slug) DO NOTHING;

INSERT INTO typologies_documentaires (slug, label, icon, description, sous_types, ordre) VALUES
  ('recueil-besoins', 'Recueil des besoins', '📋', 'Formulaires de recueil des besoins client',
   ARRAY['Recueil besoins standard', 'Recueil besoins coparentalité', 'Recueil besoins familles LGBT+', 'Recueil besoins familles recomposées', 'Recueil besoins co-emprunteurs'], 1),
  ('grilles-tarifs', 'Grilles & Tarifs', '💰', 'Grilles tarifaires et tableaux de garanties',
   ARRAY['Grille tarifaire standard', 'Grille tarifaire senior', 'Grille convention AERAS', 'Tableau des garanties', 'Tableau comparatif'], 2),
  ('conditions-generales', 'Conditions Générales', '📜', 'CG, IPID et notices d''information',
   ARRAY['Conditions Générales (CG)', 'IPID (Document d''information)', 'Notice d''information', 'Fiche standardisée d''information (FSI)'], 3),
  ('questionnaires-medicaux', 'Questionnaires Médicaux', '🏥', 'Questionnaires de santé et protocoles médicaux',
   ARRAY['Questionnaire médical simplifié', 'Questionnaire médical complet', 'Protocole convention AERAS', 'Formulaire droit à l''oubli'], 4),
  ('outils-vente', 'Outils de Vente', '🎯', 'Argumentaires, scripts et supports de présentation',
   ARRAY['Argumentaire de vente', 'Script d''appel', 'Présentation produit', 'Fiche réponses objections', 'Comparatif concurrentiel'], 5),
  ('conformite', 'Conformité & DDA', '⚖️', 'Documents réglementaires et conformité DDA',
   ARRAY['Lettre de mission', 'Mandat de recherche', 'Document d''entrée en relation', 'Attestation DDA', 'Fiche de traçabilité'], 6)
ON CONFLICT (slug) DO NOTHING;

-- ─── Fonction de nettoyage automatique des journaux expirés ───────────────

CREATE OR REPLACE FUNCTION nettoyer_journaux_expires()
RETURNS void AS $$
BEGIN
  DELETE FROM journaux_anonymisation WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── Trigger updated_at ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_documents_updated_at
  BEFORE UPDATE ON documents_cabinet
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
