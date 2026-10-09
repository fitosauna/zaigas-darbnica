# Zaigas darbnīca - DESIGN.md

Design system, audit and implementation plan for **zaigasdarbnica.lv** (A14 §1-2).
The single source of truth for requirements is `CLAUDE_CODE_PROMPT.md`; this file records how it is
interpreted, where it conflicts with itself, and what was decided.

Status: **homepage + shared components built, waiting for owner approval** (A14 §5).
Inner pages are planned below but not implemented.

---

## 1. Concept

**„Viens diegs” - one thread through a sunlit atelier.**
The site is a calm, editorial page laid out on cream linen. Photography carries the warmth; type carries
the elegance; the dusty-rose thread from the logo appears only a few times, like a detail a seamstress
would notice. Everything else stays quiet so the phone number and the call button are always the first
thing the eye finds.

Three principles guide every decision:

1. **Readable first.** Audience is women 35-70, mostly on phones. Body text ≥17 px, tap targets ≥48 px,
   high contrast, nothing important only on hover.
2. **Flow, not blocks.** No flat bands, no card grids. Backgrounds melt (cream → linen → blush → cream)
   over 100-200 px; images overlap seams; layouts are asymmetric.
3. **Restraint.** One signature moment (sometimes two) per page; about five craft ideas site-wide.

---

## 2. Audit (A14 §1)

The brief, all 32 asset files and the repository were audited by four independent passes (Part A
conflicts, Part B copy rules, assets, tech/SEO/a11y), and every finding was checked by an adversarial
verifier against the source text. 47 findings survived; the relevant ones are below.

### 2.1 Repository

- The session started in the wrong repository (`fitosauna/fitosauna-landing-page`, an unrelated site).
  The brief zip was in `fitosauna/zaigas-darbnica`; all work is on branch `claude/loving-dijkstra-09k137`
  of that repository. `main` is untouched until the owner approves.
- The zip was unpacked; `CLAUDE_CODE_PROMPT.md` and `assets/` sit in the repo root; the zip was deleted
  in commit `90dd6fa`.
- **Photos stay in `assets/`** (they are imported from there by `src/data/images.ts`). This keeps one copy
  of every file and means „replace a photo” = replace one file in `assets/` with the same name (A8).

### 2.2 Assets

| Check | Result |
| --- | --- |
| File list vs A2/A8 | All 25 `.webp` photos + 5 logos + mockup + placeholder present; names match. |
| Hero photo resolution | `hero-darbnica.webp` is only 1672×941. At 1440×900 it renders at ~1.05 image px per CSS px (soft on retina). **Not blocking.** srcset never upscales; Ken Burns ends at scale 1 (its sharpest). A ≥2880 px export with the same name would improve retina sharpness. |
| Mobile hero crop | `hero-darbnica-mobile.webp` (4:5) keeps machine and yarn in the top ~55%; the empty table carries the fade and H1 overlap. |
| Before / after | `pirms-jaka` / `pec-jaka` align pixel-for-pixel (diff only in the zipper area, 30-70% width). |
| Gallery | `darbi-1..6` match Part B §1.6 captions in order (parka, jeans, graduation dress, cable sweater, socks + mittens, curtains). |
| Logos | `logo-header-transparent.png` is 1304×624, 319 KB, no padding. Served as optimised PNG 1×/2×/3× (6-29 KB). `logo-transparent.png` / `logo-cream.png` carry ~16 % empty padding plus faint alpha haze; trimmed with `object-fit` on the page and by alpha threshold in the OG script (no redrawing). |
| Real Zaiga photos | `zaiga-portrets` → Par Zaigu (arched frame). `zaiga-pie-sujmasinas` → Kāpēc Zaiga. `zaiga-rokas-adisana`, `pielagosana-pielaikosana` → inner pages only. |
| Not shipped | `hero-reference-mockup.png`, `hero-darbnica-placeholder.jpg`, `logo-original.png` are reference only. `og-fons.webp` is used only by `scripts/brand-assets.py`. |

**Missing inputs** (none blocking the homepage):

- **Google Business Profile URL** → `flags.googleReviewUrl` is empty, so the „Atstāt atsauksmi” sentence
  and button are hidden (A11, Part B §1.7 note).
- **Favicon / apple-touch-icon** → generated from the logo's „Z” + needle thread by masking (the „a” is
  excluded), on a cream tile so it reads on dark tabs. Nothing redrawn. `scripts/brand-assets.py`.
- **OG image** → built from `og-fons.webp` + trimmed full logo + „Zaigas darbnīca Alūksnē” (Fraunces),
  centred so square chat previews (WhatsApp) still show the mark. `public/og-image.jpg`, 1200×630.
- **Handwritten signature** → not supplied. A short typeset note „Zaiga” in Caveat is used; it is
  decorative (`aria-hidden`), not a fake of her handwriting. A real scan can replace it later.
- **Inner pages**: Part B asks for three before/after pairs per repair/alteration page and a knitted
  blanket photo; only one pair and no blanket exist. Plan in §8.
- **Reference site** `special-offer.fitosauna.com` could not be reached from this environment (DNS/proxy).
  The floating header follows the written spec in A4 §2 exactly.
- **Form copy** for upload/e-mail errors, rate limit and the no-JS thank-you state is not in Part B
  (inner-page phase; strings will be proposed for approval).

### 2.3 Conflicts and decisions

| # | Conflict | Decision |
| --- | --- | --- |
| 1 | Part B lists a **top info bar** (address · hours · phone); A4 §2 wants a compact floating pill that does not eat space. | No separate bar. Its content is distributed: hero info line (address, hours, area), header phone digits on wide desktop (≥1240 px, where a `tel:` link may not dial), „Zvanīt Zaigai” pill, menu sheet, mobile bottom bar, footer. |
| 2 | Part B §1.6 says „6 attēlu režģis”; A8/A7 forbid uniform grids. | Six captioned pieces hang from a thread with pegs and kraft tags (desktop: two lines of three; mobile: swipe row with peek). |
| 3 | A8 forbids presenting AI images as real client work; Part B captions read as finished jobs; `galleryIllustrative` defaults to `false`. | Captions kept verbatim (A12). Alt texts describe only what is visible (never „klienta”, „Zaigas darbs”, „darbnīcā”). The flag also adds the line under the before/after. **Owner decision recommended:** set `galleryIllustrative: true` until real photos replace `darbi-*` and `pirms/pec`. |
| 4 | Sample reviews (A11) under „Ko saka klienti” could read as real testimonials. | „Paraugs” stamp at the heading **and** a small „Paraugs” label in every attribution (AA contrast, ≥13 px). No review schema. **Must** be replaced with real reviews or hidden (`showReviews: false`) before going live: presenting invented reviews as real is an unfair commercial practice under EU consumer law. |
| 5 | A9 asks for JSON-LD type `["LocalBusiness","Tailor"]`; schema.org has **no `Tailor` type**. | `@type: "LocalBusiness"` with every field A9 lists, plus `knowsAbout` with the five services. |
| 6 | Part B /apgerbu-remonts meta: „Zvani 26 423 325” (informal „Tu”) vs A12 „Jūs everywhere”. | A12 wins: „Zvaniet +371 26 423 325.” (inner-page phase). |
| 7 | Home „Apģērbu remonts … Cenas no 3,50 €” is not the table minimum (buttons 0,50 €, slider 3 €). | Kept as written: 3,50 € is the cheapest of the repairs that sentence names. The blurb references the price row id `cauruma-salabosana`, so it can never drift (A12.1). **Owner may confirm.** |
| 8 | „Pakalpojumi” has no page of its own. | Desktop: a `<button aria-expanded>` disclosure (click, keyboard, Esc; hover only as enhancement) with five real links. Mobile sheet: services always listed. Breadcrumbs on inner pages will be two-level („Sākums › Apģērbu remonts”). |
| 9 | Mobile hero must fit 390×844 with first button visible; photo 45-55 %; bottom bar on every page. | Photo `clamp(330px, 53svh, 560px)`; H1 overlaps the fade over the empty tabletop; both buttons and the info line fit at 390×844. **The bottom bar slides in once the hero's own call/WhatsApp buttons scroll away** (it is on every page, but never duplicates the hero buttons and never covers the first screen). Without JS it is always visible. |
| 10 | Header 16-24 px inset, 56-64 px tall on mobile, 48 px tap targets. | Mobile: 10 px top inset + 52 px pill = 62 px; round buttons have a 48 px hit area with a 42 px visible circle. Desktop: 18 px inset, 64 px pill, shrinks to 58 px on scroll. |
| 11 | Hyphen-only rule makes ranges break badly („9:00-” / „20:00”). | Only ASCII „-” in output. Ranges, „P.-S.”, „LV-4301” sit in `nowrap` spans; a no-break space is put **before** spaced dashes so the dash stays with the previous word (`src/lib/typo.ts`). |
| 12 | A4 §3 suggests `hyphens: auto` on headlines; auto-hyphenating display type can break words badly. | Kept as asked, but limited with `hyphenate-limit-chars: 10 4 4` (only long words, at least 4+4 letters); `text-wrap: balance` on headings. Checked at 360 px. |
| 13 | A10 „every phone number is a `tel:` link” vs sentences that ask for a WhatsApp photo. | The number is always `tel:`; the word „WhatsApp” in the same sentence links to `wa.me`. |
| 14 | Footer logo: A2 offers cream versions „for dark backgrounds / footer”; Part B says the full logo with tagline suits the footer. | Chocolate footer (the brief's „dark moment” colour) with the **full cream lockup** (`logo-cream.png`). It is the only place the „Šūšana un adīšana” lockup appears. The footer rises out of the page with a curved, stitched seam, not a flat band. |
| 15 | Swipe rows are recommended for collections and services on mobile (A4 §3, A5) but carousels for core content are banned (A7). | Swipe rows are native horizontal scroll with snap and a visible peek: no autoplay, no arrows. A small stitch indicator under each row shows position. Everything stays reachable by keyboard. |
| 16 | A14 has two items numbered „6”. | Read as: build remaining pages after approval, then run the final checks. |

---

## 3. Design tokens

All tokens live in `src/styles/tokens.css`.

### Colour (from the logo, A6) and usage rules

| Token | Hex | Use | Contrast on cream |
| --- | --- | --- | --- |
| `--cream` | `#FAF5EE` | base background | - |
| `--linen` | `#F1E6D8` | warm areas, paper | - |
| `--blush` | `#EBD3CC` | soft rose areas | - |
| `--chocolate` | `#521B10` | headings, dark moments, footer | 12.7:1 |
| `--ink` | `#3A2A26` | body text | 12.6:1 |
| `--thread` | `#B8605A` | thread, heart, stitches, large numerals **only** | 4.0:1 (decorative / large) |
| `--rose-cta` | `#9E4A45` | filled buttons with white text (6.0:1) | - |
| `--kraft` | `#C9A27E` | pegs, tag paper - never text | 2.2:1 |
| `--ink-soft` (derived) | `#5E4740` | secondary text | 7.9:1 (6.0 on blush) |
| `--rose-ink` (derived) | `#8F3F3A` | text links, labels on any tone | 6.6:1 (5.0 on blush) |
| `--focus` | `#2F5D8A` | focus ring, distinct from brand colours | - |

WhatsApp is never brand green: outlined chocolate pill with a WhatsApp glyph.

### Typography

Self-hosted, subset to Latin + Latin Extended-A/B (every Latvian letter checked), one file per style:

- **Fraunces** (display) variable, `opsz 9-144`, `wght 300-600`, instanced at `SOFT 50`, `WONK 0`
  (soft ball terminals that echo the logo's „Zaiga”). 76 KB, preloaded.
- **Fraunces Italic** at 400 for the H1 place name and review quotes. 52 KB, preloaded.
- **Mulish** variable `wght 400-800` (body, UI). 33 KB, preloaded.
- **Caveat** 500 for at most 3-5 tiny handwritten notes. 54 KB, loaded only where used.
- Metric-matched fallbacks (`size-adjust`, ascent/descent overrides) to avoid layout shift.

| Role | Size (360 → 1440 px) | Notes |
| --- | --- | --- |
| H1 | 46 → 88 px, line-height 1.0 | Fraunces 380, opsz 144, -0.024em |
| H2 | 34 → 56 px | Fraunces 400, `text-wrap: balance` |
| H3 | 22 → 28 px | Fraunces 450-500 |
| Lead | 19 → 23 px | Mulish |
| Body | 17 → 18 px, line-height 1.62 | Mulish 450, 55-75 characters per line |
| Secondary | 16 px | info lines, captions, footer |
| Label | 13 px, uppercase, 0.22em tracking | echoes „ŠŪŠANA UN ADĪŠANA” |

Nothing meaningful is set below 13 px; nothing body-like below 16 px.

### Space, shape, motion

- 4 px spacing scale (`--s-1` … `--s-10`); section padding `72 → 128 px`, tight `48 → 88 px`;
  gutter `20 → 48 px`; content width 1200 px.
- Radii: pills 999 px, large 28 px. Shadows are warm and soft (chocolate-tinted).
- Motion: slow ease-out; nothing moves just to move. `prefers-reduced-motion` disables every
  animation (thread draws appear complete, Ken Burns off, slider hint off).
- Texture: a pre-rendered SVG noise tile at 5 % opacity over the page (linen grain).

### Tonal flow (homepage)

`cream (hero) → cream→linen (services) → linen (why) → linen→blush (before/after) → blush→cream (about)
→ cream (gallery) → cream→linen→cream (reviews) → cream (process) → cream→linen→cream (area)
→ cream→blush (FAQ) → blush (final) → chocolate footer rising on a curved stitched seam`.

---

## 4. The thread („Viens diegs”)

| Page | Thread behaviour |
| --- | --- |
| **Home** | Three moments only: (1) a swoop drawn once under the H1 „Alūksnē”, echoing the logo; (2) mid-page, the gallery clothesline that runs edge to edge across the page and holds the six pieces; (3) the final call to action, where the thread ties itself into the logo's heart (drawn when scrolled into view). |
| Inner pages | At most one quiet moment: the H1 underlined by a short swoop (drawn once). |
| Everywhere (static, not a „moment”) | Stitch details: dashed inner line on primary buttons (tightens on hover), the before/after seam, the footer's curved seam. |

## 5. Craft ideas used (A5 - „choose, don't stack”)

Site-wide budget, five ideas:

1. **Services as fabric swatches** (pinked edges, each on its own fabric: denim, linen, silk, knit, sheer).
2. **„Kāpēc Zaiga” on a sewing-pattern sheet** with a large outlined „20” and a hand note „gadu pieredze”.
3. **Before / after slider** on the jacket (keyboard and screen-reader accessible range input).
4. **Arched, mirror-like portrait** with a small Caveat note „Zaiga”.
5. **Gallery hanging from a thread** with wooden pegs and kraft tags.

Planned for inner pages within the same budget: price lists as **tailor's tickets** (/cenas and the
service price sections) replace nothing above but reuse the kraft tag language; no further ideas.
Not used: marquee, process knots, curtain folds, notes pinned on linen, hand-drawn map (Kontakti uses the
click-to-load map preview instead).

## 6. Signature moment per page

| Page | Signature moment (max 1-2) |
| --- | --- |
| `/` | Hero (masked atelier photo + drawn thread) and the services swatch moodboard. |
| `/apgerbu-remonts` | Before/after jacket slider. |
| `/apgerbu-parsusana` | Fitting photo of Zaiga (`pielagosana-pielaikosana`) in an arch, with pinned-hem detail. |
| `/individuala-susana` | Five-step process laid out like a pattern sheet (reuse of idea 2). |
| `/adisana-pec-pasutijuma` | Knit-texture swatch band with Latvian-pattern mittens. |
| `/aizkaru-susana` | Tall, full-height curtain photograph as a calm vertical moment. |
| `/cenas` | Price lists as tailor's tickets with dotted leaders. |
| `/par-mani` | Arched portrait + story; hands-knitting photo. |
| `/kontakti` | Order-slip form + click-to-load map preview. |
| `/privatuma-politika`, 404 | No signature moment; quiet text pages (404 may use `cenas-darbnicas-galds`). |

## 7. Architecture

```
assets/                     original brief photos and logos (replace a photo here, same name)
public/                     favicon, touch icons, og-image.jpg, site.webmanifest
scripts/brand-assets.py     regenerates favicons and og-image from assets/
src/config.ts               domain, contact, hours, flags (showReviews, galleryIllustrative, googleReviewUrl, ga4Id)
src/data/prices.ts          every price, once, by id + formatter („no 3,50 €”, NBSP)
src/data/services.ts        five services; blurbs reference price ids
src/data/images.ts          the single image map with Latvian alt texts
src/data/{faq,reviews,gallery,navigation}.ts
src/lib/picture.ts          AVIF + WebP srcset, art direction, hero preload
src/lib/typo.ts             NBSP rules, tel:/WhatsApp linking
src/lib/schema.ts           LocalBusiness, FAQPage, BreadcrumbList JSON-LD
src/components/             Header (+ menu sheet), BottomBar, Footer, Button, Picture, Icon, Faq, SwipeHint, Seo
src/components/home/        Hero, Services, WhyZaiga, Mend, About, Gallery, Reviews, Process, Area, FinalCta
src/layouts/BaseLayout.astro
```

- Astro 7, static output, `build.format: 'file'`, `trailingSlash: 'never'` → `dist/cenas.html` served
  as `/cenas` (the `.htaccess` comes in the deployment phase). Canonicals have no trailing slash.
- Vanilla JS only (header state, dropdown, `<dialog>` menu, bottom-bar reveal, slider, swipe hint,
  final heart reveal). Everything is real HTML and readable without JS.
- CI: `.github/workflows/ci.yml` runs `astro check` and `astro build` and fails on any U+2013/U+2014 in
  the built HTML. **No deploy workflow yet** (deployment phase, manual `workflow_dispatch` only).

## 8. Plan after approval

1. Inner pages from the approved homepage language: service pages share one template (hero with the
   service photo + H1 thread swoop, list, benefits, tailor's-ticket price list, FAQ, CTA, related links,
   breadcrumbs + BreadcrumbList).
   - Photos per page as in A8. Missing before/after pairs are **not faked**: /apgerbu-remonts uses the one
     jacket pair; /apgerbu-parsusana shows examples (`pakalpojums-pielagosana`, `darbi-2`, `darbi-3`)
     without „pirms/pēc” labels; /adisana-pec-pasutijuma leaves out the blanket.
2. /cenas, /par-mani, /kontakti (form → `public/send.php` with PHPMailer, honeypot, rate limit, finfo
   upload check; click-to-load map), /privatuma-politika, 404 (noindex).
3. `sitemap.xml` (exactly 10 URLs), `robots.txt`, `public/.htaccess`, `deploy.yml` (manual only, skips
   cleanly without `SG_*` secrets), Latvian README.
4. Final checks: Lighthouse mobile, axe, dash grep, one H1 per page, 360 px overflow, reduced motion,
   functional tests (tel/WhatsApp, menu, bottom bar, keyboard, form states).

## 9. Questions for the owner

1. Approve the homepage design (screenshots in `screenshots/`)?
2. Turn on `galleryIllustrative` until real photos exist? (recommended)
3. Real reviews: replace the five samples, or hide the section (`showReviews: false`) at launch?
4. Is „Apģērbu remonts … no 3,50 €” intended (cheapest listed repair), or should it say „no 0,50 €”?
5. Does `kontakti-maja.webp` show the real Tālavas iela 18 house, and where does it come from? (It looks
   like a street-level capture; if it is not the real house it must not be used for wayfinding.)
6. Google Business Profile link for the review button, if one exists.
7. A larger export (≥2880 px wide) of `hero-darbnica.webp`, if available, for sharper retina screens.
8. Privacy policy publication date (`[publicēšanas datums]`).
