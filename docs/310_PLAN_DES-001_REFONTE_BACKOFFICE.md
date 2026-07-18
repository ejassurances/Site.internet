# 310 — Plan DES-001 · Refonte visuelle du back-office EJ Partners

| **Lot** | DES-001 (préalable à P0-02) |
| ------- | --------------------------- |
| Statut  | 📋 Plan — **en attente de validation** |
| Date    | 2026-07-09 |
| Objectif | Améliorer fortement l'apparence du back-office **sans toucher** logique métier, API, base de données, workflows |
| Branche | `claude/repo-sync-7rrtyt` |
| Process | Master prompt `000` — analyse → plan → **validation** avant code |

---

## 0. Contraintes (rappel)

- ❌ Aucune logique métier · ❌ aucune base de données · ❌ aucune API · ❌ aucune route cassée.
- ✅ Respect du branding **EJ Partners Assurances**.
- 🎯 Priorité : back-office **moderne, sobre, premium, lisible, professionnel**.
- **Nature du lot** : exclusivement **CSS + `className` + structure JSX de présentation**.
  Aucune modification de `src/lib/actions/*`, `src/app/api/*`, `supabase/*`.

---

## 1. Diagnostic de l'interface actuelle

### 1.1 Fondations — tokens éclatés
`src/app/globals.css` (**4132 lignes**) contient **3 systèmes de couleurs concurrents** :
- **Fintech** bleu/violet : `--accent-blue #3B82F6`, `--accent-purple #8B5CF6`, `--gradient-btn` bleu→violet.
- **Navy/Gold premium** : `--navy #071625`, `--gold #C9A86A`, `--accent #B9925E` (bronze), `--accent-strong #2F6F73` (teal), police Geist.
- **CRM** bleu : `--crm-accent #2f6df0`, `--crm-bg`, `--crm-surface`…

→ Trois identités visuelles se superposent, sans hiérarchie ni cohérence.

### 1.2 Couleurs codées en dur (pas de sémantique)
Les statuts et accents sont **hardcodés** dans les composants, pas tokenisés :
`#10b981` (×34), `#ef4444` (×22), `#f59e0b`, `#3B82F6` **et** `#3b82f6` (même couleur, deux casses), `#0F172A`…
→ Impossible de garantir une cohérence ; un changement de palette = chasse manuelle.

### 1.3 Styles inline massifs
**301 occurrences de `style={{…}}`** réparties sur **36 fichiers**, y compris le scaffold
partagé `admin-module-page.tsx` et le shell `app-shell.tsx`.
→ Pas de source de vérité, duplication, maintenance coûteuse, incohérences d'espacement.

### 1.4 Nommage de classes fragmenté
Coexistence de familles ad hoc : `admin-home-*`, `admin-client-*`, `admin-module-*`, `crm-*`.
→ Pas de système de composants réutilisable.

### 1.5 Problèmes UI/UX observés (synthèse)
| Domaine | Problème |
|---|---|
| **Navigation** | Sidebar navy correcte, mais densité/hiérarchie perfectibles ; header workspace en styles inline |
| **Couleurs** | 3 palettes concurrentes + hardcodes → incohérence, rendu « patchwork » |
| **Espaces** | Échelle d'espacement non systématisée (valeurs px arbitraires inline) |
| **Cartes** | Plusieurs styles de cartes (`admin-module-card`, `admin-home-*`, inline) non harmonisés |
| **Tableaux** | Pas de composant tableau unifié ; lisibilité/alignement des chiffres variables |
| **Formulaires** | Styles d'inputs/labels/aides hétérogènes selon les écrans |
| **Lisibilité** | Contrastes et tailles non contrôlés (hardcodes) → risque accessibilité |
| **Cohérence** | Badges de statut, boutons, alertes réimplémentés localement |

### 1.6 Risque transverse identifié
`globals.css` est **partagé entre le site public et le back-office**. Toute modification de
tokens globaux impacterait le site vitrine (hors périmètre, branding sensible).

---

## 2. Proposition de design cible

**Direction : un cabinet premium, sobre et sérieux — “assurance de confiance”.**
Une **seule** identité, dérivée de la marque EJ Partners déjà posée (navy + accent sobre + or discret).

> Note : la spec `021_DESIGN_SYSTEM` liste les rubriques mais **ne fige pas les palettes**
> (« à préciser plus tard »). DES-001 propose donc la palette ci-dessous **pour validation**.

### 2.1 Palette unique proposée (à valider)
| Rôle | Token | Valeur proposée |
|---|---|---|
| Fond application (workspace) | `--bo-bg` | `#F7F8FA` (neutre clair) |
| Surface (cartes) | `--bo-surface` | `#FFFFFF` |
| Surface douce | `--bo-surface-soft` | `#F1F3F6` |
| Bordure | `--bo-border` | `#E3E7ED` |
| Sidebar (fond) | `--bo-nav` | `#071625` (navy marque) |
| Texte principal | `--bo-text` | `#0F172A` |
| Texte secondaire | `--bo-muted` | `#5B6B7D` |
| **Accent primaire** | `--bo-accent` | `#2F6F73` (teal profond, sobre) |
| **Accent premium** | `--bo-gold` | `#C9A86A` (touches : VIP, mises en avant) |
| Succès | `--bo-success` | `#0F7B5A` |
| Attention | `--bo-warning` | `#B7791F` |
| Danger | `--bo-danger` | `#C0392B` |
| Info | `--bo-info` | `#2F6F73` |

Abandon, côté back-office, des palettes Fintech bleu/violet et CRM bleu au profit de ce jeu unique.
*(Alternative possible : accent primaire bleu profond plutôt que teal — à trancher, voir §7.)*

### 2.2 Principes visuels
- **Sobriété** : peu de couleurs, beaucoup de blanc, accents mesurés ; l'or réservé aux mises en avant.
- **Hiérarchie** : titres nets (Geist), gris de texte contrôlés, densité tabulaire lisible.
- **Espacement systématique** : échelle 4 / 8 / 12 / 16 / 24 / 32 (tokens `--sp-*`).
- **Élévation douce** : ombres existantes `--shadow-sm/md` conservées, rayons 8/12.
- **États clairs** : hover/focus visibles, focus accessibles (AA).

### 2.3 Scoping (mitigation du risque §1.6)
Les nouveaux tokens et styles back-office sont **portés par un conteneur racine** (`.app-layout`
déjà présent sur l'espace connecté). Le site public **n'est pas touché** : ses tokens et classes
restent inchangés. Aucune variable globale du public n'est redéfinie.

---

## 3. Composants à harmoniser (catalogue back-office)
1. **Shell** — sidebar (navigation, groupes, actifs), footer sidebar.
2. **Header workspace** — eyebrow, titre, recherche, notifications, badge rôle.
3. **Breadcrumb** (fil d'Ariane).
4. **Cartes** — carte module, carte KPI/stat, carte focus, carte liste client.
5. **Tableaux** — composant `data-table` unifié (en-têtes, zebra, alignement chiffres, actions ligne).
6. **Formulaires** — labels, inputs, selects, aides, états d'erreur/succès.
7. **Badges de statut** — mappés sur les tokens sémantiques (success/warning/danger/info).
8. **Boutons** — primaire / secondaire / fantôme / danger, tailles cohérentes.
9. **Alertes & bannières** — info/succès/attention/danger.
10. **États vides & chargement** — placeholders sobres (remplace le “Module en développement” inline).

---

## 4. Fichiers concernés (présentation uniquement)
**Fondations**
- `src/app/globals.css` — consolidation des tokens back-office + classes composants, sous scope `.app-layout` ; **sans toucher** les blocs du site public.

**Structure / scaffold**
- `src/components/app-shell.tsx` — styles inline → classes (aucune logique modifiée).
- `src/components/admin-module-page.tsx` — scaffold : inline → classes.

**Écrans back-office (migration inline → classes, par phases)**
- 36 fichiers `src/app/admin/**` et `src/components/**` contenant des `style={{…}}` / hardcodes
  (dashboard, clients, finance, stats, conformité, IA, vente/GED, workflows, partenaires…).

**Explicitement NON touchés**
- `src/lib/**`, `src/app/api/**`, `supabase/**` (aucun).
- Pages publiques `src/app/(public)` et leurs styles (site vitrine inchangé).
- Aucune `href`/route, aucun `requireRole`, aucun appel de données.

---

## 5. Plan d'exécution en étapes (chaque phase = commit vérifiable)
- **Phase 1 — Fondations tokens** : palette unique + tokens sémantiques + échelle d'espacement, scoping `.app-layout`. *(Risque contenu, base de tout le reste.)*
- **Phase 2 — Shell & navigation** : sidebar + header workspace + breadcrumb en classes. *(Le plus visible.)*
- **Phase 3 — Cartes & données** : cartes module/KPI + composant `data-table` + badges de statut.
- **Phase 4 — Formulaires** : inputs/labels/états, harmonisation.
- **Phase 5 — Migration inline → classes** page-type par page-type + polish (espacements, hover/focus, états vides).
- **Phase 6 — Vérifications finales + rapport de fin de lot.**

Chaque phase : soumise, testée, poussée ; regression visuelle contrôlée via preview Vercel.

---

## 6. Risques & mitigations
| Risque | Niveau | Mitigation |
|---|---|---|
| `globals.css` partagé → casser le site public | 🟠 Moyen | **Scoping** sous `.app-layout` ; ne pas redéfinir les tokens publics ; contrôle visuel des pages publiques avant/après |
| Régressions visuelles (301 inline à migrer) | 🟠 Moyen | Migration **par phases** et par type de page ; preview Vercel à chaque étape |
| Contraste / accessibilité | 🟡 Faible | Palette validée AA ; vérif focus/contrastes |
| Diff volumineux difficile à relire | 🟡 Faible | **Commits phasés** (tokens → shell → composants → migration) |
| Dérive hors périmètre (toucher la logique) | 🟢 Faible | Règle stricte : `className`/CSS/JSX de présentation uniquement |

---

## 7. Décisions requises avant code
- **D1 — Accent primaire** : teal profond `#2F6F73` (recommandé, sobre cabinet) **ou** bleu profond ?
- **D2 — Rôle de l'or** : touches premium discrètes (VIP, mises en avant) — OK ou éviter ?
- **D3 — Ampleur Phase 5** : migrer **tous** les écrans back-office maintenant, ou se limiter d'abord
  aux écrans les plus utilisés (dashboard, clients, finance, stats) et étaler le reste ?
- **D4 — Mockup visuel** : souhaites-tu d'abord une **maquette cliquable** (artifact HTML) du design
  cible avant de valider, pour juger sur pièce ?

---

## 8. Tests prévus (règle 4 du process)
- **Lint** (`npx eslint`) : 0 erreur.
- **Build** (`npm run build`) : succès, aucune route cassée.
- **Vérification des routes** : liens/nav inchangés (CSS-only) ; contrôle qu'aucune structure JSX n'est rompue.
- **Vérification des gardes de rôle** : `/admin/*` toujours protégé (inchangé).
- **Non-régression site public** : contrôle visuel de pages vitrine clés (accueil, expertise, contact).
- **Accessibilité** : contrastes AA sur surfaces principales, focus visibles.
- **Contrôle visuel** : preview Vercel à chaque phase.

---

> Aucune modification tant que ce plan (et les décisions D1–D4) ne sont pas validés.
> À validation, exécution phasée sur `claude/repo-sync-7rrtyt` + rapport de fin de lot conforme au master prompt.
