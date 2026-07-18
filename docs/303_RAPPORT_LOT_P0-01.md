# 303 — Rapport de fin de lot · P0-01 « Stabilisation du socle »

| **Lot** | P0-01 (backlog 229) |
| ------- | ------------------- |
| Statut  | ✅ Terminé — build & lint OK |
| Date    | 2026-07-09 |
| Branche | `claude/repo-sync-7rrtyt` (PR #35) |
| Plan    | `302_PLAN_LOT_P0-01_STABILISATION_SOCLE.md` |
| Process | Master prompt `000` — étape 8 (rapport de fin de lot) |

---

## 1. Résumé

Alignement de l'application existante avec les référentiels **sans nouvelle fonctionnalité** :
navigation réconciliée avec les pages réelles, liens morts masqués (réactivables), marque
« EJ Partners Assurances » harmonisée en UI, vocabulaire « Dossier »→« Projet » ciblé,
garde de rôle route-level sur `/admin/*`, suppression des fichiers obsolètes.

**Aucune migration base de données. Aucune API modifiée. Aucun contenu légal/contractuel touché.**

## 2. Objectif (rappel)

Critères d'acceptation 229 : aucun lien mort · terminologie homogène · navigation cohérente ·
aucun module orphelin. → **Atteints** (voir §7).

## 3. Fichiers modifiés (44)

**Navigation & sécurité (cœur)**
- `src/components/app-shell.tsx` — refonte du menu : flag `hidden` (24 liens morts masqués,
  réactivables), 16 pages réelles liées, correction mandataire/prescripteur, Paramètres masqué
  côté cabinet (page absente), libellé « Statuts de projet ».
- `src/app/admin/layout.tsx` — **garde de rôle route-level** `requireRole(["admin","courtier"])`
  (couvre les 5 pages client-only non gardées + défense en profondeur sur tout `/admin/*`).

**Branding « EJ Partners Assurances » (UI, 40 fichiers)**
- Layout/SEO : `src/app/layout.tsx`, `src/components/seo/structured-data.tsx`, `src/app/globals.css`.
- Pages publiques : `a-propos`, `page.tsx` (accueil), `guides`, `contact`, `conseils-actus`,
  `familles-recomposees`, `assurance-vie-patrimoine`, `devis/emprunteur/*`, `connexion/*`,
  `mot-de-passe-oublie`, `reinitialiser-mot-de-passe/*`.
- Écrans admin : `admin/page`, `stats`, `partenaires/*`, `vente/ged/*`, `ia/anonymisation`,
  `clients/*`, `lettres-mission`, `workflows/trottinette`.
- Composants/serveur : `borrower-savings-simulator`, `forms/client-form`, `lib/auth`,
  `lib/actions/{clients,partners,projects}`, `api/invite-client`, `actions/contact-intake`
  (objet d'email uniquement).

**Vocabulaire Dossier→Projet (ciblé UI)**
- `src/app/admin/workflows/page.tsx` — « Statuts de dossier »→« Statuts de projet » (×2).
- `src/components/client-project-workflow.tsx` — « projets clos » (cohérence).
- `src/components/app-shell.tsx` — libellé masqué « Statuts de projet ».

## 4. Fichiers supprimés (2)
- `src/pages/confidentialite.astro` — résidu Astro jamais référencé (Next sert `app/confidentialite/page.tsx`).
- `src/components/client-directory-360.tsx` — composant mort (0 import).

## 5. Base de données / API
- **Base de données** : aucune migration, aucun changement de schéma/RLS. Enum `app_role` inchangé.
- **API** : aucune route/capacité modifiée. La garde ajoutée renforce l'existant (`requireRole`).

## 6. Contenus sensibles PRÉSERVÉS (non modifiés, signalés comme demandé)
Ces occurrences « EJ Assurances » ont été **volontairement conservées** (légal / réglementaire /
contractuel / consentement) — à traiter séparément avec validation dédiée :
- `src/app/mentions-legales/page.tsx` (7) — mentions légales (raison sociale, responsabilité).
- `src/app/conformite/page.tsx` (2) — dont énoncé réglementaire ORIAS.
- `src/app/client/lettre-mission/[id]/page.tsx` (1) — document contractuel (lettre de mission).
- `src/app/actions/contact-intake.ts` (2) — **textes de consentement RGPD** (`consent_text`, preuve stockée).

## 7. Tests réalisés & résultats

| Test | Commande | Résultat |
|---|---|---|
| Lint | `npx eslint` | ✅ **0 erreur** (22 warnings préexistants, hors périmètre) |
| Build | `npm run build` | ✅ **Succès** — toutes les routes compilent |
| Liens masqués → pages inexistantes | script de vérif | ✅ 24/24 pointent bien vers des routes absentes (aucune page réelle masquée) |
| Liens visibles → pages réelles | build + inventaire | ✅ les 16 pages orphelines liées existent |
| Terminologie « EJ Assurances » | `grep` | ✅ ne subsiste que dans les 4 fichiers sensibles préservés |
| Garde de rôle `/admin/*` | build (routes ƒ dynamiques) | ✅ layout async `requireRole` actif |

> Tests d'exécution E2E manuels (parcours réel navigateur) non réalisés dans cet environnement ;
> le build Next valide le rendu/compilation. Preview Vercel disponible sur la PR pour contrôle visuel.

## 7bis. Tableau récapitulatif (navigation cabinet)

| Métrique | Valeur |
|---|---|
| Liens **actifs** (visibles, tous pointant vers une page réelle) | **38** |
| Liens **masqués** (`hidden: true`, modules non développés, réactivables) | **24** |
| Liens **recâblés / ajoutés** (pages réelles auparavant orphelines, désormais reliées) | **16** |
| **Pages admin réelles** accessibles (hors segments dynamiques) | **34** |
| **Anomalies restantes** (cf. §9) | **8** |

**Mécanisme de masquage (règle 1)** : flag `hidden?: boolean` sur chaque entrée de menu,
filtré au rendu (`links.filter((l) => !l.hidden)`). Documenté par un commentaire en tête de
`app-shell.tsx`. **Réactivation = passer `hidden` à `false`** (aucune réécriture du menu).

## 8. Impacts
- **Navigation** : le menu cabinet ne montre plus que des liens fonctionnels ; modules non
  développés masqués mais conservés dans le code (réactivation = `hidden: false`).
- **Sécurité** : toutes les pages `/admin/*` sont désormais gardées au niveau route (`/admin/*`
  devient rendu dynamique — léger surcoût d'auth par requête, attendu et voulu).
- **SEO** : le nom d'organisation JSON-LD passe à « EJ Partners Assurances » (changement de marque assumé).

## 9. Risques & dette technique
- 🟢 Faible : renommage terminologique volontairement conservateur ; contenus sensibles préservés.
- 🟡 Dette : les 4 variantes restantes de fiche/annuaire client (`client-file`, `client-file-360`,
  `client-file-360-live`, `client-directory`) subsistent → consolidation prévue en P0-02/P1.
- 🟡 Dette : ~90 occurrences « dossier » légitimes non touchées (Drive folder, emprunteur,
  réglementaire) → harmonisation fine à traiter en **P1-02 (Refonte Projet)**.

## 9bis. Anomalies restantes découvertes (non corrigées — règle 3)

Conformément à la consigne, ces anomalies identifiées pendant le développement **ne sont pas
corrigées automatiquement** ; elles sont listées avec leur criticité.

| # | Anomalie | Criticité | Traitement proposé |
|---|---|---|---|
| 1 | Contenus sensibles à rebrander (mentions légales, énoncé ORIAS, lettre de mission, textes de consentement RGPD) — nécessitent validation juridique | **Important** | Lot dédié « raison sociale » |
| 2 | Journal d'audit : 5/13 actions couvertes, sans écran (spec 226) | **Important** | P0-02 |
| 3 | Logique métier dans l'UI (`forms/client-form`, `economies-counter` accèdent Supabase en direct) — viole 227 §3 | **Important** | P0-02 / P1 |
| 4 | Pas de page admin de gestion Mandataires/Prescripteurs (entrées menu masquées) | **Important** | P1 / P2 |
| 5 | Pas de page Paramètres cabinet (Moteur de Paramétrage 224 non livré, lien masqué) | **Important** | P0-02+ |
| 6 | 4 variantes restantes de fiche/annuaire client (redondance) | **Confort** | P0-02 / P1 |
| 7 | ~90 occurrences « dossier » légitimes non harmonisées (Drive folder, vertical emprunteur, réglementaire) | **Confort** | P1-02 (Refonte Projet) |
| 8 | 22 warnings lint préexistants (variables inutilisées, fichiers hors périmètre) | **Confort** | au fil de l'eau |

> Aucune anomalie **Critique** (bloquante) identifiée : l'application compile, se déploie et
> la navigation est cohérente.

## 9ter. Vérifications finales exécutées (règle 4)

| Vérification | Résultat |
|---|---|
| Lint (`npx eslint`) | ✅ 0 erreur (22 warnings préexistants) |
| Build (`npm run build`) | ✅ Compiled successfully (exit 0) |
| Routes (liens visibles → page réelle) | ✅ 38/38 valides ; 24/24 masqués → pages absentes |
| Gardes de rôle (`/admin/*`) | ✅ layout `requireRole` actif + 32/37 pages en défense en profondeur |

## 10. Recommandations pour le lot suivant (P0-02 — Composants transverses)
1. **Gestion des mentions sensibles** : prévoir un lot dédié « raison sociale » pour statuer sur
   les 4 fichiers légaux/contractuels préservés (mentions légales, ORIAS, lettre de mission, consentements),
   avec validation juridique — ne pas le faire au fil de l'eau.
2. **Consolider les fiches client** (5→1 variante canonique) avant de brancher les composants transverses.
3. **Gestion Mandataires/Prescripteurs** : les entrées menu `/admin/mandataire` et `/admin/prescripteur`
   sont masquées faute de page d'administration dédiée. Décider en P1/P2 : créer une vraie page admin
   de gestion, ou pointer vers les espaces existants.
4. **Module Paramétrage (spec 224)** : le lien « Paramètres » cabinet est masqué faute de page —
   à livrer avec le Moteur de Paramétrage.
5. **Journal d'audit systématique (spec 226)** : prérequis transverse à installer tôt en P0-02
   (branchement sur les 8 actions actuellement non journalisées, cf. audit 300/301).

---

> Lot P0-01 clôturé sous réserve de la validation gouvernance. Prêt à enchaîner sur P0-02
> après feu vert, selon le même processus (analyse → plan → validation → développement).
