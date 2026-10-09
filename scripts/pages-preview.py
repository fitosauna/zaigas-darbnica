"""
GitHub Pages priekšskatījums: pielāgo gatavo dist/ apakšceļam (/zaigas-darbnica/)
un aizliedz meklētājiem to indeksēt. Īsto lapu (SiteGround) tas neietekmē.
Lietošana: python3 scripts/pages-preview.py dist /zaigas-darbnica
"""
import pathlib
import re
import sys

dist = pathlib.Path(sys.argv[1])
base = sys.argv[2].rstrip('/')

for f in dist.rglob('*'):
    if f.suffix not in ('.html', '.css', '.js', '.webmanifest'):
        continue
    s = f.read_text(encoding='utf-8')
    # Saknes ceļi atribūtos: href="/...", src="/...", action="/..." (ne "//")
    s = re.sub(r'((?:href|src|action|imagesrcset|srcset)=")/(?!/)', rf'\1{base}/', s)
    # Pārējās saknes atsauces uz bildēm un fontiem (srcset saraksti, CSS url(), JS)
    s = re.sub(r'(?<![\w/.-])/_astro/', f'{base}/_astro/', s)
    s = s.replace(f'{base}{base}/', f'{base}/')
    if f.suffix == '.html':
        s = re.sub(r'<meta name="robots"[^>]*>', '', s)
        s = s.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">', 1)
    f.write_text(s, encoding='utf-8')

(dist / 'robots.txt').write_text('User-agent: *\nDisallow: /\n', encoding='utf-8')
for name in ('send.php', '.htaccess'):
    (dist / name).unlink(missing_ok=True)
print('Pages preview ready under', base)
