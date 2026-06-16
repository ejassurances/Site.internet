// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: remplacer par le nom de domaine définitif avant mise en production.
  site: 'https://www.ej-assurances.fr',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});