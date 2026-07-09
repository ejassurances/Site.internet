# 302 — Plan d'exécution · LOT P0-01 « Stabilisation du socle »

| **Document** | Plan d'exécution détaillé (avant code) |
| ------------ | -------------------------------------- |
| Lot          | **P0-01** (backlog 229) — Priorité **P0** |
| Statut       | 📋 Plan — **en attente de validation gouvernance** |
| Date         | 2026-07-09 |
| Référentiels | 227, 228, 229 ; specs 199, 201/218, 050 |
| Process      | Master prompt `000` — étape 3/8 (plan), puis étape 4 (validation) |

---

## 1. Objectif du lot (rappel 229)

> « Aligner l'application existante avec les référentiels **sans créer de nouvelles fonctionnalités**. »

**Travaux prévus** : vérifier la navigation · corriger les liens cassés · harmoniser la
terminologie métier · vérifier permissions/rôles/routes · supprimer les éléments obsolètes.

**Critères d'acceptation** : aucun lien mort · terminologie homogène · navigation cohérente ·
aucun module orphelin.

**Périmètre EXCLU (autres lots)** : création de modules manquants (Agenda, Opportunités…),
composants transverses (→ P0-02), refonte modèle (→ P1), fusion des fiches client (→ P0-02/P1).

---

## 2. État des lieux (constaté dans le code)

### 2.1 Navigation — 24 liens morts (nav → 404)
`app-shell.tsx` déclare 24 liens `/admin/*` **sans page** :

```
conformite/acpr · conformite/audit · conformite/dda · conformite/rgpd
crm/agenda · crm/contacts · crm/taches
finance/commissions · ia/analyse-familiale · ia/recommandations · ia/scoring
mandataire · prescripteur
stats/clients · stats/exports · stats/finance · stats/performance
vente/devis · vente/leads · vente/pipeline
workflows/automatisations · workflows/notifications · workflows/statuts · workflows/templates
```

### 2.2 Navigation — 16 pages orphelines (page réelle, non liée)
Des modules **existent mais ne sont pas dans le menu** — souvent parce que le menu pointe
vers un libellé « cible » différent du réel :

```
conformite/lcb-ft   (menu pointe vers acpr)
emprunteur
finance/avenants · bordereaux · encaissements · exports · reversements   (menu ne montre que commissions+facturation)
ia/anonymisation · copilot · cross-selling · redaction · resume-client    (menu pointe vers analyse-familiale/scoring/recommandations)
stats/commercial · portefeuille · production                              (menu pointe vers performance/clients/finance)
clients/nouveau  (accessible via bouton, pas menu — normal)
```

**Diagnostic** : le menu a été écrit pour une **arborescence cible** (proche des specs 201),
mais l'implémentation réelle a livré d'**autres sous-modules**. Le menu « ment » dans les deux sens.

### 2.3 Terminologie
- **« EJ Assurances »** (sans « Partners ») : **78 occurrences** dans `src/` (SEO/structured-data,
  pages publiques, écrans admin, formulaires). La marque cible est **« EJ Partners Assurances »**.
- **« Dossier »** : **99 occurrences** — **mixte** : certaines légitimes/techniques
  (`emprunteur_dossiers`, classeur/dossier ACPR réglementaire) ; d'autres désignent un **Projet**
  et doivent basculer sur « Projet » (règle : ne pas réintroduire « Dossier » sans raison technique).
- **« courtier »** : **96 occurrences** — le **rôle `courtier` est conservé** (décision validée),
  mais le vocabulaire d'interface doit s'aligner (« conseiller »/« collaborateur »). L'enum SQL
  `app_role` **n'est pas touché** ; seuls les **libellés d'affichage** changent.

### 2.4 Éléments obsolètes
- `src/pages/confidentialite.astro` — résidu Astro **jamais référencé** (Next sert déjà
  `src/app/confidentialite/page.tsx`). **Suppression sûre.**
- `src/components/client-directory-360.tsx` — **0 import** → composant mort. **Suppression sûre.**
  *(Les 4 autres variantes client-file/directory sont encore utilisées → hors P0-01, traitées en P0-02/P1.)*

### 2.5 Rôles / routes
- Enum `app_role = ('admin','courtier','client','mandataire','prescripteur')` — inchangé (décision).
- **32/37 pages admin** ont un contrôle de rôle (`requireRole`) → **5 pages à vérifier/couvrir**.
- Espaces `/mandataire` et `/prescripteur` existent en top-level ; le menu admin pointe à tort
  vers `/admin/mandataire` et `/admin/prescripteur` (liens morts) → à rediriger vers les bons chemins.

---

## 3. Travaux détaillés & fichiers concernés

### T1 — Réconcilier navigation ↔ pages réelles *(cœur du lot)*
**Fichier** : `src/components/app-shell.tsx` (unique source du menu).
Actions :
- **Lier les 16 pages orphelines réelles** (finance/avenants…, ia/anonymisation…, stats/commercial…, conformite/lcb-ft, emprunteur).
- **Traiter les 24 liens morts** selon la règle « aucun lien mort » → voir **Décision A** (§5).
- Corriger `mandataire`/`prescripteur` → `/mandataire`, `/prescripteur`.

### T2 — Harmoniser la marque « EJ Partners »
**Fichiers** : ~20 fichiers (SEO `seo/structured-data.tsx`, pages publiques, écrans admin), + `README.md`.
Action : « EJ Assurances » → « EJ Partners Assurances » (public) / « EJ Partners » (interne).
⚠️ Vérifier structured-data/JSON-LD (impact SEO) — remplacement contrôlé, pas global aveugle.

### T3 — Vocabulaire « Dossier » → « Projet » (ciblé)
Action : **inventaire des 99 occurrences**, puis remplacement **uniquement** là où « Dossier »
désigne un Projet dans l'UI. Conserver les usages techniques/réglementaires. → voir **Décision B**.

### T4 — Libellés rôle « courtier » (UI seulement)
Action : libellés d'affichage courtier → « conseiller »/« collaborateur ». **Aucune modif SQL/RLS.**
→ voir **Décision C** (terme retenu).

### T5 — Supprimer les obsolètes
**Fichiers supprimés** : `src/pages/confidentialite.astro`, `src/components/client-directory-360.tsx`.

### T6 — Vérifier rôles/routes
Action : auditer les 5 pages admin sans `requireRole` ; ajouter la garde si nécessaire (sécurité by design, 227 §7).

---

## 4. Impacts, risques, dépendances, tests

### Base de données
**Aucune migration.** P0-01 ne touche ni le schéma, ni les données, ni les RLS.
(L'enum `app_role` et les tables restent inchangés — les renommages sont purement UI.)

### API
Aucune capacité/route API modifiée (T1-T5 sont front + labels ; T6 renforce des gardes existantes).

### Risques
| Risque | Niveau | Mitigation |
|---|---|---|
| Remplacement terminologique trop large (casse SEO/JSON-LD) | 🟠 Moyen | T2/T3 en remplacements **ciblés et relus**, pas de `sed` global |
| Masquer un lien encore attendu par un utilisateur | 🟢 Faible | Décision A validée avant action |
| Suppression d'un composant faussement « mort » | 🟢 Faible | Vérifié : `client-directory-360` = 0 import ; astro non référencé |
| Ajout de garde `requireRole` cassant un accès légitime | 🟢 Faible | Vérifier le rôle attendu page par page (5 pages) |

### Dépendances
- Aucune dépendance à un autre lot. P0-01 est la **fondation** ; il débloque P0-02.
- Dépend uniquement de la **validation des Décisions A/B/C** ci-dessous.

### Tests à prévoir (228 ch.7)
- **Manuel/E2E** : parcourir **tous** les liens du menu admin → 0 erreur 404 (critère d'acceptation).
- **Build** : `next build` sans erreur ; lint propre (`eslint`).
- **Vérif terminologie** : `grep "EJ Assurances"` = 0 hors contexte historique ; revue des « Dossier » restants.
- **Rôles** : accès aux 5 pages corrigées testé avec un rôle autorisé et un rôle non autorisé.
- **Non-régression** : les 16 pages réelles restent accessibles après recâblage du menu.

---

## 5. Décisions requises avant code (étape 4 — validation)

**Décision A — Traitement des 24 liens morts**
- A1. *Les retirer* du menu (le plus simple, menu = miroir du réel). **Recommandé.**
- A2. *Les afficher désactivés « à venir »* (garde la vision cible visible, mais alourdit).
- A3. *Créer des pages « À venir »* placeholder (déconseillé : P0-01 interdit les nouvelles fonctionnalités).

**Décision B — Périmètre du renommage « Dossier »**
- B1. *Ciblé* : ne renommer que l'UI où « Dossier » = Projet, conserver les usages techniques/ACPR. **Recommandé.**
- B2. *Différer* entièrement en P1 (refonte Projet).

**Décision C — Libellé du rôle `courtier` en interface**
- C1. « Conseiller » · C2. « Collaborateur » · C3. Laisser « Courtier » pour l'instant.

> Aucune modification ne sera faite tant que ces décisions ne sont pas validées.
> À réception, j'exécute P0-01 sur `claude/repo-sync-7rrtyt`, puis je fournis le **rapport de fin de lot**
> (résumé, fichiers, BDD, API, tests, risques, dette, recommandations) conforme au master prompt.
