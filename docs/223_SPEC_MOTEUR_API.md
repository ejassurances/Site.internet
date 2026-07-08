# 223_SPEC_MOTEUR_API

## Objet

Le Moteur API permet d'exposer, de sécuriser, de superviser et de versionner les capacités d'EJ Partners à destination des applications, partenaires et services externes.

Le moteur constitue le point d'entrée unique de toutes les communications API.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

# Écran 1 — Bibliothèque des API

## Objectif

Permettre de consulter, rechercher et administrer l'ensemble des API exposées par EJ Partners.

La bibliothèque constitue le référentiel unique des capacités accessibles via API.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Pour chaque API, la plateforme affiche :

- Nom
- Description
- Catégorie
- Version
- Statut
- Auteur
- Date de création
- Dernière modification

---

## Catégories

Les API peuvent être classées notamment par :

- Clients
- Prospects
- Contrats
- Activités
- Agenda
- Documents
- Reporting
- Imports
- Exports
- Administration

La liste est évolutive.

---

## Navigation

L'utilisateur peut :

- Rechercher une API
- Filtrer par catégorie
- Filtrer par version
- Trier les résultats
- Consulter les favoris

---

## Actions disponibles

- Consulter
- Tester (selon les droits)
- Modifier
- Déprécier
- Archiver

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les API sont centralisées ;
- les recherches fonctionnent ;
- les versions sont clairement identifiées ;
- les permissions sont respectées.


# Écran 2 — Fiche API

## Objectif

Permettre de consulter, configurer et administrer une API exposée par EJ Partners.

La fiche centralise toutes les informations fonctionnelles, techniques et de gouvernance relatives à une API.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom
- Description
- Catégorie
- Version
- Statut
- Type d'API
- Auteur
- Date de création
- Dernière modification

---

## Définition

Pour chaque API, la plateforme précise notamment :

- Objectif métier
- Objets métier concernés
- Opérations disponibles
- Méthodes autorisées
- Format des échanges
- Règles métier appliquées

---

## Paramètres

L'API peut définir :

- Version active
- Authentification requise
- Autorisations nécessaires
- Limites d'utilisation (quotas)
- Timeout
- Taille maximale des requêtes et réponses

---

## Utilisation

La plateforme indique notamment :

- Applications utilisatrices
- Partenaires autorisés
- Workflows concernés
- Services IA concernés
- Webhooks associés

---

## Documentation

La fiche contient :

- Description fonctionnelle
- Exemples d'utilisation
- Historique des versions
- Historique des évolutions
- Conditions d'utilisation

---

## Actions disponibles

- Consulter
- Tester
- Modifier
- Déprécier
- Archiver
- Consulter les journaux

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- les dépendances sont identifiées ;
- la documentation est complète ;
- les permissions sont respectées.

# Écran 3 — Définition des opérations API

## Objectif

Permettre de définir les opérations exposées par une API ainsi que leurs comportements fonctionnels.

Chaque opération représente une capacité métier mise à disposition par EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

Pour chaque opération, la plateforme affiche :

- Nom
- Description
- Objet métier concerné
- Type d'opération
- Version
- Statut

---

## Types d'opérations

Une opération peut notamment permettre de :

- Consulter une donnée
- Rechercher des données
- Créer une donnée
- Modifier une donnée
- Supprimer (selon les règles métier)
- Déclencher une action
- Exécuter un Workflow
- Générer un document
- Lancer un Import
- Lancer un Export

La liste est évolutive.

---

## Paramètres

Chaque opération peut définir :

- Les paramètres d'entrée
- Les paramètres obligatoires
- Les paramètres optionnels
- Les valeurs par défaut
- Les règles de validation

---

## Résultat

Une opération peut retourner notamment :

- Un objet métier
- Une liste d'objets
- Un identifiant
- Un état d'exécution
- Un document
- Un rapport
- Un message métier

---

## Validation

Avant publication, la plateforme vérifie :

- La cohérence de l'opération
- Les dépendances
- Les droits nécessaires
- Les règles métier applicables

---

## Actions disponibles

- Créer une opération
- Modifier
- Tester
- Déprécier
- Désactiver
- Consulter les dépendances

---

## Critères de validation

L'écran est conforme lorsque :

- les opérations sont clairement définies ;
- les paramètres sont documentés ;
- les validations sont appliquées ;
- les permissions sont respectées.


# Écran 4 — Authentification et autorisations

## Objectif

Permettre de définir les mécanismes d'authentification et d'autorisation appliqués aux API d'EJ Partners.

Le Moteur API garantit que chaque appel est authentifié, autorisé et tracé avant toute exécution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 226_SPEC_JOURNAL_AUDIT.md
- 225_SPEC_SECURITE.md

---

## Authentification

Le moteur peut prendre en charge notamment :

- Clé API
- OAuth 2.0
- OpenID Connect
- JWT
- Compte de service
- Authentification interne EJ Partners

La liste est évolutive.

---

## Autorisations

Chaque API peut définir :

- Les rôles autorisés
- Les permissions requises
- Les objets métier accessibles
- Les actions autorisées
- Les restrictions éventuelles

---

## Portée des droits (Scopes)

Les autorisations peuvent être limitées à :

- Un cabinet
- Une équipe
- Un utilisateur
- Un portefeuille
- Une liste d'objets métier
- Une opération métier

---

## Contrôles

Avant chaque appel, le moteur vérifie notamment :

- L'identité de l'appelant
- La validité du jeton
- Les permissions
- Les quotas
- Les restrictions éventuelles

---

## Journalisation

Chaque authentification est historisée avec notamment :

- Date et heure
- Identité
- API appelée
- Résultat
- Adresse IP (si disponible)
- Empreinte technique

---

## Actions disponibles

- Configurer un mode d'authentification
- Modifier les permissions
- Tester une authentification
- Révoquer un accès
- Consulter les journaux

---

## Critères de validation

L'écran est conforme lorsque :

- les mécanismes d'authentification sont correctement appliqués ;
- les permissions sont respectées ;
- tous les accès sont historisés ;
- les règles de sécurité sont cohérentes.


# Écran 5 — Paramètres des API

## Objectif

Permettre de configurer les paramètres de fonctionnement d'une API sans modifier sa logique métier.

Les paramètres définissent les règles d'exécution, les limites techniques et les comportements attendus.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md

---

## Paramètres généraux

Chaque API peut définir notamment :

- Version active
- Statut
- Environnement (Développement, Test, Production)
- Temps maximal d'exécution (Timeout)
- Taille maximale des requêtes
- Taille maximale des réponses

---

## Paramètres d'exécution

L'API peut être configurée pour :

- Exécution synchrone
- Exécution asynchrone
- Mise en file d'attente
- Traitement par lots
- Réessais automatiques en cas d'échec

---

## Quotas

Le moteur peut appliquer notamment :

- Nombre maximal de requêtes par minute
- Nombre maximal de requêtes par heure
- Nombre maximal de requêtes par jour
- Limitation par application
- Limitation par partenaire
- Limitation par utilisateur

---

## Cache

Selon les besoins, une API peut définir :

- Mise en cache autorisée
- Durée du cache
- Conditions d'invalidation
- Cache partagé ou dédié

---

## Journalisation

Le niveau de journalisation peut être configuré :

- Minimal
- Standard
- Détaillé
- Diagnostic

Le niveau retenu dépend de l'environnement et des règles du cabinet.

---

## Actions disponibles

- Modifier les paramètres
- Tester la configuration
- Réinitialiser aux valeurs par défaut
- Consulter les performances
- Publier la configuration

---

## Critères de validation

L'écran est conforme lorsque :

- les paramètres sont cohérents ;
- les limites sont appliquées ;
- les quotas sont respectés ;
- les permissions sont prises en compte.


# Écran 6 — Exécution des appels API

## Objectif

Permettre d'exécuter un appel API en garantissant la sécurité, la cohérence métier, la traçabilité et la supervision de l'opération.

Le Moteur API orchestre l'ensemble des traitements avant, pendant et après l'exécution.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md
- 226_SPEC_JOURNAL_AUDIT.md

---

## Cycle d'exécution

Pour chaque appel, le moteur réalise notamment :

1. Réception de la requête
2. Authentification
3. Vérification des autorisations
4. Contrôle des quotas
5. Validation des paramètres
6. Exécution de la capacité métier
7. Journalisation
8. Construction de la réponse
9. Retour au demandeur

---

## États d'exécution

Chaque appel possède un état :

- Reçu
- En attente
- En cours
- Terminé
- Refusé
- En erreur
- Annulé

---

## Suivi

Pendant l'exécution, la plateforme peut afficher :

- Identifiant de la requête
- Date et heure
- Durée
- Statut
- Application appelante
- Utilisateur ou identité applicative
- Version de l'API

---

## Gestion des erreurs

En cas d'erreur, le moteur distingue notamment :

- Erreur d'authentification
- Erreur d'autorisation
- Paramètre invalide
- Règle métier non respectée
- Ressource inexistante
- Dépassement de quota
- Erreur technique interne

Les messages retournés sont adaptés au contexte et ne divulguent jamais d'informations sensibles.

---

## Actions disponibles

- Tester un appel
- Rejouer un appel (selon les droits)
- Consulter le détail d'exécution
- Télécharger les journaux
- Annuler une exécution asynchrone (si applicable)

---

## Critères de validation

L'écran est conforme lorsque :

- chaque appel suit le cycle défini ;
- les contrôles sont appliqués avant toute exécution métier ;
- les erreurs sont correctement gérées ;
- toutes les opérations sont historisées.


# Écran 7 — Historique des appels API

## Objectif

Permettre de consulter l'ensemble des appels API exécutés afin d'assurer leur traçabilité, leur supervision et leur audit.

Chaque appel API est historisé indépendamment, qu'il soit réussi ou en erreur.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md
- 226_SPEC_JOURNAL_AUDIT.md

---

## Informations affichées

Pour chaque appel API, la plateforme affiche notamment :

- Identifiant unique
- Date et heure
- API appelée
- Opération métier exécutée
- Version de l'API
- Application appelante
- Utilisateur ou identité applicative
- Statut
- Durée d'exécution

---

## Résultat

Pour chaque appel, la plateforme conserve notamment :

- Code de résultat
- Nombre d'objets traités
- Taille de la requête
- Taille de la réponse
- Temps d'exécution
- Éventuelles erreurs
- Niveau de journalisation appliqué

---

## Consultation

Selon les droits, l'utilisateur peut consulter :

- Les paramètres transmis
- Les objets métier concernés
- Les journaux techniques
- Les règles métier appliquées
- Les Workflows déclenchés
- Les Notifications générées

Les données sensibles sont masquées conformément aux règles de sécurité.

---

## Recherche

L'historique peut être filtré notamment par :

- API
- Opération métier
- Période
- Application
- Utilisateur
- Partenaire
- Statut
- Version

---

## Actions disponibles

- Consulter le détail
- Rejouer un appel (selon les droits)
- Exporter les journaux
- Comparer deux appels
- Archiver les historiques

---

## Critères de validation

L'écran est conforme lorsque :

- tous les appels sont historisés ;
- les recherches fonctionnent ;
- les données sensibles sont protégées ;
- les permissions sont respectées.


# Écran 8 — Statistiques et supervision des API

## Objectif

Permettre de superviser l'activité du Moteur API afin de mesurer son utilisation, ses performances, sa disponibilité et sa fiabilité.

Les statistiques concernent les API, les applications appelantes et les opérations métier exposées.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md
- 226_SPEC_JOURNAL_AUDIT.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total d'API
- Nombre d'opérations métier exposées
- Nombre total d'appels
- Nombre d'appels réussis
- Nombre d'appels en erreur
- Temps moyen de réponse
- Disponibilité du moteur API

---

## Analyse

Les statistiques peuvent être présentées notamment par :

- Période
- API
- Opération métier
- Application appelante
- Partenaire
- Version
- Environnement (Développement, Test, Production)

---

## Performances

La plateforme peut afficher notamment :

- Temps moyen de traitement
- Temps maximal
- Temps minimal
- Nombre de requêtes par minute
- Débit moyen
- Consommation des quotas

---

## Qualité de service

Le moteur identifie notamment :

- Les API les plus sollicitées
- Les API les plus lentes
- Les opérations les plus coûteuses
- Les erreurs les plus fréquentes
- Les dépassements de quotas
- Les tentatives d'accès refusées

---

## Alertes

Des alertes peuvent être générées notamment en cas de :

- Temps de réponse anormal
- Taux d'erreur élevé
- API indisponible
- Dépassement de quota
- Activité inhabituelle
- Version obsolète encore utilisée

---

## Actions disponibles

- Filtrer les statistiques
- Consulter les détails
- Exporter les statistiques
- Accéder aux journaux
- Ouvrir la fiche d'une API

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont à jour ;
- les alertes sont pertinentes ;
- les permissions sont respectées.


# Écran 9 — Vue 360° du Moteur API

## Objectif

Offrir une vision globale du Moteur API afin de superviser son activité, sa sécurité, ses performances et son évolution.

Cette vue constitue le tableau de bord d'administration du Moteur API.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md
- 226_SPEC_JOURNAL_AUDIT.md

---

## Résumé

La vue affiche notamment :

- Nombre total d'API
- Nombre total d'opérations métier
- API actives
- API dépréciées
- Dernière API publiée
- Dernière version publiée
- Dernier appel exécuté

---

## Activité récente

Présentation des dernières opérations :

- Dernière API créée
- Dernière modification
- Dernière publication
- Dernier appel réussi
- Dernière erreur détectée
- Dernier dépassement de quota

---

## Alertes

La plateforme peut afficher notamment :

- API indisponible
- API dépréciée encore utilisée
- Version obsolète
- Activité inhabituelle
- Tentatives d'accès refusées
- Dépassements de quotas
- Dégradation des performances

---

## Santé du moteur

Le tableau de bord présente notamment :

- Disponibilité globale
- Nombre total d'appels
- Temps moyen de réponse
- Taux de réussite
- Taux d'erreur
- Nombre d'incidents
- Dernière exécution réussie

---

## Utilisation

La plateforme présente notamment :

- Les API les plus utilisées
- Les partenaires les plus actifs
- Les applications les plus consommatrices
- Les opérations métier les plus appelées
- Les versions les plus utilisées

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Créer une API
- Publier une nouvelle version
- Tester une API
- Consulter les journaux
- Accéder aux statistiques
- Gérer les politiques API

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont pertinentes ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.
