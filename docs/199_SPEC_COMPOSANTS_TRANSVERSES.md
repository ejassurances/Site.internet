# 199_SPEC_COMPOSANTS_TRANSVERSES

## Objet

Ce document définit les composants fonctionnels communs utilisés dans l'ensemble de la plateforme EJ Assurances.

Ces composants sont réutilisables par tous les modules (Clients, Projets, Activités, Documents, Contrats, Partenaires, etc.).

L'objectif est de garantir :

- une expérience utilisateur homogène ;
- une architecture cohérente ;
- une maintenance simplifiée ;
- une réduction des duplications fonctionnelles.

Un composant transverse est défini une seule fois dans ce document puis réutilisé dans les spécifications des autres modules.

# Composant 1 — Statuts

## Objectif

Définir un système de statuts commun à l'ensemble de la plateforme.

Chaque module peut utiliser tout ou partie de ces statuts selon ses besoins.

---

## Principes

Le statut représente l'état actuel d'un objet métier.

Il répond à la question :

"Où en est cet élément ?"

Le statut est distinct :

- de la priorité ;
- du résultat ;
- de l'objectif.

---

## Statuts standards

Les statuts suivants sont disponibles :

- Brouillon
- À planifier
- Planifié
- En cours
- En attente
- À valider
- Validé
- Refusé
- Suspendu
- Terminé
- Annulé
- Archivé

Tous les modules ne sont pas obligés d'utiliser l'ensemble de ces statuts.

---

## Affichage

Chaque statut possède :

- une couleur ;
- une icône ;
- un libellé ;
- une description.

L'affichage est identique dans toute la plateforme.

---

## Historique

Chaque changement de statut est historisé.

Les informations enregistrées sont :

- ancien statut ;
- nouveau statut ;
- utilisateur ;
- date ;
- commentaire éventuel.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les statuts sont cohérents dans toute la plateforme ;
- les changements sont historisés ;
- les couleurs et icônes sont uniformes.

# Composant 2 — Priorités

## Objectif

Définir un système de priorités commun à l'ensemble de la plateforme.

La priorité permet d'indiquer le niveau d'urgence ou d'importance d'un objet métier.

Elle est indépendante :

- du statut ;
- de l'objectif ;
- du résultat.

---

## Principes

La priorité répond à la question :

**« À quel niveau dois-je traiter cet élément ? »**

Elle n'indique pas l'avancement.

Elle aide uniquement à organiser le travail.

---

## Niveaux de priorité

La plateforme définit quatre niveaux.

### 🔴 Critique

Action immédiate.

Retard susceptible d'avoir un impact majeur :

- réglementaire ;
- juridique ;
- financier ;
- client.

---

### 🟠 Haute

À traiter rapidement.

Le retard peut avoir un impact sur la qualité du service ou sur les délais.

---

### 🟡 Normale

Traitement standard.

Aucune urgence particulière.

---

### 🟢 Faible

Traitement lorsque les activités prioritaires sont terminées.

---

## Attribution

La priorité peut être définie :

- par un utilisateur ;
- par un Workflow ;
- proposée par un Service IA.

L'utilisateur autorisé conserve toujours la possibilité de la modifier.

---

## Affichage

Chaque priorité possède :

- une couleur ;
- une icône ;
- un libellé.

L'affichage est identique dans toute la plateforme.

---

## Utilisation

Les priorités sont utilisées notamment pour :

- le tri des listes ;
- les tableaux de bord ;
- les alertes ;
- les activités ;
- les recommandations IA.

---

## Historique

Chaque changement de priorité est historisé.

Les informations enregistrées sont :

- ancienne priorité ;
- nouvelle priorité ;
- utilisateur ;
- date ;
- commentaire éventuel.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les quatre niveaux sont utilisés de manière homogène ;
- les changements sont historisés ;
- les priorités influencent correctement les tris et les affichages.

# Composant 3 — Commentaires

## Objectif

Permettre aux utilisateurs d'échanger des informations contextualisées sur un objet métier sans modifier ses données.

Les commentaires favorisent la collaboration entre les utilisateurs et assurent la traçabilité des échanges.

---

## Principes

Un commentaire est toujours rattaché à un objet métier.

Exemples :

- Client
- Projet
- Activité
- Document
- Contrat
- Partenaire

Un commentaire ne peut jamais exister seul.

---

## Informations

Chaque commentaire contient :

- Auteur
- Date et heure
- Contenu
- Objet concerné
- Mention éventuelle d'un utilisateur
- Pièces jointes (optionnelles)

---

## Types de commentaires

La plateforme distingue plusieurs catégories :

### Commentaire

Information générale.

---

### Information importante

Mise en évidence visuellement.

---

### Question

Nécessite une réponse.

---

### Réponse

Répond à une question existante.

---

### Commentaire interne

Visible uniquement par les collaborateurs autorisés.

---

## Mentions

L'utilisateur peut mentionner un ou plusieurs collaborateurs.

Exemple :

@Sophie Merci de vérifier ce document avant l'envoi.

La personne mentionnée reçoit une notification.

---

## Pièces jointes

Un commentaire peut contenir :

- Documents
- Images
- Liens
- Fichiers

Les pièces jointes restent liées au commentaire.

---

## Modification

Un commentaire peut être modifié.

La plateforme conserve :

- la date de modification ;
- l'auteur de la modification.

Les versions précédentes restent consultables selon les droits.

---

## Suppression

Un commentaire n'est jamais supprimé physiquement.

Il peut être :

- masqué ;
- archivé ;
- signalé.

La traçabilité est conservée.

---

## Services IA concernés

Les Services IA peuvent :

- analyser les commentaires ;
- détecter des demandes en attente ;
- proposer un résumé.

Ils ne modifient jamais un commentaire existant.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les commentaires sont toujours contextualisés ;
- les mentions fonctionnent ;
- les modifications sont historisées ;
- les droits de visibilité sont respectés.

# Composant 4 — Pièces jointes

## Objectif

Permettre d'associer un ou plusieurs fichiers à un objet métier afin de compléter les informations disponibles.

Une pièce jointe constitue un support d'information. Elle ne remplace pas un document métier généré par la plateforme.

---

## Principes

Une pièce jointe est toujours rattachée à un objet métier.

Exemples :

- Client
- Projet
- Activité
- Contrat
- Document
- Partenaire
- Commentaire

Une pièce jointe ne peut jamais exister seule.

---

## Informations

Chaque pièce jointe comporte :

- Nom du fichier
- Type de fichier
- Taille
- Date d'ajout
- Auteur
- Objet associé
- Version (si applicable)

---

## Types de fichiers acceptés

La plateforme peut accepter notamment :

- PDF
- Word
- Excel
- Images (JPG, PNG, HEIC...)
- Audio
- Vidéo
- Archives (ZIP)
- Autres formats configurables

Les formats autorisés sont paramétrables.

---

## Actions disponibles

L'utilisateur autorisé peut :

- Ajouter
- Consulter
- Télécharger
- Renommer
- Remplacer
- Archiver

La suppression physique est réservée aux administrateurs selon la politique de conservation.

---

## Prévisualisation

Lorsque le format le permet, la plateforme affiche un aperçu sans téléchargement.

Exemples :

- PDF
- Images
- Documents Office compatibles

---

## Sécurité

Chaque pièce jointe hérite des droits de l'objet auquel elle est rattachée.

Un utilisateur ne peut jamais accéder à une pièce jointe sans avoir accès à l'objet principal.

---

## Historique

Chaque action est historisée :

- ajout ;
- consultation (option paramétrable) ;
- téléchargement ;
- remplacement ;
- archivage.

---

## Services IA concernés

Les Services IA peuvent, selon leurs autorisations :

- analyser un document ;
- extraire des informations ;
- proposer une classification ;
- détecter un document manquant.

Ils ne modifient jamais le fichier d'origine.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les fichiers sont correctement rattachés ;
- les droits d'accès sont respectés ;
- les actions sont historisées ;
- la prévisualisation fonctionne lorsque le format le permet.

# Composant 5 — Tags

## Objectif

Permettre de classifier librement les objets métier grâce à des étiquettes personnalisables.

Les tags facilitent l'organisation, la recherche et le filtrage des informations sans modifier les données métier.

---

## Principes

Un tag est une étiquette libre pouvant être associée à un ou plusieurs objets.

Exemples d'objets :

- Client
- Projet
- Activité
- Contrat
- Document
- Partenaire

Un même objet peut posséder plusieurs tags.

Un même tag peut être utilisé sur plusieurs objets.

---

## Informations

Chaque tag possède :

- Nom
- Couleur
- Description (optionnelle)
- Statut (actif / archivé)

---

## Gestion

Selon les droits, l'utilisateur peut :

- créer un tag ;
- modifier un tag ;
- archiver un tag ;
- associer ou retirer un tag d'un objet.

La suppression définitive d'un tag est réservée aux administrateurs.

---

## Recherche et filtres

Les tags peuvent être utilisés pour :

- filtrer les listes ;
- effectuer des recherches ;
- créer des vues personnalisées ;
- alimenter les tableaux de bord.

Plusieurs tags peuvent être combinés.

---

## Utilisation

Exemples de tags :

- VIP
- À surveiller
- Emprunteur
- Santé
- Professionnel
- Prioritaire
- Renouvellement
- GEPP
- Coparentalité

Les tags sont entièrement personnalisables par le cabinet.

---

## Services IA concernés

Les Services IA peuvent :

- proposer un tag ;
- détecter des incohérences ;
- suggérer une classification.

Ils ne créent jamais automatiquement un tag sans validation.

---

## Historique

Les actions suivantes sont historisées :

- création ;
- modification ;
- archivage ;
- ajout à un objet ;
- retrait d'un objet.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- plusieurs tags peuvent être associés à un objet ;
- les recherches fonctionnent correctement ;
- les tags sont historisés ;
- les droits de gestion sont respectés.

# Composant 6 — Recherche globale

## Objectif

Permettre à l'utilisateur de retrouver rapidement toute information présente dans la plateforme depuis un point d'entrée unique.

La recherche globale constitue un composant transverse disponible sur l'ensemble de l'application.

---

## Principes

La recherche doit être :

- rapide ;
- pertinente ;
- contextuelle ;
- sécurisée.

Les résultats affichés respectent toujours les droits d'accès de l'utilisateur.

---

## Objets recherchables

La recherche peut porter notamment sur :

- Clients
- Projets
- Activités
- Contrats
- Documents
- Partenaires
- Produits
- Utilisateurs
- Notes
- Commentaires
- Tags

De nouveaux objets pourront être ajoutés sans modifier le fonctionnement du composant.

---

## Types de recherche

La plateforme propose :

### Recherche simple

Recherche libre par mot-clé.

---

### Recherche avancée

Filtres combinables :

- Type d'objet
- Date
- Statut
- Responsable
- Priorité
- Tags
- Période
- Auteur

---

### Recherche intelligente

La plateforme propose des résultats au fur et à mesure de la saisie.

Elle prend en compte :

- fautes de frappe courantes ;
- synonymes ;
- recherches récentes ;
- favoris.

---

## Présentation des résultats

Chaque résultat affiche :

- Icône de l'objet
- Nom
- Type
- Résumé
- Dernière modification
- Lien direct

Les résultats sont regroupés par catégorie.

---

## Historique

La plateforme conserve :

- les recherches récentes (paramétrable) ;
- les recherches favorites ;
- les recherches enregistrées.

---

## Sécurité

Les résultats sont filtrés selon les droits de l'utilisateur.

Un objet auquel l'utilisateur n'a pas accès ne doit jamais apparaître dans les résultats.

---

## Services IA concernés

Les Services IA peuvent :

- améliorer la pertinence des résultats ;
- proposer des recherches fréquentes ;
- suggérer des filtres.

Ils ne modifient jamais les données affichées.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les résultats sont rapides ;
- les droits sont respectés ;
- les recherches avancées fonctionnent ;
- les recherches enregistrées sont disponibles ;
- les résultats sont pertinents.

# Composant 7 — Événements et notifications

## Objectif

Centraliser la gestion des événements produits par la plateforme et définir les mécanismes de notification associés.

Un événement représente un fait survenu dans le système.

Une notification est un message adressé à un ou plusieurs utilisateurs à la suite d'un événement.

---

## Principes

La plateforme distingue deux notions :

### Événement

Un changement d'état ou une action métier.

Exemples :

- Client créé
- Projet clôturé
- Contrat signé
- Document ajouté
- Activité terminée
- Rendez-vous déplacé

---

### Notification

Information transmise à un utilisateur suite à un événement.

Exemples :

- Nouvelle activité assignée
- Signature reçue
- Rendez-vous dans une heure
- Document manquant
- Nouveau commentaire

---

## Types de notifications

La plateforme peut envoyer :

- Notification dans l'application
- Email
- SMS (option)
- Notification Push (future évolution)

Les canaux sont configurables selon les préférences de l'utilisateur et les règles du cabinet.

---

## Informations

Chaque notification contient :

- Titre
- Description
- Type
- Niveau de priorité
- Date et heure
- Objet concerné
- Lien direct vers l'objet
- Statut (non lue / lue)

---

## Actions disponibles

L'utilisateur peut :

- Consulter une notification
- Marquer comme lue
- Marquer toutes comme lues
- Archiver
- Accéder directement à l'objet concerné

---

## Centre de notifications

La plateforme met à disposition un centre de notifications permettant :

- la consultation de toutes les notifications ;
- le filtrage par type ;
- le filtrage par période ;
- la recherche.

---

## Préférences utilisateur

Chaque utilisateur peut définir :

- les événements pour lesquels il souhaite être notifié ;
- les canaux utilisés ;
- les horaires de réception (si applicable).

Certaines notifications critiques imposées par le cabinet ne peuvent pas être désactivées.

---

## Services IA concernés

Les Services IA peuvent :

- proposer la priorité d'une notification ;
- regrouper plusieurs notifications similaires ;
- générer un résumé quotidien.

Ils ne décident jamais seuls de l'envoi d'une notification réglementaire.

---

## Historique

Chaque notification conserve :

- sa date de création ;
- son origine ;
- son état (lue/non lue) ;
- la date de lecture ;
- les éventuels envois par email ou SMS.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- chaque notification est liée à un événement ;
- les préférences utilisateur sont respectées ;
- les notifications critiques sont toujours transmises ;
- les liens ouvrent le bon objet ;
- l'historique est conservé.

# Composant 8 — Historique métier

## Objectif

Conserver la trace de toutes les évolutions importantes d'un objet métier afin d'assurer la traçabilité, la compréhension des dossiers et les besoins d'audit.

L'historique métier permet de répondre à la question :

"Que s'est-il passé sur cet objet ?"

---

## Principes

L'historique est généré automatiquement.

Aucune saisie manuelle n'est possible.

Il est disponible sur tous les objets métier :

- Client
- Projet
- Activité
- Contrat
- Document
- Partenaire
- Produit
- Utilisateur

---

## Informations enregistrées

Chaque événement contient :

- Date et heure
- Auteur de l'action
- Type d'action
- Description
- Ancienne valeur (si applicable)
- Nouvelle valeur (si applicable)
- Origine de l'action
- Référence de l'objet concerné

---

## Types d'événements

Exemples :

- Création
- Modification
- Changement de statut
- Changement de responsable
- Ajout d'une pièce jointe
- Génération d'un document
- Signature
- Affectation
- Archivage

La liste est extensible.

---

## Présentation

L'historique est affiché sous forme chronologique.

Chaque événement comprend :

- une icône ;
- une date ;
- un auteur ;
- une description claire ;
- un lien vers l'élément concerné si nécessaire.

---

## Recherche

L'utilisateur peut filtrer l'historique par :

- période ;
- utilisateur ;
- type d'action ;
- module ;
- origine.

---

## Sécurité

L'historique est consultable selon les droits de l'utilisateur.

Les événements ne peuvent jamais être modifiés ni supprimés.

---

## Services IA concernés

Les Services IA peuvent :

- analyser les historiques ;
- produire des synthèses ;
- détecter des anomalies ;
- identifier des habitudes de travail.

Ils ne modifient jamais l'historique.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- tous les événements importants sont enregistrés ;
- les informations sont fiables ;
- les événements sont classés chronologiquement ;
- aucune modification n'est possible ;
- les filtres fonctionnent correctement.

# Composant 9 — Vues, filtres et tris enregistrés

## Objectif

Permettre à chaque utilisateur de personnaliser l'affichage des listes afin de retrouver rapidement les informations qui lui sont utiles.

Une vue correspond à une combinaison enregistrée de filtres, de tris et de colonnes.

---

## Principes

Le composant est disponible sur toutes les listes de la plateforme.

Exemples :

- Clients
- Projets
- Activités
- Contrats
- Documents
- Partenaires
- Produits
- Utilisateurs

---

## Éléments personnalisables

L'utilisateur peut enregistrer :

- Les filtres
- Les tris
- Les colonnes affichées
- L'ordre des colonnes
- Le nombre d'éléments par page
- Le mode d'affichage (liste, cartes, tableau...)

---

## Types de vues

### Vue personnelle

Visible uniquement par son créateur.

---

### Vue partagée

Visible par les membres d'une équipe ou d'un service.

---

### Vue système

Créée par l'administrateur.

Disponible pour tous.

Elle ne peut pas être supprimée.

---

## Actions disponibles

L'utilisateur peut :

- Créer une vue
- Renommer une vue
- Modifier une vue
- Dupliquer une vue
- Définir une vue par défaut
- Partager une vue (selon ses droits)
- Supprimer une vue personnelle

---

## Utilisation

Une vue peut être appliquée en un clic.

Toutes les listes utilisent le même fonctionnement.

---

## Services IA concernés

Les Services IA peuvent :

- suggérer une vue adaptée ;
- recommander des filtres ;
- identifier les vues rarement utilisées.

Ils ne créent jamais de vues sans validation de l'utilisateur.

---

## Historique

Les opérations suivantes sont historisées :

- création ;
- modification ;
- partage ;
- suppression.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les vues sont réutilisables ;
- les préférences sont conservées ;
- les droits de partage sont respectés ;
- le comportement est identique dans tous les modules.

# Composant 10 — Permissions et droits d'accès

## Objectif

Définir un système unique de gestion des droits d'accès applicable à l'ensemble de la plateforme EJ Assurances.

Les permissions déterminent les actions qu'un utilisateur est autorisé à réaliser sur les différents objets métier.

---

## Principes

Les permissions sont accordées en fonction :

- du rôle de l'utilisateur ;
- de ses habilitations ;
- du contexte métier ;
- des règles de sécurité.

Les permissions sont identiques dans tous les modules.

---

## Types de permissions

Chaque objet métier peut autoriser les actions suivantes :

- Consulter
- Créer
- Modifier
- Supprimer (si autorisé)
- Archiver
- Restaurer
- Exporter
- Imprimer
- Partager

Des permissions spécifiques pourront être ajoutées selon les besoins.

---

## Héritage

Les permissions peuvent être héritées.

Exemple :

Un Responsable hérite des droits d'un Collaborateur et bénéficie de droits supplémentaires.

L'héritage est défini dans le référentiel des rôles.

---

## Contrôle des accès

Avant chaque action, la plateforme vérifie :

- l'identité de l'utilisateur ;
- son rôle ;
- ses permissions ;
- les éventuelles restrictions métier.

Aucune action n'est exécutée sans validation des droits.

---

## Affichage

L'interface adapte automatiquement les actions proposées.

Exemple :

Si l'utilisateur ne peut pas supprimer un objet, le bouton "Supprimer" n'est pas affiché.

L'objectif est d'éviter toute confusion.

---

## Journalisation

Chaque refus d'accès peut être historisé selon la politique de sécurité du cabinet.

Les actions sensibles sont systématiquement tracées.

---

## Services IA concernés

Les Services IA respectent les mêmes permissions que les utilisateurs.

Ils ne peuvent jamais accéder à une donnée ou exécuter une action non autorisée.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les droits sont appliqués de manière uniforme ;
- l'interface s'adapte automatiquement aux permissions ;
- les contrôles sont réalisés avant chaque action ;
- les actions sensibles sont correctement historisées.

# Composant 11 — Export / Import

## Objectif

Permettre aux utilisateurs autorisés d'importer et d'exporter des données de manière homogène dans l'ensemble de la plateforme.

Ce composant garantit une expérience identique quel que soit le module concerné.

---

## Principes

Les fonctions d'import et d'export sont disponibles uniquement selon les permissions de l'utilisateur.

Chaque module peut proposer :

- Export
- Import
- Les deux
- Aucun

---

## Formats d'export

La plateforme prend notamment en charge :

- PDF
- Excel (.xlsx)
- CSV

D'autres formats pourront être ajoutés ultérieurement.

---

## Formats d'import

La plateforme peut importer :

- CSV
- Excel

Chaque module définit les données importables.

---

## Assistant d'import

L'import est guidé en plusieurs étapes :

1. Sélection du fichier
2. Vérification du format
3. Correspondance des colonnes
4. Détection des erreurs
5. Aperçu avant validation
6. Import
7. Rapport d'import

Aucune donnée n'est importée avant validation finale.

---

## Gestion des erreurs

Les erreurs sont classées par niveau :

- Bloquante
- Avertissement
- Information

Un rapport détaillé est généré à la fin de l'import.

---

## Historique

Chaque import ou export est historisé :

- utilisateur ;
- date ;
- module ;
- type ;
- nombre d'enregistrements ;
- résultat.

---

## Sécurité

Les exports respectent les permissions de l'utilisateur.

Un utilisateur ne peut exporter que les données auxquelles il a accès.

---

## Services IA concernés

Les Services IA peuvent assister l'utilisateur dans le mapping des colonnes et détecter les incohérences avant l'import.

Ils ne modifient jamais les données sans validation humaine.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les imports sont sécurisés ;
- les exports respectent les droits ;
- les erreurs sont clairement identifiées ;
- les opérations sont historisées.

# Composant 12 — Archivage & Corbeille

## Objectif

Définir les règles communes d'archivage, de mise en corbeille, de restauration et de suppression des objets métier.

L'objectif est de préserver la traçabilité tout en permettant le nettoyage des données non utilisées.

---

## Principes

La plateforme distingue trois états :

### Actif

L'objet est utilisable normalement.

---

### Archivé

L'objet est conservé mais n'est plus proposé dans les traitements courants.

Il reste consultable selon les droits.

---

### Corbeille

L'objet est retiré de l'utilisation courante.

Il peut encore être restauré pendant une durée définie.

---

## Suppression définitive

La suppression physique est exceptionnelle.

Elle est réservée :

- aux administrateurs autorisés ;
- aux traitements automatiques de purge ;
- aux obligations réglementaires de suppression.

Une suppression définitive est irréversible.

---

## Archivage

Un objet archivé :

- reste consultable ;
- conserve son historique ;
- conserve ses commentaires ;
- conserve ses pièces jointes ;
- conserve ses relations métier.

Il peut être restauré.

---

## Corbeille

Un objet placé dans la corbeille :

- n'apparaît plus dans les listes courantes ;
- reste récupérable pendant la durée définie par le cabinet ;
- conserve toutes ses données.

À l'expiration de cette durée, une suppression définitive peut être proposée ou exécutée selon la politique de conservation.

---

## Historique

Les actions suivantes sont historisées :

- Archivage
- Désarchivage
- Mise en corbeille
- Restauration
- Suppression définitive

Pour chaque action :

- auteur ;
- date ;
- motif (optionnel ou obligatoire selon les cas).

---

## Relations métier

Avant toute mise en corbeille ou suppression, la plateforme vérifie les dépendances.

Exemples :

- Projet lié à un Contrat ;
- Client possédant des Projets ;
- Activité liée à un Projet.

Si des dépendances existent, la plateforme informe l'utilisateur et applique les règles définies.

---

## Services IA concernés

Les Services IA peuvent :

- suggérer l'archivage d'objets inactifs ;
- détecter les doublons ;
- proposer un nettoyage.

Ils ne peuvent jamais supprimer ou archiver automatiquement un objet sans validation humaine.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les trois états sont clairement distingués ;
- les restaurations fonctionnent ;
- les dépendances sont contrôlées ;
- toutes les actions sont historisées ;
- les suppressions définitives sont sécurisées.

# Composant 13 — Favoris

## Objectif

Permettre à chaque utilisateur de retrouver rapidement les éléments qu'il consulte ou utilise régulièrement.

Les favoris constituent un raccourci personnel et n'ont aucun impact sur les données métier.

---

## Principes

Tout objet métier compatible peut être ajouté aux favoris.

Exemples :

- Client
- Projet
- Activité
- Contrat
- Document
- Partenaire
- Produit
- Rapport
- Vue enregistrée

Les favoris sont personnels.

Ils ne sont jamais visibles par les autres utilisateurs.

---

## Ajout et suppression

Chaque objet compatible affiche une icône "Favori".

L'utilisateur peut :

- Ajouter aux favoris
- Retirer des favoris

Ces actions sont immédiates.

---

## Accès

Les favoris sont accessibles :

- depuis le Tableau de bord ;
- depuis le menu principal ;
- via la recherche globale.

---

## Organisation

L'utilisateur peut :

- réordonner ses favoris ;
- créer des catégories (future évolution) ;
- épingler certains favoris en haut de la liste.

---

## Synchronisation

Les favoris sont associés au compte utilisateur.

Ils sont disponibles sur tous les appareils utilisés par l'utilisateur.

---

## Services IA concernés

Les Services IA peuvent :

- suggérer de placer un objet en favori en fonction de son utilisation.

Ils ne peuvent jamais ajouter ou retirer un favori automatiquement.

---

## Historique

Les ajouts et suppressions de favoris ne sont pas intégrés à l'historique métier des objets.

Ils peuvent être enregistrés uniquement à des fins techniques ou statistiques.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- chaque utilisateur gère ses propres favoris ;
- les favoris sont synchronisés entre les appareils ;
- l'ajout et la suppression sont instantanés ;
- les favoris n'impactent jamais les données métier.

# Composant 14 — Actions standard

## Objectif

Définir un catalogue unique des actions disponibles dans l'ensemble de la plateforme.

Chaque module réutilise ces actions afin d'assurer une expérience utilisateur homogène.

---

## Principes

Une action représente une opération réalisable sur un objet métier.

Les mêmes actions produisent toujours le même comportement, quel que soit le module.

---

## Actions standards

### Consultation

- Ouvrir
- Consulter
- Prévisualiser

---

### Création

- Créer
- Dupliquer

---

### Modification

- Modifier
- Affecter
- Changer le statut
- Changer la priorité
- Ajouter un commentaire
- Ajouter une pièce jointe
- Ajouter un tag

---

### Gestion

- Archiver
- Restaurer
- Mettre en corbeille
- Supprimer (si autorisé)

---

### Partage

- Partager
- Exporter
- Imprimer
- Générer un PDF
- Envoyer par email

---

### Navigation

- Ouvrir le Client
- Ouvrir le Projet
- Ouvrir le Contrat
- Ouvrir le Document associé

---

## Présentation

Les actions utilisent :

- les mêmes icônes ;
- les mêmes libellés ;
- les mêmes raccourcis clavier (si disponibles) ;
- les mêmes confirmations.

---

## Confirmation

Les actions sensibles nécessitent une confirmation.

Exemples :

- Suppression
- Archivage
- Clôture
- Validation
- Signature

---

## Services IA concernés

Les Services IA peuvent proposer une action.

Ils ne peuvent jamais exécuter une action sensible sans validation humaine.

---

## Critères de validation

Le composant sera considéré comme conforme lorsque :

- les actions sont identiques dans tous les modules ;
- les confirmations sont cohérentes ;
- les permissions sont respectées ;
- les raccourcis sont homogènes.

