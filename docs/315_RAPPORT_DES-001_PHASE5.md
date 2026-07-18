# 315 — Rapport de phase · DES-001 / Phase 5 (Projet)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **5 — Fiche Projet** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-14 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |

---

## 1. Objectif
Appliquer DES-001 à la **fiche Projet** (composant `ClientProjectWorkflow`, rendu dans l'onglet
Projets de la fiche 360) : en-tête, synthèse, statuts, étapes/progression, activités, documents.

## 2. Fichiers modifiés (1)
- `src/app/globals.css` — **+101 lignes** : bloc « FICHE PROJET » re-skinnant les classes
  `project-*` vers les tokens DES-001, scopé `.app-layout`, en fin de fichier (prime par cascade).

## 3. Approche
- Les classes `project-*` sont **exclusives** au composant Projet et **pilotées par classes**
  (61 règles CSS) → re-skin **par override CSS**, sans toucher les **612 lignes de TSX**.
- **Aucune modification** de `client-project-workflow.tsx` : logique, état, actions
  (validation d'étape, notes, documents), données — **tout intact** (vérifié : TSX non modifié).

## 4. Éléments restylés (tokens DES-001)
- **Hero projet** + **carte « étape en cours »** + **barre de progression** (teal).
- **Pipeline d'étapes** : cartes, index d'étape (teal-tint), titres, **statuts sémantiques** —
  Terminé → succès, En cours → neutre/teal, **Bloqué → danger**, À venir.
- **Boutons d'étape/action** : secondaire + **« Valider l'étape » en teal** (remplace l'ancien dégradé bleu/violet).
- **Documents du projet**, traçabilité, automatisations : surfaces/bordures tokenisées.
- **Formulaires** (besoins, notes, création) : inputs + focus teal.
- **Pastilles** garanties/documents.

## 5. Périmètre & limites respectés
| Règle | Respect |
|---|---|
| Fiche Projet (en-tête, synthèse, statuts, étapes, onglets, activités, documents) | ✅ re-skin complet |
| Harmonisation Projet visible dans la fiche 360 | ✅ automatique (même composant) |
| Aucune logique métier / API / BDD / route | ✅ CSS uniquement |
| Données & actions préservées | ✅ TSX non modifié |
| Ne pas restyler Contrat au-delà du strict partagé | ✅ aucune classe Contrat touchée (`project-*` seul) |
| Impact public nul | ✅ scope `.app-layout` |
| Aucune amélioration hors périmètre | ✅ |

## 6. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (21 warnings préexistants) |
| Build (`npm run build`) | ✅ Compiled successfully (exit 0) |
| Routes | ✅ aucune route touchée (CSS uniquement) |
| Gardes de rôle | ✅ inchangées (aucun composant serveur modifié) |
| Diff | ✅ `globals.css` uniquement (+101, 0 suppression) |
| Preview visuelle | ✅ fiche Projet (jointe) |

## 7. Écarts constatés
- Dans les documents du projet, la pastille de statut par défaut (`project-document-list span`)
  passe en teal-tint ; une distinction fine succès/manquant sera affinée si besoin (mineur, présentation).
- Le reste de la fiche 360 (Synthèse/Interactions/Contrats/Famille) demeure en `cf360-*` — sera
  harmonisé lors de la phase **Contrat** puis d'une passe fiche 360, comme convenu.

## 8. Recommandations pour la suite
1. **Phase Contrat** : restyler le module/onglet Contrats ; à cette occasion, harmoniser les
   dernières parties `cf360-*` de la fiche 360.
2. Passe finale de **nettoyage de l'ancien CSS** (`crm-*` liste, `admin-home-*`, résidus) une fois
   toutes les surfaces validées.

---

> Phase 5 (Projet) clôturée. **Arrêt avant la phase Contrat**, comme demandé — en attente de revue.
