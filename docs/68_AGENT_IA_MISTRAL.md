# 68 - Agents IA Mistral

## Objectif

Définir les agents IA intégrés au CRM via Mistral.

Les agents IA sont des assistants internes et semi-assistants de relation client. Ils peuvent aider, mais ne doivent pas remplacer le courtier ou le gestionnaire.

## Principe fondamental

L'IA assiste, l'humain décide.

## Agents envisagés

## 1. Assistant commercial

Fonctions :

- aide à la qualification des prospects ;
- préparation de relances ;
- résumé des échanges ;
- aide à la rédaction d'emails ;
- préparation de rendez-vous ;
- suivi des opportunités.

## 2. Assistant relation client

Fonctions :

- lecture et synthèse des demandes ;
- réponse aux questions simples sous contrôle ;
- proposition de brouillons de réponses ;
- classement des demandes ;
- identification des urgences ;
- remontée au gestionnaire compétent.

## 3. Assistant sinistre

Fonctions :

- suivi des sinistres ;
- vérification des pièces manquantes ;
- relance client ;
- relance compagnie ;
- résumé de l'état du dossier ;
- alerte en cas de blocage.

## 4. Assistant conformité

Fonctions :

- aide à la rédaction du devoir de conseil ;
- vérification des champs manquants ;
- rappel des documents nécessaires ;
- détection des incohérences ;
- génération de brouillons non validés automatiquement.

## 5. Assistant email

Fonctions :

- recherche d'emails par client, nom, email, contrat ou sinistre ;
- synthèse des échanges ;
- regroupement des emails liés à un même client ;
- proposition de réponse ;
- détection des demandes sensibles.

## Règles impératives

- l'IA ne donne jamais de conseil personnalisé directement au client ;
- l'IA ne prend jamais de décision de souscription ;
- l'IA ne valide jamais un devoir de conseil ;
- l'IA ne modifie jamais un contrat seule ;
- l'IA ne transmet jamais une recommandation sans validation humaine ;
- toute réponse sensible doit être remontée à un humain ;
- les analyses doivent utiliser la minimisation des données ;
- les données doivent être pseudonymisées ou anonymisées lorsque possible ;
- chaque action IA doit être historisée.

## Paramétrages nécessaires

- délai de réponse ;
- délai de relance client ;
- délai de relance compagnie ;
- délai de relance cabinet ;
- seuil d'urgence ;
- niveau d'autonomie ;
- périmètre autorisé ;
- ton de réponse ;
- catégories de demandes ;
- règles d'escalade humaine.

## Journalisation IA

Chaque action IA doit conserver :

- agent utilisé ;
- version du prompt ;
- données d'entrée minimisées ;
- résultat produit ;
- utilisateur demandeur ;
- validation humaine éventuelle ;
- date et heure ;
- statut final.

## Points ouverts

- choix des modèles Mistral ;
- politique de rétention des prompts ;
- règles de pseudonymisation ;
- seuils d'autonomie par rôle ;
- procédure de désactivation d'un agent.
