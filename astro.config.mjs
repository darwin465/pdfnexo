import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { tools } from './src/data/tools.ts';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const site = env.SITE_URL || process.env.SITE_URL || 'http://localhost:4321';

// Las herramientas todavía no implementadas son noindex: no entran en el sitemap.
const hiddenSlugs = tools
  .filter((t) => !t.available)
  .flatMap((t) => Object.values(t.slugs));

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { es: 'es-ES', en: 'en-US' } },
      filter: (page) => !hiddenSlugs.some((slug) => page.includes(`/${slug}/`)) && !page.includes('/404'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
