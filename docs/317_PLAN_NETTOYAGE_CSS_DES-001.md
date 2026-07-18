# 317 — Plan d'inventaire & nettoyage CSS (DES-001, passe finale)

| **Lot** | DES-001 — Passe de nettoyage CSS |
| ------- | -------------------------------- |
| Statut  | 📋 **Plan d'inventaire — aucune suppression** (attente validation) |
| Date    | 2026-07-14 |
| Cible   | `src/app/globals.css` (~4300 lignes) |
| Méthode | Usage réel croisé `.tsx` + `.ts` (className dynamiques, templates, composants partagés) |

---

## 0. Méthode & garde-fous
- Usage mesuré par **grep sur tout `src/`** (`.tsx` + `.ts`), pas seulement les pages du périmètre.
- **Distinction classe vs token CSS** : certaines entrées `crm-*` sont des **variables** (`--crm-accent`…)
  consommées **dans le CSS** par des classes encore vivantes → **jamais supprimables** même si absentes des `.tsx`.
- **Grouped selectors** : beaucoup de règles regroupent plusieurs classes
  (`.crm-tag, .crm-chip { … }`). Une classe morte partageant une règle avec une classe vivante
  **n'autorise pas** la suppression de la règle → édition sélecteur par sélecteur.
- **Blocs entrelacés** : les classes mortes ne sont pas contiguës (ex. `.icon-button` réapparaît
  ligne 1579 **et** 4064) → suppression **règle par règle**, jamais par plage de lignes.
- 🔒 **Finance impératif** : les pages `admin/finance/*` utilisent des classes `crm-*`, `primary-action`,
  `secondary-action` → **protégées**.

---

## 1. Tableau de classification

### 🟢 Catégorie 1 — Supprimable sans risque (0 usage dans tout `src/`)
| Namespace / sélecteurs | Fichiers qui l'utilisent | Occurrences (tsx/ts) | Règles CSS | Risque | Action |
|---|---|---|---|---|---|
| `.admin-home-*` (hero, kpis, module-card, section, client-list…) | **aucun** (Dashboard migré en `bo-*`) | 0 | ~44 | 🟢 Faible | Supprimer (règle par règle) |
| `.admin-quick-*` (grille actions rapides) | aucun | 0 | ~6 | 🟢 Faible | Supprimer |
| `.icon-button` (bouton header) | aucun (→ `bo-iconbtn`) | 0 | ~4 (2 emplacements) | 🟢 Faible | Supprimer |
| `.workspace-user` (chip user header) | aucun (→ `bo-userchip`) | 0 | 1 | 🟢 Faible | Supprimer |
| `.archive-action` (bouton archiver) | aucun (→ `bo-btn-danger-soft`) | 0 | ~2 | 🟢 Faible | Supprimer |
| `.emprunteur-source-banner` | aucun (→ `bo-source-banner`) | 0 | 0 (déjà absent) | — | Rien à faire |

**Sous-total catégorie 1 : ~57 règles → estimation ~180–240 lignes** (à confirmer, blocs entrelacés).

### 🟠 Catégorie 3 — À migrer/vérifier avant suppression (mortes mais namespace partagé)
| Namespace / sélecteurs | Contexte | Occurrences | Règles | Risque | Action |
|---|---|---|---|---|---|
| `crm-*` **sous-classes de l'ancienne liste client** : `crm-client-tile`, `crm-tile-*` (avatar, body, contact, context, footer, name, status, status-dot, tag, arrow, contracts), `crm-clients-grid`, `crm-kpis-row`, `crm-directory*`, `crm-client-row/main/stats/actions/name-row/list`, `crm-search-bar`, `crm-search-input-wrap`, `crm-filter-select`, `crm-filter-btn`, `crm-reset-btn`, `crm-empty`, `crm-avatar`, `crm-action-btn` | Liste client (migrée `bo-*`) | 0 en `.tsx` | ~30 | 🟠 **Moyen** | Supprimer **après** : (a) exclure les tokens `--crm-*`, (b) vérifier chaque sélecteur groupé, (c) confirmer non-usage Finance |
| **À NE PAS toucher dans `crm-*`** : tokens `--crm-accent/bg/surface/surface-2/border/ink/muted/faint` | Consommés en CSS par les classes Finance vivantes | (usage CSS) | — | 🔴 Élevé si supprimé | **Conserver** |

**Sous-total catégorie 3 : ~30 règles → estimation ~120–160 lignes**, sous réserve de vérification sélecteur par sélecteur.

### 🔵 Catégorie 2 — Partagé / à conserver impérativement
| Namespace / sélecteurs | Fichiers qui l'utilisent | Occurrences | Décision |
|---|---|---|---|
| `crm-*` **classes vivantes** : `crm-chip`, `crm-filters`, `crm-filter-chips`, `crm-search`, `crm-search-icon`, `crm-search-wrap`, `crm-status-badge`, `crm-tag`, `crm-tags`, `crm-client-meta` | **4 pages Finance** + `client-file-360.tsx` + `client-form.tsx` | 30 (6 fichiers) | 🔒 **Conserver** (Finance) |
| `primary-action` / `secondary-action` | Finance + pages publiques + admin (28 / 18 fichiers) | 40 / 23 | 🔒 Conserver |
| `back-link` | 12 sous-pages admin (stats, IA, emprunteur…) | 12 | Conserver |
| `admin-module*` | `AdminModulePage` + 6 pages modules | 13 (7 fichiers) | Conserver |
| `admin-page-header*`, `admin-page-subtitle` | `emprunteur`, `clients/nouveau`, `clients/modifier` | 6 / 2 | Conserver |
| `sidebar`, `side-nav`, `workspace-header` | `app-shell` (+ `sidebar` dans `ia/copilot-chat`) | 9 / 5 / 1 | Conserver (surchargées DES-001, mais **fournissent la structure**) |
| `cf360-*` | `client-file-360-live`, `client-project-workflow`, `client-portal-invite-button` | 164 (3 fichiers) | 🔒 **Conserver** — fournit le **layout** ; DES-001 n'a surchargé que les couleurs. **Ne pas supprimer car surchargé.** |
| `project-*` | `client-project-workflow`, `client-file-360-live` | 44 (2 fichiers) | 🔒 Conserver — layout |
| `bo-*` (Design System) | Dashboard, Clients, shell… | 174 (4 fichiers) | Conserver (système cible) |

---

## 2. Estimation du volume réellement supprimable
- **Catégorie 1** : ~57 règles ≈ **~180–240 lignes** (risque faible).
- **Catégorie 3** : ~30 règles ≈ **~120–160 lignes** (risque moyen, après vérif sélecteur par sélecteur).
- **Total réaliste : ~300–400 lignes** sur ~4300 (≈ 7–9 %).
- **Non touché** : `cf360-*` (175 règles) et `project-*` (124 règles) restent — ils portent le layout,
  conformément à « ne pas nettoyer parce que surchargé ». Le gain porte sur le CSS **mort**, pas surchargé.

## 3. Risques de régression & mitigations
| Risque | Niveau | Mitigation |
|---|---|---|
| Supprimer une règle **groupée** contenant une classe vivante (ex. Finance) | 🟠 Moyen | Édition **sélecteur par sélecteur** ; jamais de suppression de règle groupée sans retirer uniquement le sélecteur mort |
| Supprimer un **token `--crm-*`** consommé en CSS | 🔴 Élevé | Exclusion explicite des variables ; `grep var(--crm-` avant toute suppression |
| `className` **dynamique** (template literal) non détecté | 🟢 Faible | Grep déjà étendu `.ts`/`.tsx` + templates ; re-scan `\`.*crm-` avant exécution |
| Casser une page **Finance** | 🔴 Élevé | Finance = catégorie 2 protégée ; test visuel des 4 pages Finance obligatoire |
| Régression visuelle silencieuse | 🟠 Moyen | Preview Vercel + captures avant/après des écrans clés |

## 4. Stratégie de tests (avant / après)
**Techniques**
- `npx eslint` (0 erreur) + `npm run build` (succès) après chaque lot de suppression.
- **Re-scan d'usage** juste avant exécution : `grep -rE "classeMorte" src` = 0 pour chaque classe retirée.
- `grep "var(--crm-"` pour confirmer qu'aucun token supprimé n'est consommé.

**Visuels (preview Vercel + captures)**
- Écrans **migrés** (doivent rester identiques) : Dashboard, Clients (liste + fiche), Projet, Contrat, shell.
- Écrans **à protéger** (catégorie 2) : **4 pages Finance**, pages `AdminModulePage`, sous-pages `back-link`,
  `clients/nouveau`, `clients/modifier`, espace public (impact nul attendu).

## 5. Séquencement d'exécution proposé (après validation)
1. **Lot A** (risque faible) : catégorie 1 (`admin-home-*`, `admin-quick-*`, `icon-button`, `workspace-user`, `archive-action`). Build + preview.
2. **Lot B** (risque moyen) : catégorie 3 (sous-classes `crm-*` de l'ancienne liste), **sélecteur par sélecteur**, tokens exclus, Finance re-testée.
3. Rapport de fin de passe (lignes réellement supprimées, écrans testés, résultats).

---

## Contraintes respectées
- ❌ Aucune suppression avant validation de ce plan.
- 🔒 Styles Finance préservés (catégorie 2).
- ✅ Rien supprimé « parce que surchargé » (`cf360-*`/`project-*` conservés).
- ✅ Usages dynamiques / templates / composants partagés vérifiés.
- ✅ Aucune logique métier / API / BDD / route touchée (CSS uniquement).

> **Arrêt après le plan.** En attente de validation avant toute suppression.
