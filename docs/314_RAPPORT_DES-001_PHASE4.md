# 314 — Rapport de phase · DES-001 / Phase 4 (Clients)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **4 / 6 — Clients (liste + fiche)** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-14 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |

---

## 1. Objectif
Appliquer DES-001 à la **liste Clients** et à la **fiche client pivot**, en préservant toute la
logique et les données, sans modifier API/BDD/route, sans toucher Projet ni Contrat, impact public nul.

## 2. Fichiers modifiés (3)
- `src/app/admin/clients/page.tsx` — **liste entièrement restylée** en `bo-*` (présentation).
  `getClientsList`, `searchParams`, form GET, onglets, stats, tags, contrats : **inchangés**.
- `src/app/admin/clients/[clientId]/page.tsx` — **chrome de la fiche** restylé (header, actions,
  bandeau source). `getClient360`, `getClientProjects`, `archiveClientAction`, `ClientFile360Live` : **inchangés**.
- `src/app/globals.css` — **+92 lignes** : composants Clients `bo-*` (badges sémantiques, onglets,
  barre de recherche, tuiles, état vide, chrome de fiche), scopés `.app-layout`.

## 3. Composants restylés
- **Liste** : en-tête, **KPI** (Total/Clients/Prospects/Réseau), **onglets** par type de contact,
  **barre recherche + filtre statut** (form GET conservé), **tuiles client** (avatar marine→teal,
  **badges de statut sémantiques**, contexte familial, coordonnées, tags, nb contrats), **état vide**.
- **Statuts** : passés des couleurs codées en dur (#10b981…) aux **tokens sémantiques**
  (prospect→warning, actif→success, en_cours→info, inactif→neutral).
- **Fiche — chrome** : lien retour, titre + synthèse, actions **Modifier** / **Archiver**
  (danger doux), **bandeau « provient du tunnel Emprunteur »** en teal.

## 4. Écart de périmètre important (corps de la fiche 360)
Le corps de la fiche (`client-file-360-live.tsx`, 754 lignes) **n'a pas été restylé** car :
- il partage le namespace CSS **`cf360-*` avec le composant Projet** (`client-project-workflow.tsx`) ;
- ses onglets rendent les contenus **Projets et Contrats**.
Le restyler **imposerait de toucher Projet/Contrat**, **explicitement exclus** de cette phase.
→ Le corps 360 conserve son style actuel (visible en preview). Sa refonte est à mener **avec/après
les lots Projet & Contrat**, pour une harmonisation cohérente. (Voir recommandations.)

## 5. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (21 warnings préexistants) |
| Build (`npm run build`) | ✅ Compiled successfully (exit 0) |
| Routes | ✅ liens liste/fiche → cibles réelles ; aucune route modifiée |
| Gardes de rôle | ✅ `requireRole` intact (liste + fiche) |
| Données / logique | ✅ `getClientsList`, `getClient360`, `archiveClientAction`, `ClientFile360Live` inchangés |
| Fausses données | ✅ aucune ajoutée |
| `crm-*` (pages Finance) | ✅ non touchées (0 `crm-` restant dans la liste ; CSS `crm-*` intact) |
| Impact public | ✅ nul (classes `bo-*` scopées `.app-layout`) |
| Preview visuelle | ✅ liste + fiche (jointes) |

## 6. Preview visuelle
- **Liste Clients** — restylée intégralement (capture jointe).
- **Fiche Client** — chrome DES-001 neuf + corps 360 existant (capture jointe, état honnête).

## 7. Recommandations pour la suite
1. **Phase 5 (Projet)** puis **Contrat** : restyler ces modules ; à cette occasion, harmoniser le
   **corps de la fiche 360** (`cf360-*`) de façon cohérente (il est couplé à ces modules).
2. Aligner les **KPI internes de la fiche** (`cf360-kpi`, couleurs pastel codées en dur) sur les
   tokens sémantiques lors de cette refonte.
3. Poursuivre le **nettoyage de l'ancien CSS** (`crm-*` liste, `admin-home-*`, etc.) en fin de lot,
   une fois toutes les surfaces migrées.

---

> Phase 4 clôturée. **Arrêt avant la Phase 5**, comme demandé — en attente de revue.
