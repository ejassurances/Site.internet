# 85 - Gouvernance IA

## Objectif

Définir les règles de gouvernance des agents IA utilisés dans le CRM EJ Assurances, y compris lorsque les agents assistent les mandataires connectés à leur propre Google Workspace.

## Principe fondamental

L'IA assiste, l'humain décide.

## Rôles autorisés

Rôles pouvant utiliser l'IA selon périmètre :

- courtier admin ;
- collaborateur ;
- mandataire selon autorisation ;
- administrateur technique.

## Périmètre des agents

Agents envisagés :

- assistant commercial ;
- assistant relation client ;
- assistant email ;
- assistant sinistre ;
- assistant conformité ;
- synthèse documentaire.

## Agents IA du mandataire

Les agents IA du mandataire peuvent aider à :

- lire et résumer les emails liés à EJ Assurances ;
- préparer des réponses ;
- identifier les urgences ;
- suivre les demandes ;
- relancer le client ;
- relancer la compagnie ;
- relancer le cabinet ;
- préparer le devoir de conseil ;
- détecter les éléments manquants ;
- remonter les demandes sensibles.

## Garde-fous IA

L'IA ne doit jamais :

- envoyer un email sans validation humaine ;
- donner un conseil personnalisé directement au client ;
- modifier un contrat ;
- valider un devoir de conseil ;
- prendre une décision de souscription ;
- accéder à des emails non liés à EJ Assurances ;
- analyser des données sans finalité métier claire ;
- contourner les droits d'accès ;
- transmettre une recommandation sans validation.

## Validation humaine obligatoire

Validation requise pour :

- conseil personnalisé ;
- recommandation ;
- envoi d'email sensible ;
- modification contractuelle ;
- réponse à réclamation ;
- décision sur sinistre ;
- document réglementaire ;
- devoir de conseil ;
- brouillon destiné au client.

## Supervision cabinet admin

Le cabinet admin doit pouvoir visualiser les actions IA liées à l'activité EJ Assurances :

- agents utilisés ;
- brouillons générés ;
- résumés produits ;
- relances préparées ;
- escalades ;
- demandes sensibles détectées ;
- validations humaines ;
- erreurs ou alertes ;
- journaux d'audit.

Le cabinet admin ne doit pas voir les analyses IA portant sur des données non liées à EJ Assurances.

## Journalisation

Chaque action IA doit conserver :

- utilisateur demandeur ;
- rôle de l'utilisateur ;
- agent utilisé ;
- version de prompt ;
- périmètre métier ;
- données utilisées ou références minimisées ;
- résultat ;
- statut de validation ;
- date ;
- action finale ;
- éventuelle escalade humaine.

## Minimisation des données

Principes :

- utiliser uniquement les données nécessaires ;
- exclure les emails non liés ;
- pseudonymiser lorsque possible ;
- limiter l'exposition des pièces sensibles ;
- conserver uniquement les traces utiles à la conformité.

## Contrôle qualité

Prévoir :

- tests ;
- revue périodique ;
- échantillonnage ;
- signalement d'erreur ;
- désactivation d'un agent ;
- gestion des versions ;
- revue des prompts ;
- contrôle des escalades.

## Points ouverts

- matrice d'autorisation ;
- fréquence d'audit ;
- seuils d'escalade ;
- politique de conservation des logs IA ;
- processus de validation des prompts ;
- règles de filtrage des données Workspace.
