# AUDIT CRM — EJ Assurances
*Date : 29 juin 2026*

---

## 1. MODULES EXISTANTS

| Module | État | Détail |
|--------|------|--------|
| Fiches clients 360° | ✅ Actif | Liste, création, modification, fiche détaillée 5 onglets |
| Contrats | ✅ Actif | Ajout/modif depuis la fiche client |
| Interactions | ✅ Actif | Timeline complète (appel, email, RDV, note…) |
| Personnes liées | ✅ Actif | Conjoint, enfant, co-parent, parent social |
| Tags clients | ✅ Actif | Prédéfinis + custom |
| Finance / Bordereaux | ✅ Actif | Import, matching, statuts, alertes |
| Finance / Facturation | ✅ Actif | Numérotation auto, statuts, TVA |
| Finance / Reversements | ✅ Actif | Apporteurs, mandataires, IBAN |
| Finance / Exports | ✅ Actif | FEC, CSV |
| Stats / Dashboard | ✅ Actif | CA, commissions, évolution 12 mois |
| Stats / Production | ✅ Actif | Par assureur et produit |
| Stats / Commercial | ✅ Actif | Tunnel de conversion |
| Stats / Portefeuille | ✅ Actif | Rétention, renouvellements |
| IA / Copilot IaGO | ✅ Actif | Chat GPT-4o supervisé |
| IA / Résumé client | ✅ Actif | Synthèse 5 points avant RDV |
| Pipeline commercial | 🔲 Planifié | — |
| GED | 🔲 Planifié | — |
| Conformité DDA/ACPR/RGPD | 🔲 Planifié | — |
| Workflows / Automatisations | 🔲 Planifié | — |
| Agenda / Tâches | 🔲 Planifié | — |
| IA / Cross-selling | 🔲 Planifié | — |

---

## 2. ARCHITECTURE TECHNIQUE

### Stack
- **Framework** : Next.js 16 (App Router, Server Components)
- **Base de données** : Supabase PostgreSQL avec RLS (Row Level Security)
- **Auth** : Supabase Auth + `requireRole()` middleware (rôles : admin, courtier)
- **IA** : OpenAI GPT-4o (Copilot supervisé)
- **Email** : Resend (SMTP custom configuré)
- **Styling** : CSS custom properties + design tokens
- **Storage** : Supabase Storage (bucket `prospect-documents`)

### Tables Supabase

| Table | Rôle |
|-------|------|
| `clients` | Fiche centrale avec contact_type, statut, situation familiale |
| `client_tags` | Tags multi-valeurs par client |
| `related_persons` | Personnes liées (conjoint, enfant, co-parent…) |
| `contracts` | Contrats avec prime, taux, commission calculée |
| `interactions` | Timeline (appel, email, RDV, visio, note, document, SMS) |
| `commissions` | Bordereaux assureurs avec matching et statuts |
| `invoices` | Factures honoraires avec numérotation auto |
| `apporteurs` | Apporteurs d'affaires et mandataires |
| `reversements` | Reversements calculés par période |
| `cabinet_stats` | Compteur public économies emprunteur |
| `emprunteur_dossiers` | Prospects tunnel public (non connecté au CRM) |
| `emprunteur_credits` | Crédits liés aux dossiers emprunteur |
| `emprunteur_documents` | Documents uploadés par les prospects |

### Patterns techniques
- `AdminModulePage` : composant wrapper réutilisable pour tous les hubs
- `ClientFile360Live` : fiche client dynamique avec 5 onglets
- Server Actions pour toutes les mutations (createClient, updateContract…)
- Colonnes calculées Supabase (montant_commission_annuel, montant_ttc, ecart)
- Mock data fallback si Supabase indisponible

---

## 3. DÉTAIL DES MODULES ACTIFS

### Fiches Clients 360° (`/admin/clients`)

**Liste clients**
- Cards avec avatar (initiales), nom, contexte familial, email, téléphone
- Tags affichés (max 2 + badge "+N")
- Statut client et nombre de contrats actifs
- Filtres : recherche texte, statut (prospect/en_cours/actif/inactif), type contact
- Onglets par type : Tous / Prospects / Clients / Partenaires / Prescripteurs
- KPIs : Total, Actifs, Prospects, Partenaires + Prescripteurs

**Fiche détaillée 5 onglets**
1. **Synthèse** — Identité, adresse, situation familiale, contexte, notes, score protection
2. **Interactions** — Timeline chronologique avec formulaire inline d'ajout
3. **Contrats** — Liste avec statut, assureur, type, prime, commission, dates
4. **Famille** — Personnes liées avec types de relation
5. **Notes** — Zone libre interne

**Formulaire client**
- Identité : nom, date naissance, situation familiale, contexte familial
- Contact : email, téléphone, adresse, code postal, ville
- CRM : type contact, statut dossier, source acquisition
- Tags : 20+ prédéfinis + création custom
- Notes libres

### Finance (`/admin/finance`)

**Bordereaux de commissions**
- Import Excel/CSV/PDF des assureurs
- Matching automatique client + contrat
- Statuts : Match ✅ / Impayé 🔴 / Taux erreur 🟠 / Résilié ⚫ / Inconnu 🔵
- Dashboard alertes impayés + total commissions du mois

**Facturation honoraires**
- Numérotation automatique : FAC-{YYYY}-{NNNN}
- Calcul TTC automatique selon taux TVA
- Statuts : Brouillon → Envoyée → Encaissée / En retard / Annulée

**Reversements apporteurs**
- Gestion apporteurs et mandataires (taux, IBAN, contact)
- Calcul automatique par période
- Statuts : Calculé → Validé → Payé

**Exports comptables**
- Format FEC (Fichier Écritures Comptables) pour expert-comptable
- Export CSV pour import logiciel comptable

### Stats & Analyses (`/admin/stats`)

- **Dashboard** : CA, commissions, taux transformation, évolution 12 mois
- **Production** : par assureur (part %) et par produit
- **Commercial** : tunnel Leads → Contacts → Devis → Contrats signés
- **Portefeuille** : rétention, renouvellements 30j/90j, clients sans interaction

### IA — IaGO (`/admin/ia`)

**Copilot** (actif)
- Chat GPT-4o avec contexte CRM en temps réel
- Analyse clients, contrats, interactions
- Actions supervisées : email, création document, modif CRM (confirmation requise)

**Résumé avant RDV** (actif)
- Sélection client + génération synthèse 5 points en 30 secondes
- Identité, situation contractuelle, historique, gaps, actions recommandées

---

## 4. POINTS FORTS

- **Fiche 360° adaptée aux familles modernes** : personnes liées, contexte familial, co-parentalité — différenciant fort
- **Finance complète** : bordereaux, facturation, reversements, exports FEC — outil métier sérieux
- **IA opérationnelle** : Copilot + résumé avant RDV actifs et utilisables immédiatement
- **Architecture solide** : server actions, RLS, composants réutilisables
- **Segmentation contact_type** : prospect/client/partenaire/prescripteur bien en place
- **Compteur public** : économies emprunteur visible sur le site public, se met à jour automatiquement

---

## 5. INCOHÉRENCES IDENTIFIÉES

| # | Problème | Impact |
|---|----------|--------|
| 1 | Double structure reset password (`/connexion/nouveau-mot-de-passe/` ET `/reinitialiser-mot-de-passe/`) | Doublon à nettoyer |
| 2 | Tunnel emprunteur déconnecté du CRM | Les prospects du site public n'apparaissent pas dans `/admin/clients` |
| 3 | Pipeline absent | Les leads du formulaire contact n'ont pas de suivi CRM |
| 4 | Pas d'agenda ni de tâches | Relances entièrement manuelles, risque d'oubli |
| 5 | Conformité DDA absente | Obligatoire réglementairement pour un cabinet courtier |
| 6 | GED sans interface admin | Documents dans Supabase Storage mais inaccessibles depuis le CRM |

---

## 6. PLAN D'ÉVOLUTION — 6 SPRINTS

### Sprint 1 — Connexion tunnel emprunteur → CRM
*Priorité : Haute / Durée estimée : 1-2 jours*

- Faire remonter les `emprunteur_dossiers` dans `/admin/clients` comme prospects
- Conversion automatique en fiche client avec tag "Assurance emprunteur"
- Lien entre dossier emprunteur et fiche client

### Sprint 2 — Agenda & Tâches
*Priorité : Haute / Durée estimée : 3-4 jours*

- Module `/admin/agenda` : vue calendrier avec RDV et relances
- Module `/admin/taches` : to-do avec assignation et échéances
- Alertes renouvellements depuis les stats portefeuille

### Sprint 3 — Conformité DDA
*Priorité : Réglementaire / Durée estimée : 3-5 jours*

- Recueil des besoins structuré (formulaire FPOS existant à connecter)
- Devoir de conseil traçable par contrat
- Journal d'audit (qui a modifié quoi et quand)
- Classeurs ACPR par client

### Sprint 4 — Pipeline commercial
*Priorité : Business / Durée estimée : 2-3 jours*

- Kanban prospects : Nouveau → Qualifié → Devis → Signé → Perdu
- Connexion leads formulaire public → CRM
- Probabilité de closing par étape

### Sprint 5 — GED & Documents
*Priorité : Expérience client / Durée estimée : 2-3 jours*

- Interface upload et accès documents par client dans la fiche 360°
- Connexion bucket Supabase Storage existant
- Catégorisation (CNI, offre de prêt, tableau d'amortissement, contrat…)

### Sprint 6 — IA Cross-selling & Automatisations
*Priorité : Croissance / Durée estimée : 4-5 jours*

- Scan portefeuille pour opportunités multi-équipement
- Workflows automatiques (relance J+30, alerte renouvellement…)
- Scoring client pour priorisation commercial

---

*Document généré le 29 juin 2026 — EJ Assurances*
