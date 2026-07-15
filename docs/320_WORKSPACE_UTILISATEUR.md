# 320 — Atelier fonctionnel · Workspace utilisateur (composants transverses P0-02)

| **Objet** | Atelier fonctionnel — comportement des composants transverses **avant** conception technique |
| --------- | -------------------------------------------------------------------------------------------- |
| Statut    | 📋 **Atelier fonctionnel — à valider** (aucun développement autorisé) |
| Priorité  | P0 (socle transverse) |
| Date      | 2026-07-15 |
| Périmètre | Les **9 composants** du lot P0-02 (backlog 229) |
| Référentiels | 199 (composants transverses), 217 (recherche), 226 (journal d'audit), 227 (architecture), 198 (modèle métier) |
| Amont     | Plan 319 (découpage validé en 5 sous-lots A→E) |

> Ce document **définit le comportement fonctionnel** attendu. Il ne décrit **aucune** table, API,
> RLS ni écran technique. Il sert de base d'accord métier **avant** le plan technique de chaque
> sous-lot. **Aucun développement n'est autorisé tant que ce document n'est pas validé.**

---

## 0. Cadre commun à tous les composants

### 0.1 Vocabulaire
- **Objet métier (objet porteur)** : Client, Projet, Contrat, Document, Activité, Partenaire, Produit.
- **Composant transverse** : capacité réutilisable qui « s'accroche » à un objet porteur (199).
- **Utilisateur** : collaborateur du cabinet disposant d'un rôle (cf. référentiel des rôles).

### 0.2 Rôles de référence (rappel, non redéfinis ici)
Les droits ci-dessous s'expriment par rapport aux rôles existants : **Administrateur**, **Responsable**,
**Collaborateur/Gestionnaire**, **Mandataire/Apporteur**, **Prescripteur**. Le principe directeur
(199-10) : *un composant transverse n'accorde jamais plus de droits que l'objet porteur*.

### 0.3 Règle d'héritage des droits (invariant de sécurité)
> **Un utilisateur ne voit un élément transverse (commentaire, pièce jointe, tag, historique,
> résultat de recherche, notification liée) que s'il a accès à l'objet porteur.** Aucun composant ne
> peut contourner cette règle. Un objet inaccessible n'apparaît **jamais**, même indirectement.

### 0.4 Objets concernés — matrice de rattachement (v1)
| Composant | Client | Projet | Contrat | Document | Activité | Partenaire | Produit | Autre |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|---|
| Historique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | tous |
| Tags | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | |
| Priorités | — | ✅ | ✅ | — | ✅ | — | — | objets « à traiter » |
| Commentaires | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | |
| Pièces jointes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | + Commentaire |
| Notifications | (déclenchées par les autres composants — pas d'attache directe) | | | | | | | |
| Vues enregistrées | listes | listes | listes | listes | listes | listes | listes | toute liste |
| Recherche globale | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | + Tags, Commentaires |
| Favoris | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | + Vue enregistrée |

Le périmètre v1 des objets porteurs est **à confirmer en atelier** (une colonne peut être ouverte ou
fermée sans changer le comportement du composant — c'est l'esprit « ajout d'objets sans modifier le
composant », 199-6).

---

# Sous-lot A — Socle & Gouvernance

## Composant 1 — Historique métier

**Objectif**
Répondre à « que s'est-il passé sur cet objet ? ». Trace **automatique** et **immuable** de toutes les
évolutions importantes, à des fins de compréhension des dossiers et d'audit (199-8, 226).

**Objets concernés**
Tous les objets métier, sans exception.

**Comportement utilisateur**
- L'utilisateur **consulte** un historique chronologique (du plus récent au plus ancien) sur chaque
  fiche objet (onglet/section « Historique »).
- Chaque événement affiche : icône, date/heure, auteur, description claire, ancienne/nouvelle valeur si
  pertinent, lien vers l'élément concerné.
- L'utilisateur peut **filtrer** par période, utilisateur, type d'action, module, origine.
- Un **Centre d'audit** (vue transverse, 226) permet de parcourir/corréler les événements de toute la
  plateforme selon les droits.
- Aucune saisie manuelle : l'utilisateur **ne crée jamais** un événement d'historique à la main.

**Règles métier**
- L'historique est **généré automatiquement** par les moteurs et actions métier.
- Les événements sont **immuables** : jamais modifiés, jamais supprimés.
- Types couverts (extensible) : création, modification, changement de statut, changement de priorité,
  changement de responsable/affectation, ajout de pièce jointe, génération de document, signature,
  archivage, mise en corbeille, restauration.
- Chaque événement conserve son **origine** (utilisateur, workflow, service IA, système).

**Droits d'accès**
- Consultation selon les droits sur l'objet porteur (héritage 0.3).
- Le **Centre d'audit** global est réservé aux rôles habilités (Administrateur/Responsable) ; un
  Collaborateur ne voit que l'historique des objets qui lui sont accessibles.
- Personne (pas même Administrateur) ne peut éditer/supprimer un événement.

**Interactions avec les autres composants**
- **Reçoit** un événement de chaque composant traçable (Tags, Priorités, Commentaires, Pièces jointes,
  Vues) et de tous les modules métier.
- **Alimente** les Notifications (un événement peut déclencher une notification).
- **Alimenté par** le catalogue d'Actions standard (199-14, hors P0-02) à terme.

**Cas particuliers**
- Action réalisée par un **service IA** ou un **workflow** : l'origine est enregistrée comme telle, pas
  comme un utilisateur humain.
- Objet **archivé/en corbeille** : son historique reste consultable et intact.
- Import en masse : un seul événement de lot **ou** un événement par enregistrement — **à trancher en
  atelier** (recommandation : événement de lot + détail consultable).

**Évolutions prévues**
- **V2** : corrélation d'événements (une action → plusieurs objets), export d'audit, rétention
  paramétrable, contrôle d'intégrité (226).
- **V3** : synthèses IA de l'historique, détection d'anomalies et d'habitudes de travail (199-8).

---

# Sous-lot B — Attributs d'objet

## Composant 2 — Tags

**Objectif**
Classer **librement** les objets via des étiquettes personnalisables, pour organiser, filtrer et
rechercher, **sans modifier** les données métier (199-5).

**Objets concernés**
Client, Projet, Contrat, Document, Partenaire (multi-objets). Un objet peut porter **plusieurs** tags ;
un tag peut être utilisé sur **plusieurs** objets.

**Comportement utilisateur**
- Sur une fiche, l'utilisateur **ajoute/retire** un tag via un sélecteur (recherche + création à la
  volée si autorisé).
- Les tags s'affichent sous forme de pastilles colorées.
- L'utilisateur **filtre** les listes par un ou plusieurs tags (combinables).
- Un écran d'**administration des tags** permet de créer/renommer/recolorer/archiver.

**Règles métier**
- Un tag possède : nom, couleur, description (optionnelle), statut (actif/archivé).
- Un tag **archivé** n'est plus proposé à l'ajout mais reste visible là où il est déjà posé.
- Pas de suppression définitive hors Administrateur (traçabilité).
- Les tags sont **propres au cabinet** (entièrement personnalisables).

**Droits d'accès**
- **Poser/retirer** un tag sur un objet : selon droit de modification de l'objet.
- **Créer/modifier/archiver** un tag (référentiel) : Responsable/Administrateur (à confirmer) ;
  Collaborateur peut proposer selon paramétrage.
- **Supprimer définitivement** un tag : Administrateur uniquement.

**Interactions avec les autres composants**
- **Recherche globale** et **Vues enregistrées** : les tags sont un critère de filtre de premier plan.
- **Historique** : création/modif/archivage d'un tag et ajout/retrait sur un objet sont historisés.
- **Priorités** : indépendantes des tags (un tag n'est pas une priorité).

**Cas particuliers**
- Fusion de deux tags équivalents (doublons) : **V2** (en v1, archivage du doublon).
- Migration de l'existant : les `client_tags` actuels (Client uniquement) deviennent des tags
  polymorphes **sans perte** (les tags Finance/CRM existants restent fonctionnels).
- Un service IA peut **proposer** un tag ; il ne le crée/pose **jamais** sans validation (199-5).

**Évolutions prévues**
- **V2** : fusion de tags, hiérarchie/catégories de tags, règles d'auto-tag proposées.
- **V3** : classification et détection d'incohérences assistées par IA.

## Composant 3 — Priorités

**Objectif**
Indiquer le **niveau de traitement** d'un objet (« à quel niveau dois-je traiter ceci ? »),
indépendamment du statut, de l'objectif et du résultat (199-2).

**Objets concernés**
Objets « à traiter » : Activité, Projet, Contrat (et objets futurs nécessitant un arbitrage de charge).

**Comportement utilisateur**
- L'utilisateur **définit/modifie** la priorité via un sélecteur à 4 niveaux :
  🔴 Critique · 🟠 Haute · 🟡 Normale · 🟢 Faible.
- La priorité s'affiche par pastille (couleur + icône + libellé) homogène partout.
- Elle sert au **tri** des listes, aux **tableaux de bord** et aux **alertes**.

**Règles métier**
- 4 niveaux exactement, homogènes sur toute la plateforme.
- La priorité peut être posée par un **utilisateur**, un **workflow**, ou **proposée** par un service IA.
  L'utilisateur autorisé peut toujours la **modifier** (199-2).
- Chaque **changement est historisé** (ancienne priorité, nouvelle, utilisateur, date, commentaire
  éventuel).
- La priorité n'indique **pas** l'avancement (≠ statut).

**Droits d'accès**
- Modifier la priorité : selon droit de modification de l'objet.
- Une priorité imposée par un workflow réglementaire peut être **verrouillée** selon paramétrage
  (à confirmer en atelier).

**Interactions avec les autres composants**
- **Vues enregistrées / Recherche** : critère de tri et de filtre.
- **Notifications** : une priorité Critique peut renforcer/urgentiser une notification.
- **Historique** : tout changement de priorité y est tracé.

**Cas particuliers**
- Objet sans priorité explicite : **Normale par défaut** (à confirmer) ou « non définie » distincte —
  **à trancher en atelier**.
- Priorité proposée par IA : marquée « proposée » tant qu'un humain ne l'a pas confirmée.

**Évolutions prévues**
- **V2** : priorité calculée (règles d'échéance/risque), escalade automatique.
- **V3** : priorisation recommandée par IA à l'échelle du portefeuille.

---

# Sous-lot C — Collaboration

## Composant 4 — Commentaires

**Objectif**
Permettre des échanges **contextualisés** sur un objet sans modifier ses données ; favoriser la
collaboration et la traçabilité (199-3).

**Objets concernés**
Client, Projet, Contrat, Document, Activité. Un commentaire est **toujours** rattaché à un objet — il
n'existe jamais seul.

**Comportement utilisateur**
- L'utilisateur **rédige** un commentaire sur la fiche d'un objet, en choisissant un **type** :
  Commentaire (info générale) · Information importante (mise en évidence) · Question (attend réponse) ·
  Réponse (répond à une question) · Commentaire interne (collaborateurs autorisés seulement).
- Il peut **mentionner** un ou plusieurs collaborateurs (`@Nom`) → la personne mentionnée est notifiée.
- Il peut **joindre** une ou plusieurs pièces jointes au commentaire.
- Il peut **modifier** son commentaire ; l'objet conserve date + auteur de modification (versions
  consultables selon droits).

**Règles métier**
- Un commentaire contient : auteur, date/heure, contenu, objet concerné, mentions éventuelles, pièces
  jointes éventuelles.
- **Aucune suppression physique** : un commentaire peut être **masqué**, **archivé** ou **signalé** ; la
  traçabilité est conservée (199-3).
- Une **Question** peut recevoir une ou plusieurs **Réponses** (fil).
- Un **Commentaire interne** n'est visible que par les collaborateurs autorisés — jamais par les
  profils externes (Mandataire/Prescripteur/portail client).

**Droits d'accès**
- Lire/écrire un commentaire : selon accès à l'objet porteur.
- Un **commentaire interne** ajoute une restriction : rôles internes uniquement.
- Modifier/masquer : l'auteur pour son propre commentaire ; Responsable/Administrateur pour modération.
- Un service IA peut **analyser/résumer** mais **ne modifie jamais** un commentaire (199-3).

**Interactions avec les autres composants**
- **Mentions → Notifications** (déclenchement direct).
- **Pièces jointes** : un commentaire peut en porter.
- **Historique** : l'ajout/modif/masquage d'un commentaire est tracé (le **contenu** reste dans le
  commentaire, l'événement dans l'historique).
- **Recherche globale** : les commentaires sont recherchables (selon droits, internes exclus si non
  autorisé).

**Cas particuliers**
- Mention d'un utilisateur **sans accès** à l'objet : la mention est refusée ou signalée — **à trancher
  en atelier** (recommandation : proposer uniquement des utilisateurs ayant accès).
- Objet archivé : commentaires consultables, nouvel ajout selon paramétrage.
- Commentaire signalé : entre en file de modération (Responsable).

**Évolutions prévues**
- **V2** : réactions, fils imbriqués enrichis, résolution de question (statut « répondu »).
- **V3** : détection IA des demandes en attente, résumé automatique d'un fil (199-3).

## Composant 5 — Pièces jointes

**Objectif**
Associer des **fichiers support** à un objet pour compléter l'information. Une pièce jointe **ne remplace
pas** un document métier généré par la plateforme (199-4).

**Objets concernés**
Client, Projet, Contrat, Document, Activité, Partenaire, **et Commentaire**. Une PJ n'existe jamais
seule.

**Comportement utilisateur**
- L'utilisateur **ajoute** un fichier (glisser-déposer), le **consulte**, le **télécharge**, le
  **renomme**, le **remplace**, l'**archive**.
- **Prévisualisation** sans téléchargement quand le format le permet (PDF, images, Office compatible).
- Chaque PJ affiche : nom, type, taille, date d'ajout, auteur, objet associé, version éventuelle.

**Règles métier**
- Formats acceptés **paramétrables** (PDF, Word, Excel, images, audio, vidéo, archives…).
- Une PJ **hérite des droits** de l'objet porteur (invariant 0.3).
- La **suppression physique** est réservée aux Administrateurs selon la politique de conservation ; le
  cas courant est l'**archivage**.
- Distinction claire : **PJ-support** (ce composant) vs **document métier** (module Documents/GED) — une
  PJ ne devient pas automatiquement un document métier.

**Droits d'accès**
- Ajouter/consulter/télécharger/renommer/remplacer/archiver : selon droits sur l'objet.
- Supprimer définitivement : Administrateur (politique de conservation).
- Un service IA peut **analyser/extraire/classer/détecter un manque** mais **ne modifie jamais** le
  fichier d'origine (199-4).

**Interactions avec les autres composants**
- **Commentaires** : support de pièces jointes.
- **Historique** : ajout/remplacement/archivage tracés (consultation optionnelle selon politique).
- **Recherche** : nom/type de PJ recherchables (contenu = évolution).

**Cas particuliers**
- Remplacement d'un fichier : **versionnage** (l'ancienne version reste selon politique).
- Fichier volumineux / format non autorisé : refus explicite avec message clair.
- Frontière avec la GED existante (`documents`) : une PJ-support **peut être promue** en document métier
  — flux **à définir en atelier** (hors automatique).

**Évolutions prévues**
- **V2** : recherche plein-texte du contenu, anti-virus/contrôle d'intégrité, prévisualisation étendue.
- **V3** : classification et détection de document manquant par IA (199-4).

---

# Sous-lot D — Événements & Notifications

## Composant 6 — Événements & Notifications

**Objectif**
Centraliser les **événements** (faits survenus dans le système) et adresser des **notifications**
(messages aux utilisateurs) en conséquence (199-7).

**Objets concernés**
Le composant ne s'attache pas à un objet unique : il est **déclenché par les événements** produits par
tous les modules et composants. Chaque notification **pointe vers** un objet concerné.

**Comportement utilisateur**
- L'utilisateur reçoit des **notifications in-app** (cloche + **centre de notifications**).
- Il peut : consulter, marquer comme lue, tout marquer comme lu, archiver, **accéder directement** à
  l'objet concerné via le lien.
- Il **filtre** le centre par type et par période, et y recherche.
- Il **paramètre ses préférences** : pour quels événements être notifié, par quels canaux, horaires
  éventuels.

**Règles métier**
- Distinction **Événement** (fait : client créé, projet clôturé, contrat signé, document ajouté,
  activité terminée…) vs **Notification** (message adressé suite à l'événement).
- Chaque notification : titre, description, type, priorité, date/heure, objet concerné, lien direct,
  statut lu/non lu.
- **Notifications critiques** imposées par le cabinet : **non désactivables** (199-7).
- Chaque notification conserve son historique (création, origine, état, date de lecture, envois).
- Canaux **v1 : in-app uniquement**. Email/SMS/Push = évolutions (préférences déjà prévues côté modèle).

**Droits d'accès**
- Chaque utilisateur ne voit **que ses propres** notifications.
- Une notification pointant vers un objet reste soumise à l'invariant 0.3 (si l'accès à l'objet est
  retiré, l'ouverture est refusée).
- Un service IA peut **proposer** une priorité, **regrouper** ou **résumer**, mais **ne décide jamais
  seul** de l'envoi d'une notification réglementaire (199-7).

**Interactions avec les autres composants**
- **Déclenché par** : Commentaires (mentions), Historique/Événements (changements de statut, échéances),
  Priorités (urgence), modules métier (signature, document manquant…).
- **Pointe vers** : n'importe quel objet (lien direct).
- **Préférences** : liées au compte utilisateur (comme les Favoris).

**Cas particuliers**
- **Regroupement** de notifications similaires (anti-spam) : v1 basique (compteur) ; regroupement fin en
  V2.
- Notification devenue **obsolète** (objet archivé/supprimé) : marquée inactive, lien neutralisé.
- Mention d'un utilisateur retirée : la notification déjà émise reste dans l'historique.

**Évolutions prévues**
- **V2** : canaux **email/SMS**, regroupement intelligent, résumé quotidien, digest.
- **V3** : priorisation et résumés par IA, notifications Push (199-7).

---

# Sous-lot E — Découverte

## Composant 7 — Recherche globale

**Objectif**
Retrouver **rapidement** toute information depuis un **point d'entrée unique**, avec des résultats
pertinents, contextuels et **filtrés par les droits** (199-6, 217).

**Objets concernés**
Client, Projet, Contrat, Document, Partenaire, Produit, Tags, Commentaires (extensible sans modifier le
composant).

**Comportement utilisateur**
- **Recherche simple** : mot-clé, résultats au fil de la saisie, **groupés par catégorie d'objet**.
- **Recherche avancée** : filtres combinables (type d'objet, date, statut, responsable, priorité, tags,
  période, auteur).
- **Recherche intelligente** : tolérance aux fautes, synonymes, recherches récentes, favoris.
- Chaque résultat affiche : icône d'objet, nom, type, résumé, dernière modification, **lien direct**.
- L'utilisateur peut **enregistrer** une recherche et retrouver ses **recherches récentes/favorites**.

**Règles métier**
- Les résultats respectent **toujours** les droits (invariant 0.3) : un objet inaccessible
  **n'apparaît jamais**.
- La recherche est en **lecture seule** : elle ne modifie aucune donnée.
- Un nouvel objet peut être rendu recherchable **sans changer** le fonctionnement du composant (199-6).
- Les recherches enregistrées réutilisent le mécanisme des **Vues enregistrées**.

**Droits d'accès**
- Tout utilisateur peut rechercher ; le **périmètre de résultats** est borné par ses droits.
- Les commentaires internes n'apparaissent qu'aux rôles autorisés.
- Un service IA peut améliorer la pertinence / suggérer des filtres, sans modifier les données (199-6).

**Interactions avec les autres composants**
- **Tags / Priorités / Statuts** : critères de filtre majeurs.
- **Favoris / Recherches récentes** : améliorent la recherche intelligente.
- **Vues enregistrées** : support des recherches enregistrées.

**Cas particuliers**
- Requête vide / trop courte : suggestions (récents, favoris) plutôt que « aucun résultat ».
- Volume important : pagination + regroupement ; pertinence prioritaire sur exhaustivité.
- Homonymes (deux clients de même nom) : désambiguïsation par résumé/dernière modif.

**Évolutions prévues**
- **V2** : recherche plein-texte du contenu documentaire, opérateurs avancés, tri par pertinence affiné.
- **V3** : recherche en langage naturel et suggestions proactives par IA (199-6).

## Composant 8 — Vues, filtres et tris enregistrés

**Objectif**
Permettre à chaque utilisateur de **personnaliser l'affichage des listes** pour retrouver vite
l'information utile (199-9).

**Objets concernés**
Toutes les listes : Clients, Projets, Contrats, Documents, Activités, Partenaires, Produits, Utilisateurs.

**Comportement utilisateur**
- L'utilisateur enregistre une **vue** = combinaison de filtres + tris + colonnes (+ ordre des colonnes,
  nombre par page, mode d'affichage liste/cartes/tableau).
- Il peut **créer, renommer, modifier, dupliquer, définir par défaut, partager, supprimer** (sa vue
  personnelle).
- Une vue s'applique **en un clic**, avec un fonctionnement identique dans tous les modules.

**Règles métier**
- Trois types de vues : **personnelle** (créateur seul), **partagée** (équipe/service), **système**
  (créée par l'Administrateur, disponible pour tous, **non supprimable**).
- Les préférences sont conservées et rattachées à l'utilisateur / à l'équipe.
- Historisation : création, modification, partage, suppression (199-9).

**Droits d'accès**
- Créer/gérer une vue **personnelle** : tout utilisateur.
- **Partager** une vue : selon droits de partage (Responsable) ; visible par l'équipe/service ciblé.
- Créer/modifier une vue **système** : Administrateur uniquement.

**Interactions avec les autres composants**
- **Recherche globale** : les recherches enregistrées sont un cas d'usage des vues.
- **Tags / Priorités / Statuts** : composants des filtres d'une vue.
- **Favoris** : une vue enregistrée peut être mise en favori.

**Cas particuliers**
- Vue par défaut par module et par utilisateur (une seule à la fois).
- Vue partagée modifiée par son propriétaire : impact sur tous les membres — avertissement en atelier.
- Colonne devenue obsolète (champ retiré) : la vue se dégrade proprement (ignore la colonne).

**Évolutions prévues**
- **V2** : vues d'équipe avancées, verrouillage de vues système, quotas.
- **V3** : suggestion de vues et de filtres par IA ; détection des vues rarement utilisées (199-9).

## Composant 9 — Favoris

**Objectif**
Retrouver **rapidement** les éléments consultés régulièrement, via un **raccourci personnel** sans
impact sur les données métier (199-13).

**Objets concernés**
Client, Projet, Contrat, Document, Partenaire, Produit, Rapport, **Vue enregistrée**.

**Comportement utilisateur**
- Chaque objet compatible affiche une **icône Favori** : ajout/retrait **immédiat**.
- Les favoris sont accessibles depuis le **Tableau de bord**, le **menu principal** et la **recherche
  globale**.
- L'utilisateur peut **réordonner** et **épingler** certains favoris en haut.

**Règles métier**
- Les favoris sont **strictement personnels** : jamais visibles par d'autres utilisateurs.
- Ils sont **synchronisés** entre appareils (liés au compte).
- Ils **n'impactent jamais** les données métier.
- Les ajouts/retraits de favoris **ne sont pas** dans l'historique métier de l'objet (uniquement
  statistiques techniques éventuelles, 199-13).

**Droits d'accès**
- Chaque utilisateur gère **ses** favoris.
- Un favori pointant vers un objet devenu inaccessible n'ouvre plus l'objet (invariant 0.3) et peut être
  proposé au retrait.
- Un service IA peut **suggérer** un favori mais **ne l'ajoute/retire jamais** automatiquement (199-13).

**Interactions avec les autres composants**
- **Recherche intelligente** : les favoris améliorent les suggestions.
- **Vues enregistrées** : une vue peut être mise en favori.
- **Tableau de bord** : bloc « Favoris ».

**Cas particuliers**
- Objet supprimé/archivé : le favori est marqué inactif ou proposé au retrait.
- Limite de nombre de favoris épinglés : à définir (confort).

**Évolutions prévues**
- **V2** : catégories de favoris, réorganisation avancée.
- **V3** : suggestion contextuelle de favoris par IA (199-13).

---

## 11. Points à trancher en atelier (synthèse des décisions attendues)
1. **Périmètre d'objets porteurs v1** par composant (matrice §0.4) — ouvrir/fermer des colonnes.
2. **Priorité par défaut** : « Normale » vs « non définie » distincte.
3. **Verrouillage** d'une priorité imposée par workflow réglementaire.
4. **Mentions** de commentaire vers un utilisateur sans accès à l'objet : refus vs signalement.
5. **Frontière PJ-support ↔ document métier (GED)** : flux de promotion.
6. **Historisation des imports en masse** : événement de lot vs par enregistrement.
7. **Notifications critiques non désactivables** : liste initiale imposée par le cabinet.
8. **Recherche** : liste précise des objets recherchables et des champs indexés v1.
9. Rôles exacts autorisés à **créer/partager** tags, vues système, et à **modérer** les commentaires.

## 12. Ce qui reste hors de cet atelier
- Conception **technique** (tables, RLS, API, écrans) : produite **par sous-lot**, après validation de
  ce document, dans les plans détaillés A→E (plan-cadre 319).
- Composants 199 **hors P0-02** : Statuts (P1), Permissions, Export/Import, Archivage/Corbeille, Actions
  standard — non traités ici.

---

> **Atelier fonctionnel à valider.** Aucun développement, aucune conception technique ne démarre tant
> que ce document et les décisions du §11 ne sont pas validés. Prochaine étape après validation : plan
> détaillé **technique** de **P0-02.A** (Socle & Gouvernance / Historique-Audit).
