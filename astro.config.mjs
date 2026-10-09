// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/config.ts';

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
  devToolbar: { enabled: false },
});
