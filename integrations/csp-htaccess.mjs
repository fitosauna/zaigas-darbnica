// Pēc būvēšanas ieraksta Content-Security-Policy galveni failā dist/.htaccess (vietturis __CSP__).
// Katram inline <script> bez src (klasisks vai module) tiek aprēķināts 'sha256-...', tāpēc CSP
// iztiek bez 'unsafe-inline' skriptiem. Datu bloki (application/ld+json) netiek jaukti.
// Turklāt aptur būvēšanu, ja dist/ ir mape ar lapas nosaukumu (cenas/ blakus cenas.html):
// Apache tad uz /cenas atbildētu ar 403.
//
// After the build, fills the __CSP__ placeholder in dist/.htaccess with a policy that allows
// exactly the inline scripts present in the built HTML (one sha256 hash per distinct script).
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PLACEHOLDER = '__CSP__';
/** Apache .htaccess rindas drošā robeža (iekšējais limits ~8190 baiti). */
const MAX_LINE = 8000;

/** <script> type vērtības, ko pārlūks izpilda (HTML spec: tukšs, module, JavaScript MIME tipi). */
const EXECUTABLE_TYPES = new Set([
  '',
  'module',
  'text/javascript',
  'application/javascript',
  'application/ecmascript',
  'application/x-ecmascript',
  'application/x-javascript',
  'text/ecmascript',
  'text/javascript1.0',
  'text/javascript1.1',
  'text/javascript1.2',
  'text/javascript1.3',
  'text/javascript1.4',
  'text/javascript1.5',
  'text/jscript',
  'text/livescript',
  'text/x-ecmascript',
  'text/x-javascript',
]);

// Google Analytics 4 (https://developers.google.com/tag-platform/security/guides/csp).
const GA4_SCRIPT = ['https://*.googletagmanager.com'];
const GA4_HOSTS = [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
];
const WEB3FORMS = ['https://api.web3forms.com'];

// Atribūti var saturēt '>' pēdiņās, tāpēc tie tiek nolasīti kopā ar pēdiņām.
const SCRIPT_RE = /<script\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*?)<\/script\s*>/gi;
const ATTR_RE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttributes(source) {
  const attrs = new Map();
  for (const m of source.matchAll(ATTR_RE)) {
    const name = m[1].toLowerCase();
    if (!attrs.has(name)) attrs.set(name, m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

/** Inline skriptu teksti, kurus pārlūks izpildītu (bez src, izpildāms type). */
export function executableInlineScripts(html) {
  const out = [];
  for (const m of html.matchAll(SCRIPT_RE)) {
    const attrs = parseAttributes(m[1]);
    if (attrs.has('src')) continue;
    const type = (attrs.get('type') ?? '').trim().toLowerCase();
    if (!EXECUTABLE_TYPES.has(type)) continue;
    out.push(m[2]);
  }
  return out;
}

/** CSP hash pār skripta tekstu tieši tā, kā to redz pārlūks (HTML parsētājs CRLF/CR pārvērš par LF). */
export function scriptHash(text) {
  const normalized = text.replace(/\r\n?/g, '\n');
  return `sha256-${createHash('sha256').update(normalized, 'utf8').digest('base64')}`;
}

/**
 * Bez upgrade-insecure-requests: lapa jau ir tikai https (301 + HSTS), bet šī direktīva
 * SiteGround pagaidu adresē bez SSL pārslēgtu arī pašas lapas CSS/JS uz https un tos salauztu.
 */
export function buildPolicy(hashes, { ga4 = false, web3forms = false } = {}) {
  const directives = [
    ['default-src', ["'self'"]],
    ['script-src', ["'self'", ...hashes.map((h) => `'${h}'`), ...(ga4 ? GA4_SCRIPT : [])]],
    ['style-src', ["'self'", "'unsafe-inline'"]],
    ['img-src', ["'self'", 'data:', ...(ga4 ? GA4_HOSTS : [])]],
    ['font-src', ["'self'"]],
    ['connect-src', ["'self'", ...(ga4 ? GA4_HOSTS : []), ...(web3forms ? WEB3FORMS : [])]],
    ['frame-src', ['https://www.google.com', 'https://maps.google.com']],
    ['form-action', ["'self'", ...(web3forms ? WEB3FORMS : [])]],
    ['base-uri', ["'self'"]],
    ['object-src', ["'none'"]],
    ['frame-ancestors', ["'self'"]],
  ];
  return directives.map(([name, values]) => [name, ...values].join(' ')).join('; ');
}

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out.sort();
}

async function isDirectory(p) {
  try {
    return (await stat(p)).isDirectory();
  } catch {
    return false;
  }
}

async function readIfExists(file) {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

/**
 * @param {{ ga4?: boolean, web3forms?: boolean }} [options]
 *   ga4 - atļaut Google Analytics 4 domēnus; web3forms - atļaut https://api.web3forms.com.
 */
export default function cspHtaccess(options = {}) {
  const ga4 = Boolean(options.ga4);
  const web3forms = Boolean(options.web3forms);

  return {
    name: 'csp-htaccess',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const htaccessPath = join(root, '.htaccess');
        const htaccess = await readIfExists(htaccessPath);
        if (htaccess === null) {
          logger.warn('dist/.htaccess not found (public/.htaccess missing?) - CSP not written');
          return;
        }
        if (!htaccess.includes(PLACEHOLDER)) {
          throw new Error(
            `[csp-htaccess] dist/.htaccess has no ${PLACEHOLDER} placeholder. ` +
              `public/.htaccess must contain: Header always set Content-Security-Policy "${PLACEHOLDER}"`,
          );
        }

        const files = await htmlFiles(root);
        const clashes = [];
        for (const file of files) {
          const page = relative(root, file).replace(/\.html$/, '');
          if (page === 'index' || page.endsWith('/index')) continue;
          if (await isDirectory(join(root, page))) clashes.push(`${page}.html + ${page}/`);
        }
        if (clashes.length) {
          throw new Error(
            `[csp-htaccess] dist has a folder with the same name as a page (${clashes.join(', ')}). ` +
              `Apache would answer the clean URL with 403 instead of the page; rename the folder (e.g. in public/).`,
          );
        }
        const hashes = [];
        const seen = new Set();
        const inlineHandlers = [];
        for (const file of files) {
          const html = await readFile(file, 'utf8');
          for (const script of executableInlineScripts(html)) {
            const hash = scriptHash(script);
            if (!seen.has(hash)) {
              seen.add(hash);
              hashes.push(hash);
            }
          }
          // CSP bez 'unsafe-inline'/'unsafe-hashes' bloķē onclick="..." un javascript: saites.
          const withoutScripts = html.replace(SCRIPT_RE, '');
          if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(withoutScripts) || /\shref\s*=\s*["']?\s*javascript:/i.test(withoutScripts)) {
            inlineHandlers.push(relative(root, file));
          }
        }
        if (inlineHandlers.length) {
          logger.warn(`inline event handlers / javascript: URLs will be blocked by CSP in: ${inlineHandlers.join(', ')}`);
        }

        const policy = buildPolicy(hashes, { ga4, web3forms });
        if (policy.includes('"')) throw new Error('[csp-htaccess] policy must not contain double quotes');

        const result = htaccess.split(PLACEHOLDER).join(policy);
        for (const line of result.split('\n')) {
          if (line.includes(policy) && line.length > MAX_LINE) {
            throw new Error(
              `[csp-htaccess] Content-Security-Policy line is ${line.length} chars (limit ${MAX_LINE}). ` +
                `Too many distinct inline scripts (${hashes.length}); move some into bundled scripts.`,
            );
          }
        }
        await writeFile(htaccessPath, result);

        const extras = [ga4 && 'GA4', web3forms && 'Web3Forms'].filter(Boolean);
        logger.info(
          `CSP: ${hashes.length} inline script hash${hashes.length === 1 ? '' : 'es'} from ${files.length} HTML files` +
            `${extras.length ? ` (+ ${extras.join(', ')})` : ''} -> .htaccess (${policy.length} chars)`,
        );
      },
    },
  };
}
