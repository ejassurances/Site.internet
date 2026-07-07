# 200_SPEC_AUTHENTIFICATION

## Objet

Ce document décrit l'ensemble des fonctionnalités du module Authentification de la plateforme Nexumia.

Il constitue la spécification fonctionnelle de référence pour les développeurs, les designers UX/UI et les Services IA.

Le module Authentification est responsable de :

- l'identification des utilisateurs ;
- la gestion des sessions ;
- la sécurité des accès ;
- l'attribution des rôles ;
- la sélection du cabinet ;
- la gestion des appareils de confiance ;
- la double authentification ;
- la traçabilité des connexions.

Le module repose sur un principe fondamental :

> Un utilisateur possède une seule identité pouvant être associée à plusieurs rôles et plusieurs cabinets.


# Écran 1 — Connexion

## Objectif

Permettre à un utilisateur autorisé d'accéder à la plateforme Nexumia de manière sécurisée.

Il constitue le point d'entrée principal de la plateforme.

---

## Utilisateurs concernés

- Administrateur
- Dirigeant
- Responsable
- Collaborateur
- Mandataire
- Client
- Prospect
- Partenaire

---

## Composants

L'écran contient :

### Zone principale

- Logo Nexumia
- Logo du cabinet (si personnalisé)
- Champ Email
- Champ Mot de passe
- Afficher/Masquer le mot de passe
- Case "Rester connecté"
- Bouton "Se connecter"

### Liens

- Mot de passe oublié
- Créer un compte (si autorisé)

### Pied de page

- Mentions légales
- Politique de confidentialité
- Conditions Générales
- Version de la plateforme

---

## Vérifications

Lors de la connexion, la plateforme vérifie :

- format de l'email ;
- existence du compte ;
- compte actif ;
- mot de passe valide ;
- utilisateur non bloqué ;
- cabinet actif ;
- abonnement valide (si applicable) ;
- MFA si activée.

---

## Actions automatiques

En cas de connexion réussie :

- ouverture de session ;
- chargement de l'identité utilisateur ;
- chargement des rôles ;
- chargement du cabinet ;
- chargement des permissions ;
- enregistrement dans le journal d'audit ;
- redirection vers le tableau de bord.

---

## Services IA concernés

Après authentification uniquement :

- Service CRM
- Service Pilotage
- Service Formation

Aucun Service IA ne participe directement au processus d'authentification.

---

## Sécurité

Le module doit prévoir :

- limitation des tentatives ;
- verrouillage temporaire ;
- expiration des sessions ;
- journalisation complète ;
- détection des connexions inhabituelles ;
- authentification multifacteur.

---

## Critères de validation

L'écran sera validé lorsque :

- tous les profils peuvent se connecter ;
- les droits sont correctement chargés ;
- les journaux sont créés ;
- les sessions sont sécurisées ;
- la redirection est correcte.

Écran 1 — Connexion

# Écran 3 — Définition du nouveau mot de passe

## Objectif

Permettre à l'utilisateur de définir un nouveau mot de passe après avoir utilisé le lien sécurisé reçu par email.

Le lien de réinitialisation est à usage unique et ne peut être utilisé qu'une seule fois.

---

## Utilisateurs concernés

- Administrateur
- Dirigeant
- Responsable
- Collaborateur
- Mandataire
- Client
- Prospect
- Partenaire

---

## Composants

### Zone principale

Titre :

**Créer un nouveau mot de passe**

Texte :

"Choisissez un mot de passe sécurisé pour protéger votre compte."

Champs :

- Nouveau mot de passe
- Confirmation du mot de passe

Chaque champ possède un bouton :

Afficher / Masquer

---

### Indicateur de sécurité

Pendant la saisie, la plateforme affiche le niveau de robustesse :

- Faible
- Moyen
- Fort
- Très fort

Les critères sont affichés en temps réel :

✓ Minimum 12 caractères

✓ Une majuscule

✓ Une minuscule

✓ Un chiffre

✓ Un caractère spécial

---

### Bouton

**Enregistrer mon nouveau mot de passe**

---

## Vérifications

Avant validation, la plateforme contrôle :

- validité du jeton ;
- expiration du lien ;
- correspondance entre les deux mots de passe ;
- respect de la politique de sécurité ;
- absence d'utilisation d'un ancien mot de passe récent (option configurable).

---

## Actions automatiques

Après validation :

- mise à jour du mot de passe ;
- invalidation immédiate du lien ;
- fermeture des anciennes sessions (option configurable) ;
- création d'un événement dans le journal d'audit ;
- envoi d'un email de confirmation.

---

## Email de confirmation

Objet :

**Votre mot de passe a été modifié**

Le message rappelle :

- la date ;
- l'heure ;
- l'adresse IP (si souhaitée) ;
- la procédure à suivre si cette modification n'est pas à l'origine de l'utilisateur.

---

## Sécurité

Le nouveau mot de passe :

- n'est jamais stocké en clair ;
- est chiffré conformément aux bonnes pratiques ;
- ne peut jamais être récupéré par un administrateur.

Le lien devient inutilisable immédiatement après validation.

---

## Services IA concernés

Aucun.

Cette opération relève exclusivement du système d'authentification.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- le lien ne peut être utilisé qu'une seule fois ;
- les règles de sécurité sont respectées ;
- les anciennes sessions sont correctement gérées ;
- le journal d'audit est alimenté ;
- l'utilisateur reçoit une confirmation de la modification.


# Écran 4 — Authentification multifacteur (MFA)

## Objectif

Ajouter une seconde étape de vérification afin de sécuriser l'accès à la plateforme.

Le MFA peut être obligatoire ou optionnel selon le rôle de l'utilisateur et la politique du cabinet.

---

## Utilisateurs concernés

- Administrateur
- Dirigeant
- Responsable
- Collaborateur
- Mandataire
- Client (optionnel)
- Partenaire (optionnel)

---

## Modes d'authentification pris en charge

La plateforme doit permettre plusieurs méthodes.

### Applications d'authentification

- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- Toute application compatible TOTP

### Email

Envoi d'un code à usage unique.

### SMS

Option activable par le cabinet.

### Clé de sécurité (Future version)

Compatible FIDO2 / WebAuthn.

---

## Composants

L'écran affiche :

Titre :

**Vérification de votre identité**

Texte :

"Pour protéger votre compte, saisissez le code de vérification."

Champ :

Code à 6 chiffres

Bouton :

Valider

Lien :

Renvoyer un code

Lien :

Utiliser une autre méthode

---

## Vérifications

Le système contrôle :

- validité du code ;
- durée de validité ;
- nombre de tentatives ;
- méthode utilisée.

---

## Actions automatiques

Après validation :

- ouverture de session ;
- journalisation de la méthode MFA utilisée ;
- enregistrement de l'appareil si autorisé ;
- redirection vers le tableau de bord.

En cas d'échec :

- incrémentation du compteur d'erreurs ;
- blocage temporaire après plusieurs tentatives.

---

## Appareil de confiance

L'utilisateur peut cocher :

☑ Ne plus demander de code sur cet appareil pendant 30 jours.

La plateforme enregistre alors un jeton sécurisé.

Cette durée est paramétrable par le cabinet.

---

## Sécurité

Le système applique notamment :

- expiration rapide des codes ;
- limitation des tentatives ;
- révocation des appareils de confiance ;
- invalidation après changement de mot de passe ;
- journalisation complète.

---

## Services IA concernés

Aucun.

Les Services IA ne participent jamais au processus MFA.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- plusieurs méthodes MFA sont disponibles ;
- les codes expirent automatiquement ;
- les appareils de confiance sont correctement gérés ;
- les tentatives sont limitées ;
- toutes les authentifications sont historisées.

# Écran 5 — Gestion des sessions

## Objectif

Permettre à l'utilisateur de consulter et gérer les sessions actives de son compte afin de renforcer la sécurité.

Cet écran permet notamment de détecter une connexion inhabituelle et de fermer une ou plusieurs sessions à distance.

---

## Utilisateurs concernés

Tous les utilisateurs de la plateforme.

- Administrateur
- Dirigeant
- Responsable
- Collaborateur
- Mandataire
- Client (si accès extranet)
- Partenaire (si accès extranet)

---

## Accès

Mon Profil

↓

Sécurité

↓

Sessions actives

---

## Composants

### Informations générales

La plateforme affiche :

- Nombre de sessions ouvertes
- Dernière connexion
- Dernière adresse IP (option configurable)
- Dernière activité

---

### Liste des sessions

Pour chaque session :

- Appareil
- Navigateur
- Système d'exploitation
- Date de connexion
- Dernière activité
- Localisation approximative (Ville / Pays)
- Statut

Exemple :

🟢 Session actuelle

⚪ Session active

🔴 Session expirée

---

## Actions disponibles

L'utilisateur peut :

- Déconnecter une session
- Déconnecter toutes les autres sessions
- Actualiser la liste

La session actuelle ne peut pas être supprimée par erreur.

---

## Actions automatiques

Lorsqu'une session est fermée :

- le jeton d'authentification est révoqué ;
- la session devient immédiatement invalide ;
- l'action est enregistrée dans le journal d'audit.

---

## Sécurité

La plateforme détecte notamment :

- une connexion depuis un nouvel appareil ;
- une connexion depuis un nouveau pays ;
- plusieurs connexions simultanées inhabituelles ;
- une activité anormale.

Selon les paramètres du cabinet, une alerte peut être envoyée à l'utilisateur.

---

## Services IA concernés

Aucun.

La gestion des sessions relève exclusivement du système d'authentification.

---

## Journal d'audit

Chaque action est historisée :

- ouverture de session ;
- fermeture ;
- déconnexion forcée ;
- expiration automatique.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- toutes les sessions sont visibles ;
- une session peut être révoquée immédiatement ;
- les actions sont historisées ;
- les informations de sécurité sont fiables ;
- les sessions expirées sont automatiquement nettoyées.

# Écran 6 — Mon profil

## Objectif

Permettre à l'utilisateur de consulter et de mettre à jour ses informations personnelles.

Cet écran centralise les informations liées à son identité dans la plateforme.

Il ne permet pas de modifier les informations réglementées du cabinet sans les droits nécessaires.

---

## Utilisateurs concernés

Tous les utilisateurs.

- Administrateur
- Dirigeant
- Responsable
- Collaborateur
- Mandataire
- Client (accès limité)
- Partenaire (accès limité)

---

## Accès

Menu utilisateur

↓

Mon profil

---

## Composants

### Informations personnelles

- Photo de profil
- Prénom
- Nom
- Adresse email
- Téléphone
- Fonction
- Date de création du compte

---

### Préférences

- Langue (future évolution)
- Fuseau horaire
- Format de date
- Thème clair / sombre (future évolution)
- Notifications

---

### Sécurité

- Modifier le mot de passe
- Activer / désactiver le MFA (selon la politique du cabinet)
- Consulter les sessions actives
- Télécharger les codes de récupération MFA (si activé)

---

### Signature utilisateur

L'utilisateur peut gérer sa signature utilisée dans :

- les emails ;
- les documents générés ;
- certaines communications internes.

---

### Avatar

L'utilisateur peut :

- importer une photo ;
- la remplacer ;
- la supprimer.

---

## Vérifications

Avant l'enregistrement :

- format des champs ;
- unicité de l'email (si modifiable) ;
- validation du numéro de téléphone ;
- contrôle de la taille des images.

---

## Actions automatiques

Après modification :

- sauvegarde des informations ;
- mise à jour de la session si nécessaire ;
- journalisation de la modification.

---

## Services IA concernés

Le Service Formation peut adapter certaines recommandations au rôle de l'utilisateur.

Le Service Communication peut utiliser la signature configurée.

Aucun Service IA ne peut modifier les informations du profil.

---

## Journal d'audit

Les modifications suivantes sont historisées :

- changement d'email ;
- changement de téléphone ;
- changement de mot de passe ;
- modification de la signature ;
- changement d'avatar.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- les informations sont correctement affichées ;
- les modifications autorisées sont enregistrées ;
- les changements sont historisés ;
- les préférences sont appliquées immédiatement lorsque cela est possible.


# Écran 7 — Paramètres de sécurité

## Objectif

Permettre à l'utilisateur de gérer les paramètres de sécurité de son compte depuis un écran centralisé.

Cet écran regroupe les actions sensibles liées à la protection du compte.

---

## Utilisateurs concernés

Tous les utilisateurs.

---

## Accès

Menu utilisateur

↓

Mon profil

↓

Sécurité

---

## Composants

### Mot de passe

- Date de dernière modification
- Bouton "Modifier mon mot de passe"

---

### Authentification multifacteur

- Statut MFA : activé / désactivé
- Méthode utilisée
- Bouton "Configurer"
- Bouton "Désactiver" si autorisé

---

### Sessions actives

- Nombre de sessions ouvertes
- Lien vers "Gérer mes sessions"

---

### Appareils de confiance

- Liste des appareils enregistrés
- Date d'ajout
- Dernière utilisation
- Bouton "Retirer cet appareil"

---

## Actions sensibles

Certaines actions nécessitent une confirmation :

- désactiver le MFA ;
- modifier l'email ;
- retirer tous les appareils ;
- réinitialiser les codes de récupération.

---

## Journal d'audit

Toutes les actions de sécurité sont historisées.

---

## Services IA concernés

Aucun Service IA ne peut modifier les paramètres de sécurité.

---

## Critères de validation

L'écran sera conforme lorsque :

- l'utilisateur voit clairement l'état de sécurité de son compte ;
- les actions sensibles nécessitent une confirmation ;
- toutes les modifications sont historisées ;
- aucun Service IA ne peut intervenir sur ces paramètres.


# Écran 8 — Journal de connexion

## Objectif

Permettre à l'utilisateur de consulter l'historique des accès à son compte.

Cet écran améliore la transparence et permet de détecter rapidement une activité inhabituelle.

---

## Utilisateurs concernés

Tous les utilisateurs.

Les administrateurs disposent d'une vue étendue (cf. module Administration).

---

## Accès

Menu utilisateur

↓

Mon profil

↓

Journal de connexion

---

## Composants

### Tableau des connexions

Chaque ligne affiche :

- Date et heure
- Adresse IP (option configurable)
- Localisation approximative (Ville / Pays)
- Navigateur
- Système d'exploitation
- Type d'appareil
- Méthode d'authentification utilisée
- Résultat

Exemple :

🟢 Connexion réussie

🟠 Déconnexion volontaire

🔴 Tentative échouée

---

## Filtres

L'utilisateur peut filtrer :

- Aujourd'hui
- 7 derniers jours
- 30 derniers jours
- Toutes les connexions

Recherche par :

- Adresse IP
- Navigateur
- Pays
- Résultat

---

## Actions disponibles

L'utilisateur peut :

- Consulter le détail d'une connexion
- Signaler une connexion suspecte
- Exporter son historique (PDF ou CSV)
- Actualiser la liste

---

## Détection d'activité inhabituelle

La plateforme met en évidence :

- Nouvelle localisation
- Nouvel appareil
- Nombre important d'échecs
- Connexion à une heure inhabituelle
- Connexion simultanée depuis plusieurs lieux incompatibles

Ces événements sont affichés avec un niveau d'alerte.

---

## Journal d'audit

Chaque événement comprend notamment :

- Identifiant de la session
- Date
- Utilisateur
- Action
- Résultat
- Adresse IP (selon configuration)
- Informations techniques

---

## Services IA concernés

Aucun.

Les Services IA ne peuvent ni modifier ni supprimer l'historique des connexions.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- toutes les connexions sont historisées ;
- les filtres fonctionnent correctement ;
- les anomalies sont facilement identifiables ;
- l'utilisateur peut exporter son historique ;
- les données sont protégées contre toute modification.

# Écran 9 — Déconnexion

## Objectif

Permettre à l'utilisateur de fermer sa session de manière sécurisée.

La déconnexion met fin à la session active et empêche toute utilisation ultérieure de celle-ci.

---

## Utilisateurs concernés

Tous les utilisateurs.

---

## Accès

La déconnexion est accessible :

- depuis le menu utilisateur ;
- après expiration de session ;
- après une déconnexion forcée par un administrateur (si applicable).

---

## Composants

### Confirmation

Avant la déconnexion, une confirmation peut être demandée (paramétrable).

Message :

"Souhaitez-vous vous déconnecter de la plateforme ?"

Boutons :

- Annuler
- Se déconnecter

---

## Actions automatiques

Lors de la déconnexion :

- la session est invalidée ;
- les jetons d'authentification sont révoqués ;
- les informations temporaires sont supprimées de la mémoire ;
- l'action est enregistrée dans le journal d'audit ;
- l'utilisateur est redirigé vers la page de connexion.

---

## Déconnexion automatique

La plateforme peut fermer automatiquement une session dans les cas suivants :

- inactivité prolongée ;
- expiration de la durée maximale de session ;
- changement de mot de passe ;
- désactivation du compte ;
- révocation de la session par un administrateur.

Dans tous les cas, l'utilisateur est informé de la raison de la déconnexion.

---

## Journal d'audit

Les informations suivantes sont enregistrées :

- utilisateur ;
- date et heure ;
- type de déconnexion ;
- durée de la session ;
- motif éventuel.

---

## Services IA concernés

Aucun.

Les Services IA sont automatiquement arrêtés pour cette session lors de la déconnexion.

---

## Critères de validation

L'écran sera considéré comme conforme lorsque :

- la session est correctement invalidée ;
- les jetons sont révoqués ;
- aucune donnée de session ne reste accessible ;
- la déconnexion est historisée ;
- l'utilisateur est correctement redirigé.
