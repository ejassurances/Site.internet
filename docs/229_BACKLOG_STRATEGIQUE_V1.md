# 229_BACKLOG_STRATEGIQUE_V1

# Backlog Stratégique V1 d'EJ Partners

Version : 1.0

Statut : Référentiel de Pilotage

---

# Objet

Le présent document constitue le plan officiel de construction de la première version d'EJ Partners.

Il définit :

- les lots de développement ;
- leur ordre d'exécution ;
- leurs dépendances ;
- leurs critères d'acceptation.

Aucun développement structurant ne doit être entrepris en dehors de ce backlog sans validation de la gouvernance.

---

# Principes

Le backlog est construit selon les principes suivants :

- développer le socle avant les fonctionnalités ;
- privilégier les composants réutilisables ;
- limiter les régressions ;
- respecter les référentiels 227 et 228 ;
- livrer des incréments fonctionnels cohérents.

---

# Méthode de priorisation

Chaque lot est évalué selon :

- Valeur métier
- Impact architectural
- Dépendances
- Complexité
- Risque
- Réutilisabilité

La priorité est exprimée selon quatre niveaux :

P0 : Bloquant

P1 : Critique

P2 : Important

P3 : Confort


# Phase 0 — Fondations (Terminée)

Objectif :

Construire les référentiels.

Statut :

✅ Terminé

Documents :

198 → 228

# Phase 1 — Stabilisation du socle

Objectif :

Rendre le logiciel cohérent avec les référentiels sans créer de nouvelles fonctionnalités.

Priorité :

P0
# Phase 2 — Composants transverses

Objectif :

Construire les briques réutilisables.

Priorité :

P0
# Phase 3 — Refonte du modèle métier

Objectif :

Aligner le modèle de données.

Priorité :

P1

# Phase 4 — Moteurs

Objectif :

Construire les moteurs transverses.

Priorité :

P1

# Phase 5 — Capacités métier

Objectif :

Compléter les fonctionnalités métier.

Priorité :

P2# Phase 6 — IA

Objectif :

Déployer les services IA.

Priorité :

P2

# Phase 7 — Écosystème

Objectif :

Ouverture.

Priorité :

P3


## LOT P1-03

Nom

Commentaires

Objectif métier

Permettre de commenter tous les objets métier.

Référentiels

199
202
227
228

Dépendances

Client
Projet
Documents

Moteurs

Audit
Sécurité
Notifications

Tests

Unitaires

Intégration

E2E

Critères d'acceptation

✔ fonctionne sur tous les objets

✔ audité

✔ sécurisé

✔ documenté*



# Chapitre 3 — Catalogue des lots de développement

## Objet

Le présent chapitre décrit l'ensemble des lots constituant la V1 d'EJ Partners.

Chaque lot est autonome, possède un objectif métier, des dépendances et des critères d'acceptation.

Les lots sont réalisés dans l'ordre de priorité défini par le présent document.

---

# LOT P0-01 — Stabilisation du socle

## Objectif

Aligner l'application existante avec les référentiels sans créer de nouvelles fonctionnalités.

## Priorité

P0

## Référentiels

- 227_REFERENTIEL_ARCHITECTURE
- 228_REFERENTIEL_DEVELOPPEMENT

## Travaux

- Vérifier la navigation
- Corriger les liens cassés
- Harmoniser la terminologie métier
- Vérifier les permissions
- Vérifier les rôles
- Vérifier les routes
- Supprimer les éléments obsolètes

## Critères d'acceptation

- Aucun lien mort
- Terminologie homogène
- Navigation cohérente
- Aucun module orphelin

---

# LOT P0-02 — Composants transverses

## Objectif

Créer les composants réutilisables par tous les modules.

## Travaux

- Commentaires
- Favoris
- Tags
- Priorités
- Historique
- Pièces jointes
- Vues enregistrées
- Recherche globale
- Notifications

## Critères

Tous les composants sont :

- indépendants ;
- sécurisés ;
- audités ;
- réutilisables.

---

# LOT P1-01 — Refonte du modèle Client

## Objectif

Appliquer le modèle métier officiel.

## Travaux

- Prospect = Statut Client
- États du client
- Historique des statuts
- Adaptation des écrans
- Adaptation des API

## Dépendances

198_MODELE_METIER

---

# LOT P1-02 — Refonte Projet

## Objectif

Faire du Projet le pivot de toute la relation commerciale.

## Travaux

- Vérification des dépendances
- Liaison Contrats
- Liaison Activités
- Liaison Documents
- Liaison Produits

---

# LOT P1-03 — Refonte Contrats

## Objectif

Rattacher systématiquement les contrats à un Projet.

## Travaux

- Migration
- API
- Écrans
- Reporting
- Audit

---

# LOT P1-04 — Catalogue Produits

## Objectif

Créer le référentiel Produits officiel.

## Travaux

- Familles
- Produits
- Garanties
- Options
- API compagnies
- Recherche Produits

---

# LOT P2-01 — Opportunités

## Objectif

Créer le pipeline commercial.

---

# LOT P2-02 — Sinistres

## Objectif

Créer le module Sinistres.

---

# LOT P2-03 — Renouvellements

## Objectif

Créer le moteur de renouvellement.

---

# LOT P2-04 — Résiliations

## Objectif

Créer le moteur de résiliation.

---

# LOT P2-05 — Signature électronique

## Objectif

Intégrer la signature électronique.

---

# LOT P2-06 — GED avancée

## Objectif

Étendre le moteur documentaire.

---

# LOT P2-07 — Données Dashboard

## Objectif

Câbler les données réelles des panneaux du tableau de bord, aujourd'hui présents en
placeholders « À connecter » (structure livrée en DES-001 Phase 3, masquée par flag).

## Périmètre

- Tâches et relances
- Projets à traiter
- Contrats à échéance
- Notifications importantes

## Nature

Lot **fonctionnel** (touche la logique / la base de données / les requêtes), distinct de la
refonte visuelle DES-001. Réactive les panneaux via le flag `SHOW_DASHBOARD_PLACEHOLDERS`
une fois les sources de données disponibles.

## Dépendances

- Composants transverses (Notifications, Activités) — P0-02
- Modèle Projet / Contrat — P1-02 / P1-03

---

# LOT P3-01 — IA documentaire

## Objectif

Analyse documentaire assistée.

---

# LOT P3-02 — IA commerciale

## Objectif

Assistance au développement commercial.

---

# LOT P3-03 — IA conformité

## Objectif

Assistance réglementaire.

---

# LOT P3-04 — Extension Chrome

## Objectif

Réintégrer l'extension Chrome dans l'architecture officielle.

Cette capacité est déjà identifiée mais doit être refondue conformément aux référentiels 227 et 228.

---

# LOT P3-05 — Application Mobile

## Objectif

Créer l'application mobile EJ Partners.

---

# LOT P3-06 — API partenaires

## Objectif

Ouvrir progressivement la plateforme aux partenaires externes.

---

# Critères de validation

Chaque lot ne peut être clôturé que si :

- les développements sont terminés ;
- les tests sont validés ;
- les référentiels sont respectés ;
- la documentation est mise à jour ;
- les critères d'acceptation sont atteints.

# Chapitre 4 — Cycle de vie des lots

## Objet

Chaque lot de développement suit un cycle de vie standardisé.

Ce cycle garantit que les évolutions sont conçues, développées, testées et validées de manière homogène.

Aucun lot ne peut passer à l'étape suivante sans satisfaire les critères de la phase en cours.

---

# Étape 1 — Planifié

Le lot est inscrit au backlog.

Les objectifs métier sont définis.

Les dépendances sont identifiées.

Les référentiels applicables sont connus.

---

# Étape 2 — Analyse

Une analyse préalable est réalisée.

Elle comprend notamment :

- étude de l'existant ;
- impacts métier ;
- impacts techniques ;
- impacts réglementaires ;
- impacts sur l'architecture.

Aucun développement ne commence avant validation de cette analyse.

---

# Étape 3 — Conception

La solution est conçue conformément :

- au Référentiel d'Architecture (227) ;
- au Référentiel de Développement (228).

Les capacités, moteurs, objets métier et dépendances sont identifiés.

---

# Étape 4 — Développement

Le développement est réalisé conformément aux conventions du projet.

Les évolutions sont :

- documentées ;
- testées ;
- auditées ;
- sécurisées.

---

# Étape 5 — Validation technique

Les contrôles suivants sont notamment réalisés :

- compilation ;
- lint ;
- tests ;
- revue de code ;
- conformité aux référentiels.

---

# Étape 6 — Validation fonctionnelle

Le lot est validé au regard :

- des spécifications ;
- des critères d'acceptation ;
- des scénarios métier.

Les utilisateurs référents peuvent participer à cette validation.

---

# Étape 7 — Déploiement

Le lot est intégré dans la version cible.

Le déploiement suit les procédures définies dans le Référentiel de Développement.

---

# Étape 8 — Clôture

Le lot est clôturé lorsque :

- toutes les validations sont obtenues ;
- la documentation est à jour ;
- les référentiels sont respectés ;
- le Journal d'Audit est opérationnel ;
- les critères d'acceptation sont satisfaits.

---

# États possibles

Chaque lot possède un état unique :

- 📋 À planifier
- 📌 Planifié
- 🔍 En analyse
- 🏗️ En conception
- 💻 En développement
- 🧪 En validation technique
- ✅ En validation fonctionnelle
- 🚀 Déployé
- ✔️ Clôturé
- ⛔ Suspendu
- ❌ Abandonné

---

# Critères de validation

Le cycle de vie est conforme lorsque :

- tous les lots suivent les mêmes étapes ;
- aucune étape n'est contournée ;
- les validations sont documentées ;
- la traçabilité est assurée.

# Chapitre 5 — Pilotage, feuille de route et gouvernance du backlog

## Objet

Le Backlog Stratégique constitue la feuille de route officielle du développement d'EJ Partners.

Il permet de piloter les évolutions de la plateforme, de prioriser les développements et de garantir leur cohérence avec la stratégie globale.

Le backlog est un document vivant, mis à jour tout au long du projet.

---

# Principe n°1 — Le backlog est la référence

Tout développement structurant doit être rattaché à un lot du Backlog Stratégique.

Aucune évolution majeure ne peut être réalisée sans être intégrée au backlog.

---

# Principe n°2 — Les priorités sont revues régulièrement

Les priorités peuvent évoluer en fonction :

- des besoins métier ;
- des obligations réglementaires ;
- des retours utilisateurs ;
- des contraintes techniques ;
- des opportunités stratégiques.

Toute modification de priorité est documentée.

---

# Principe n°3 — Feuille de route

Les développements sont répartis selon les versions de la plateforme.

Exemple :

## Version 1

Construction du socle fonctionnel.

## Version 2

Industrialisation, automatisation et ouverture.

## Version 3

Écosystème complet et intelligence artificielle avancée.

---

# Principe n°4 — Vision long terme

Les fonctionnalités peuvent évoluer progressivement.

Une capacité peut être :

- Basique (V1)
- Enrichie (V2)
- Avancée (V3)

Le backlog précise le niveau de maturité attendu pour chaque lot.

---

# Principe n°5 — Tableau de bord

Chaque lot comporte notamment :

- Identifiant
- Nom
- Priorité
- Phase
- Responsable
- État
- Dépendances
- Date prévue
- Date de réalisation
- Référentiels associés
- Version cible

---

# Principe n°6 — Indicateurs de pilotage

Le backlog permet notamment de suivre :

- nombre de lots terminés ;
- nombre de lots en cours ;
- taux d'avancement de chaque phase ;
- dette technique restante ;
- couverture des référentiels ;
- couverture des tests.

---

# Principe n°7 — Arbitrages

En cas de conflit entre plusieurs lots, les arbitrages privilégient :

1. La stabilité de la plateforme.
2. Les obligations réglementaires.
3. Les fondations techniques.
4. La valeur métier.
5. Les fonctionnalités de confort.

---

# Principe n°8 — Gouvernance

Le Backlog Stratégique est piloté par la gouvernance du projet.

Les décisions majeures sont prises en cohérence avec :

- le Référentiel d'Architecture ;
- le Référentiel de Développement ;
- les spécifications fonctionnelles.

---

# Critères de validation

Le Backlog Stratégique est conforme lorsque :

- tous les développements sont planifiés ;
- les priorités sont explicites ;
- les dépendances sont maîtrisées ;
- la feuille de route est cohérente ;
- les arbitrages sont documentés.


