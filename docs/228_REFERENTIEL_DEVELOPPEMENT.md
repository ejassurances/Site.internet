# 228_REFERENTIEL_DEVELOPPEMENT

# Référentiel de Développement d'EJ Partners

Version : 1.0

Statut : Référentiel Fondateur

---

# Objet

Le présent document définit les règles de développement applicables à l'ensemble des projets EJ Partners.

Il complète le Référentiel d'Architecture (227) en précisant les standards de développement, de qualité, de tests, de déploiement et de maintenance.

Tout développement réalisé sur EJ Partners doit respecter ce référentiel.

---

# Objectifs

Garantir :

- une base de code homogène ;
- une qualité constante ;
- une maintenance facilitée ;
- une intégration continue fiable ;
- une documentation synchronisée ;
- une dette technique maîtrisée.

---

# Périmètre

Ce référentiel s'applique notamment :

- au Frontend ;
- au Backend ;
- aux API ;
- aux moteurs ;
- aux orchestrateurs ;
- aux modules métier ;
- aux scripts ;
- aux migrations ;
- aux tests ;
- aux pipelines CI/CD.

# Chapitre 1 — Philosophie de développement

## Principe

Le développement d'EJ Partners repose sur une idée simple :

Le code est un moyen.

L'architecture est un cadre.

Le métier est la finalité.

---

## Valeurs

Chaque développement doit privilégier :

- la lisibilité ;
- la simplicité ;
- la robustesse ;
- la réutilisation ;
- la testabilité ;
- la sécurité ;
- la documentation.

---

## Règle fondamentale

Avant d'écrire du code, le développeur doit comprendre :

- le besoin métier ;
- la capacité concernée ;
- le moteur concerné ;
- les impacts éventuels.

Le code ne constitue jamais le point de départ d'une réflexion.

# Chapitre 2 — Organisation du dépôt Git

## Objet

Le dépôt Git constitue la source de vérité du code d'EJ Partners.

Son organisation doit garantir la lisibilité, la traçabilité des évolutions et la stabilité des développements.

---

# Dépôt principal

Le dépôt principal contient :

- le code source ;
- les spécifications ;
- les référentiels ;
- les scripts ;
- les migrations ;
- les tests ;
- la documentation technique.

Tous les éléments nécessaires à la plateforme doivent être versionnés, à l'exception des fichiers explicitement exclus.

---

# Arborescence

L'organisation du dépôt suit une structure cohérente.

Exemple :

- /apps
- /packages
- /docs
- /specifications
- /architecture
- /scripts
- /database
- /tests
- /infra
- /public

L'arborescence est documentée et reste stable dans le temps.

---

# Fichiers versionnés

Sont notamment versionnés :

- code source ;
- documentation ;
- migrations ;
- fichiers de configuration ;
- tests ;
- pipelines CI/CD ;
- modèles de données.

---

# Fichiers exclus

Ne sont jamais versionnés :

- secrets ;
- variables d'environnement locales ;
- caches ;
- dépendances générées ;
- fichiers temporaires ;
- artefacts de build.

Le dépôt utilise un `.gitignore` maintenu et documenté.

---

# Branches principales

Le dépôt comprend notamment :

- `main`
- `develop`

Les autres branches sont temporaires.

---

# Types de branches

Les conventions suivantes sont utilisées :

- `feature/`
- `bugfix/`
- `hotfix/`
- `release/`
- `refactor/`
- `docs/`
- `experiment/`

Chaque branche possède un objectif clairement identifié.

---

# Protection des branches

Les branches principales sont protégées.

Elles nécessitent notamment :

- une revue de code ;
- des tests réussis ;
- une intégration continue valide.

Les commits directs sur les branches protégées sont interdits, sauf exception documentée.

---

# Traçabilité

Chaque évolution doit pouvoir être reliée à :

- une spécification ;
- une capacité métier ;
- une Pull Request ;
- un ADR (si nécessaire).

---

# Critères de validation

L'organisation du dépôt est conforme lorsque :

- la structure est homogène ;
- les conventions de branches sont respectées ;
- les protections Git sont actives ;
- la traçabilité des évolutions est assurée.

# Chapitre 2 — Organisation du dépôt Git

## Objet

Le dépôt Git constitue la source de vérité du code d'EJ Partners.

Son organisation doit garantir la lisibilité, la traçabilité des évolutions et la stabilité des développements.

---

# Dépôt principal

Le dépôt principal contient :

- le code source ;
- les spécifications ;
- les référentiels ;
- les scripts ;
- les migrations ;
- les tests ;
- la documentation technique.

Tous les éléments nécessaires à la plateforme doivent être versionnés, à l'exception des fichiers explicitement exclus.

---

# Arborescence

L'organisation du dépôt suit une structure cohérente.

Exemple :

- /apps
- /packages
- /docs
- /specifications
- /architecture
- /scripts
- /database
- /tests
- /infra
- /public

L'arborescence est documentée et reste stable dans le temps.

---

# Fichiers versionnés

Sont notamment versionnés :

- code source ;
- documentation ;
- migrations ;
- fichiers de configuration ;
- tests ;
- pipelines CI/CD ;
- modèles de données.

---

# Fichiers exclus

Ne sont jamais versionnés :

- secrets ;
- variables d'environnement locales ;
- caches ;
- dépendances générées ;
- fichiers temporaires ;
- artefacts de build.

Le dépôt utilise un `.gitignore` maintenu et documenté.

---

# Branches principales

Le dépôt comprend notamment :

- `main`
- `develop`

Les autres branches sont temporaires.

---

# Types de branches

Les conventions suivantes sont utilisées :

- `feature/`
- `bugfix/`
- `hotfix/`
- `release/`
- `refactor/`
- `docs/`
- `experiment/`

Chaque branche possède un objectif clairement identifié.

---

# Protection des branches

Les branches principales sont protégées.

Elles nécessitent notamment :

- une revue de code ;
- des tests réussis ;
- une intégration continue valide.

Les commits directs sur les branches protégées sont interdits, sauf exception documentée.

---

# Traçabilité

Chaque évolution doit pouvoir être reliée à :

- une spécification ;
- une capacité métier ;
- une Pull Request ;
- un ADR (si nécessaire).

---

# Critères de validation

L'organisation du dépôt est conforme lorsque :

- la structure est homogène ;
- les conventions de branches sont respectées ;
- les protections Git sont actives ;
- la traçabilité des évolutions est assurée.

# Chapitre 3 — Standards de code

## Objet

Les standards de code définissent les règles de rédaction du code source afin de garantir une base homogène, lisible et maintenable.

Ils s'appliquent à tous les langages utilisés dans EJ Partners.

---

# Principe n°1 — Le code est écrit pour être lu

Le premier objectif d'un développeur n'est pas d'écrire du code.

C'est d'écrire un code compréhensible.

Le code sera lu bien plus souvent qu'il ne sera écrit.

---

# Principe n°2 — Le vocabulaire est métier

Les noms des composants utilisent le langage métier.

Exemples :

- Client
- Contrat
- Projet
- Produit
- Souscription

Les noms techniques ou génériques sont évités lorsqu'un terme métier existe.

---

# Principe n°3 — Les noms sont explicites

Les noms doivent permettre de comprendre immédiatement :

- le rôle ;
- la responsabilité ;
- le comportement.

Exemples :

✓ CreateContractCapability

✓ SendNotificationWorkflow

✗ Utils

✗ Manager

✗ Helper

---

# Principe n°4 — Une fonction réalise une seule action

Une fonction possède :

- une responsabilité unique ;
- une entrée clairement définie ;
- une sortie explicite.

Les fonctions trop longues doivent être découpées.

---

# Principe n°5 — Les commentaires expliquent les intentions

Les commentaires ne décrivent pas le code.

Ils expliquent :

- pourquoi une décision existe ;
- une règle métier particulière ;
- une contrainte réglementaire.

Le code doit être suffisamment explicite pour limiter les commentaires descriptifs.

---

# Principe n°6 — Les erreurs sont explicites

Les erreurs doivent :

- être compréhensibles ;
- être contextualisées ;
- être journalisées lorsque nécessaire.

Les messages destinés aux utilisateurs restent distincts des messages techniques.

---

# Principe n°7 — Les constantes sont centralisées

Les valeurs configurables ne sont jamais codées en dur.

Elles proviennent :

- du moteur Paramétrage ;
- des variables d'environnement ;
- des constantes documentées.

---

# Principe n°8 — Le code est formaté automatiquement

Le projet utilise des outils de formatage et d'analyse statique.

Le format du code est homogène pour tous les développeurs.

Les conventions sont appliquées automatiquement avant chaque intégration.

---

# Principe n°9 — Les avertissements sont traités

Les avertissements de compilation, de lint ou d'analyse statique ne sont pas ignorés sans justification.

Toute désactivation d'une règle est documentée.

---

# Principe n°10 — Le code reste simple

La solution la plus simple répondant correctement au besoin est privilégiée.

La complexité doit toujours être motivée par une nécessité métier ou technique.

---

# Critères de validation

Les standards sont respectés lorsque :

- le code est homogène ;
- les conventions de nommage sont appliquées ;
- les responsabilités sont claires ;
- les outils de qualité sont respectés.

# Chapitre 4 — Architecture des projets

## Objet

L'architecture des projets définit l'organisation des composants logiciels afin de garantir une structure homogène, modulaire et évolutive.

Chaque projet doit suivre les mêmes principes d'organisation.

---

# Principe n°1 — L'organisation suit le métier

Les dossiers sont organisés selon les domaines fonctionnels avant d'être organisés selon la technique.

Le métier constitue le premier niveau de structuration.

---

# Principe n°2 — Une architecture par fonctionnalités

Les composants liés à une même capacité métier sont regroupés.

Exemple :

Client

- capacités
- composants
- services
- validations
- tests

plutôt que :

Controllers

Services

Repositories

Models

mélangés pour toute l'application.

---

# Principe n°3 — Séparation des responsabilités

Chaque fonctionnalité distingue clairement :

- présentation ;
- orchestration ;
- logique métier ;
- accès aux données ;
- intégrations externes.

Aucune couche ne mélange plusieurs responsabilités.

---

# Principe n°4 — Les moteurs sont indépendants

Chaque moteur transverse possède son propre périmètre.

Il peut évoluer indépendamment des autres moteurs.

Les dépendances entre moteurs restent limitées.

---

# Principe n°5 — Les composants sont réutilisables

Les composants communs sont mutualisés dans des bibliothèques dédiées.

Ils ne dépendent pas d'un module métier particulier.

---

# Principe n°6 — Les dépendances sont orientées

Les dépendances suivent l'architecture définie dans le Référentiel d'Architecture.

Les composants ne dépendent jamais d'une couche supérieure.

---

# Principe n°7 — Les interfaces utilisent des contrats

Les interfaces communiquent avec le métier via des contrats clairement définis.

Les implémentations restent interchangeables.

---

# Principe n°8 — Les tests suivent l'architecture

Chaque fonctionnalité possède ses propres tests.

Les tests sont organisés selon la même structure que le code.

---

# Principe n°9 — Les spécifications restent liées au code

Chaque capacité importante peut être reliée :

- à une spécification ;
- à une ADR ;
- à une Pull Request ;
- à ses tests.

La traçabilité est maintenue durant tout le cycle de vie.

---

# Principe n°10 — La structure est stable

L'organisation générale des projets évolue rarement.

Les nouvelles fonctionnalités s'intègrent dans cette structure plutôt que de créer une nouvelle organisation.

---

# Critères de validation

L'architecture des projets est conforme lorsque :

- chaque fonctionnalité est facilement localisable ;
- les responsabilités sont clairement séparées ;
- les dépendances respectent le Référentiel d'Architecture ;
- les nouveaux développements suivent la même organisation.

# Chapitre 5 — Gestion des branches et du versionnement

## Objet

La gestion des branches et du versionnement garantit un développement collaboratif, sécurisé et traçable.

Chaque évolution suit un cycle de vie clairement défini, depuis son développement jusqu'à sa mise en production.

---

# Principe n°1 — Une branche, un objectif

Chaque branche possède un objectif unique.

Exemples :

- Nouvelle capacité
- Correction d'un bug
- Refactoring
- Documentation
- Hotfix

Une branche ne mélange jamais plusieurs intentions.

---

# Principe n°2 — Cycle de vie des branches

Les branches principales sont :

- main : Production
- develop : Intégration

Les branches temporaires sont créées à partir de `develop` puis fusionnées après validation.

---

# Principe n°3 — Conventions de nommage

Les branches suivent une convention homogène.

Exemples :

- feature/client-portal
- feature/workflow-renewal
- bugfix/document-export
- hotfix/login-timeout
- refactor/notification-engine
- docs/api-reference
- experiment/ocr-engine
- spike/ia-research

---

# Principe n°4 — Pull Requests

Toute évolution passe par une Pull Request.

Une Pull Request contient notamment :

- l'objectif de l'évolution ;
- les spécifications concernées ;
- les impacts techniques ;
- les risques identifiés ;
- les tests réalisés.

---

# Principe n°5 — Validation

Une Pull Request ne peut être fusionnée que si :

- les tests automatiques sont validés ;
- la revue de code est approuvée ;
- les contrôles qualité sont réussis ;
- la documentation est à jour.

---

# Principe n°6 — Versionnement

La plateforme utilise le versionnement sémantique (Semantic Versioning).

Format :

MAJEUR.MINEUR.CORRECTIF

Exemples :

- 1.0.0
- 1.4.2
- 2.0.0

---

# Principe n°7 — Releases

Chaque version publiée comprend notamment :

- un numéro de version ;
- une date ;
- une liste des évolutions ;
- les corrections apportées ;
- les éventuelles ruptures de compatibilité.

---

# Principe n°8 — Hotfix

Les corrections critiques peuvent être publiées directement depuis une branche `hotfix`.

Après déploiement :

- le correctif est fusionné dans `main` ;
- puis reporté dans `develop`.

---

# Principe n°9 — Historique

L'historique Git constitue un élément de traçabilité.

Les messages de commit et les Pull Requests doivent permettre de comprendre l'évolution du projet.

---

# Principe n°10 — Archivage

Les branches temporaires sont supprimées après fusion afin de maintenir un dépôt propre.

L'historique reste conservé via Git.

---

# Critères de validation

Le référentiel est respecté lorsque :

- les conventions de branches sont appliquées ;
- toutes les évolutions passent par une Pull Request ;
- les versions sont cohérentes ;
- l'historique reste lisible.

# Chapitre 6 — Qualité logicielle et revues de code

## Objet

Les règles de qualité logicielle garantissent que chaque évolution respecte les standards d'EJ Partners avant son intégration.

La revue de code constitue une étape obligatoire du processus de développement.

Elle vise à améliorer la qualité du logiciel, à partager les connaissances et à préserver la cohérence de l'architecture.

---

# Principe n°1 — Toute évolution est relue

Aucune évolution significative ne peut être intégrée sans revue de code.

La revue porte autant sur la qualité technique que sur le respect du métier et de l'architecture.

---

# Principe n°2 — La revue vérifie l'architecture

Le relecteur vérifie notamment :

- le respect du Référentiel d'Architecture ;
- la bonne couche d'implémentation ;
- les responsabilités du composant ;
- les dépendances créées ;
- la réutilisation des capacités existantes.

---

# Principe n°3 — La revue vérifie le métier

Le relecteur s'assure notamment que :

- la capacité répond au besoin métier ;
- le vocabulaire utilisé est conforme au Modèle Métier ;
- les règles métier sont correctement appliquées.

---

# Principe n°4 — La revue vérifie la sécurité

Toute évolution est analysée sous l'angle de :

- l'authentification ;
- l'autorisation ;
- la protection des données ;
- la journalisation ;
- la conformité aux politiques de sécurité.

---

# Principe n°5 — La revue vérifie l'audit

Le relecteur confirme notamment que :

- les événements d'audit sont produits lorsque nécessaire ;
- les Correlation ID sont propagés ;
- la traçabilité est préservée.

---

# Principe n°6 — La revue vérifie la qualité

Les points suivants sont notamment contrôlés :

- lisibilité ;
- simplicité ;
- duplication ;
- gestion des erreurs ;
- performances ;
- documentation.

---

# Principe n°7 — Les outils automatisés complètent la revue

La revue humaine est complétée par des contrôles automatiques :

- compilation ;
- lint ;
- formatage ;
- analyse statique ;
- tests ;
- détection de vulnérabilités.

Ces outils assistent la revue mais ne la remplacent pas.

---

# Principe n°8 — Les commentaires sont constructifs

Les retours de revue visent à améliorer le logiciel.

Ils sont :

- argumentés ;
- respectueux ;
- orientés vers la solution.

---

# Principe n°9 — Les exceptions sont documentées

Lorsqu'une règle n'est pas respectée, une justification est consignée dans la Pull Request ou dans un ADR selon l'importance de la décision.

---

# Principe n°10 — La revue est un partage de connaissances

La revue de code constitue également un moment d'apprentissage collectif.

Elle favorise la diffusion des bonnes pratiques et l'homogénéité des développements.

---

# Critères de validation

Le processus est conforme lorsque :

- toutes les évolutions importantes sont relues ;
- les critères de qualité sont vérifiés ;
- les outils automatiques sont exécutés ;
- les remarques sont traitées avant fusion.

# Chapitre 7 — Tests et validation

## Objet

Les tests garantissent que chaque évolution fonctionne conformément aux spécifications, sans introduire de régression.

La stratégie de test couvre l'ensemble de la plateforme, depuis les composants unitaires jusqu'aux scénarios métier complets.

---

# Principe n°1 — Les tests sont conçus dès le développement

Les tests ne constituent pas une étape finale.

Ils sont pensés en même temps que la capacité métier.

Une fonctionnalité importante n'est pas considérée comme terminée tant que ses tests ne sont pas disponibles.

---

# Principe n°2 — Pyramide des tests

La stratégie de test repose sur plusieurs niveaux complémentaires :

- Tests unitaires
- Tests d'intégration
- Tests fonctionnels
- Tests End-to-End (E2E)
- Tests d'architecture
- Tests de performance
- Tests de sécurité

Chaque niveau répond à un objectif spécifique.

---

# Principe n°3 — Tests unitaires

Les tests unitaires vérifient le comportement isolé d'un composant.

Ils portent notamment sur :

- capacités métier ;
- politiques métier ;
- validateurs ;
- calculateurs ;
- règles fonctionnelles.

Ils ne dépendent pas d'une base de données ou d'un système externe.

---

# Principe n°4 — Tests d'intégration

Les tests d'intégration vérifient les interactions entre plusieurs composants.

Ils portent notamment sur :

- Domaine Métier ;
- Moteurs ;
- API internes ;
- Base de données ;
- Services Techniques.

---

# Principe n°5 — Tests fonctionnels

Les tests fonctionnels valident que la capacité répond au besoin métier décrit dans les spécifications.

Ils s'appuient sur des scénarios représentatifs.

---

# Principe n°6 — Tests End-to-End

Les tests E2E simulent le comportement réel d'un utilisateur.

Ils vérifient les parcours critiques de la plateforme.

Exemples :

- création d'un client ;
- souscription d'un contrat ;
- génération d'un document ;
- signature électronique ;
- synchronisation partenaire.

---

# Principe n°7 — Tests d'architecture

Les tests d'architecture vérifient notamment :

- le respect des couches ;
- l'absence de dépendances interdites ;
- les conventions de nommage ;
- les règles du Référentiel d'Architecture.

---

# Principe n°8 — Régressions

Toute anomalie corrigée doit être accompagnée d'un test empêchant sa réapparition.

---

# Principe n°9 — Automatisation

Les tests automatisés sont exécutés dans le pipeline CI/CD.

Une évolution ne peut être intégrée si les tests obligatoires échouent.

---

# Principe n°10 — Traçabilité

Chaque capacité importante peut être reliée :

- à ses spécifications ;
- à ses tests ;
- à ses résultats d'exécution.

La couverture des tests est suivie dans le temps.

---

# Critères de validation

La stratégie de tests est conforme lorsque :

- les différents niveaux de tests sont présents ;
- les scénarios critiques sont couverts ;
- les tests sont automatisés ;
- les régressions sont détectées avant la mise en production.

# Chapitre 8 — Intégration Continue (CI/CD) et Déploiements

## Objet

Le pipeline d'Intégration Continue (CI) et de Déploiement Continu (CD) garantit que chaque évolution est vérifiée, testée et déployée de manière sécurisée, reproductible et traçable.

Les déploiements sont automatisés autant que possible afin de réduire les risques liés aux interventions manuelles.

---

# Principe n°1 — Tout passe par la CI

Aucun code ne peut être intégré sans passer par le pipeline d'Intégration Continue.

Chaque Pull Request déclenche automatiquement les contrôles définis par la plateforme.

---

# Principe n°2 — Contrôles automatiques

Le pipeline exécute notamment :

- installation des dépendances ;
- compilation ;
- vérification du typage ;
- lint ;
- formatage ;
- tests automatisés ;
- analyse des vulnérabilités ;
- contrôle de qualité.

Tout échec bloque l'intégration.

---

# Principe n°3 — Environnements

La plateforme distingue plusieurs environnements :

- Développement
- Intégration
- Préproduction
- Production

Chaque environnement possède :

- sa configuration ;
- ses secrets ;
- ses bases de données ;
- ses politiques de déploiement.

---

# Principe n°4 — Déploiements

Les déploiements sont :

- reproductibles ;
- automatisés ;
- versionnés ;
- traçables.

Chaque déploiement est associé à :

- une version ;
- un commit ;
- une Pull Request ;
- une date ;
- un auteur.

---

# Principe n°5 — Variables d'environnement

Les variables sensibles ne sont jamais stockées dans le dépôt Git.

Elles sont gérées par les mécanismes sécurisés prévus pour chaque environnement.

---

# Principe n°6 — Retour arrière

Chaque déploiement doit pouvoir être annulé rapidement.

Les procédures de restauration sont documentées et régulièrement vérifiées.

---

# Principe n°7 — Migrations

Les migrations de base de données :

- sont versionnées ;
- sont testées ;
- sont exécutées automatiquement selon la stratégie définie.

Les migrations destructrices doivent être exceptionnelles et documentées.

---

# Principe n°8 — Observabilité

Chaque déploiement fait l'objet d'une surveillance.

La plateforme collecte notamment :

- journaux techniques ;
- métriques ;
- erreurs ;
- performances ;
- alertes.

---

# Principe n°9 — Validation après déploiement

Après chaque mise en production, des vérifications automatiques confirment notamment :

- la disponibilité de la plateforme ;
- le bon fonctionnement des capacités critiques ;
- l'absence d'erreurs majeures.

---

# Principe n°10 — Traçabilité

Chaque déploiement est relié :

- à une version ;
- à une Pull Request ;
- à un ensemble de spécifications ;
- à un Journal d'Audit.

---

# Critères de validation

Le processus est conforme lorsque :

- tous les déploiements sont automatisés ;
- les contrôles sont exécutés avec succès ;
- les retours arrière sont possibles ;
- la traçabilité est complète.


# Chapitre 9 — Gestion des migrations et des données

## Objet

Les migrations garantissent une évolution maîtrisée du modèle de données de la plateforme.

Toute modification de la structure des données est versionnée, testée, documentée et traçable.

---

# Principe n°1 — Toute modification est une migration

Aucune modification de la base de données ne peut être réalisée directement en production.

Toute évolution passe par une migration versionnée.

---

# Principe n°2 — Les migrations sont atomiques

Chaque migration possède un objectif unique.

Exemples :

- création d'une table ;
- ajout d'une colonne ;
- création d'un index ;
- modification d'une contrainte.

Une migration ne mélange pas plusieurs intentions sans justification.

---

# Principe n°3 — Les migrations sont idempotentes

Dans la mesure du possible, une migration peut être exécutée de manière sécurisée sans provoquer d'effets inattendus.

Les préconditions sont vérifiées avant toute modification.

---

# Principe n°4 — Compatibilité

Les migrations privilégient les évolutions compatibles.

Les suppressions ou modifications incompatibles sont préparées en plusieurs étapes afin de limiter les ruptures.

---

# Principe n°5 — Tests des migrations

Toute migration est validée sur un environnement de test avant son déploiement.

Les tests vérifient notamment :

- l'intégrité des données ;
- les performances ;
- la compatibilité des requêtes ;
- les impacts sur les capacités métier.

---

# Principe n°6 — Réversibilité

Lorsqu'elle est techniquement possible, une stratégie de retour arrière est prévue.

Si une migration n'est pas réversible, cette contrainte est explicitement documentée.

---

# Principe n°7 — Jeu de données

Les environnements de développement et de test utilisent des jeux de données représentatifs.

Les données de production ne sont jamais copiées telles quelles sans anonymisation.

---

# Principe n°8 — Protection des données

Les données utilisées pour les tests respectent :

- le RGPD ;
- les politiques internes ;
- les règles de confidentialité.

Les données sensibles sont anonymisées ou pseudonymisées.

---

# Principe n°9 — Traçabilité

Chaque migration est reliée :

- à une Pull Request ;
- à une version ;
- à une spécification ;
- à un Journal d'Audit.

---

# Principe n°10 — Documentation

Toute évolution du modèle de données entraîne la mise à jour :

- du modèle métier ;
- de la documentation technique ;
- des diagrammes de données lorsque nécessaire.

---

# Critères de validation

Le processus est conforme lorsque :

- toutes les évolutions passent par des migrations ;
- les migrations sont testées ;
- les données sont protégées ;
- la documentation est synchronisée.

# Chapitre 10 — Documentation et Architecture Decision Records (ADR)

## Objet

La documentation constitue un élément à part entière du développement d'EJ Partners.

Elle garantit la compréhension, la transmission des connaissances et la traçabilité des décisions prises tout au long de la vie du projet.

Les décisions d'architecture sont formalisées au travers des Architecture Decision Records (ADR).

---

# Principe n°1 — La documentation fait partie du développement

Une fonctionnalité n'est pas considérée comme terminée tant que sa documentation n'est pas mise à jour.

Le code et la documentation évoluent ensemble.

---

# Principe n°2 — Les spécifications restent la référence

Les documents de spécification (198 à 226) décrivent le comportement attendu.

Le code implémente ces spécifications.

En cas d'écart, celui-ci doit être justifié et documenté.

---

# Principe n°3 — Le Référentiel d'Architecture est la Constitution

Le document 227 constitue la référence des principes d'architecture.

Toute évolution importante est vérifiée au regard de ce référentiel.

---

# Principe n°4 — Les ADR documentent les décisions

Toute décision ayant un impact durable sur l'architecture est documentée dans un ADR.

Les ADR permettent de conserver :

- le contexte ;
- les alternatives étudiées ;
- la décision retenue ;
- les conséquences.

---

# Principe n°5 — Structure d'un ADR

Chaque ADR comprend notamment :

- Identifiant
- Titre
- Date
- Statut
- Contexte
- Problème
- Options étudiées
- Décision
- Conséquences
- Documents liés

---

# Principe n°6 — Documentation technique

La documentation technique comprend notamment :

- architecture ;
- API ;
- moteurs ;
- modules ;
- modèles de données ;
- déploiements ;
- procédures.

Elle reste synchronisée avec les développements.

---

# Principe n°7 — Documentation développeur

Les guides développeurs décrivent notamment :

- installation ;
- structure du projet ;
- conventions ;
- procédures de développement ;
- processus de contribution.

---

# Principe n°8 — Documentation utilisateur

Lorsque nécessaire, les évolutions importantes entraînent la mise à jour :

- des guides utilisateurs ;
- de l'aide en ligne ;
- des procédures métier.

---

# Principe n°9 — Versionnement

Tous les documents sont versionnés.

Les évolutions majeures sont historisées.

Les anciennes versions restent consultables.

---

# Principe n°10 — Traçabilité

Chaque développement important peut être relié :

- à une spécification ;
- à une ADR ;
- à une Pull Request ;
- à une version ;
- à un Journal d'Audit.

---

# Critères de validation

Le processus est conforme lorsque :

- la documentation est synchronisée avec le code ;
- les décisions importantes disposent d'un ADR ;
- les guides sont à jour ;
- la traçabilité est complète.


# Chapitre 11 — Gestion de la dette technique

## Objet

La dette technique désigne l'ensemble des compromis techniques réalisés lors du développement et susceptibles d'avoir un impact futur sur la qualité, la maintenabilité ou l'évolutivité de la plateforme.

Elle est considérée comme un élément normal de la vie du projet, à condition d'être identifiée, documentée et pilotée.

---

# Principe n°1 — La dette est visible

Aucune dette technique significative ne doit rester implicite.

Toute dette identifiée est :

- documentée ;
- qualifiée ;
- priorisée ;
- suivie.

---

# Principe n°2 — Les compromis sont assumés

Un compromis technique peut être accepté lorsqu'il répond à une contrainte :

- métier ;
- réglementaire ;
- budgétaire ;
- temporelle.

Le compromis est documenté avec sa justification.

---

# Principe n°3 — Les dettes sont classifiées

Chaque dette est qualifiée selon :

- son impact ;
- son urgence ;
- son coût estimé ;
- son risque.

Une classification homogène est utilisée sur toute la plateforme.

---

# Principe n°4 — Les dettes sont tracées

Chaque dette peut être reliée à :

- une Pull Request ;
- une ADR ;
- une spécification ;
- une version ;
- un composant concerné.

---

# Principe n°5 — Les dettes sont arbitrées

La correction d'une dette fait l'objet d'un arbitrage prenant en compte :

- la valeur métier ;
- les risques ;
- le coût de correction ;
- les impacts futurs.

---

# Principe n°6 — Les dettes sont revues régulièrement

Un suivi périodique permet de :

- requalifier les dettes ;
- clôturer celles qui sont résolues ;
- ajuster les priorités.

---

# Principe n°7 — Les outils assistent l'analyse

Des outils automatiques peuvent identifier notamment :

- duplications ;
- complexité excessive ;
- dépendances circulaires ;
- vulnérabilités ;
- code mort.

Ces analyses complètent l'expertise humaine.

---

# Principe n°8 — Les refactorings sont planifiés

Les opérations de refactoring importantes sont :

- planifiées ;
- documentées ;
- testées.

Elles ne sont pas réalisées de manière opportuniste sans analyse préalable.

---

# Principe n°9 — La dette n'empêche pas l'innovation

La gestion de la dette technique ne doit pas bloquer les évolutions métier.

L'objectif est de maintenir un équilibre entre innovation et stabilité.

---

# Principe n°10 — La qualité progresse dans le temps

Chaque évolution importante doit contribuer à maintenir ou améliorer la qualité globale de la plateforme.

Une évolution ne doit pas augmenter durablement la dette technique sans justification.

---

# Critères de validation

La gestion de la dette technique est conforme lorsque :

- les dettes sont identifiées ;
- elles sont pilotées ;
- leur évolution est suivie ;
- les décisions sont documentées.


