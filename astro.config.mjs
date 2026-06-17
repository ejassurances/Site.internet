import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ej-partners-assurances.fr',
  integrations: [tailwind()],
});
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ej-assurances.fr',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
