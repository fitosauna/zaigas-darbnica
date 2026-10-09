// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/config.ts';
import pruneUnusedImages from './integrations/prune-unused-images.mjs';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: site.url,
  // Tīri URL bez slīpsvītras beigās: /cenas (fails dist/cenas.html, .htaccess to pasniedz).
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    responsiveStyles: false,
  },
  compressHTML: true,
  integrations: [pruneUnusedImages()],
  devToolbar: { enabled: false },
});
