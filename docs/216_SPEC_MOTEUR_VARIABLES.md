# 216_SPEC_MOTEUR_VARIABLES

## Objet

Le module Moteur de Variables permet de centraliser, administrer et exploiter l'ensemble des variables dynamiques utilisées dans EJ Partners.

Les variables permettent de personnaliser automatiquement les contenus générés par la plateforme.

Le moteur est utilisé par l'ensemble des modules compatibles.

Le module respecte les règles définies dans :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md


# Écran 1 — Bibliothèque des Variables

## Objectif

Permettre de consulter, rechercher et administrer l'ensemble des variables dynamiques disponibles dans EJ Partners.

La bibliothèque constitue le point d'entrée unique du moteur de variables.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations affichées

Chaque variable affiche :

- Nom métier
- Nom technique
- Source
- Type de donnée
- Description
- Statut
- Date de création
- Dernière modification

---

## Sources disponibles

Les variables peuvent provenir notamment de :

- Cabinet
- Utilisateur
- Client
- Prospect
- Opportunité
- Projet
- Contrat
- Produit
- Partenaire
- Activité
- Agenda
- Document
- Workflow
- Notification

La liste est évolutive.

---

## Navigation

L'utilisateur peut :

- Rechercher une variable
- Filtrer par source
- Filtrer par type
- Trier les résultats

---

## Actions disponibles

- Consulter
- Rechercher
- Prévisualiser
- Copier la variable
- Consulter la documentation

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les variables sont centralisées ;
- les recherches fonctionnent ;
- les descriptions sont disponibles ;
- les permissions sont respectées.


# Écran 2 — Fiche Variable

## Objectif

Permettre de consulter toutes les informations relatives à une variable dynamique et de comprendre son fonctionnement dans EJ Partners.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations générales

La fiche affiche :

- Nom métier
- Nom technique
- Description
- Source
- Type de donnée
- Format
- Statut
- Date de création
- Dernière modification

---

## Utilisation

La plateforme indique :

- Les modules utilisant cette variable
- Les Templates concernés
- Les Workflows concernés
- Les Services IA concernés

---

## Exemple de valeur

La fiche présente un exemple de résultat.

Exemple :

Variable :

```text
{{Client.Prénom}}
```

Exemple de valeur :

```text
Erwan
```

---

## Contraintes

La plateforme affiche notamment :

- Variable obligatoire ou facultative
- Valeur par défaut (si définie)
- Conditions d'utilisation
- Restrictions éventuelles

---

## Documentation

Pour chaque variable, la plateforme fournit :

- Description fonctionnelle
- Exemples d'utilisation
- Modules compatibles
- Historique des évolutions

---

## Actions disponibles

- Consulter
- Copier la variable
- Prévisualiser
- Consulter les utilisations
- Consulter la documentation

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les informations sont disponibles ;
- les exemples sont cohérents ;
- les liens avec les autres modules fonctionnent ;
- les permissions sont respectées.


# Écran 3 — Arborescence des Variables

## Objectif

Permettre de parcourir l'ensemble des variables dynamiques selon une organisation métier claire et intuitive.

L'arborescence facilite la recherche et l'insertion des variables dans les différents modules de la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Organisation

Les variables sont organisées par objets métier.

Exemple :

- Cabinet
- Utilisateur
- Client
- Prospect
- Opportunité
- Projet
- Contrat
- Produit
- Partenaire
- Activité
- Agenda
- Document
- Workflow
- Notification

Chaque objet peut contenir plusieurs niveaux de variables.

---

## Navigation

L'utilisateur peut :

- Développer ou réduire une branche
- Rechercher une variable
- Filtrer les variables
- Consulter les détails d'une variable

---

## Informations affichées

Pour chaque variable :

- Nom métier
- Type de donnée
- Description courte
- Disponibilité
- Icône (optionnelle)

---

## Recherche

La recherche permet notamment de filtrer par :

- Nom
- Objet métier
- Type de donnée
- Disponibilité

---

## Actions disponibles

- Développer une branche
- Réduire une branche
- Copier une variable
- Consulter la fiche détaillée
- Insérer la variable dans un Template

---

## Critères de validation

L'écran est conforme lorsque :

- l'arborescence est claire ;
- les recherches fonctionnent ;
- les variables sont correctement organisées ;
- les permissions sont respectées.


# Écran 4 — Types et format des Variables

## Objectif

Définir les différents types de données pris en charge par le moteur de Variables et les règles de formatage applicables lors de leur utilisation.

Le moteur garantit un affichage cohérent des données dans toute la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de données

Le moteur prend en charge notamment :

- Texte
- Texte long
- Nombre
- Pourcentage
- Devise
- Date
- Heure
- Date et heure
- Booléen
- Email
- Téléphone
- Adresse
- URL
- Liste
- Référence
- Identifiant

La liste est évolutive.

---

## Formats

Selon le type de donnée, la plateforme peut appliquer automatiquement un format.

Exemples :

### Date

- 15/03/2027
- 15 mars 2027
- 2027-03-15

### Devise

- 1 250,00 €
- 1 250 €
- EUR 1 250

### Téléphone

- 06 12 34 56 78
- +33 6 12 34 56 78

---

## Personnalisation

Le cabinet peut définir :

- Le format par défaut
- Les formats alternatifs disponibles
- Les règles d'affichage

---

## Prévisualisation

L'utilisateur peut visualiser le rendu selon le format sélectionné.

---

## Actions disponibles

- Modifier le format
- Tester un format
- Restaurer le format par défaut

---

## Critères de validation

L'écran est conforme lorsque :

- les types sont correctement reconnus ;
- les formats sont appliqués automatiquement ;
- les prévisualisations sont fidèles ;
- les permissions sont respectées.

# Écran 4 — Types et format des Variables

## Objectif

Définir les différents types de données pris en charge par le moteur de Variables et les règles de formatage applicables lors de leur utilisation.

Le moteur garantit un affichage cohérent des données dans toute la plateforme.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Types de données

Le moteur prend en charge notamment :

- Texte
- Texte long
- Nombre
- Pourcentage
- Devise
- Date
- Heure
- Date et heure
- Booléen
- Email
- Téléphone
- Adresse
- URL
- Liste
- Référence
- Identifiant

La liste est évolutive.

---

## Formats

Selon le type de donnée, la plateforme peut appliquer automatiquement un format.

Exemples :

### Date

- 15/03/2027
- 15 mars 2027
- 2027-03-15

### Devise

- 1 250,00 €
- 1 250 €
- EUR 1 250

### Téléphone

- 06 12 34 56 78
- +33 6 12 34 56 78

---

## Personnalisation

Le cabinet peut définir :

- Le format par défaut
- Les formats alternatifs disponibles
- Les règles d'affichage

---

## Prévisualisation

L'utilisateur peut visualiser le rendu selon le format sélectionné.

---

## Actions disponibles

- Modifier le format
- Tester un format
- Restaurer le format par défaut

---

## Critères de validation

L'écran est conforme lorsque :

- les types sont correctement reconnus ;
- les formats sont appliqués automatiquement ;
- les prévisualisations sont fidèles ;
- les permissions sont respectées.



# Écran 5 — Fonctions de transformation

## Objectif

Permettre de transformer dynamiquement les valeurs des variables lors de leur utilisation, sans modifier les données d'origine.

Les fonctions s'appliquent uniquement à l'affichage.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Fonctions disponibles

Le moteur prend notamment en charge :

### Texte

- Majuscule
- Minuscule
- Première lettre en majuscule
- Nom propre
- Tronquer
- Remplacer

### Date

- Format personnalisé
- Ajouter des jours
- Retirer des jours
- Jour de la semaine
- Mois
- Année

### Nombre

- Arrondi
- Pourcentage
- Devise
- Nombre de décimales

### Listes

- Compter
- Trier
- Concaténer

La liste est évolutive.

---

## Syntaxe

Les fonctions peuvent être chaînées.

Exemple :

{{Client.Prénom|Majuscule}}

{{Contrat.DateEffet|Format:"DD MMMM YYYY"}}

{{Contrat.Cotisation|Devise}}

---

## Prévisualisation

Avant validation, la plateforme affiche :

- La valeur d'origine
- La valeur transformée
- Les éventuelles erreurs

---

## Contrôles

Le moteur vérifie :

- La compatibilité entre la fonction et le type de donnée
- Les paramètres obligatoires
- La syntaxe

---

## Actions disponibles

- Ajouter une fonction
- Modifier
- Supprimer
- Tester
- Prévisualiser

---

## Critères de validation

L'écran est conforme lorsque :

- les fonctions sont correctement appliquées ;
- les erreurs sont détectées ;
- les prévisualisations sont fidèles ;
- les permissions sont respectées.


# Écran 6 — Conditions et logique

## Objectif

Permettre d'adapter dynamiquement le contenu généré en fonction des données disponibles ou de règles métier simples.

Les conditions permettent d'afficher ou masquer certains contenus sans créer plusieurs Templates.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Conditions disponibles

Le moteur permet notamment :

- Si une variable est renseignée
- Si une variable est vide
- Si une valeur est égale à une autre
- Si une valeur est différente
- Si une date est dépassée
- Si une date est future
- Si un nombre est supérieur, inférieur ou égal à une valeur

La liste est évolutive.

---

## Blocs conditionnels

Un Template peut contenir :

- Bloc "Si"
- Bloc "Sinon"
- Bloc "Sinon si"

Les blocs peuvent être imbriqués dans la limite définie par la plateforme.

---

## Exemples d'utilisation

Le moteur peut permettre des scénarios comme :

- Afficher une civilité différente selon le client.
- Afficher un paragraphe uniquement si un contrat existe.
- Ajouter une mention spécifique selon le type de produit.
- Afficher une relance uniquement si une échéance est dépassée.

---

## Contrôles

Le moteur vérifie :

- La syntaxe des conditions
- Les variables utilisées
- Les types de données comparés
- Les éventuelles incohérences

---

## Prévisualisation

L'utilisateur peut tester plusieurs scénarios afin de visualiser le résultat selon différentes valeurs.

---

## Actions disponibles

- Ajouter une condition
- Modifier
- Supprimer
- Tester
- Prévisualiser

---

## Critères de validation

L'écran est conforme lorsque :

- les conditions sont correctement interprétées ;
- les contrôles détectent les erreurs ;
- la prévisualisation est fidèle ;
- les permissions sont respectées.


# Écran 6 — Conditions et logique

## Objectif

Permettre d'adapter dynamiquement le contenu généré en fonction des données disponibles ou de règles métier simples.

Les conditions permettent d'afficher ou masquer certains contenus sans créer plusieurs Templates.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Conditions disponibles

Le moteur permet notamment :

- Si une variable est renseignée
- Si une variable est vide
- Si une valeur est égale à une autre
- Si une valeur est différente
- Si une date est dépassée
- Si une date est future
- Si un nombre est supérieur, inférieur ou égal à une valeur

La liste est évolutive.

---

## Blocs conditionnels

Un Template peut contenir :

- Bloc "Si"
- Bloc "Sinon"
- Bloc "Sinon si"

Les blocs peuvent être imbriqués dans la limite définie par la plateforme.

---

## Exemples d'utilisation

Le moteur peut permettre des scénarios comme :

- Afficher une civilité différente selon le client.
- Afficher un paragraphe uniquement si un contrat existe.
- Ajouter une mention spécifique selon le type de produit.
- Afficher une relance uniquement si une échéance est dépassée.

---

## Contrôles

Le moteur vérifie :

- La syntaxe des conditions
- Les variables utilisées
- Les types de données comparés
- Les éventuelles incohérences

---

## Prévisualisation

L'utilisateur peut tester plusieurs scénarios afin de visualiser le résultat selon différentes valeurs.

---

## Actions disponibles

- Ajouter une condition
- Modifier
- Supprimer
- Tester
- Prévisualiser

---

## Critères de validation

L'écran est conforme lorsque :

- les conditions sont correctement interprétées ;
- les contrôles détectent les erreurs ;
- la prévisualisation est fidèle ;
- les permissions sont respectées.

# Écran 7 — Validation des Variables

## Objectif

Permettre de vérifier automatiquement la validité des variables utilisées avant la génération d'un contenu.

Le moteur détecte les erreurs afin de garantir des Templates fiables et exploitables.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Contrôles réalisés

Avant toute génération, le moteur vérifie notamment :

- L'existence de la variable
- La syntaxe
- Le type de donnée
- Les droits d'accès
- La compatibilité avec le contexte
- Les fonctions utilisées
- Les conditions associées

---

## Détection des erreurs

Le moteur peut détecter notamment :

- Variable inconnue
- Variable indisponible
- Fonction incompatible
- Erreur de syntaxe
- Variable inaccessible
- Variable obsolète

---

## Avertissements

Selon les cas, le moteur peut également signaler :

- Variable facultative non renseignée
- Variable rarement utilisée
- Fonction déconseillée
- Format inhabituel

Les avertissements n'empêchent pas la génération.

---

## Assistance

Lorsque cela est possible, la plateforme propose :

- Une correction automatique
- Une suggestion de variable
- Une explication de l'erreur
- Un lien vers la documentation

---

## Actions disponibles

- Lancer une validation
- Corriger automatiquement
- Ignorer un avertissement
- Consulter le détail des erreurs

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les erreurs sont détectées ;
- les suggestions sont pertinentes ;
- les avertissements sont clairement distingués des erreurs bloquantes ;
- les permissions sont respectées.


# Écran 8 — Historique et audit des Variables

## Objectif

Permettre de consulter l'historique des évolutions du moteur de Variables et d'assurer une traçabilité complète des modifications.

L'historique garantit la conformité et facilite les audits.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Informations historisées

Pour chaque opération, la plateforme conserve notamment :

- Date et heure
- Utilisateur
- Variable concernée
- Nature de l'opération
- Ancienne valeur
- Nouvelle valeur
- Motif de la modification (si applicable)

---

## Opérations historisées

Le moteur historise notamment :

- Création d'une variable
- Modification
- Désactivation
- Réactivation
- Changement de format
- Modification de la documentation
- Changement de statut

---

## Recherche

L'utilisateur peut rechercher par :

- Variable
- Objet métier
- Utilisateur
- Période
- Type d'opération

---

## Consultation

Pour chaque entrée d'historique, il est possible de consulter :

- Les détails de la modification
- Les impacts éventuels
- Les éléments associés

---

## Actions disponibles

- Rechercher
- Filtrer
- Exporter
- Consulter le détail
- Comparer deux versions

---

## Critères de validation

L'écran est conforme lorsque :

- toutes les opérations sont historisées ;
- les recherches fonctionnent ;
- les exports sont disponibles ;
- les permissions sont respectées.


# Écran 9 — Statistiques et supervision du moteur

## Objectif

Permettre de superviser l'utilisation du moteur de Variables afin d'identifier les optimisations, les anomalies et les opportunités d'amélioration.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Indicateurs

La plateforme affiche notamment :

- Nombre total de variables
- Variables système
- Variables personnalisées
- Variables actives
- Variables désactivées
- Nombre total d'utilisations
- Nombre d'erreurs de résolution
- Nombre d'avertissements

---

## Analyse

Les statistiques peuvent être présentées par :

- Objet métier
- Type de donnée
- Module utilisateur
- Période
- Catégorie de variable

---

## Indicateurs de qualité

La plateforme peut identifier :

- Les variables les plus utilisées
- Les variables jamais utilisées
- Les variables obsolètes
- Les erreurs les plus fréquentes
- Les suggestions de correction les plus courantes

---

## Tableaux de bord

La plateforme peut afficher :

- Répartition des variables par objet métier
- Répartition par type de donnée
- Historique des créations
- Historique des modifications
- Évolution de l'utilisation dans le temps

---

## Actions disponibles

- Filtrer les statistiques
- Exporter les données
- Ouvrir une variable
- Consulter les erreurs associées

---

## Critères de validation

L'écran est conforme lorsque :

- les statistiques sont fiables ;
- les indicateurs sont actualisés ;
- les filtres fonctionnent ;
- les permissions sont respectées.



# Écran 10 — Vue 360° du Moteur de Variables

## Objectif

Offrir une vision complète du moteur de Variables afin de faciliter son administration, son évolution et son utilisation dans l'ensemble de la plateforme.

Cette vue constitue le tableau de bord du moteur de Variables.

---

## Dépendances

Ce module utilise :

- 198_MODELE_METIER.md
- 199_SPEC_COMPOSANTS_TRANSVERSES.md

---

## Résumé

La vue affiche notamment :

- Nombre total de variables
- Variables système
- Variables personnalisées
- Variables actives
- Variables désactivées
- Dernière variable créée
- Dernière modification

---

## Activité récente

Présentation des dernières opérations :

- Dernière variable créée
- Dernière modification
- Dernière désactivation
- Dernière erreur détectée

---

## Alertes

La plateforme peut afficher :

- Variables obsolètes
- Variables jamais utilisées
- Variables en erreur
- Variables désactivées mais toujours référencées
- Variables manquantes dans un Template

---

## Utilisation

La plateforme présente notamment :

- Les variables les plus utilisées
- Les modules les plus consommateurs
- Les Templates utilisant le plus de variables
- Les fonctions les plus utilisées

---

## Santé du moteur

Le moteur peut afficher des indicateurs de qualité comme :

- Taux de résolution des variables
- Nombre d'erreurs de génération
- Nombre d'avertissements
- Temps moyen de résolution
- Compatibilité des versions

---

## Actions rapides

Depuis cette vue, l'utilisateur peut :

- Rechercher une variable
- Consulter la bibliothèque
- Tester une variable
- Accéder à la documentation
- Consulter les statistiques
- Ouvrir les Variables personnalisées

---

## Critères de validation

L'écran est conforme lorsque :

- les informations essentielles sont disponibles sur un seul écran ;
- les alertes sont clairement identifiées ;
- les actions rapides sont accessibles ;
- les liens avec les autres modules fonctionnent.



