# 301 — Audit des écarts Code ↔ Référentiels (198-228)

| **Document** | Comparaison ligne à ligne du code existant avec les référentiels |
| ------------ | ---------------------------------------------------------------- |
| Version      | 1.0 — balayage complet des 29 référentiels                       |
| Statut       | Rapport — **avant tout code**                                    |
| Date         | 2026-07-09                                                       |
| Base         | Branche `claude/repo-sync-7rrtyt` (main synchronisé)             |
| Complète     | `300_AUDIT_EXISTANT_V1.md`                                        |

---

## 0. Méthode & sources

Documents lus **intégralement** : `198_MODELE_METIER`, `199_SPEC_COMPOSANTS_TRANSVERSES`,
`227_REFERENTIEL_ARCHITECTURE`, `228_REFERENTIEL_DEVELOPPEMENT`, `201`, `202`, `203`.
Documents **balayés (structure + règles clés)** : `204`→`226`.
Code : `src/` (pages, server actions, composants) + `supabase/` (schema + 21 migrations).

**Anomalies de la série de référentiels** (signalées, non corrigées, cf. décision) :
- `200` et `212` **manquants** ; `201_SPEC_TABLEAU_DE_BORD` **sans extension `.md`**.
- Doublon thématique : `201_SPEC_TABLEAU_DE_BORD` et `218_SPEC_TABLEAUX_BORD`.
- **Incohérence de nommage dans les référentiels eux-mêmes** : les specs 198-226 disent
  encore « EJ Assurances » ; seuls 227/228 disent « EJ Partners ». La règle impose
  « EJ Partners » → les specs métier devront être réalignées.

---

## 1. Architecture cible (227) vs architecture réelle

Le référentiel 227 impose une architecture **en 7 couches** avec un principe central :
*Interfaces → Orchestrateurs → Moteurs transverses → Gouvernance → Domaine Métier → Infra*.
« Tout est une capacité », « une responsabilité par composant », « les interfaces ne
contiennent aucune logique métier », API/Security/Audit **by design**.

| Couche cible (227) | Réalité du code | Verdict |
|---|---|---|
| **Interfaces** (Web, Mobile, Portail client/partenaire, API) | Next.js App Router : pages admin/client/mandataire/prescripteur | 🟡 Présent mais mélangé avec la logique |
| **Orchestrateurs** (Workflows, IA, Pipelines) | `project-workflow.ts` (moteur workflow embryon) ; IA en routes API | 🟡 Partiel, non isolé |
| **Moteurs transverses** (API, Recherche, Variables, Templates, KPI, Reporting, Notifications, Agenda, Messagerie, Paramétrage, Imports, Exports) | Quasi inexistants en tant que moteurs réutilisables | ❌ Écart majeur |
| **Gouvernance** (Sécurité, Journal d'Audit) | RLS (37 policies) ✓ ; `audit_logs` partiel | 🟡 Socle, non systématique |
| **Domaine Métier** (objets + règles) | Server actions `src/lib/actions/*` | 🟡 Existe, mais pas isolé du transport |
| **Infra applicative / technique** | Supabase, Vercel, Storage | ✅ Conforme |

**Écarts structurants :**
1. **Pas de séparation capacité/moteur.** Le code est organisé en *server actions* par entité
   (`clients.ts`, `contracts.ts`…), pas en capacités métier nommées + moteurs réutilisables.
   → viole Principes 2, 4, 5 et 6 de 227.
2. **Logique métier dans l'UI** : `components/forms/client-form.tsx`, `economies-counter.tsx`
   accèdent directement à Supabase → viole Principe 3 (« les interfaces ne décident jamais »)
   et la règle de dépendances (Interface ne doit jamais appeler la BDD directement).
3. **Pas de Moteur API** exposant les capacités (API First non respecté). Les intégrations
   externes (Google/Gmail/Drive) sont appelées directement depuis `src/lib/google/*`.
4. **Audit non systématique** (cf. §4) → viole « Audit by Design ».
5. **Configuration over Code** non respecté : verticaux figés en dur (« trottinette »,
   « scooter »), pas de Moteur de Paramétrage.

> Note : ce sont des écarts d'**architecture cible**, pas des bugs. Le code actuel est
> fonctionnel ; la mise en conformité 227 est un chantier structurel à mener par étapes
> (principe « ajouter avant de remplacer », 227 ch.7), sans big-bang.

---

## 2. Modèle métier (198) vs schéma Supabase — écarts de fond

| Règle 198 | Schéma réel | Écart |
|---|---|---|
| **Le Prospect est un Client avec statut « Prospect »** (pas un objet distinct) | `clients` **n'a pas de champ statut/cycle de vie** ; les prospects passent par `referrals` (`prospect_full_name`) + `contacts` | 🔴 Non conforme — à unifier sous `clients.status` (Prospect/Actif/Inactif/Archivé) |
| **Un Contrat appartient OBLIGATOIREMENT à un Projet** (« jamais sans Projet ») | `contracts.client_id NOT NULL`, `contracts.project_id` **nullable** | 🔴 Inversion du modèle — le contrat pend au Client, le Projet est optionnel |
| **Le Projet est l'objet central** ; Contrats/Docs/Activités gravitent autour | `projects` existe et est bien doté, mais Documents/Contrats se rattachent aussi directement au Client | 🟡 Partiellement respecté |
| **Produit = objet de 1er rang** (catalogue, éligibilité, distribué par Partenaires) | **Aucune table `products`/catalogue** ; seulement `partner_product_documents` | 🔴 Manquant (spec 205 entière) |
| **Activité = objet central de suivi**, jamais orpheline, avec origine/résultat/objectif | `interactions` existe mais simplifié (pas d'origine/résultat/objectif/dépendances) | 🟡 Embryon vs spec 202 (10 écrans) |
| **Opportunité / pipeline commercial** | **Aucune table** opportunités/pipeline | 🔴 Manquant (spec 209 entière) |
| **Une donnée, un propriétaire unique** (pas de duplication) | Contexte familial dupliqué : `clients.family_context` + `related_persons` + `family_members` ; économies portées par contrat | 🟡 Duplication à rationaliser |
| **Partenaire = organisme externe** (assureur/grossiste/banque) | `partner_companies` riche ✓ | ✅ Conforme |

---

## 3. Composants transverses (199) — 14 composants attendus

Le 199 impose des composants **définis une seule fois** et réutilisés partout.

| Composant 199 | Réalité code | Verdict |
|---|---|---|
| 1. Statuts (unifiés, couleur/icône/historisés) | Statuts éclatés par entité (`project_status`, `contract_status`, workflow) — pas de système commun | ❌ À unifier |
| 2. Priorités (4 niveaux, transverses) | Absent | ❌ Manquant |
| 3. Commentaires (contextualisés, mentions, types) | Absent (pas de table `comments`) | ❌ Manquant |
| 4. Pièces jointes (rattachées, héritage droits, preview) | `documents` couvre partiellement ; pas de PJ génériques sur tout objet | 🟡 Partiel |
| 5. Tags (multi-objets) | `client_tags` **uniquement sur Client** | 🟡 À généraliser |
| 6. Recherche globale | Absent (spec 217 entière) | ❌ Manquant |
| 7. Événements & Notifications | Absent (pas de moteur ; Gmail ≠ notifications in-app) | ❌ Manquant |
| 8. Historique métier (auto, immuable, tout objet) | `audit_logs` partiel (5/13 actions) | 🟡 Partiel |
| 9. Vues / filtres / tris enregistrés | Absent | ❌ Manquant |
| 10. Permissions (catalogue d'actions, héritage, UI adaptative) | RLS Supabase ✓ mais pas de couche permissions applicative unifiée | 🟡 Partiel |
| 11. Export / Import (assistant, mapping, rapport) | Import Drive + import commissions ad hoc ; pas de moteur générique | 🟡 Partiel |
| 12. Archivage & Corbeille (3 états, restauration, dépendances) | `archived_at` sur clients seulement ; pas de corbeille | 🟡 Partiel |
| 13. Favoris | Absent | ❌ Manquant |
| 14. Actions standard (catalogue homogène) | Absent (actions ad hoc par écran) | ❌ Manquant |

**Bilan 199** : ~9/14 composants absents ou très partiels. C'est le **socle transverse**
sur lequel reposent tous les modules → priorité de fondation.

---

## 4. Moteurs transverses (215-226)

| Spec | Moteur | Réalité code | Verdict |
|---|---|---|---|
| 215 | Templates (bibliothèque, variables, versionnement) | `lettres_mission` + `templates/` (dossier docs) ; pas de moteur | 🟡 Embryon |
| 216 | Variables dynamiques | Absent | ❌ |
| 217 | Recherche | Absent | ❌ |
| 218 | Tableaux de bord (widgets configurables) | Dashboards stats figés (`stats/*`) | 🟡 Partiel |
| 219 | Indicateurs / KPI | `cabinet_stats` + `stats.ts` (calculs en dur) | 🟡 Partiel |
| 220 | Reporting (conception, planification) | Exports finance ad hoc | 🟡 Partiel |
| 221 | Exports (modèles, planification) | `finance/exports` + `stats` ; pas de moteur | 🟡 Partiel |
| 222 | Imports (mapping, validation, rapport) | Import Drive/commissions ad hoc | 🟡 Partiel |
| 223 | Moteur API (exposition des capacités) | Routes Next `api/*` par usage ; pas d'API de capacités | ❌ |
| 224 | Paramétrage (Configuration over Code) | Absent ; config figée `data/cabinet.js` | ❌ |
| 225 | Sécurité (identités, sessions, incidents) | Supabase Auth + RLS ; pas de centre de sécurité | 🟡 Socle |
| 226 | Journal d'Audit (centre, corrélation, intégrité) | `audit_logs` table ; **pas d'UI**, couverture 5/13 | 🟡 Partiel |

---

## 5. Modules métier (201-214)

| Spec | Module | Réalité code | Verdict |
|---|---|---|---|
| 201/218 | Tableau de bord (widgets perso, briefing IA) | `/admin` dashboard statique | 🟡 Loin de la cible widgets |
| 202 | Activités (10 écrans : origine, résultat, objectif, dépendances, temps) | `interactions` simple + `interaction-form` | 🟡 Embryon |
| 203 | Client (identité, coordonnées multiples, famille, consentements, 360°, espace) | `clients` + fiche 360 (**5 variantes**) + `client_consents` | 🟡 Riche mais redondant, sans statut cycle de vie |
| 204 | Projet (parcours, besoins, solutions, préconisation, décision, clôture) | `projects` + workflow 5 statuts | 🟢 Le plus proche de la cible |
| 205 | Produits (catalogue, éligibilité, comparaison) | Absent | ❌ Manquant |
| 206 | Contrats (garanties, échéances, avenants, sinistres) | `contracts` basique ; avenants finance ; **pas de sinistres** | 🟡 Partiel |
| 207 | Documents (génération, signature, versions, diffusion, conservation) | `documents` + Drive sync + `ia_document_analyses` | 🟢 Riche (mais signature/versions à confirmer) |
| 208 | Partenaires (conventions, produits distribués, performance, 360°) | `partner_companies` + pages partenaires | 🟢 Proche cible |
| 209 | Opportunités / pipeline commercial | Absent (nav `/admin/vente/pipeline` → 404) | ❌ Manquant |
| 210 | Recueil des besoins (questionnaire, contrôles, validation, génération) | `needs_assessments` + `needs-assessment-form` + FPOS recueil | 🟢 Présent |
| 211 | Workflows (triggers, conditions, actions, simulation, historique) | `project-workflow.ts` + 1 vertical « trottinette » | 🟡 Moteur embryon, non configurable |
| 213 | Agenda (événements, participants, conflits, synchro, rappels) | Absent (nav `/admin/crm/agenda` → 404) ; Google Calendar non branché CRM | ❌ Manquant |
| 214 | Messagerie (boîte, conversations, synchro, historique) | Gmail lecture (`gmail-threads`) ; pas de messagerie interne | 🟡 Partiel |

**Signal fort** : chaque spec attend une **Vue 360°** + **Statistiques** + **Historique** par module.
Aujourd'hui seuls Client/Projet/Partenaire s'en approchent.

---

## 6. Synthèse des écarts prioritaires

**🔴 Bloquants modèle — DÉCISIONS PRISES (2026-07-09)**
1. ✅ **VALIDÉ** — `clients.status` (cycle de vie Prospect→Actif→Inactif→Archivé) : on **unifie
   le Prospect dans le Client** (conforme 198). La table `referrals` sera migrée vers ce statut.
2. ✅ **VALIDÉ** — **Contrat → Projet obligatoire** (198) : on rend `contracts.project_id`
   **requis**, avec création d'un **projet implicite** rétro-généré pour les contrats orphelins.
3. À arbitrer (priorité) : objets manquants de 1er rang **Produits (205)**, **Opportunités (209)**,
   **Activités enrichies (202)**.

**🟠 Fondations transverses (bénéficient à tous les modules)**
4. Socle 199 : Statuts, Priorités, Commentaires, Tags génériques, Favoris, Vues, Actions standard.
5. **Journal d'audit systématique** (226) : brancher les 8 actions non couvertes + UI.
6. **Moteur de Paramétrage** (224) pour sortir les valeurs figées.

**🟡 Dette & cohérence (faible risque)**
7. Nav ↔ pages (24 liens 404), résidu Astro, doublons fiches client, logique Supabase en UI.
8. Réalignement vocabulaire « EJ Partners » (interface + specs 198-226).

---

## 7. Plan V1 recommandé (conforme 227 ch.7 « ajouter avant remplacer », zéro régression)

**Lot 1 — Vérité & cohérence de l'UI** *(risque nul, aucun changement de données)*
- Nav ↔ pages réelles (masquer/étiqueter « à venir »), suppression résidu Astro,
  branding « EJ Partners » homogène. Test : parcours des menus admin.

**Lot 2 — Socle transverse minimal (199)** *(fondation)*
- Moteur **Statuts + Priorités** unifié ; **Commentaires** génériques ; **Tags** généralisés ;
  **service d'Audit** unique branché partout (226). Test : appliquer sur 1 module pilote (Projet).

**Lot 3 — Alignement modèle métier (198)** *(migrations préparées, réversibles)*
- `clients.status` + migration prospects→clients ; `contracts.project_id` requis
  (avec projet implicite rétro-créé). Test : intégrité des données + RLS.

**Lot 4 — Capacités manquantes V1**
- **Activités enrichies (202)**, **Agenda (213)**, **Opportunités/pipeline (209)**,
  page **Journal d'audit (226)**, **Paramétrage (224)** de base.

**Lot 5 — Moteurs & généralisation**
- **Produits (205)**, Templates/Variables (215/216), Recherche globale (217),
  Moteur API (223), Reporting/KPI (219/220), workflows configurables (211).

---

## 8. Premières actions concrètes

**État de décision (2026-07-09)** — phase : **reste en audit, aucun code lancé.**
- ✅ Statut Client unifié (`clients.status`).
- ✅ Contrat → Projet obligatoire (projet implicite pour l'existant).
- ⏳ Reste à arbitrer : priorité Produits (205) / Opportunités (209) / Activités enrichies (202).

Quand le feu vert « code » sera donné :
1. **Lot 1** (risque nul) mobilisable immédiatement sur `claude/repo-sync-7rrtyt`.
2. **Module pilote** recommandé pour le socle transverse : **Projet (204)**, déjà le plus
   proche de la cible, comme banc d'essai des composants 199 + audit systématique.
3. **Lot 3** (migrations modèle) préparé en amont : scripts réversibles + test d'intégrité RLS
   avant exécution, conformément à 228 ch.9 (migrations atomiques, testées, tracées).

> Aucune modification de code applicatif n'a été réalisée : ce document est un rapport d'audit.
> Chaque lot fera l'objet d'un plan détaillé (fichiers impactés, migrations, risques, tests)
> soumis avant implémentation.
