# 316 — Rapport de phase · DES-001 / Phase Contrat (+ fiche 360 harmonisée)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **Contrat + corps de la fiche Client 360** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-14 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |

---

## 1. Objectif
Appliquer DES-001 à la **fiche Contrat** (cartes contrat de la fiche 360) et **harmoniser le
corps restant de la fiche Client 360** (`cf360-*` : hero, KPI, onglets, interactions, famille…),
avec des **statuts documentaires/contrats sémantiques**, sans modifier la logique.

## 2. Fichiers modifiés (2)
- `src/app/globals.css` — **+85 lignes** : re-skin `cf360-*` → tokens DES-001 (hero marine,
  KPI, onglets actifs teal, cartes contrat/info/personne, timeline, formulaires) + neutralisation
  des pastilles teal du Projet (décision statuts).
- `src/components/client-file-360-live.tsx` — **couleurs de statut uniquement** :
  `CONTRACT_STATUS` et `STATUT_CONFIG` (client) passés en **sémantique DES-001**, icônes KPI
  alignées (teal décoratif / score sémantique), 1 icône de validation → succès. **Aucune logique
  modifiée** (état, actions `deleteContract`/`deleteInteraction`/formulaires, données inchangés).

## 3. Statuts — mapping sémantique (décision Phase 5→6)
| Statut | Couleur |
|---|---|
| Conforme / disponible / **Actif** | **succès** (`#0F7B5A`) |
| Manquant / expiré / **Résilié** | **danger** (`#BE3A2B`) |
| En attente / à vérifier / **En attente signature** / **Prospect** | **attention** (`#A9721B`) |
| En cours | **info/teal** (`#1F7A80`) |
| Brouillon / Archivé / Inactif | **neutre** (`#5D6E7E`) |
| **Teal** | réservé **actions / liens actifs / focus / progression** — **jamais** statut par défaut |

## 4. Éléments restylés
- **Corps de la fiche 360** : hero (marine), KPI (icônes teal / score sémantique), **onglets actifs
  en teal**, panneau, cartes info/synthèse, cartes personne (Famille), timeline, formulaires inline.
- **Fiche Contrat** : cartes contrat (icône teal, assureur, prime en teal), **statut sémantique**.
- **Cohérence** : les pastilles génériques (tags, pièces) passent en **neutre** (teal libéré).

## 5. Périmètre & limites respectés
| Règle | Respect |
|---|---|
| Fiche Contrat (en-tête, synthèse, statuts, actions, garanties, échéances, documents) | ✅ |
| Harmonisation des dernières parties de la fiche 360 | ✅ (`cf360-*` re-skinné) |
| Correction sémantique des statuts documentaires partagés | ✅ (config sémantique commune) |
| Aucune logique / API / BDD / route | ✅ (couleurs + CSS uniquement) |
| Données & actions préservées | ✅ (vérifié : aucune ligne de logique modifiée) |
| Pas d'élargissement à d'autres écrans | ✅ (`cf360-*` exclusif à la fiche) |
| Impact public nul | ✅ (scope `.app-layout`) |
| Aucune amélioration hors périmètre | ✅ (couleurs **catégorielles** interactions/relations laissées intactes) |

## 6. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (21 warnings préexistants) |
| Build (`npm run build`) | ✅ Compiled successfully (exit 0) |
| Routes | ✅ aucune route touchée |
| Gardes de rôle | ✅ inchangées (page serveur non modifiée) |
| Preview visuelle | ✅ fiche Contrat + fiche 360 harmonisée (jointe) |

## 7. Écarts constatés
- **Couleurs catégorielles** des types d'interaction (`INTERACTION_COLORS`) et des avatars de
  relation (`RELATION_COLORS`) **laissées intactes** : ce sont des indicateurs de catégorie,
  pas des statuts (hors décision + hors périmètre « aucune amélioration »). À harmoniser plus
  tard si souhaité, dans un lot dédié.
- Ancien CSS `cf360-*` de base conservé (surchargé par cascade) → **nettoyage à la passe finale**.

## 8. Recommandations pour la suite
1. **Passe de nettoyage CSS** : retirer les anciennes règles surchargées (`crm-*` liste,
   `admin-home-*`, blocs `cf360-*`/`project-*` de base devenus inertes) une fois l'ensemble validé.
2. Décider si les **couleurs catégorielles** (interactions/relations) doivent être harmonisées
   (sobriété) — lot optionnel.

---

> Phase Contrat clôturée. **Arrêt avant la passe de nettoyage CSS**, comme demandé — en attente de revue.
