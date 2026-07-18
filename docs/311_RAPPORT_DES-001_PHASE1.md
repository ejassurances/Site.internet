# 311 — Rapport de phase · DES-001 / Phase 1 (Fondations tokens)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **1 / 6 — Fondations tokens** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-09 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |
| Maquette validée | `artifact DES-001` · plan `310` |

---

## 1. Objectif de la phase
Poser le **substrat du design system** back-office (palette unique, tokens sémantiques,
échelle d'espacement, rayons, ombres, focus) **sans rien appliquer** aux écrans → base
consommée par les phases suivantes, **zéro régression**.

## 2. Fichiers modifiés
- `src/app/globals.css` — **+75 lignes, −0** (strictement additif). Ajout d'un bloc
  « DES-001 · Fondations » en fin de fichier.

## 3. Composants créés / refactorisés
- **Aucun composant applicatif** créé ou refactorisé (phase de fondation).
- **Tokens ajoutés (33)** sous `.app-layout` :
  - Marque bleu marine `--bo-navy-900…700`.
  - Action/interaction `--bo-teal`, `--bo-teal-600`, `--bo-teal-050`.
  - Premium `--bo-gold`, `--bo-gold-050`, `--bo-gold-ink` (usage parcimonieux).
  - Neutres à biais marine `--bo-bg/surface/surface-2/surface-3/border/border-strong/ink/text/muted/faint`.
  - Sémantique `--bo-success/warning/danger/info` (+ `-bg` / `-bd`).
  - Rayons `--bo-r-sm…xl`, ombres `--bo-shadow-sm/md/lg`, focus `--bo-ring`.
  - Espacement `--bo-sp1…sp7`, mono données `--bo-font-mono`.
- **1 utilitaire additif** : `.app-layout .bo-num` (chiffres tabulaires).

## 4. Respect des contraintes
| Contrainte | Respect |
|---|---|
| Périmètre (Dashboard, Clients, Projet, Contrat) | ✅ Phase de fondation, aucun écran touché |
| Aucune logique métier | ✅ CSS uniquement |
| Aucune API | ✅ |
| Aucune base de données | ✅ |
| Aucune route | ✅ |
| Impact nul site public | ✅ Tokens scopés sous `.app-layout` ; la vitrine n'utilise pas cette classe (vérifié) |
| Design System validé | ✅ Valeurs identiques à la maquette DES-001 |

## 5. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (22 warnings préexistants) |
| Build (`npm run build`) | ✅ exit 0 (avert. `swc-musl` liés à l'environnement, sans impact) |
| Additivité (`git diff --numstat`) | ✅ 75 insertions / **0 suppression** — aucune règle existante altérée |
| Scoping public | ✅ aucune page publique n'utilise `.app-layout` |
| Collision de noms | ✅ 0 `--bo-`/`.bo-` préexistant |

## 6. Écarts constatés
- **Aucun écart fonctionnel.** Par nature, cette phase **ne produit aucun changement visible** :
  c'est le substrat. La revue visuelle deviendra pertinente en Phase 2 (application au shell/écrans).
- **Point d'attention de séquencement** : le plan prévoit en Phase 2 le **shell (sidebar/header)**,
  qui est **partagé par toutes les pages `/admin/*`**, pas seulement les 4 écrans du périmètre.
  Restyler le shell améliorera donc le cadre de tout le back-office. → à confirmer en revue (§7).

## 7. Recommandations pour la Phase 2
1. **Clarifier le périmètre du shell** : soit (a) restyler la sidebar/header (cadre commun des 4 écrans,
   recommandé pour un rendu cohérent), soit (b) rester strictement dans les 4 écrans et différer le shell.
2. Démarrer l'application des tokens par le **Dashboard** (`/admin`), écran vitrine du périmètre,
   en introduisant les premières classes composants `bo-*` (KPI cards, cartes, table).
3. Conserver l'approche **additive + namespacée** (`bo-*`) : migrer écran par écran, puis nettoyer
   l'ancien CSS en fin de lot (principe « ajouter avant remplacer », réf. 227 ch.7).
4. Contrôle visuel via preview Vercel à chaque écran migré ; snapshot des pages publiques (non-régression).

---

> Phase 1 clôturée. En attente de la **revue fonctionnelle et visuelle** avant de lancer la Phase 2.
