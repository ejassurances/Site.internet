# 313 — Rapport de phase · DES-001 / Phase 3 (Dashboard)

| **Lot** | DES-001 — Refonte visuelle back-office |
| ------- | -------------------------------------- |
| Phase   | **3 / 6 — Dashboard** |
| Statut  | ✅ Terminée — lint & build OK |
| Date    | 2026-07-09 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |

---

## 1. Objectif
Appliquer le Design System DES-001 au **Dashboard** (`/admin`) et améliorer hiérarchie,
lisibilité et productivité, **sans modifier données, logique, API, base ni route**.

## 2. Fichiers modifiés (3)
- `src/app/admin/page.tsx` — refonte **présentation uniquement** ; `requireRole`,
  `getAccessibleClients`, `getEmprunteurStats` **inchangés** (0 appel Supabase/API ajouté).
- `src/app/globals.css` — **+116 lignes** : composants Dashboard `bo-*` (KPI, cartes, listes,
  modules, états « à connecter »), scopés `.app-layout`.
- `src/components/app-shell.tsx` — ajustement **chip** validé (avatar initiales + prénom·initiale + rôle discret).

## 3. Composants créés
- **Barre « Votre journée »** (marine) : résumé actionnable en **données réelles**
  (dossiers emprunteur à traiter · nouveaux cette semaine · clients au portefeuille) + actions.
- **KPI actionnables** (`bo-kpi`) : Portefeuille clients, Dossiers emprunteur, Convertis CRM,
  Nouveaux cette semaine — chacun **cliquable** vers le module concerné, chiffres tabulaires.
- **À traiter en priorité** (`bo-urgent`) : les dossiers emprunteur à convertir/relancer
  (donnée réelle `non_convertis`) avec CTA — matérialise **urgences / relances**.
- **Derniers clients** (`bo-list`) : liste réelle (5 clients) avec avatars.
- **À venir sur votre tableau de bord** (`bo-soon`) : Tâches & relances, Projets à traiter,
  Contrats à échéance, Notifications — **états « À connecter » honnêtes** (aucune donnée factice).
- **Actions rapides** + **Modules cabinet** (`bo-modcard`) restylés.
- **Chip utilisateur** : avatar initiales + « Prénom N. » + rôle discret.

## 4. Réponse aux priorités demandées
| Priorité demandée | Traitement |
|---|---|
| Vue claire de la journée | ✅ Barre « Votre journée » (données réelles) |
| Urgences | ✅ Carte « À traiter en priorité » (dossiers emprunteur réels) |
| Tâches et relances | 🟡 **Placeholder « À connecter »** (nécessite câblage données — hors périmètre visuel) |
| Projets à traiter | 🟡 Placeholder « À connecter » (pas de requête projets sur cet écran aujourd'hui) |
| Contrats à échéance | 🟡 Placeholder « À connecter » |
| Notifications importantes | 🟡 Placeholder « À connecter » |
| KPI utiles et actionnables | ✅ 4 KPI réels cliquables |

> Les items « À connecter » sont affichés **sans donnée fabriquée** : ils dessinent l'architecture
> cible du Dashboard et **appellent un lot fonctionnel** (requêtes tâches/projets/contrats/notifs)
> qui, lui, touchera la logique/BDD — hors du périmètre visuel DES-001.

## 5. Tests réalisés & résultats
| Test | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (22 warnings préexistants) |
| Build (`npm run build`) | ✅ Compiled successfully (exit 0) |
| Routes | ✅ 6/6 liens du Dashboard → cibles réelles ; aucune route modifiée |
| Gardes de rôle | ✅ `requireRole(["admin","courtier"])` intact |
| Données / logique | ✅ fetch inchangé ; **0 appel Supabase/API ajouté** |
| Impact site public | ✅ nul (classes `bo-*` scopées `.app-layout`) |
| Autres écrans admin | ✅ non touchés (seul `/admin` restylé) |
| Preview visuelle | ✅ capture desktop (jointe) |

## 6. Écarts constatés
- **4 panneaux « À connecter »** : choix assumé pour refléter les priorités demandées sans
  fabriquer de données. À transformer en vraies vues lors d'un **lot fonctionnel** dédié.
- **Ancien CSS Dashboard** (`admin-home-*`, `admin-quick-grid`…) désormais inutilisé sur `/admin`
  → **nettoyage planifié en fin de lot**.
- Les modules cabinet affichent encore des libellés de « stat » indicatifs (Portefeuille, KPIs…)
  non chiffrés — inchangés (présentation).

## 7. Recommandations pour la suite
1. **Phase 4 (Clients)** : appliquer `bo-*` à la liste Clients + fiche client (le pivot).
2. Planifier un **lot fonctionnel « Dashboard données »** pour câbler Tâches/relances,
   Projets à traiter, Contrats à échéance, Notifications (touche la logique/BDD → hors DES-001).
3. Prévoir la **phase de nettoyage** de l'ancien CSS une fois les 4 écrans migrés.

---

> Phase 3 clôturée. **Arrêt avant la Phase 4**, comme demandé — en attente de revue.
