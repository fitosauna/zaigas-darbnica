/** /robots.txt - viss atļauts, izņemot formas apstrādātāju un PHPMailer mapi. */
import type { APIRoute } from 'astro';
import { absoluteUrl } from '../config';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /send.php',
    'Disallow: /lib/',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
