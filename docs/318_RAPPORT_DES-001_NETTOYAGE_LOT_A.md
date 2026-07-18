# 318 — Rapport · DES-001 / Nettoyage CSS — Lot A + clôture DES-001

| **Lot** | DES-001 — Passe de nettoyage CSS, **Lot A** |
| ------- | ------------------------------------------- |
| Statut  | ✅ Terminé — lint & build OK, écrans byte-identiques |
| Date    | 2026-07-15 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |
| Cible   | `src/app/globals.css` **uniquement** |

---

## 1. Périmètre exécuté (strictement le Lot A validé)
Suppression **règle par règle** des règles CSS de **catégorie 1** confirmées à **0 usage** dans tout
`src/` (`.tsx`/`.ts`/`.jsx`/`.js`) :
`admin-home-*`, `admin-quick-*`, `icon-button`, `workspace-user`, `archive-action`.

**Non touché**, conformément aux contraintes : aucune règle `crm-*`, `cf360-*`, `project-*` ou partagée ;
aucune logique, API, BDD, route ou composant ; aucune amélioration hors périmètre. **Lot B différé.**

## 2. Chiffres exacts
| Mesure | Valeur |
|---|---|
| **Règles CSS supprimées** | **45** blocs (dont 2 règles internes `@media`) |
| **Lignes supprimées (net)** | **305** (`globals.css` : 4746 → 4441) |
| **Lignes ajoutées** | **0** (aucune règle nouvelle) |
| **Fichiers modifiés** | **1** — `src/app/globals.css` |

Sélecteurs retirés (liste exhaustive issue du diff) :
`.admin-home-hero`, `.admin-home-kpis`, `.admin-home-section`, `.admin-home-section-header`,
`.admin-home-modules-grid`, `.admin-home-module-card`, `.admin-home-module-icon`,
`.admin-home-focus-card`, `.admin-home-focus-top`, `.admin-home-actions`, `.admin-home-client-list`
(+ variantes `strong`/`p`/`:hover`…), `.admin-quick-grid`, `.icon-button` (2 emplacements : header +
`.app-layout .icon-button` + `:hover`), `.workspace-user`, `.archive-action` (+ `:hover`),
et les 2 règles `@media` associées (`admin-home-*` grid + `admin-quick-grid`).

## 3. Garde-fous appliqués
- **Re-scan d'usage immédiatement avant suppression** : les 5 namespaces = **0 occurrence** dans `src/`.
- **Sélecteurs groupés préservés** : dans le groupe mixte, `.admin-create-rail`, `.form-grid-2`,
  `.form-tag-input` **conservés** (11 occurrences vérifiées après coup).
- **Tokens `--crm-*` intacts** : 29 définitions présentes ; **aucun sélecteur `crm-*` retiré** (les 2
  lignes `crm-` dans le diff sont des règles `.icon-button` qui *consommaient* ces tokens sans les définir).
- **Aucune règle `cf360-*` / `project-*` touchée** (0 dans le diff).
- **Anomalie corrigée** : la suppression de `.archive-action` (intercalé entre `.ops-empty` et
  `.ops-table-nested`) avait fusionné ces 2 survivantes sur une même ligne physique — CSS valide mais
  inesthétique. Newline restauré ; les deux règles `ops-*` (utilisées par 5 pages) restent intactes.
- **Équilibre des accolades** : −45 ouvrantes / −45 fermantes (symétrique) ; l'écart résiduel de 1
  (accolade dans un commentaire) **préexiste** à HEAD.

## 4. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint .`) | ✅ **0 erreur** (21 warnings préexistants, inchangés) |
| Build (`npm run build`) | ✅ **Compiled successfully in 10.2s** (exit 0) |
| Routes | ✅ inchangées — seul `globals.css` modifié, toutes les routes buildent |
| Gardes de rôle | ✅ inchangées — aucun composant/page serveur modifié |
| **Preuve d'impact DOM** | ✅ **0 référence** aux 5 namespaces dans tout `src/` → aucun nœud rendu ne les porte |
| Captures comparatives **Dashboard** | ✅ **byte-identique** (sha256 identiques avant/après) |
| Captures comparatives **shell** | ✅ inclus dans le rendu Dashboard (sidebar/header) — identique |
| Captures comparatives **Clients** | ✅ **byte-identique** |
| Captures comparatives **Projet** | ✅ **byte-identique** |
| Captures comparatives **Contrat / fiche 360** | ✅ **byte-identique** |
| Contrôle **site public** | ✅ impact nul — 0 usage des classes retirées dans les pages publiques ; classes admin-only |

**Méthode captures** : rendu du même markup back-office (classes vivantes `bo-*`/`sidebar`/`crm-*`) avec
`globals.css` **avant** (HEAD) puis **après** nettoyage, via Chromium (viewport 1440, fullPage), puis
comparaison **sha256** des PNG. Résultat : hachages strictement égaux sur les 5 écrans → **0 différence
visuelle** (attendu, puisque le CSS retiré n'était porté par aucun élément).

## 5. Anomalies
- **1 anomalie cosmétique** rencontrée et **corrigée** (fusion `.ops-empty`/`.ops-table-nested`, cf. §3).
- Aucune régression fonctionnelle, visuelle, de route ou de rôle.

## 6. Reste à faire (différé, non exécuté)
- **Lot B** (risque moyen) : sous-classes `crm-*` mortes de l'ancienne liste client, **sélecteur par
  sélecteur**, tokens `--crm-*` exclus, 4 pages Finance re-testées. **Non fait à ce stade** (différé
  sur décision). `cf360-*` et `project-*` restent (ils portent le layout, non « morts »).

---

## 7. Rapport final DES-001 (synthèse de bout en bout)

**Objectif** : refonte visuelle du back-office EJ Partners, additive et sans impact public, avec un
Design System (navy = identité, teal = action/interaction/focus/progression, or = premium parcimonieux)
et des statuts sémantiques.

| Phase | Périmètre | Livrable | Statut |
|---|---|---|---|
| **1** | Tokens & fondations DES-001 (scopés `.app-layout`) | doc 311 | ✅ |
| **2** | Shell (sidebar marine, header sticky, drawer mobile, chip user) | doc 312 | ✅ |
| **3** | Dashboard (`bo-*`, placeholders masqués derrière flag) | doc 313 | ✅ |
| **4** | Liste Clients + en-tête fiche (badges statut sémantiques, avatars) | doc 314 | ✅ |
| **5** | Fiche Projet (`project-*` re-skin, statuts d'étape sémantiques) | doc 315 | ✅ |
| **Contrat** | Fiche Contrat + corps fiche 360 (`cf360-*`), statuts documentaires | doc 316 | ✅ |
| **Nettoyage — Lot A** | Retrait du CSS mort catégorie 1 (45 règles, 305 lignes) | doc 318 (ce doc) | ✅ |

**Principes tenus sur l'ensemble** :
- **Impact public nul** : tous les tokens/styles DES-001 scopés `.app-layout` (le site public n'utilise
  pas cette classe). Vérifié à nouveau au Lot A.
- **Approche additive/namespacée** : classes `bo-*` en fin de fichier, primauté par cascade ; anciennes
  classes laissées inertes puis retirées seulement quand **mortes** (jamais « parce que surchargées »).
- **Sémantique des statuts** : conforme/actif → succès `#0F7B5A` ; manquant/expiré/résilié → danger
  `#BE3A2B` ; en attente → attention `#A9721B` ; en cours → info/teal `#1F7A80` ; brouillon/archivé →
  neutre `#5D6E7E`. **Teal jamais utilisé comme statut par défaut.**
- **Aucune modification** de logique métier, API, BDD, route ni garde de rôle sur toute la refonte.
- **Réglementaire/contractuel/consentements** : jamais modifiés (changements UI uniquement).

**État CSS** : `globals.css` = 4441 lignes. `cf360-*` (layout) et `project-*` (layout) conservés
volontairement. Reliquat mort restant = sous-classes `crm-*` de l'ancienne liste client → **Lot B**
(différé). Finance (`crm-*` vivantes, `primary/secondary-action`) protégée.

---

> **Lot A clôturé.** DES-001 est fonctionnellement terminé (refonte + nettoyage sans risque). **Arrêt
> avant le Lot B**, comme demandé — en attente de validation.
