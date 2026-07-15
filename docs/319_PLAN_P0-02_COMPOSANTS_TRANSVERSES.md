# 319 — Plan de lot · P0-02 Composants transverses

| **Lot** | P0-02 — Composants transverses |
| ------- | ------------------------------ |
| Statut  | 📋 **Plan de conception — aucun développement** (attente validation) |
| Priorité | P0 (Bloquant) — socle transverse |
| Date    | 2026-07-15 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |
| Référentiels | 227 (architecture), 228 (développement), 199 (composants transverses), 217 (recherche), 226 (journal d'audit), 198 (modèle métier) |
| Processus | 000_MASTER_PROMPT — Étape 3 « plan détaillé », **arrêt avant Étape 5 (développement)** |

> Ce document est un **plan**. Il ne contient aucun code, aucune migration, aucune modification
> applicative. Conformément au 000, le développement ne commence **qu'après validation**.

---

## 1. Objectif du lot (rappel backlog 229)
Construire les **composants réutilisables par tous les modules** — définis une seule fois (199) et
partagés (Clients, Projets, Activités, Documents, Contrats, Partenaires…). Critères backlog : chaque
composant doit être **indépendant, sécurisé, audité, réutilisable**.

**Périmètre P0-02 (9 composants ciblés par le backlog)** : Commentaires, Favoris, Tags, Priorités,
Historique, Pièces jointes, Vues enregistrées, Recherche globale, Notifications.

Les 5 autres composants du 199 (Statuts, Permissions, Export/Import, Archivage/Corbeille, Actions
standard) **ne sont pas** dans P0-02 : Statuts relève de P1-01/P1-02 (modèle), les autres de lots
ultérieurs. Ils sont hors périmètre ici (notés en Recommandations).

## 2. Analyse de l'existant (Étape 1)
Source : audit 300/301 + relecture code (`supabase/schema.sql`, migrations, `src/lib/actions/*`).

| Composant (199) | État réel dans le code | Verdict |
|---|---|---|
| **Historique** (8) | Table `public.audit_logs` (`actor_id, action, target_table, target_id, metadata, created_at`) — **écrite par 5 fichiers d'actions sur 13**, **aucune UI**, pas de timeline par objet | 🟡 Socle partiel |
| **Pièces jointes** (4) | `public.documents` + centre documentaire + Drive — **couplé au domaine documentaire**, pas de PJ génériques sur n'importe quel objet (ni sur un commentaire) | 🟡 Partiel |
| **Tags** (5) | `public.client_tags` (`client_id, tag`) — **uniquement Client**, non polymorphe, pas de couleur ni cycle de vie | 🟡 À généraliser |
| **Priorités** (2) | **Absent** — aucune enum ni colonne priorité transverse | ❌ Manquant |
| **Commentaires** (3) | **Absent** — pas de table `comments` ; `interactions` (notes d'activité liées Client/Contrat) en est le plus proche mais **≠ commentaire polymorphe** (pas de mentions, pas de types 199, lié uniquement Client) | ❌ Manquant |
| **Notifications** (7) | **Absent** — lien nav `/admin/workflows/notifications` en 404 (masqué P0-01) ; Gmail ≠ notifications in-app ; pas de table events/notifications | ❌ Manquant |
| **Vues enregistrées** (9) | **Absent** — filtres via `searchParams` GET, non persistés | ❌ Manquant |
| **Recherche globale** (6) | **Absent** — recherche par liste/`searchParams` locale ; pas de point d'entrée unique multi-objets (spec 217 entière à couvrir) | ❌ Manquant |
| **Favoris** (13) | **Absent** | ❌ Manquant |

**Briques réutilisables déjà présentes** (à capitaliser, ne pas réinventer) :
- Convention **polymorphe** `(target_table, target_id)` déjà utilisée par `audit_logs`.
- **RLS** Supabase (37 policies) + helpers `app_private.current_user_role()`, `app_private.is_staff()`.
- Pattern **Server Actions** (`src/lib/actions/*`) + `requireRole` / `getAccessibleClients` (gardes).
- Design System **DES-001** (`bo-*`) pour toutes les surfaces UI des nouveaux composants.

## 3. Écarts vs référentiels (Étape 2)
- **199** : 9/9 composants du périmètre absents ou partiels → c'est bien un **socle de fondation**.
- **227** : ces composants sont des **Moteurs transverses (Couche 3)** — aujourd'hui « quasi inexistants
  en tant que moteurs réutilisables » (301). Ils doivent respecter : *une responsabilité par moteur*,
  *API First*, *Security by Design*, *Audit by Design*, *interfaces sans logique métier*.
- **226** : le Journal d'Audit doit couvrir **tous** les objets/actions et disposer d'une **UI centre** —
  actuellement 5/13, pas d'UI.
- **217** : recherche globale + résultats groupés + recherche avancée + recherches enregistrées — 0 %.

## 4. Conception cible (Étape 3) — architecture 227

### 4.1 Principe directeur : le patron polymorphe transverse
Tous ces composants « s'accrochent » à n'importe quel objet métier. On **standardise** le couple
`(target_table, target_id)` — déjà posé par `audit_logs` — comme **contrat d'attache** commun. Chaque
moteur transverse hérite ainsi automatiquement des **droits de l'objet porteur** (199 : « une PJ hérite
des droits de l'objet ; un objet inaccessible n'apparaît jamais »).

Conséquence sécurité : la RLS de chaque table transverse s'exprime via une **fonction d'autorisation
centralisée** `peut_voir(target_table, target_id)` (à concevoir) qui délègue aux règles de l'objet
porteur. Cela évite de dupliquer la logique d'accès dans 9 moteurs (Security by Design + DRY 227).

### 4.2 Les 9 moteurs — une responsabilité chacun (Couche 3)
Chaque moteur = un **service applicatif** (`src/lib/engines/<moteur>.ts`) + tables dédiées + Server
Actions + composants UI `bo-*`. Aucune logique métier dans l'UI (227 principe n°3).

| Moteur | Responsabilité unique | Objets porteurs (v1) | Écrit dans l'audit ? |
|---|---|---|---|
| **Historique/Audit** | Tracer et restituer « que s'est-il passé » | tous | — (c'est le registre) |
| **Tags** | Classer librement (étiquettes polymorphes) | Client, Projet, Contrat, Document, Partenaire | oui |
| **Priorités** | Indiquer le niveau de traitement (4 niveaux) | Activité/Projet/Contrat (objets « à traiter ») | oui |
| **Commentaires** | Échange contextualisé + mentions | Client, Projet, Contrat, Document, Activité | oui |
| **Pièces jointes** | Rattacher un fichier support à un objet | tous + Commentaire | oui |
| **Notifications** | Événement → message utilisateur (in-app) | déclenché par les autres moteurs | — |
| **Vues enregistrées** | Mémoriser filtres/tris/colonnes d'une liste | listes (Clients, Projets, Contrats…) | oui (create/share/delete) |
| **Recherche globale** | Point d'entrée unique multi-objets, filtré RLS | Client, Projet, Contrat, Document, Partenaire, Tag, Commentaire | non (lecture) |
| **Favoris** | Raccourci **personnel** vers un objet | tous | non (perso) |

### 4.3 Formes de données proposées (conception, non figées)
*Descriptif de conception — les DDL exactes seront produites au développement de chaque sous-lot.*

- **Historique** : conserver `audit_logs` tel quel ; ajouter un **service d'audit unique** que **les
  13 fichiers d'actions** appellent (création/modif/statut/affectation/archivage/PJ/signature…), +
  vues « timeline par objet » et « centre d'audit » (226). Immuable (aucun update/delete).
- **Tags** : `tags` (id, nom, couleur, description, statut actif/archivé) + `taggables`
  (tag_id, target_table, target_id) — migration douce depuis `client_tags`.
- **Priorités** : enum `priorite` (critique/haute/normale/faible) + colonne sur objets « à traiter »
  **ou** table `priorites` polymorphe historisée ; historisation du changement (ancienne/nouvelle).
- **Commentaires** : `comments` (id, target_table, target_id, author_id, type [commentaire/info/
  question/réponse/interne], contenu, parent_id, created_at, updated_at, hidden_at) + `comment_mentions`
  (comment_id, user_id) ; **jamais de delete physique** (masquage/archivage) ; mentions → notification.
- **Pièces jointes** : `attachments` polymorphe (target_table, target_id, nom, type, taille, storage_ref,
  author_id, version) héritant des droits objet ; réutiliser le stockage documentaire existant.
- **Notifications** : `events` (type, source_table, source_id, payload, created_at) + `notifications`
  (user_id, event_id, titre, description, priorité, lien, read_at, archived_at) + préférences par user ;
  centre in-app (canaux email/SMS = évolutions ultérieures, hors v1).
- **Vues enregistrées** : `saved_views` (owner_id, scope [perso/partagée/système], module, nom, config
  jsonb [filtres/tris/colonnes/pagination/mode], is_default).
- **Recherche globale** : index de recherche (Postgres `tsvector`/`pg_trgm`) ou vue matérialisée
  multi-objets, **toujours filtrée RLS** ; opérateur `recherche(q, filtres)` + « recherches
  enregistrées » (réutilise `saved_views` scope=recherche).
- **Favoris** : `favorites` (user_id, target_table, target_id, position) — **personnel**, non audité
  au sens métier.

### 4.4 UI (Couche 1 — sans logique métier)
Composants `bo-*` réutilisables : `bo-comment-thread`, `bo-attach-list`, `bo-tag-picker`,
`bo-priority-badge`, `bo-timeline` (historique), `bo-notif-center`, `bo-saved-view-bar`,
`bo-global-search`, `bo-favorite-toggle`. Intégrés d'abord dans la **fiche Client 360** et la **fiche
Projet** (objets pivots), puis étendus. Réutilisation DES-001 (statuts sémantiques déjà définis).

## 5. Séquencement recommandé en sous-lots (arbitrage gouvernance)
P0-02 est **volumineux** (9 moteurs, BDD + RLS + API + UI + audit pour chaque). Le livrer d'un bloc
serait risqué (régressions, revue difficile). **Recommandation** : le découper en 5 sous-lots ordonnés
par dépendance, chacun suivant le cycle 000 complet (analyse → plan → validation → dev → tests → doc →
rapport). Ce document est le **plan-cadre** ; chaque sous-lot recevra son plan détaillé à son tour.

| Sous-lot | Contenu | Pourquoi ici | Dépend de |
|---|---|---|---|
| **P0-02.A — Socle & Gouvernance** | Patron polymorphe `(target_table,target_id)` + fonction `peut_voir()` + **achèvement Historique/Audit** (13/13 actions + centre 226) | Fondation commune ; *Audit by Design* d'abord | — |
| **P0-02.B — Attributs d'objet** | **Tags** (généralisation `client_tags`) + **Priorités** | Simples, transverses, alimentent tris/filtres/recherche | A |
| **P0-02.C — Collaboration** | **Commentaires** (+ mentions) + **Pièces jointes** génériques | Cœur collaboratif ; les mentions ont besoin des notifications | A (audit), amorce D |
| **P0-02.D — Événements & Notifications** | Moteur `events` → **Notifications** in-app + centre + préférences | Consomme les événements historisés (A) et les mentions (C) | A, C |
| **P0-02.E — Découverte** | **Recherche globale** (217) + **Vues enregistrées** + **Favoris** | Utilise tags/priorités (B) comme filtres ; transverse à tout | A, B |

**Premier sous-lot à développer : P0-02.A** (le plan détaillé de A sera fourni et validé avant tout code).

## 6. Base de données / API / Sécurité (principes transverses)
- **BDD** : migrations additives, `if not exists`, aucune rupture ; jamais de delete physique pour les
  objets à traçabilité (masquage/archivage). Migration **douce** `client_tags → tags/taggables`.
- **API** (API First) : chaque moteur expose des Server Actions typées ; l'UI ne porte aucune règle.
- **Sécurité** (Security by Design) : RLS sur chaque table transverse via `peut_voir()` héritant de
  l'objet porteur ; aucune donnée hors périmètre de droits ne remonte (recherche incluse).
- **Audit** (Audit by Design) : toute écriture des moteurs B/C/E passe par le service d'audit de A.

## 7. Stratégie de tests (Étape 6, par sous-lot)
- **Techniques** : `npx eslint` (0 erreur), `npm run build` (exit 0), types Supabase régénérés.
- **RLS** : tests d'accès négatifs (un rôle sans droit sur l'objet ne voit ni commentaire, ni PJ, ni
  résultat de recherche, ni notification liée).
- **Fonctionnels** : critères de validation 199 par composant (mentions notifient, historique immuable,
  vues réutilisables, favoris personnels, tags multi-objets…).
- **Non-régression** : Finance, fiche 360, Projet, Contrat, site public (impact nul attendu).

## 8. Risques & mitigations
| Risque | Niveau | Mitigation |
|---|---|---|
| Lot trop large livré d'un bloc | 🔴 | Découpage en 5 sous-lots validés séparément |
| RLS polymorphe mal cadrée → fuite de données | 🔴 | Fonction `peut_voir()` centralisée + tests d'accès négatifs systématiques |
| Migration `client_tags` → `tags` cassant Finance/CRM | 🟠 | Migration douce + compat lecture + tests des 4 pages Finance |
| Couplage PJ génériques ↔ module documentaire existant | 🟠 | Réutiliser le stockage documentaire, ne pas dupliquer ; frontière claire PJ-support vs document métier |
| Recherche coûteuse (perf) | 🟠 | Index `tsvector`/`pg_trgm`, périmètre d'objets v1 limité, filtrage RLS en amont |
| Dérive de périmètre (Statuts/Permissions/Import/Archivage) | 🟡 | Explicitement **hors P0-02** ; renvoyés à leurs lots |

## 9. Dette technique liée
- Reliquat CSS **Lot B `crm-*`** (différé, doc 318) : à traiter lors de la refonte Finance, sans lien
  bloquant avec P0-02.
- Composant **Statuts** (199-1) non unifié : dépend de P1-01/P1-02 (modèle) ; les moteurs P0-02
  s'appuieront sur les statuts sémantiques DES-001 en attendant.

## 10. Recommandations à la gouvernance
1. **Valider le découpage** en 5 sous-lots (§5) et l'ordre A→E.
2. **Autoriser d'abord le plan détaillé de P0-02.A** uniquement (socle + audit), avant tout code.
3. Confirmer le **périmètre d'objets v1** par moteur (§4.2) — notamment les objets porteurs des Tags,
   Priorités et de la Recherche, pour éviter la sur-ingénierie.
4. Trancher : Priorités **par colonne** (simple) vs **table polymorphe historisée** (aligné 199 §
   historique) — recommandation : table historisée pour respecter le 199.
5. Confirmer que les canaux **email/SMS** des notifications sont **hors v1** (in-app d'abord).

---

> **Arrêt après le plan**, conformément au 000. En attente de validation du découpage et de
> l'autorisation du plan détaillé de **P0-02.A** avant tout développement.
