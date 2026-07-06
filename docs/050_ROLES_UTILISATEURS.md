PARTIE 1 — Philosophie des rôles
1. Objet du document

Ce document définit l'ensemble des rôles utilisateurs de la plateforme EJ Assurances.

Il constitue la référence officielle pour :

les développeurs ;
les designers UX/UI ;
les administrateurs ;
les responsables conformité ;
les futurs associés.

Chaque fonctionnalité développée devra être rattachée à un ou plusieurs rôles définis dans ce document.

2. Philosophie générale

La plateforme EJ Assurances repose sur un principe fondamental :

Chaque utilisateur travaille sur le même Projet, mais selon une vue adaptée à son rôle.

Le rôle ne détermine pas uniquement les droits d'accès.

Il détermine également :

les informations affichées ;
les actions possibles ;
les tableaux de bord ;
les notifications ;
les agents IA disponibles ;
les workflows accessibles.

Deux utilisateurs peuvent consulter le même Projet tout en ayant une interface totalement différente.

3. Les grands principes
Principe n°1 — Une identité unique

Chaque utilisateur possède un compte unique.

Une même personne peut cumuler plusieurs rôles.

Exemple :

Un collaborateur peut également être administrateur.

Les autorisations résultent de l'ensemble de ses rôles.

Principe n°2 — Le moindre privilège

Par défaut, un utilisateur ne voit rien.

Les droits sont accordés uniquement lorsqu'ils sont nécessaires à sa mission.

Principe n°3 — Les vues

Les rôles ne modifient pas les données.

Ils modifient la manière dont elles sont présentées.

Le Projet reste identique.

Seule la vue évolue.

Principe n°4 — Les responsabilités

Chaque rôle possède :

un objectif ;
des responsabilités ;
des droits ;
des limitations.

Aucun rôle ne doit être ambigu.

Principe n°5 — La traçabilité

Toutes les actions importantes sont historisées.

L'historique précise notamment :

l'utilisateur ;
son rôle ;
la date ;
l'action réalisée.

Les actions des Agents IA sont historisées de la même manière.

4. Les familles de rôles

Les rôles sont regroupés en grandes familles.

Les utilisateurs externes

Ils n'appartiennent pas au cabinet.

Ils comprennent notamment :

Prospect
Client
Prescripteur
Partenaire
Les utilisateurs commerciaux

Ils développent l'activité.

Ils comprennent notamment :

Mandataire (MIA)
Courtier
Responsable commercial
Les utilisateurs opérationnels

Ils assurent le traitement des dossiers.

Ils comprennent notamment :

Collaborateur
Gestionnaire
Gestionnaire sinistres
Responsable conformité
Les utilisateurs de direction

Ils pilotent le cabinet.

Ils comprennent notamment :

Administrateur
Directeur
DGD
Comptable
Les utilisateurs techniques

Ils assistent les autres utilisateurs.

Ils comprennent notamment :

Agents IA
Automatisations
Services techniques

Ils n'interviennent jamais sans traçabilité.

5. Les niveaux d'accès

Chaque rôle possède un niveau d'accès.

Niveau 1

Consultation.

Niveau 2

Création.

Niveau 3

Modification.

Niveau 4

Validation.

Niveau 5

Administration.

Chaque fonctionnalité de la plateforme devra préciser le niveau minimum requis.

6. Les principes de sécurité

L'accès à une information dépend toujours de quatre critères.

le rôle ;
les autorisations ;
le Projet concerné ;
le contexte.

Exemple :

Un Mandataire peut consulter uniquement ses propres Projets.

Un Administrateur peut consulter l'ensemble des Projets.

Un Client consulte uniquement ses propres informations.

7. Les Agents IA

Les Agents IA sont considérés comme des utilisateurs techniques.

Ils disposent :

d'un compte ;
d'un rôle ;
d'autorisations ;
d'un historique.

Ils ne disposent jamais d'un accès illimité.

Chaque Agent IA possède un périmètre d'action clairement défini.

8. Évolutivité

La création d'un nouveau rôle ne doit jamais nécessiter une refonte de la plateforme.

Chaque nouveau rôle devra simplement définir :

sa vue ;
ses droits ;
ses workflows ;
ses agents IA associés.
9. Critères de validation

Le système de rôles sera considéré comme conforme lorsque :

chaque utilisateur possède un rôle clairement identifié ;
les responsabilités sont explicites ;
les droits sont cohérents ;
les vues sont adaptées ;
les accès sont sécurisés ;
toutes les actions sont historisées.

PARTIE 2 — Description des rôles
10. Prospect
Définition

Le Prospect est une personne ou une organisation ayant manifesté un intérêt pour les services du cabinet sans qu'une relation contractuelle ne soit encore établie.

Le Prospect devient Client lors de la signature de la Lettre de Mission ou lors de la souscription du premier contrat (ce point sera paramétrable).

Objectifs
Découvrir le cabinet.
Déposer une demande.
Être accompagné.
Fournir les premiers documents.
Peut consulter
Son espace Prospect.
Ses demandes.
Les messages du cabinet.
Les documents demandés.
Les documents qu'il a transmis.
L'avancement de son Projet.
Peut effectuer
Compléter un formulaire.
Déposer des documents.
Signer électroniquement.
Échanger avec le cabinet.
Prendre rendez-vous.
Ne peut jamais
Voir les dossiers d'autres personnes.
Modifier les analyses du cabinet.
Modifier les documents officiels.
11. Client
Définition

Le Client possède une relation contractuelle avec le cabinet.

Il peut posséder plusieurs Projets et plusieurs Contrats.

Objectifs
Suivre ses Projets.
Consulter ses Contrats.
Déposer des documents.
Communiquer avec le cabinet.
Signer les documents nécessaires.
Peut consulter
Tableau de bord.
Projets.
Contrats.
Documents.
Devoirs de conseil validés.
Historique.
Messages.
Rendez-vous.
Peut effectuer
Déposer des documents.
Répondre aux demandes.
Signer.
Déclarer un sinistre.
Déclarer une réclamation.
Demander un nouveau Projet.
Ne peut jamais
Modifier un devoir de conseil validé.
Supprimer des documents réglementaires.
Modifier les données internes du cabinet.
12. Mandataire (MIA)
Définition

Le Mandataire exerce une activité commerciale au nom du cabinet selon les droits qui lui sont accordés.

Il travaille sur ses propres Projets tout en étant supervisé par le cabinet.

Objectifs
Développer son portefeuille.
Suivre ses clients.
Respecter les obligations réglementaires.
Collaborer avec le cabinet.
Peut consulter
Ses Prospects.
Ses Clients.
Ses Projets.
Son Pipeline.
Ses statistiques.
Son classeur ACPR.
Ses commissions.
Ses Agents IA.
Peut effectuer
Créer un Prospect.
Créer un Projet.
Compléter un dossier.
Demander des devis.
Préparer un devoir de conseil.
Dialoguer avec les Agents IA.
Connecter son Google Workspace professionnel.
Ne peut jamais
Accéder aux dossiers d'autres Mandataires (sauf autorisation).
Modifier les paramètres du cabinet.
Supprimer des preuves réglementaires.
13. Collaborateur
Définition

Le Collaborateur intervient dans la gestion quotidienne des dossiers.

Son périmètre dépend de son service.

Peut consulter
Les Projets qui lui sont affectés.
Les tâches.
Les documents.
Les emails.
Les workflows.
Les dossiers clients.
Peut effectuer
Traiter un dossier.
Ajouter des documents.
Préparer des devis.
Relancer.
Communiquer avec les clients.
Affecter certaines tâches.
Ne peut jamais
Modifier les paramètres généraux.
Supprimer les historiques.
Modifier les droits utilisateurs.
14. Prescripteur
Définition

Le Prescripteur recommande des prospects au cabinet.

Il ne participe pas au traitement technique des dossiers.

Peut consulter
Les prospects apportés.
L'avancement des dossiers.
Ses commissions.
Ses messages.
Peut effectuer
Déclarer un Prospect.
Échanger avec le cabinet.
Télécharger certains documents autorisés.
Ne peut jamais
Voir les informations confidentielles du client.
Modifier les dossiers.
Accéder au CRM.
15. Partenaire
Définition

Le Partenaire représente une compagnie, un courtier grossiste, une banque ou tout autre organisme avec lequel le cabinet travaille.

Un accès partenaire pourra être proposé selon les besoins.

Peut consulter

Uniquement les informations mises à disposition par le cabinet.

Peut effectuer

Selon les droits accordés :

déposer des documents ;
mettre à jour certains contacts ;
répondre à des demandes.
Ne peut jamais

Accéder aux données clients.

16. Administrateur Courtier
Définition

L'Administrateur Courtier pilote l'ensemble de la plateforme.

Il dispose de la vision 360°.

Peut consulter

L'intégralité de la plateforme.

Peut effectuer
gérer les utilisateurs ;
gérer les rôles ;
gérer les partenaires ;
gérer les produits ;
superviser les Projets ;
gérer la conformité ;
piloter les workflows ;
administrer les Agents IA ;
consulter les statistiques.
Responsabilité

L'Administrateur est responsable de la conformité globale de la plateforme.

17. Direction

La Direction possède les mêmes droits que l'Administrateur.

Elle bénéficie en complément :

des indicateurs stratégiques ;
des tableaux de bord financiers ;
des statistiques de production ;
des analyses IA.
18. Les Agents IA

Chaque Agent IA possède une identité propre.

Exemple :

Julie
Marc
Thomas
Mathilde
Vincent

Chaque Agent IA possède :

une mission ;
un domaine de compétence ;
des limites ;
un responsable humain ;
une traçabilité complète.

Les Agents IA sont considérés comme des collaborateurs numériques.

Ils ne prennent jamais une décision réglementaire à la place d'un humain.

19. Critères de validation

Cette description sera considérée comme conforme lorsque :

chaque rôle possède une mission claire ;
les droits sont explicitement définis ;
les limites sont précisées ;
les responsabilités sont identifiées ;
les rôles peuvent évoluer sans remettre en cause l'architecture globale.


PARTIE 3 — Les autorisations et la matrice des droits
20. Philosophie des autorisations

Les rôles définissent qui est l'utilisateur.

Les autorisations définissent ce qu'il peut faire.

Deux utilisateurs possédant le même rôle peuvent disposer d'autorisations différentes.

Exemple :

Deux Mandataires peuvent avoir :

des compagnies différentes ;
des produits différents ;
des plafonds différents ;
des accès différents.

Le système doit donc distinguer :

le rôle ;
les permissions.
21. Les niveaux d'autorisation

Chaque permission est définie selon cinq niveaux.

Niveau	Autorisation
0	Aucun accès
1	Consultation
2	Création
3	Modification
4	Validation
5	Administration

Ces niveaux sont utilisés dans toute la plateforme.

22. Les domaines soumis aux permissions

Les permissions peuvent être appliquées sur tous les domaines de la plateforme.

Exemples :

Relation
Projet
Produits
Partenaires
Bibliothèque documentaire
Communication
Conformité
IA
Workflows
Google Workspace
Pilotage

Chaque domaine possède sa propre matrice d'autorisations.

23. Matrice simplifiée des droits
Domaine	Prospect	Client	MIA	Collaborateur	Admin
Consulter ses projets	✅	✅	✅	✅	✅
Consulter tous les projets	❌	❌	❌*	⚠️	✅
Créer un projet	✅	✅	✅	✅	✅
Modifier un projet	❌	⚠️	✅	✅	✅
Clôturer un projet	❌	❌	⚠️	⚠️	✅
Gérer les utilisateurs	❌	❌	❌	❌	✅
Gérer les partenaires	❌	❌	⚠️	⚠️	✅
Gérer les produits	❌	❌	❌	⚠️	✅
Modifier la conformité	❌	❌	❌	⚠️	✅

* sauf autorisation spécifique.

⚠️ selon les droits accordés.

24. Permissions contextuelles

Certaines autorisations dépendent du contexte.

Exemple :

Un Collaborateur peut modifier un Projet uniquement s'il lui est affecté.

Un Mandataire peut consulter uniquement les Projets de son portefeuille.

Un Responsable Conformité peut consulter tous les dossiers mais ne peut pas modifier les informations commerciales.

25. Permissions temporaires

Le système doit permettre d'accorder des autorisations temporaires.

Exemples :

remplacement d'un collaborateur ;
congés ;
renfort ponctuel ;
audit ;
contrôle ACPR.

Chaque permission temporaire possède :

une date de début ;
une date de fin ;
un responsable.
26. Délégation

Un utilisateur peut déléguer certaines actions.

Exemple :

Un Mandataire peut autoriser un Collaborateur à déposer des documents.

Un Directeur peut déléguer certaines validations.

Toutes les délégations sont historisées.

27. Validation à plusieurs niveaux

Certaines actions nécessitent plusieurs validations.

Exemple :

suppression d'un document réglementaire ;
modification d'un devoir de conseil validé ;
suppression d'un utilisateur ;
désactivation d'un Agent IA.

La plateforme doit pouvoir gérer des workflows de validation multiples.

28. Journal des autorisations

Toute modification d'une permission est enregistrée.

Le journal indique notamment :

utilisateur concerné ;
administrateur ayant effectué la modification ;
ancienne valeur ;
nouvelle valeur ;
date ;
motif.
29. Séparation des responsabilités

Aucun utilisateur ne doit pouvoir réaliser seul une action critique lorsqu'une séparation des responsabilités est requise.

Exemple :

Un Agent IA prépare un devoir de conseil.

Le Conseiller le valide.

Le Client le signe.

Chaque étape est assurée par un acteur différent.

30. Critères de validation

Le système d'autorisations sera considéré comme conforme lorsque :

les rôles sont séparés des permissions ;
les permissions peuvent être personnalisées ;
les autorisations temporaires sont possibles ;
les délégations sont tracées ;
les validations multiples sont supportées ;
toutes les modifications sont historisées.

PARTIE 4 — Les profils détaillés et leurs tableaux de bord
31. Philosophie des tableaux de bord

Chaque utilisateur doit accéder à un tableau de bord adapté à sa mission.

Le tableau de bord ne doit jamais être une simple page d'accueil.

Il doit permettre à l'utilisateur de connaître immédiatement :

les actions à réaliser ;
les alertes ;
les indicateurs importants ;
les priorités ;
les demandes en attente.

Chaque tableau de bord est construit autour du rôle de l'utilisateur.

32. Tableau de bord Prospect
Objectif

Accompagner le Prospect jusqu'à sa transformation en Client.

Informations affichées
Mes demandes en cours
Avancement de mes Projets
Documents demandés
Documents déposés
Rendez-vous à venir
Messages du cabinet
Notifications
Actions rapides
Déposer un document
Compléter un formulaire
Signer un document
Envoyer un message
Prendre rendez-vous
33. Tableau de bord Client
Objectif

Permettre au Client de suivre l'ensemble de sa relation avec le cabinet.

Informations affichées
Mes Projets
Mes Contrats
Mes Sinistres
Mes Réclamations
Mes Documents
Mes Rendez-vous
Mes Messages
Mes prochaines actions
Actions rapides
Déclarer un sinistre
Déposer un document
Signer un document
Demander un nouveau Projet
Contacter mon conseiller
34. Tableau de bord Mandataire (MIA)
Objectif

Piloter son activité commerciale et réglementaire.

Informations affichées
Activité
Prospects
Clients
Projets
Contrats
Pipeline
Conformité
Score ACPR
Documents manquants
Formations
Alertes
Commercial
Objectifs
Production
Commissions
Classement
IA
Notifications des Agents IA
Tâches proposées
Alertes
Actions rapides
Créer un Prospect
Ouvrir un Projet
Demander un devis
Préparer un devoir de conseil
Consulter son classeur ACPR
35. Tableau de bord Collaborateur
Objectif

Piloter les opérations quotidiennes du cabinet.

Informations affichées
Dossiers en attente
Documents à contrôler
Signatures en attente
Sinistres
Réclamations
Emails à traiter
Tâches
Agenda
Actions rapides
Affecter un dossier
Envoyer un document
Relancer un client
Valider une pièce
Répondre à un email
36. Tableau de bord Administrateur Courtier
Objectif

Piloter l'ensemble de la plateforme.

Informations affichées
Activité
Nombre de Projets
Production
Chiffre d'affaires
Commissions
Taux de transformation
Utilisateurs
Clients
Mandataires
Collaborateurs
Prescripteurs
Conformité
Score global
Alertes
Dossiers incomplets
Contrôles
IA
Activité des Agents IA
Temps gagné
Demandes traitées
Escalades vers un humain
Workflows
En cours
En erreur
Suspendus
Actions rapides
Créer un utilisateur
Créer un partenaire
Créer un produit
Consulter les statistiques
Paramétrer les IA
Superviser les workflows
37. Tableau de bord Direction
Objectif

Piloter la stratégie du cabinet.

Informations affichées
Évolution du chiffre d'affaires
Rentabilité
Productivité
Satisfaction client
Activité des Mandataires
Activité des Collaborateurs
Activité des Agents IA
Performance des partenaires
État de conformité

Les indicateurs sont consolidés.

38. Tableau de bord Partenaire (optionnel)

Si un accès partenaire est activé.

Le partenaire pourra consulter :

les demandes qui lui sont adressées ;
les documents attendus ;
les conventions ;
les API disponibles ;
les échanges autorisés.

Le partenaire n'a jamais accès aux données confidentielles des clients.

39. Tableau de bord des Agents IA

Chaque Agent IA dispose d'un espace de supervision.

Il comprend notamment :

sa mission ;
son état ;
ses conversations ;
ses actions ;
ses erreurs ;
ses demandes en attente ;
ses statistiques ;
son responsable humain.

Cet espace est réservé aux administrateurs.

40. Principes communs

Tous les tableaux de bord respectent les mêmes principes :

Design System unique ;
Navigation identique ;
Recherche globale ;
Notifications centralisées ;
Historique accessible ;
Aucune information dupliquée ;
Accès rapide aux actions principales.

Chaque utilisateur doit retrouver les mêmes habitudes d'utilisation quel que soit son rôle.

41. Critères de validation

Les tableaux de bord seront considérés comme conformes lorsque :

chaque rôle dispose d'un tableau de bord dédié ;
les informations affichées sont pertinentes pour le rôle ;
les actions rapides permettent de réaliser les tâches les plus fréquentes ;
les indicateurs sont adaptés aux responsabilités de l'utilisateur ;
la navigation reste homogène entre tous les espaces.

PARTIE 5 — Évolution des rôles, multi-rôles et gouvernance
42. Philosophie

La plateforme EJ Assurances doit s'adapter à l'évolution d'un utilisateur sans nécessiter la création d'un nouveau compte.

Un utilisateur peut évoluer au sein du cabinet ou cumuler plusieurs responsabilités.

Le système doit gérer cette évolution naturellement.

43. Le principe du compte unique

Chaque personne possède un compte utilisateur unique.

Ce compte est associé à une identité unique.

À cette identité peuvent être associés :

un ou plusieurs rôles ;
des permissions spécifiques ;
des appartenances à une ou plusieurs équipes ;
un ou plusieurs cabinets (dans le cas du multi-cabinet).

Le changement de rôle ne crée jamais un nouveau compte.

44. Gestion des multi-rôles

Un utilisateur peut cumuler plusieurs rôles.

Exemples :

Administrateur + Courtier
Collaborateur + Responsable conformité
Mandataire + Prescripteur
Directeur + Administrateur

Les autorisations résultent de la combinaison des rôles attribués.

En cas de conflit, la règle la plus restrictive s'applique, sauf décision explicite de l'Administrateur.

45. Gestion des équipes

Les utilisateurs peuvent être regroupés au sein d'équipes.

Exemples :

Direction
Commercial
Gestion
Sinistres
Conformité
Comptabilité
Support
Marketing
Développement

Les équipes permettent :

d'affecter des Projets ;
de répartir les tâches ;
de gérer les workflows ;
de suivre les performances.
46. Appartenance à un cabinet

La plateforme est conçue pour fonctionner en mode multi-cabinet.

Chaque utilisateur appartient à un cabinet principal.

Selon les droits accordés, il peut intervenir sur plusieurs cabinets.

Exemple :

Cabinet A
Cabinet B
Groupement
Réseau

Chaque action est toujours rattachée au cabinet concerné.

47. Changement de rôle

Lorsqu'un utilisateur change de fonction :

son historique est conservé ;
ses anciennes actions restent attribuées à son identité ;
ses nouvelles permissions sont appliquées immédiatement.

Le changement de rôle ne modifie jamais les données historiques.

48. Désactivation d'un utilisateur

Lorsqu'un utilisateur quitte le cabinet :

Son compte est désactivé.

Les éléments suivants sont conservés :

historique ;
actions réalisées ;
validations ;
documents signés ;
échanges.

Le compte n'est jamais supprimé sans respecter les obligations légales.

49. Gestion des Agents IA

Chaque Agent IA est enregistré comme un utilisateur technique.

Il possède :

un identifiant unique ;
un nom ;
une mission ;
un domaine de compétence ;
un responsable humain ;
un niveau d'autorisation ;
un journal d'activité.

Un Agent IA peut être activé ou désactivé sans impacter les données de la plateforme.

50. Gouvernance des rôles

Toute création ou modification d'un rôle doit être validée par un Administrateur.

Les modifications sont historisées.

Le journal comprend :

date ;
auteur ;
rôle concerné ;
modification effectuée ;
justification.
51. Audit des accès

La plateforme doit permettre de consulter à tout moment :

les rôles attribués ;
les permissions ;
les délégations ;
les accès temporaires ;
les connexions ;
les actions sensibles.

Ces informations doivent pouvoir être exportées dans le cadre d'un contrôle ACPR ou d'un audit interne.

52. Principes d'évolution

La création d'un nouveau rôle ne doit jamais nécessiter une refonte de l'architecture.

Chaque nouveau rôle devra simplement définir :

sa mission ;
ses droits ;
ses vues ;
ses tableaux de bord ;
ses interactions avec les autres domaines.

Cette approche garantit l'évolutivité de la plateforme.

53. Critères de validation

Le système de gestion des rôles sera considéré comme conforme lorsque :

chaque utilisateur possède une identité unique ;
un utilisateur peut cumuler plusieurs rôles ;
les changements de rôle sont historisés ;
les équipes peuvent être gérées indépendamment des rôles ;
les comptes désactivés conservent leur historique ;
les Agents IA sont intégrés comme des utilisateurs techniques ;
les accès sont auditables à tout moment.

