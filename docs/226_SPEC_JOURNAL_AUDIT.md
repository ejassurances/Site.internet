# 226_SPEC_JOURNAL_AUDIT

## Objet

Le Moteur de Journal d'Audit permet d'enregistrer, conserver, rechercher et restituer l'ensemble des événements significatifs produits au sein d'EJ Partners.

Il garantit la traçabilité, l'imputabilité et la preuve des opérations réalisées sur la plateforme.

Le moteur respecte notamment les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 223_SPEC_MOTEUR_API.md
- 224_SPEC_PARAMETRAGE.md
- 225_SPEC_SECURITE.md


# Écran 1 — Centre du Journal d'Audit

## Objectif

Permettre de superviser l'ensemble des événements enregistrés par le Moteur de Journal d'Audit depuis une interface unique.

Le Centre du Journal d'Audit constitue le point d'entrée de toutes les opérations de traçabilité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md

---

## Domaines couverts

Le Journal d'Audit couvre notamment :

- Authentification
- Autorisations
- Sessions
- Modules métier
- Workflows
- API
- Imports
- Exports
- Reporting
- Paramétrage
- IA
- Administration

La liste est évolutive.

---

## Informations affichées

Le tableau de bord présente notamment :

- Nombre d'événements enregistrés
- Événements du jour
- Dernier événement
- Dernière opération sensible
- Dernier incident de sécurité
- Dernier changement de configuration

---

## Navigation

L'utilisateur peut :

- Rechercher un événement
- Filtrer les événements
- Consulter les détails
- Exporter un rapport
- Accéder aux statistiques

---

## Actions disponibles

- Consulter
- Exporter
- Comparer des événements
- Archiver
- Ouvrir un rapport d'audit

---

## Critères de validation

L'écran est conforme lorsque :

- tous les événements sont centralisés ;
- les recherches sont performantes ;
- les permissions sont respectées ;
- les informations sont fiables.

# Écran 2 — Fiche d'un événement d'audit

## Objectif

Permettre de consulter le détail complet d'un événement enregistré par le Moteur de Journal d'Audit.

Chaque événement constitue une preuve horodatée retraçant une action ou un fait significatif survenu dans EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md

---

## Informations générales

Chaque événement affiche notamment :

- Identifiant unique
- Date et heure
- Type d'événement
- Niveau de criticité
- Statut
- Source
- Version du moteur d'audit

---

## Identité

L'événement précise notamment :

- L'identité ayant réalisé l'action
- Le type d'identité (Utilisateur, IA, API, Workflow…)
- Le cabinet concerné
- L'équipe concernée
- La session utilisée
- Le niveau d'authentification

---

## Contexte métier

Selon l'événement, la plateforme indique notamment :

- Module concerné
- Objet métier
- Référence de l'objet
- Projet concerné
- Workflow associé
- API associée
- Document associé
- Import ou Export concerné

---

## Action réalisée

L'événement décrit notamment :

- L'action effectuée
- Le résultat obtenu
- Les règles appliquées
- Les validations réalisées
- Les impacts identifiés

---

## Données concernées

Selon les droits accordés, la plateforme peut afficher :

- Les données modifiées
- Les anciennes valeurs
- Les nouvelles valeurs
- Les données masquées
- Le niveau de sensibilité

Les données sensibles sont protégées conformément aux politiques de sécurité.

---

## Relations

Chaque événement peut être relié à :

- Un événement parent
- Des événements enfants
- Une chaîne de traitement
- Un Correlation ID
- Un incident de sécurité

---

## Actions disponibles

- Consulter les événements liés
- Exporter la fiche
- Comparer avec un autre événement
- Ouvrir le contexte métier
- Consulter le Journal complet

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- les relations entre événements sont visibles ;
- les données sensibles sont protégées ;
- les permissions sont respectées.


# Écran 3 — Classification des événements

## Objectif

Permettre de classer les événements d'audit selon une nomenclature commune afin de faciliter leur recherche, leur analyse et leur exploitation.

Tous les événements enregistrés par EJ Partners sont normalisés selon une classification unique.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md

---

## Catégories d'événements

Les événements peuvent notamment appartenir aux catégories suivantes :

- Authentification
- Autorisation
- Sécurité
- Paramétrage
- Administration
- Données métier
- Documents
- Workflows
- API
- Imports
- Exports
- Reporting
- IA
- Notifications
- Agenda
- Messagerie

La liste est évolutive.

---

## Types d'événements

Chaque catégorie peut contenir différents types d'événements.

Exemples :

### Authentification

- Connexion
- Déconnexion
- MFA validé
- Échec d'authentification

### Contrats

- Création
- Modification
- Résiliation
- Renouvellement
- Avenant

### Paramétrage

- Création
- Modification
- Publication
- Restauration

---

## Niveau de criticité

Chaque événement est qualifié selon un niveau de criticité :

- Information
- Faible
- Moyen
- Élevé
- Critique

Ce niveau peut être défini automatiquement ou ajusté selon les politiques de sécurité.

---

## Étiquettes

Des étiquettes peuvent être associées aux événements afin de faciliter les recherches.

Exemples :

- RGPD
- ACPR
- DDA
- AMF
- Donnée sensible
- Workflow
- API
- IA

---

## Classification automatique

Le moteur peut attribuer automatiquement :

- Une catégorie
- Un type
- Un niveau de criticité
- Des étiquettes

en fonction du contexte de l'événement.

---

## Actions disponibles

- Modifier la classification (selon les droits)
- Ajouter une étiquette
- Rechercher par catégorie
- Rechercher par criticité
- Exporter les événements sélectionnés

---

## Critères de validation

L'écran est conforme lorsque :

- tous les événements sont classifiés ;
- la nomenclature est homogène ;
- les recherches sont facilitées ;
- les permissions sont respectées.


# Écran 4 — Recherche et exploration des événements

## Objectif

Permettre de rechercher, filtrer et explorer efficacement les événements enregistrés par le Moteur de Journal d'Audit.

Le moteur doit permettre de retrouver rapidement un événement précis ou de reconstruire un scénario complet.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 217_SPEC_RECHERCHE.md

---

## Recherche

L'utilisateur peut rechercher notamment par :

- Identifiant d'événement
- Code d'événement
- Type d'événement
- Catégorie
- Date
- Période
- Identité
- Cabinet
- Équipe
- Objet métier
- Référence métier
- API
- Workflow
- Correlation ID

La recherche peut combiner plusieurs critères.

---

## Filtres

La plateforme permet notamment de filtrer :

- Niveau de criticité
- Niveau de sensibilité
- Statut
- Origine
- Application
- Service IA
- Incident associé
- Étiquettes

---

## Exploration

Depuis un événement, l'utilisateur peut naviguer vers :

- L'événement parent
- Les événements enfants
- La chaîne complète de traitement
- Les objets métier concernés
- Les Workflows déclenchés
- Les appels API associés
- Les Imports ou Exports liés

---

## Affichage

Selon les besoins, les événements peuvent être présentés sous différentes formes :

- Liste chronologique
- Vue détaillée
- Frise temporelle
- Graphe de relations
- Tableau synthétique

---

## Sauvegarde

L'utilisateur peut :

- Enregistrer une recherche
- Partager une recherche (selon les droits)
- Créer une vue favorite
- Exporter les résultats

---

## Actions disponibles

- Rechercher
- Filtrer
- Comparer des événements
- Explorer une chaîne d'événements
- Exporter les résultats

---

## Critères de validation

L'écran est conforme lorsque :

- les recherches sont rapides ;
- les filtres sont combinables ;
- les relations entre événements sont exploitables ;
- les permissions sont respectées.

# Écran 5 — Chaînes d'audit et corrélation des événements

## Objectif

Permettre de relier plusieurs événements entre eux afin de reconstituer un traitement complet, même lorsqu'il traverse plusieurs moteurs, modules ou applications.

Le Moteur de Journal d'Audit utilise un mécanisme de corrélation garantissant la continuité de la traçabilité.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 223_SPEC_MOTEUR_API.md
- 225_SPEC_SECURITE.md

---

## Correlation ID

Chaque chaîne de traitement reçoit un identifiant unique de corrélation.

Ce Correlation ID est propagé automatiquement à tous les événements liés.

---

## Événements corrélés

Une chaîne peut notamment contenir :

- Authentification
- Ouverture de session
- Consultation d'un objet métier
- Exécution d'un Workflow
- Appel API
- Génération documentaire
- Notification
- Import
- Export
- Incident de sécurité

---

## Visualisation

La plateforme permet de consulter :

- L'événement d'origine
- Les événements intermédiaires
- Les événements terminaux
- Les événements en erreur
- Les événements ignorés

---

## Représentation

Une chaîne d'audit peut être présentée sous plusieurs formes :

- Chronologie
- Graphe orienté
- Arbre d'exécution
- Vue synthétique

---

## Analyse

Le moteur peut notamment calculer :

- Durée totale du traitement
- Nombre d'événements
- Nombre de moteurs impliqués
- Nombre d'erreurs
- Temps passé par moteur

---

## Actions disponibles

- Ouvrir une chaîne
- Explorer un événement
- Comparer deux chaînes
- Exporter la chaîne complète
- Rejouer la chronologie (lecture seule)

---

## Critères de validation

L'écran est conforme lorsque :

- tous les événements liés sont retrouvés ;
- la chronologie est cohérente ;
- les dépendances sont visibles ;
- les permissions sont respectées.

# Écran 6 — Conservation et intégrité des journaux

## Objectif

Garantir la conservation, l'intégrité, la disponibilité et la valeur probante des événements enregistrés par le Moteur de Journal d'Audit.

Le Journal d'Audit constitue une preuve des actions réalisées dans EJ Partners. Son contenu ne peut être altéré sans laisser de trace.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 225_SPEC_SECURITE.md

---

## Conservation

Le moteur applique les politiques de conservation définies selon :

- Le type d'événement
- La catégorie
- Le niveau de criticité
- Les obligations réglementaires
- Les politiques internes du cabinet

La durée de conservation est configurable selon les règles en vigueur.

---

## Archivage

Les événements peuvent être :

- Actifs
- Archivés
- Placés en conservation longue durée
- Purgés (si autorisé par les politiques applicables)

Chaque changement d'état est historisé.

---

## Intégrité

Le moteur garantit notamment :

- L'horodatage de chaque événement
- L'unicité de son identifiant
- L'absence de modification non tracée
- La cohérence des chaînes d'événements
- La vérification de l'intégrité des archives

---

## Accès

Selon les droits accordés, il est possible de :

- Consulter
- Exporter
- Archiver
- Restaurer une archive
- Vérifier l'intégrité

Toutes les opérations sont elles-mêmes auditées.

---

## Vérifications

Le moteur peut contrôler notamment :

- La présence d'événements manquants
- Les ruptures de chaînes d'audit
- Les incohérences d'horodatage
- Les anomalies de conservation
- Les archives corrompues

---

## Actions disponibles

- Vérifier l'intégrité
- Archiver
- Restaurer
- Exporter
- Consulter les politiques de conservation

---

## Critères de validation

L'écran est conforme lorsque :

- les règles de conservation sont appliquées ;
- l'intégrité des journaux est garantie ;
- les archives sont exploitables ;
- les permissions sont respectées.

# Écran 7 — Rapports d'audit

## Objectif

Permettre de produire des rapports d'audit complets à destination des administrateurs, des responsables conformité, des auditeurs et des autorités de contrôle.

Les rapports sont générés à partir des événements enregistrés dans le Journal d'Audit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 220_SPEC_REPORTING.md
- 225_SPEC_SECURITE.md

---

## Types de rapports

Le moteur permet notamment de générer :

- Rapport d'activité
- Rapport de sécurité
- Rapport de conformité
- Rapport RGPD
- Rapport ACPR
- Rapport AMF (si applicable)
- Rapport d'administration
- Rapport personnalisé

La liste est évolutive.

---

## Contenu

Selon le rapport sélectionné, la plateforme peut inclure notamment :

- Résumé exécutif
- Période analysée
- Événements significatifs
- Incidents
- Actions sensibles
- Chronologie des événements
- Statistiques
- Annexes techniques

---

## Périmètre

Le rapport peut être limité notamment à :

- Une période
- Un cabinet
- Une équipe
- Un utilisateur
- Une identité applicative
- Un projet
- Un contrat
- Une API
- Un Workflow
- Un Correlation ID

---

## Formats

Les rapports peuvent être générés notamment au format :

- PDF
- Excel
- CSV
- JSON
- HTML

Les formats disponibles dépendent des droits et du contexte.

---

## Génération

Le moteur permet notamment :

- La génération immédiate
- La génération différée
- La planification
- La signature du rapport (si activée)
- L'archivage automatique

---

## Actions disponibles

- Générer un rapport
- Prévisualiser
- Exporter
- Archiver
- Comparer deux rapports

---

## Critères de validation

L'écran est conforme lorsque :

- les rapports sont fidèles aux événements enregistrés ;
- le périmètre est correctement appliqué ;
- les exports sont sécurisés ;
- les permissions sont respectées.


# Écran 8 — Statistiques et supervision du Journal d'Audit

## Objectif

Permettre de superviser l'activité du Moteur de Journal d'Audit afin de mesurer son utilisation, sa couverture, son intégrité et sa capacité à répondre aux exigences réglementaires.

Les statistiques portent sur les événements enregistrés, les recherches, les rapports et les chaînes d'audit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 220_SPEC_REPORTING.md
- 225_SPEC_SECURITE.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total d'événements
- Événements enregistrés aujourd'hui
- Nombre de chaînes d'audit
- Nombre de Correlation ID actifs
- Nombre de rapports générés
- Nombre de consultations du Journal
- Nombre d'exports réalisés

---

## Analyse

Les statistiques peuvent être présentées notamment par :

- Période
- Cabinet
- Module
- Moteur
- Type d'événement
- Niveau de criticité
- Identité
- Application

---

## Qualité du Journal

Le moteur peut mesurer notamment :

- Taux de couverture des événements
- Nombre d'événements non classifiés
- Chaînes d'audit incomplètes
- Ruptures de corrélation
- Vérifications d'intégrité réussies
- Archives conformes

---

## Évolution

La plateforme peut afficher notamment :

- Évolution du volume d'événements
- Répartition par catégorie
- Répartition par moteur
- Évolution des rapports générés
- Évolution des incidents audités
- Croissance des archives

---

## Alertes

Des alertes peuvent être générées notamment en cas de :

- Rupture d'une chaîne d'audit
- Événement non historisé
- Archive corrompue
- Échec de vérification d'intégrité
- Volume anormalement faible ou élevé
- Politique de conservation non respectée

---

## Actions disponibles

- Filtrer les statistiques
- Consulter les détails
- Exporter les indicateurs
- Vérifier l'intégrité
- Accéder aux rapports d'audit

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont à jour ;
- les anomalies sont détectées ;
- les permissions sont respectées.

# Écran 9 — Vue 360° du Moteur de Journal d'Audit

## Objectif

Offrir une vision globale de l'activité du Journal d'Audit afin de superviser la traçabilité, l'intégrité, la conformité et la qualité des événements enregistrés par EJ Partners.

Cette vue constitue le tableau de bord d'administration du Moteur de Journal d'Audit.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md
- 220_SPEC_REPORTING.md
- 223_SPEC_MOTEUR_API.md
- 224_SPEC_PARAMETRAGE.md
- 225_SPEC_SECURITE.md

---

## Résumé

La vue affiche notamment :

- Nombre total d'événements
- Nombre de chaînes d'audit
- Nombre de Correlation ID actifs
- Dernier événement enregistré
- Dernier rapport généré
- Dernière vérification d'intégrité
- Audit Coverage Score
- Audit Health Score

---

## Activité récente

Présentation des dernières opérations :

- Dernière connexion auditée
- Dernière modification métier
- Dernier Workflow exécuté
- Dernier appel API
- Dernier Import
- Dernier Export
- Dernière alerte de sécurité
- Dernière modification de configuration

---

## Alertes

La plateforme met notamment en évidence :

- Rupture de chaîne d'audit
- Événement critique non journalisé
- Archive corrompue
- Vérification d'intégrité échouée
- Politique de conservation non respectée
- Couverture d'audit incomplète
- Volume inhabituel d'événements

---

## Santé du moteur

Le tableau de bord présente notamment :

- Audit Coverage Score
- Audit Health Score
- Intégrité des archives
- Nombre d'événements critiques
- Nombre de chaînes complètes
- Nombre d'événements orphelins
- Nombre d'anomalies détectées

---

## Utilisation

La plateforme présente notamment :

- Les moteurs générant le plus d'événements
- Les capacités métier les plus auditées
- Les utilisateurs les plus actifs
- Les applications les plus actives
- Les Workflows les plus exécutés
- Les API les plus sollicitées

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Rechercher un événement
- Explorer une chaîne d'audit
- Générer un rapport
- Vérifier l'intégrité
- Exporter un dossier d'audit
- Accéder aux statistiques

---

## Critères de validation

L'écran est conforme lorsque :

- tous les indicateurs sont disponibles ;
- les alertes critiques sont immédiatement visibles ;
- les actions principales sont accessibles ;
- les liens avec les autres moteurs fonctionnent.
