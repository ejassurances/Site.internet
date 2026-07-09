# 300 — Audit de l'existant (logiciel interne EJ Partners)

| **Document** | Audit technique & fonctionnel de l'existant |
| ------------ | ------------------------------------------- |
| Version      | 1.0 (audit initial)                         |
| Statut       | Rapport — **avant tout code**               |
| Date         | 2026-07-09                                  |
| Périmètre    | `src/`, `supabase/`, `docs/`                |
| Contexte     | Bascule SaaS courtiers → logiciel interne EJ Partners |

---

## ⚠️ Blocage préalable — référentiels manquants

Les documents de référence cités dans la demande sont **introuvables** :

- `198_MODELE_METIER.md`, `199_SPEC_COMPOSANTS_TRANSVERSES.md`, `200`→`226`,
  `227_REFERENTIEL_ARCHITECTURE.md`, `228_REFERENTIEL_DEVELOPPEMENT.md`.

Vérifications effectuées (toutes négatives) :

- Absents de la branche courante et de `origin/main`.
- Absents de **tout l'historique git** (`git log --all --name-only`).
- Absents de Google Drive sous ces noms (recherche titre + plein texte).
- Les docs présentes dans le repo suivent une autre numérotation (000→100, 900).

**Conséquence** : la section « comparaison ligne à ligne avec les référentiels »
(point 3 de la demande) ne peut pas être produite honnêtement — je ne vais pas
inventer des écarts contre des specs que je n'ai jamais lues.

Cet audit s'appuie donc sur :
- le **code réel** (points 1, 2, 4) ;
- les **docs métier présentes** dans le repo (`001_VISION`, `050_ROLES`,
  `66_CRM_METIER`, `87_WORKFLOWS`, `900_MVP_V1`, `060_BASE_DE_DONNEES`) ;
- les **principes impératifs** de la demande (vocabulaire EJ Partners, fin du
  SaaS multi-cabinets, une capacité = un moteur, pas de logique métier en UI,
  sécurité + audit, fiche client pivot, notion de Projet conservée).

👉 **Décision (2026-07-09)** : les référentiels 198-228 seront **committés dans
`docs/`**. Dès réception, je rejoue la section 2 en écart ligne à ligne.

**Décisions métier prises le 2026-07-09 :**
- **IA** : les **deux moteurs (OpenAI + Gemini) sont conservés** → à documenter
  (qui fait quoi), pas à unifier.
- **Rôles externes** : `mandataire` et `prescripteur` sont **conservés** (le cabinet
  anime un réseau) → pas de suppression ; seul le **vocabulaire** est à aligner EJ Partners.

---

## 1. État actuel — architecture réelle

### 1.1 Stack

- **Next.js 16** (App Router, React 19), build **webpack**.
- **Supabase** (Postgres + Auth SSR `@supabase/ssr`, Storage, Edge Functions).
- **TailwindCSS 4**, `lucide-react`, `recharts`.
- **IA** : SDK `openai` + Edge Function `ai-agent-gemini` (Gemini) → **deux moteurs IA** cohabitent.
- Intégrations : **Google Workspace / Drive / Gmail** (OAuth), envoi email.

### 1.2 Structure des dossiers

```
src/app/            → routing App Router
  (public)          → site vitrine (a-propos, expertises, contact, guides…)
  admin/            → CRM interne cabinet (le cœur)
  client/           → espace client
  mandataire/       → espace mandataire externe  ⚠️ héritage SaaS
  prescripteur/     → espace prescripteur externe ⚠️ héritage SaaS
  api/              → 16 routes (IA, Google, email, drive, contrats…)
  actions/          → 2 server actions publiques (contact, recueil besoins)
src/lib/actions/    → 13 fichiers de server actions (le vrai "domaine")
src/lib/            → services (supabase, google, email, compliance, anonymisation…)
src/components/     → 40 composants (dont formulaires + widgets IA)
src/data/cabinet.js → config cabinet (branding = "EJ Partners Assurances")
src/pages/          → 1 résidu .astro  ⚠️ à supprimer
supabase/           → schema.sql + 21 migrations + 5 edge functions
```

### 1.3 Pages existantes (≈50)

- **Public** : accueil, ~12 pages d'expertise (coparentalité, familles LGBT/recomposées,
  prévoyance, emprunteur, assurance-vie…), contact, guides, conseils-actus, mentions/RGPD, simulateur.
- **Admin (CRM)** : dashboard, clients (+fiche 360 + création/édition), partenaires,
  finance (avenants, bordereaux, encaissements, exports, facturation, reversements),
  conformité (+ LCB-FT), lettres de mission, IA (anonymisation, copilot, cross-selling,
  rédaction, résumé), stats (commercial, portefeuille, production), vente/GED
  (import-drive, sync), workflows (trottinette), family-protection-os (+recueil), emprunteur.
- **Espaces** : client (diagnostic familial, lettre de mission), mandataire, prescripteur, auth.

### 1.4 Modèle de données Supabase (~50 tables)

Noyau : `profiles`, `users`, `clients`, `projects`, `contracts`, `documents`,
`interactions`, `messages`, `audit_logs`, `needs_assessments`, `related_persons` / `family_members`.
Conformité : `documents_conformite`, `alertes_conformite`, `dda_reports`, `lettres_mission`,
`client_consents`, `journaux_anonymisation`, `risk_findings`.
Finance : `commissions`, `invoices`, `reversements`, `apporteurs`.
Partenaires/Drive : `partner_companies`, `partner_distributed_contracts`,
`drive_synced_documents`, `drive_import_candidates`, `drive_nomenclature_rules`, `drive_sync_events`.
Verticaux : `emprunteur_*`, `scooter_insurance_needs`, `borrower_*`, `project_workflow_steps`.

Enum de rôles : `app_role = ('admin','courtier','client','mandataire','prescripteur')`.

### 1.5 Sécurité & audit

- **RLS** : 37 policies dans `schema.sql` — socle présent.
- **Journal d'audit** : table `audit_logs` **écrite par seulement 5 fichiers d'actions sur 13**.

---

## 2. Cartographie des capacités (point 2 de la demande)

| Capacité | État | Détail |
|---|---|---|
| **Clients** | ✅ Solide | Table + actions + fiche 360 (plusieurs variantes). **Pivot bien présent.** |
| **Prospects** | 🟡 Partiel | Pas de table `prospects` dédiée ; gérés via `referrals` + contacts. Nav `/admin/crm/contacts` **sans page**. |
| **Projets** | ✅ Solide | Table `projects` + workflow 5 statuts + `projects.ts` (le plus gros fichier). Notion **conservée**. |
| **Contrats** | ✅ Présent | Table + actions. **Aucun audit log.** |
| **Activités / Interactions** | 🟡 Partiel | Table `interactions` + form. **Aucun audit log.** |
| **Documents / GED** | ✅ Riche | `documents` + Drive sync bidirectionnel + nomenclature + import. Complexe. |
| **Agenda / RDV** | ❌ Manquant | Lien nav `/admin/crm/agenda` → **404**. Aucune table, aucune page. |
| **Messagerie** | 🟡 Partiel | Table `messages` + Gmail. Pas d'UI messagerie interne aboutie. |
| **Notifications** | ❌ Manquant | Lien nav `/admin/workflows/notifications` → **404**. Pas de moteur. |
| **Workflows** | 🟡 Partiel | Moteur `project-workflow.ts` OK, mais UI = 1 seul vertical (« trottinette »). Statuts/automatisations/templates → **404**. |
| **Imports** | ✅ Présent | Import Drive + import commissions. |
| **Exports** | 🟡 Partiel | Page finance/exports OK ; `/admin/stats/exports` → **404**. |
| **Reporting** | 🟡 Partiel | Stats (commercial/portefeuille/production) OK ; nav promet performance/clients/finance → **404**. |
| **KPI** | 🟡 Partiel | `cabinet_stats` + `stats.ts` (gros). Pas de moteur KPI unifié. |
| **Paramétrage** | ❌ Manquant | Pas de module settings ; config figée dans `cabinet.js`. |
| **Sécurité** | 🟡 Partiel | RLS + rôles OK ; à réauditer après suppression des rôles externes. |
| **Journal d'audit** | 🟡 Partiel | Table OK mais **couverture ~40 %** ; page `/admin/conformite/audit` → **404**. |

**Écart structurel majeur** : la navigation (`app-shell.tsx`) annonce **~24 modules
qui n'ont pas de page** (404). L'UI est une *carte cible* ; l'implémentation est partielle.

---

## 3. Écarts avec les principes imposés (point 4)

### ✅ Déjà conforme
- Branding interface = **« EJ Partners Assurances »** (header, shell, `cabinet.js`).
- **Aucune trace de « Nexumia »** dans le code ou les docs.
- **Fiche client pivot** respectée ; **notion de Projet** conservée ; terme « Dossier » non réintroduit.
- Server actions correctement marquées `"use server"` → l'essentiel du domaine est côté serveur.
- Socle sécurité (RLS) + table d'audit présents.

### 🔧 Existe mais à refactorer
- **Deux moteurs IA** (OpenAI *et* Gemini) → **conservés (décision validée)**.
  Action : *documenter* le partage des rôles (OpenAI = ? / Gemini = ?) plutôt que d'unifier.
- **5 variantes de fiche client** (`client-file.tsx`, `client-file-360.tsx`,
  `client-file-360-live.tsx`, `client-directory.tsx`, `client-directory-360.tsx`) → redondance.
- **Logique métier en UI** : `components/forms/client-form.tsx` et `economies-counter.tsx`
  accèdent directement à Supabase → viole « aucune logique métier dans l'UI ».
- **Couverture audit incomplète** (contrats, documents, finance, interactions, lettres… non journalisés).
- **Stats/finance** = gros fichiers d'actions, pas de séparation moteur/rendu nette.

### ❌ Manquant (par rapport à la carte de nav et au CRM cible doc 66)
- Agenda/RDV, Tâches, Notifications, Paramétrage, page Journal d'audit,
  pipeline commercial, leads, devis, RGPD, DDA (pages), sinistres, réclamations.

### ♻️ Redondant / à nettoyer
- `src/pages/confidentialite.astro` (résidu Astro dans un projet Next).
- Doublons de fiches/annuaires clients.
- Verticaux figés en dur (« trottinette », « scooter », « emprunteur ») → à généraliser
  en workflows paramétrables plutôt qu'en pages/tables dédiées.

### 🧹 Rôles multi-acteurs — conservés, à requalifier en vocabulaire
- Rôles `courtier`, `mandataire`, `prescripteur` + espaces `/mandataire` et `/prescripteur`.
- **Décision validée** : le cabinet anime un réseau → **on conserve** ces rôles et espaces.
- Reste à faire (non destructif) : aligner le **vocabulaire d'interface** sur EJ Partners
  (ex. `courtier` interne → « conseiller »/« collaborateur » à l'affichage, sans toucher l'enum ni les RLS).
- ⚠️ **Ne pas casser** : ces rôles sont câblés dans les RLS et les FK — tout renommage
  reste **cosmétique côté UI** tant que les référentiels ne demandent pas une refonte du modèle.

---

## 4. Priorités de refactor & plan V1 recommandé

**Principe : stabiliser et clarifier avant d'ajouter. Zéro régression.**

**Lot 0 — Cadrage**
- **En attente** : réception des référentiels 198-228 → rejeu de la section 2 en écart précis.
- ✅ Décisions prises : deux moteurs IA conservés ; rôles mandataire/prescripteur conservés.

**Lot 1 — Cohérence & vérité de l'UI** (faible risque)
- Faire correspondre la navigation aux pages réelles (masquer/étiqueter « à venir »
  les ~24 liens 404) → l'app cesse de « mentir ».
- Supprimer le résidu `src/pages/*.astro`.
- Uniformiser le branding en **« EJ Partners »** (README, textes admin).

**Lot 2 — Consolidation des socles transverses** (risque moyen)
- **Un** service d'audit unique + le brancher sur les 8 actions non couvertes.
- **Une** fiche client 360 canonique (fusion des 5 variantes).
- Sortir les accès Supabase des composants → passer par les server actions.

**Lot 3 — Capacités manquantes V1** (selon doc 900_MVP_V1)
- Agenda/RDV, Tâches, Notifications, page Journal d'audit, module Paramétrage.

**Lot 4 — Généralisation** (après stabilisation)
- Remplacer les verticaux en dur par des workflows paramétrables.
- Documenter le partage OpenAI / Gemini (les deux étant conservés).

---

## 5. Premières actions concrètes proposées

1. **Committer les référentiels 198-228** → je livre l'écart ligne à ligne (attendu).
2. **Quick win sans risque (Lot 1)** : audit navigation ↔ pages + suppression du résidu Astro
   + alignement branding « EJ Partners », sur la branche `claude/repo-sync-7rrtyt`,
   testable par simple parcours des menus admin.
3. **Cartographie IA** : documenter qui d'OpenAI / Gemini porte quelle capacité (les deux conservés).

> Aucune modification n'a été effectuée : ce document est un rapport d'audit.
> Toute évolution suivra un plan validé (fichiers impactés, risques, tests) avant code.
