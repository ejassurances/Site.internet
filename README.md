# EJ Partners Assurances — site vitrine

Site vitrine du cabinet de courtage en assurances EJ Partners Assurances,
dédié aux couples et familles LGBT. Construit avec [Astro](https://astro.build)
et [Tailwind CSS](https://tailwindcss.com).

## Démarrage

```sh
npm install
npm run dev
```

Le site est servi sur `http://localhost:4321`. Dans un GitHub Codespace,
un panneau « Ports » s'affiche automatiquement : ouvrez le port `4321` en
mode « Public » ou « Preview » pour visualiser le site dans le navigateur.

## Scripts

| Commande            | Action                                      |
| -------------------- | -------------------------------------------- |
| `npm run dev`         | Démarre le serveur de développement          |
| `npm run build`       | Génère le site statique dans `dist/`         |
| `npm run preview`     | Sert le build de production en local         |

## Configuration à faire avant mise en production

- Remplacer `formspreeEndpoint` dans `src/data/cabinet.js` par votre véritable
  endpoint Formspree, ou basculer le formulaire de `src/pages/contact.astro`
  sur Netlify Forms (`data-netlify="true"` + attribut `name`).
- Mettre à jour `site` dans `astro.config.mjs` avec le nom de domaine définitif
  (utilisé pour le sitemap et les URLs canoniques).
- Remplacer les visuels placeholder (dégradés de couleur) par de vraies photos.

## Déploiement

Voir les instructions de déploiement Vercel / Netlify fournies dans la
réponse de l'assistant ou la documentation officielle d'Astro :
https://docs.astro.build/en/guides/deploy/
