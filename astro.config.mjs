import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ej-partners-assurances.fr',
  integrations: [tailwind()],
});
