# 312 — Rapport de phase · DES-001 / Phase 2 (Shell : sidebar + header)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **2 / 6 — Shell (sidebar + header)** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-09 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |

---

## 1. Objectif de la phase
Restyler le **cadre commun** de tout l'espace `/admin/*` (sidebar + header) avec le Design
System DES-001, pour une expérience cohérente, **sans toucher au contenu interne des pages**.

## 2. Fichiers modifiés (2)
- `src/components/app-shell.tsx` — refonte présentation (retrait des styles inline, header
  premium, tiroir mobile). **Toute la logique de navigation conservée** (liens, état actif,
  `hidden`, `requireRole` en amont, déconnexion POST, Paramètres conditionnel).
- `src/app/globals.css` — **+154 lignes** : bloc « DES-001 · Shell », scopé `.app-layout`,
  consommant les tokens `--bo-*`.

## 3. Composants créés / refactorisés
- **Sidebar** — fond bleu marine (identité), groupes de nav, **état actif teal** (au lieu de l'or),
  pied de sidebar (email + déconnexion) sans inline.
- **Header (topbar)** — barre **sticky** pleine largeur : recherche globale (champ, ⌘K),
  notifications (pastille), **chip utilisateur/rôle** (initiales + badge rôle teal).
- **Navigation & état actif** — inchangés fonctionnellement, restylés via tokens.
- **Responsive** — **tiroir mobile** (< 960 px) : sidebar off-canvas + burger + backdrop cliquable ;
  fermeture au clic sur un lien ; recherche condensée ; simplification < 560 px.
- **`.bo-page`** — conteneur d'inset du contenu : le header devient pleine largeur **sans modifier
  l'inset du contenu** des pages (padding équivalent conservé).

## 4. Respect des contraintes
| Contrainte | Respect |
|---|---|
| Périmètre shell (sidebar, header, nav, recherche, notifs, user/rôle, responsive) | ✅ |
| Aucune logique métier / API / BDD / route | ✅ (présentation + état UI local `menuOpen` uniquement) |
| Contenu interne des autres pages non restylé | ✅ enveloppé dans `.bo-page`, inset préservé |
| Pages hors périmètre conservent leur contenu dans le nouveau shell | ✅ |
| Impact nul site public | ✅ tout scopé `.app-layout` (la vitrine ne l'utilise pas) |
| Aucune amélioration hors périmètre | ✅ |

## 5. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (22 warnings préexistants) |
| Build (`npm run build`) | ✅ « Compiled successfully » (exit 0) |
| Routes | ✅ 33 liens visibles → pages réelles ; 24 liens masqués conservés ; aucun `href` modifié |
| Gardes de rôle | ✅ `admin/layout.tsx` `requireRole` intact ; logique `isAdmin` du shell intacte |
| Navigation desktop | ✅ structure et état actif conservés (build OK) |
| Navigation mobile | ✅ tiroir off-canvas + burger + backdrop + fermeture au clic |
| Styles inline dans le shell | ✅ **0** (étaient nombreux, tous migrés en classes) |
| Non-régression pages admin | ✅ contenu inchangé (frame seule modifiée, inset préservé) |

> Vérification **visuelle fine** (rendu réel) à faire sur la **preview Vercel** de la PR #35
> (espace `/admin` derrière authentification) — cf. §7.

## 6. Écarts constatés
- **Header sticky** : nouveau comportement (barre toujours visible). Choix productivité assumé
  (« courtier toute la journée dans l'app »). À confirmer en revue visuelle — réversible si besoin.
- **Ancien CSS du shell** (`.sidebar`, `.side-nav`, `.workspace-header`…) : partiellement
  **remplacé par cascade** (règles DES-001 en fin de fichier). Les anciennes règles subsistent
  (inertes sur le shell) → **nettoyage prévu en fin de lot** (principe « ajouter avant remplacer »).
- **Chip utilisateur** : n'affiche plus le nom en toutes lettres (initiales + rôle, nom en `title`)
  pour un header compact — ajustable si tu préfères le nom complet visible.

## 7. Preview visuelle
- **Preview Vercel de la PR #35** (déploiement du commit Phase 2) : rendu authentique du shell
  restylé sur l'espace `/admin/*` (connexion requise).
- **Maquette de référence** (déjà validée) : `artifact DES-001` — le shell réel suit cette direction.

## 8. Recommandations pour la Phase 3 (Dashboard)
1. Appliquer les tokens au **Dashboard** (`/admin`) : KPI cards, cartes, table « projets à traiter »,
   timeline — en introduisant les classes composants `bo-*` (première consommation dans le contenu).
2. Valider en revue le **header sticky** avant de généraliser.
3. Poursuivre l'approche additive + namespacée ; planifier le **nettoyage de l'ancien CSS shell**
   en fin de lot (phase dédiée) une fois toutes les surfaces migrées.

---

> Phase 2 clôturée. En attente de la **revue fonctionnelle et visuelle** avant la Phase 3 (Dashboard).
