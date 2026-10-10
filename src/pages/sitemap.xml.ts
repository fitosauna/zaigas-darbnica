/**
 * /sitemap.xml - tieši 10 lapas (A9). 404 un /send.php sarakstā nav.
 * Adreses veido absoluteUrl() no site.url (src/config.ts), bez .html un bez slīpsvītras beigās.
 */
import type { APIRoute } from 'astro';
import { absoluteUrl } from '../config';

const sitemapPaths = [
  '/',
  '/apgerbu-remonts',
  '/apgerbu-parsusana',
  '/individuala-susana',
  '/adisana-pec-pasutijuma',
  '/aizkaru-susana',
  '/cenas',
  '/par-mani',
  '/kontakti',
  '/privatuma-politika',
] as const;

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = () => {
  const urls = sitemapPaths
    .map((path) => `  <url>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n  </url>`)
    .join('\n');
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n';
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
