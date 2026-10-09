# Zaigas darbnīca - Claude Code prompts (zaigasdarbnica.lv)

**Kā lietot (latviski):**
1. Augšupielādē šo failu un mapi `assets` (logo + 25 .webp bildes) GitHub repozitorijā `fitosauna/zaigas-darbnica` (vai kā zip, ko Claude Code atarhivē).
2. Atver repozitoriju Claude Code (tīmeklī) un uzraksti: **„Izlasi CLAUDE_CODE_PROMPT.md un uzbūvē mājaslapu pēc tā. Commito un pushi šeit.”**
3. Claude Code uzbūvēs lapu, pats to pārbaudīs telefonā un datorā un saglabās visu GitHub. Lapa tiks hostēta SiteGround.

Instrukcijas ir angliski, jo tā Claude Code tās izpilda visprecīzāk. Mājaslapas teksti ir latviski (Part B).

---

# PART A - BRIEF FOR CLAUDE CODE

## A1. Mission

Build **zaigasdarbnica.lv**, a premium, handcrafted-feeling website for **Zaigas darbnīca**. It is the home sewing and knitting workshop of Zaiga Lemeševska (20 years of experience) at Tālavas iela 18, Alūksne, Latvia. Clients also come from Gulbene and Balvi.

The bar: it should feel like a boutique atelier's site made by a top design studio. Calm, warm, editorial and quietly luxurious. A visitor should think "this is beautiful" in the first second, and know how to call Zaiga in the next three seconds. It must **not** look like a generic AI template made of stacked boxes.

Audience: mostly women aged 35-70 in a small Latvian town, mostly on phones. Beauty must never cost readability or tap-ability.

**You own the art direction.** This brief gives you the brand, the content, a few non-negotiables and an idea bank. Invent freely beyond the idea bank. If you find a better idea than one suggested here, use yours, as long as the non-negotiables hold.

## A2. Inputs in `/assets`

| File | Use |
| --- | --- |
| `logo-transparent.png` | Main logo „Zaiga - Šūšana un adīšana” on a transparent background. Do not redraw, recolour or distort it. |
| `logo-header-transparent.png` | **Header logo:** „Zaiga” with needle, thread and heart, **without** the subtitle (clean crop of the original, nothing redrawn). This is the logo used in the site header. |
| `logo-header-cream.png` | Same, cream version for dark backgrounds / footer |
| `logo-cream.png` | Single-colour cream version for dark backgrounds |
| `logo-original.png` | Original on white (reference) |
| `hero-reference-mockup.png` | **Visual reference for the hero composition and mood** (client-approved direction). Not a final asset: it contains text and a mock navigation. |
| `hero-darbnica-placeholder.jpg` | Old low-resolution crop of the mockup's photo. **Superseded** by `hero-darbnica.webp`; use only as a last fallback. |
| 25 photos in **`.webp`** format | The final site photos (generated to this brief, 4 of them show the real Zaiga). Full list and placement in A8. |

## A3. Brand concept

**The thread („Viens diegs”).** In the logo, a dusty-rose thread passes through the needle eye formed by the „Z”, swoops under the name and ends in a small heart. Use this thread as the site's quiet signature.

- On the homepage, use it in **two or three moments only**, for example: one thread drawn once in the hero, one thread that stitches across a single section seam in the middle of the page, and the heart at the final call to action.
- On inner pages, at most one quiet thread moment (e.g. underlining the H1 like the logo's swoop).
- Do not connect every section with a moving thread; too much movement feels artificial.

Keep it elegant and sparing. It should feel like a detail a craftsperson would notice, not a gimmick.

**Mood:** a sunlit atelier. Cream linen, soft daylight, dusty rose wool, brass scissors, a white sewing machine, dried flowers, a wicker basket of yarn (exactly the world of `hero-reference-mockup.png`).

## A4. Non-negotiables

### 1. Hero

Follow the composition of `hero-reference-mockup.png` (except its large logo above the H1 - that is replaced by the decision below):

- **Image:** a full-bleed atelier photograph covers the hero. On desktop the photo sits on the right ~60%. It dissolves softly into the cream background on the left through a long, natural gradient mask, so there is no hard image edge and no "square photo on the side".
- **Text column (left):**
  - **No logo in the hero** (the logo lives only in the header, so it is never shown twice). The hero starts with the H1, which gets the full visual weight.
  - Then a short line of supporting text.
  - Then two buttons and one small info line.
- **Fit:** everything fits in one viewport on a 1440×900 desktop and a 390×844 phone, with the first button visible without scrolling.
- **Copy:** short and concrete, exactly as in Part B §1.1. No vague slogans.
- **Motion:** a subtle, slow Ken-Burns drift on the photo (disabled under reduced motion). The thread can draw itself once under the H1, echoing the logo's swoop.
- **Mobile hero:** the photo becomes the top ~45-55% of the screen, edge to edge, and fades downward into cream. The H1 overlaps the fade, followed by the text, buttons and info line. Use a different crop via `<picture>` art direction so the sewing machine and yarn stay in frame. No text over busy parts of the image.

### 2. Floating inset header

Not a full-width bar glued to the top. The header is a **detached, rounded "pill" bar floating inside the page**:

- inset ~16-24px from the top and sides, max-width ~1200px, centred;
- translucent cream (`rgba(250,245,238,.72)`) with `backdrop-filter: blur(14px)` and a hairline border;
- generous radius (999px or ~28px) and a very soft shadow.

It holds:
- the logo `logo-header-transparent.png` (no subtitle), always visible, also when scrolling; never recreate it with fonts, CSS or traced SVG;
- navigation;
- the rose „Zvanīt Zaigai” pill button.

On scroll it stays sticky, shrinks slightly and becomes a bit more opaque. Over the hero it should feel like it is floating on the photo.

Keep the header compact and quiet: it must not feel elaborate or eat screen space (on mobile about 56-64px tall including the inset). Mobile: the same floating pill with only the logo, a small round phone button and a menu button. The menu opens as an elegant full-screen sheet (cream, large serif links, phone and WhatsApp at the bottom) with smooth, reduced-motion-safe animation.

Reference for the floating-inset feel: https://special-offer.fitosauna.com/ (look at it if you can browse; do not copy content).

### 3. Mobile is the primary experience

Design mobile-first, then enhance for desktop.

- **Test widths:** 360, 390, 430 (portrait), 768 and 1280-1440. Also check landscape phone.
- **Typography:** fluid with `clamp()`. Body never below 17px on mobile. Headlines big but never breaking words badly (`hyphens: auto` with `lang="lv"`, `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs).
- **Images:** every image is art-directed for mobile (separate crops via `<picture>` where composition matters). Nothing important is cropped off. No horizontal page scroll ever.
- **Touch:** tap targets ≥ 48px. Nothing important lives only on hover.
- **Galleries and collections:** where a desktop layout spreads items wide, consider horizontal swipe rows with scroll-snap and a peek of the next item on mobile.
- **Sticky bottom bar:** on every page on mobile, two large buttons: „Zvanīt” and „WhatsApp”. Respect `env(safe-area-inset-bottom)`. Hide it while the menu sheet is open. It must never cover content (add bottom padding).

### 4. Flow, not blocks

Sections must **blend into each other**. Avoid hard horizontal bands with different flat background colours, card grids, and equal boxes. Use instead:

- **Long gradual background shifts:** cream to linen to blush and back. Each tone should melt over 100-200px.
- **Images that overlap section boundaries.**
- **The thread crossing from one section into the next.**
- **Asymmetric editorial layouts,** with text and images interlocking.
- **Generous, rhythmic whitespace.**
- **Occasional full-bleed photography moments.**
- **Soft organic seams instead of straight edges:** a stitched seam, a gentle curve, a torn-linen edge.

There should be no visible "section box" anywhere.

### 5. Craft quality

- Consistent spacing scale.
- Precise alignment to a grid.
- Optical kerning on display type.
- Balanced line lengths (55-75 characters).
- Real hierarchy.
- Tasteful restraint: each page gets at most 1-2 "signature moments". Everything else stays calm.

### 6. Performance and accessibility

- Lighthouse on mobile: aim for 95+ in all four categories. Accessibility, SEO and Best Practices should reach 95+; for Performance, 90+ is acceptable if the remaining points would cost the design or functionality. Never drop the signature design to chase a score, but do fix real problems (large images, layout shift, render-blocking fonts or scripts).
- WCAG AA contrast.
- Visible focus states.
- All text is real HTML, visible without JavaScript.
- `prefers-reduced-motion` fully respected.

### 7. Honesty

Do not invent facts, prices, services, reviews, years, guarantees or credentials beyond Part B.

## A5. Idea bank (use, remix or replace)

**Choose, don't stack.** This is a menu, not a checklist. Across the whole site use the thread plus **about 4-5 of these ideas at most**, each where it carries meaning. Elegance comes from restraint: if a page starts to feel like a craft-themed theme park, remove ornaments until it feels calm and expensive again. Animations stay slow, subtle and few (no element should move just to move), and the content and the call button must always be the first thing the eye finds.


- **Services** as fabric swatches with pinked edges and different textures (denim, linen, silk-rose, knit stitch, sheer curtain), loosely arranged like a designer's moodboard rather than a grid. On mobile, a swipeable row of swatches.
- **"Before / after" slider** on a repaired jacket for the „Ne vienmēr vajag pirkt jaunu” moment.
- **Price lists** styled as tailor's tickets or paper tags with a string hole and dotted leaders. On the Cenas page, the tags hang from a rail.
- **„Kāpēc Zaiga”** written over a faint sewing-pattern sheet (grid, dashed cut lines, notches) with a large outlined „20”.
- **Portrait** of Zaiga in an arched, mirror-like frame, with a small handwritten signature.
- **Gallery** pieces hanging from a thread with tiny wooden pegs and kraft tags, with a gentle sway on hover.
- **Reviews** as notes pinned on linen.
- **Process** shown as a thread with three knots.
- **Area:** a hand-drawn line map with Alūksne marked by a needle-pin and the heart, and Gulbene and Balvi connected by running stitches („~50 km”).
- **Knitting page:** a stockinette „V” stitch texture and a yarn strand instead of a thread.
- **Curtains page:** soft vertical sheer folds.
- **Twill-tape ribbon** marquee with service names.
- **Buttons** that feel like woven garment labels.
- **Microinteractions:** the thread tightens on button hover, and a needle stitches across on link hover.

## A6. Design tokens

**Colours** (from the logo):

| Token | Hex | Use |
| --- | --- | --- |
| `--cream` | `#FAF5EE` | Base background |
| `--linen` | `#F1E6D8` | Warm tone areas, paper |
| `--blush` | `#EBD3CC` | Soft rose areas |
| `--chocolate` | `#521B10` | Logo brown: display type, dark moments |
| `--ink` | `#3A2A26` | Body text (12.6:1 on cream) |
| `--thread` | `#B8605A` | Thread, heart, stitches; decorative or large text only |
| `--rose-cta` | `#9E4A45` | Buttons with white text (6:1); hover `#8F3F3A` |
| `--kraft` | `#C9A27E` | Tags, pegs, small details |

**Fonts:**
- Suggested display: *Fraunces* (soft, rounded optical style that echoes the logo).
- Suggested body: *Mulish*.
- Suggested handwritten accent: *Caveat* (for 3-5 tiny notes total).
- Small caps with wide tracking for labels, echoing „ŠŪŠANA UN ADĪŠANA”.

You may choose other fonts if they are better, but every font must render Latvian ā č ē ģ ī ķ ļ ņ š ū ž perfectly. Self-host the fonts and subset them to Latin + Latin Extended.

**Texture:** a very subtle linen or paper grain (SVG noise at low opacity) on the base, so nothing feels flat-digital.

## A7. Anti-generic list (never)

- Identical card grids.
- Icon-in-circle features.
- Gradient blobs or glassmorphism cards (the frosted header is the only glass element).
- Emoji.
- Stock "team" sections.
- Stat counters.
- "Trusted by" rows.
- Fade-in-up on every element.
- Carousels for core content.
- Popups or chat widgets.
- Lorem ipsum or English UI text.
- Shop, search or login icons (the mockup's search, cart and „Pierakstīties” elements are not part of this site).

## A8. Images

**All 25 site photos are already in `/assets` as `.webp` files** (not `.jpg`). Use them as they are, do not generate or download placeholder photos, and do not convert them to JPG. Copy them into the project (e.g. `src/assets/images/`) and reference them through one `src/data/images.ts` map, so replacing a photo later means replacing one file with the same name. Every image gets a Latvian `alt`.

Use Astro's image pipeline (`astro:assets`) to output responsive sizes in AVIF/WebP from the WebP sources, with `srcset`, explicit dimensions, lazy loading below the fold, and `fetchpriority="high"` plus preload on the hero. Keep the logos as PNG.

**Photo list and placement:**

| File | Subject | Where to use |
| --- | --- | --- |
| `hero-darbnica.webp` | Sunlit atelier (matches the mockup) | Hero on desktop and tablet |
| `hero-darbnica-mobile.webp` | Same scene, vertical crop | Hero on phones (`<picture>` with media query) |
| `pakalpojums-remonts.webp` | New zipper on a winter jacket | Home services moodboard (A5) + `/apgerbu-remonts` hero |
| `pakalpojums-pielagosana.webp` | Trouser hem pinned | Home services moodboard (A5) + `/apgerbu-parsusana` hero |
| `pakalpojums-individuala-susana.webp` | Dress on a dress form | Home services moodboard (A5) + `/individuala-susana` hero |
| `pakalpojums-adisana.webp` | Hand-knits with Latvian patterns | Home services moodboard (A5) + `/adisana-pec-pasutijuma` hero |
| `pakalpojums-aizkari.webp` | Linen curtains to the floor | Home services moodboard (A5) + `/aizkaru-susana` hero |
| `pirms-jaka.webp` / `pec-jaka.webp` | Before / after (same framing) | Before/after slider or comparison on home and `/apgerbu-remonts` |
| `zaiga-portrets.webp` | **Real Zaiga**, portrait | Home „Par Zaigu” / „Kāpēc Zaiga” + `/par-mani` hero |
| `zaiga-rokas-adisana.webp` | **Real Zaiga**, hands knitting | `/adisana-pec-pasutijuma` and the story section on `/par-mani` |
| `zaiga-pie-sujmasinas.webp` | **Real Zaiga** at the sewing machine | Home (about / trust section) and `/par-mani` |
| `pielagosana-pielaikosana.webp` | **Real Zaiga** fitting a garment | `/apgerbu-parsusana` (fitting section) |
| `darbi-1.webp` … `darbi-6.webp` | Gallery, captions in Part B §1.6 (in that order) | Home „Mani darbi” gallery; reuse matching ones on service pages |
| `adisana-latviskie-raksti.webp` | Mittens with Latvian patterns | `/adisana-pec-pasutijuma` |
| `adisana-dzijas.webp` | Choice of yarns | `/adisana-pec-pasutijuma` (yarn / own-yarn section) |
| `aizkari-galdauts.webp` | Curtains and tablecloth | `/aizkaru-susana` |
| `cenas-darbnicas-galds.webp` | Workshop table with tools | `/cenas` header or atmosphere band |
| `kontakti-maja.webp` | House entrance | `/kontakti` (how to find us) |
| `og-fons.webp` | Background for the share image | **Not shown on the site.** Build `public/og-image.jpg` (1200×630, JPG) from it: logo + „Zaigas darbnīca Alūksnē” on top. Use it as the og/Twitter image on all pages. |

**These are placements, not layouts.** „Home services moodboard” means the photo's place inside the services section (e.g. the fabric-swatch moodboard from A5), never a classic card in a grid. Every photo should sit inside the flowing, editorial composition from A4 §4: overlapping section seams, cut into organic shapes (arch, swatch with pinked edges, torn-linen edge), hung from the thread, or as a full-bleed moment. No uniform image grids, no tables of images.

**Authenticity:** the photos are AI-generated illustrations (the four Zaiga images are based on her real photos). Never claim in copy, captions or alt texts that they are photos of real client projects or of the real workshop interior. Add a config flag `galleryIllustrative` (default `false`); when set to `true` it shows one discreet line „Attēli ir ilustratīvi” under the „Paveiktie darbi” gallery.

Images showing the real Zaiga must be used only where the text talks about Zaiga or her own work. If any photo has no natural place, find a fitting one (an atmosphere band between sections, the 404 page, etc.) rather than leaving it unused. Note in the README that `pirms-jaka` / `pec-jaka` and `kontakti-maja` can later be replaced with real photos.

## A9. Tech, pages and SEO

- **Stack:** Astro (static output), minimal vanilla JS, CSS with custom properties (no heavy UI frameworks). GSAP is allowed only if it clearly improves the thread animation.
- **Domain:** `https://zaigasdarbnica.lv`, kept as one config value.
- **Pages (exact URLs):**
  - `/`
  - `/apgerbu-remonts`
  - `/apgerbu-parsusana`
  - `/individuala-susana`
  - `/adisana-pec-pasutijuma`
  - `/aizkaru-susana`
  - `/cenas`
  - `/par-mani`
  - `/kontakti`
  - `/privatuma-politika`
  - a Latvian `404`.
- **Navigation:** Sākums · Pakalpojumi (dropdown with the five services) · Cenas · Par mani · Kontakti · „Zvanīt Zaigai”.
- **Every page:**
  - `lang="lv"`;
  - title and meta description exactly from Part B;
  - a self-referencing canonical on the domain;
  - Open Graph and Twitter tags (`og:locale` lv_LV, JPG og image);
  - exactly one H1, then H2/H3 in order;
  - semantic landmarks;
  - real `<a href>` links;
  - breadcrumbs on inner pages.
- **JSON-LD:**
  - `["LocalBusiness","Tailor"]` named „Zaigas darbnīca”, with:
    - founder Person „Zaiga Lemeševska”;
    - address Tālavas iela 18, Alūksne, LV-4301, LV;
    - telephone +37126423325;
    - email zaiga.paula@inbox.lv;
    - hours Mo-Sa 09:00-20:00;
    - areaServed Alūksne, Gulbene, Balvi;
    - priceRange €;
    - logo and image.
  - `FAQPage` where FAQs exist.
  - `BreadcrumbList` on inner pages.
  - No review or rating schema.
- **Files:** `sitemap.xml` (exactly the 10 URLs), `robots.txt`, and a favicon and apple-touch-icon made from the logo's „Z” with thread.
- **Contact map:** on `/kontakti` the Google Map („Tālavas iela 18, Alūksne, LV-4301”) loads only after a click on an illustrated preview, plus an „Atvērt Google Maps” link.
- **Analytics:** none by default. If a GA4 ID is added to config later, show the consent banner (Part B §11) and load GA only after consent.

## A10. Contact form and details

- Phone and WhatsApp +371 26 423 325 (`tel:+37126423325`, `https://wa.me/37126423325`). Email zaiga.paula@inbox.lv. Hours P.-S. 9:00-20:00, closed Sunday. Every phone number is a `tel:` link.
- Form at `/kontakti#forma`:
  - fields, errors and messages exactly as in Part B §9.6;
  - optional photo upload (max 10 MB);
  - required consent;
  - honeypot.
- Hosting is **SiteGround** (Apache + PHP), so deliver the form with a small, secure PHP handler `public/send.php`:
  - sends to zaiga.paula@inbox.lv via **authenticated SMTP** (bundle PHPMailer, no Composer needed on the server) using a mailbox created in SiteGround, e.g. `noreply@zaigasdarbnica.lv`, with `Reply-To` set to the visitor's e-mail; if SMTP settings are empty it falls back to PHP `mail()`;
  - SMTP credentials live in a `config.php` placed **outside the public web root** (e.g. one level above `public_html`), with a `config.example.php` in the repo and the real file git-ignored; never commit credentials;
  - prevents header injection (strip CR/LF from name, e-mail, subject), limits total request size;
  - uploads: check the real file type with `finfo` (not the extension), allow only JPEG/PNG/WebP/HEIC up to 10 MB, give it a safe generated name, attach it straight from PHP's temp file and never store it in a public folder, delete any temp file after sending;
  - validates and sanitises every field server-side, checks the honeypot, limits rate per IP (simple file-based), and and logs nothing personal;
  - returns JSON; the form submits with `fetch` and shows the Part B success/error messages, and still works as a normal POST without JavaScript (redirect to a Latvian thank-you state);
  - recipient address and settings kept in one config block at the top of the file.
- Fallback: if PHP mail turns out unreliable, the form can switch to Web3Forms by changing one config value (document this in the README).
- Style the form like a tailor's order slip.

## A11. Reviews

The five reviews in Part B §1.7 are **samples**:

- Store them in `src/data/reviews.ts` with `isSample: true`.
- Show the reviews section normally with all five samples. While `isSample` is true, show a small, discreet „Paraugs” stamp.
- Add a config flag `showReviews` (default `true`) so the section can be hidden with one change later if needed.
- No review schema.

## A12. Copy rules

- Part B is the content. You may tighten or split sentences for layout and rhythm, but keep every fact, price, number, contact detail and promise exactly.
- Address the visitor politely with the capitalised „Jūs” form everywhere (Jūs, Jūsu, Jums) and matching verb forms (piezvaniet, atsūtiet, sazinieties). Never use the informal „Tu” form, including in buttons, form labels, error messages and alt texts.
- **Use only the short hyphen "-" as a dash. Never use em dashes (U+2014) or en dashes (U+2013) anywhere: copy, titles, meta tags, alt texts, code comments shown to users. Ranges also use "-" (9:00-20:00).**
- Latvian quotation marks „…”.
- Non-breaking spaces between numbers and units (5 €, 50 km) and inside the phone number.
- Prices are always shown as written („no 5 €”).

## A12.1. Maintainable architecture

- Reusable Astro components for header, footer, buttons, gallery, price list, FAQ, form and page layout.
- All services, prices, contact details, hours and navigation live in central data files (`src/data/*.ts`, `src/config.ts`). Every price exists in exactly one place, so the home page, service pages and `/cenas` can never disagree.
- Replacing a photo or changing a price must not require touching component code (explain in README).

## A13. Git and GitHub

1. The repository already exists (`fitosauna/zaigas-darbnica`, branch `main`) and you are working inside it. Do **not** run `git init` or `gh repo create`. Add a proper `.gitignore` (node_modules, dist, .env, .astro), and a `README.md` in Latvian (see A14).
2. **Commit in small, meaningful steps** with clear messages, for example:
   - `chore: init Astro project`
   - `feat(design): tokens, fonts, textures`
   - `feat(layout): floating header and mobile bar`
   - `feat(home): hero`
   - …
   - `feat(seo): schema, sitemap, meta`
   - `fix(mobile): …`
3. If the brief arrived as `zaigasdarbnica-brief.zip`, unzip it first, move `CLAUDE_CODE_PROMPT.md` and `assets/` to the repo root, and delete the zip in a commit.
4. Add a GitHub Actions workflow that installs dependencies and runs `astro check` and `astro build` on every push and pull request.
5. **SiteGround deployment:**
   - `public/.htaccess`: force HTTPS and non-www (`https://zaigasdarbnica.lv`), clean URLs without `.html` and without trailing-slash duplicates (match Astro's `build.format` and the canonical URLs), Latvian 404 via `ErrorDocument 404 /404.html`, gzip/brotli, long cache for hashed assets (`/_astro/`), short cache for HTML, and security headers (HSTS, X-Content-Type-Options, Referrer-Policy, a sensible CSP that allows the Google Maps iframe after click).
   - `.github/workflows/deploy.yml`: run **only manually** (`workflow_dispatch`, button „Run workflow” in GitHub Actions) - never on every push - so nothing reaches the live domain until the owner approves. It builds and uploads `dist/` to SiteGround over SSH with `rsync --delete` (exclude nothing the site needs). Use the repository secrets `SG_HOST`, `SG_USER`, `SG_PORT`, `SG_SSH_KEY`, `SG_PATH` (e.g. `~/www/zaigasdarbnica.lv/public_html/`). If the secrets are missing, the deploy job must skip with a clear message instead of failing the build.
   - Also produce a manual fallback: `npm run build` then upload `dist/` via SiteGround File Manager (explain in README).
6. Push after every major milestone. Never commit secrets.

## A14. Quality loop and delivery

1. **Audit first:** check the repo, assets and this brief; list any missing inputs or conflicting requirements in `DESIGN.md`, choose the most sensible option and continue (do not stop to ask unless something is truly blocking).
2. **Plan:** write `DESIGN.md` covering the concept, the type scale, the colour usage, how the thread behaves per page, and the signature moment of each page. Commit it.
3. **Build the homepage first.** Then use Playwright to take full-page screenshots at 360, 390, 430, 768, 1280 and 1440px.
4. **Critique the screenshots like a demanding art director.** Is it premium? Do sections flow? Does anything look like a template? Is the hero as good as the reference? Is everything readable and tappable on 360px? Fix what you find and screenshot again. Repeat until it truly passes.
5. **Mandatory owner approval checkpoint:** After completing and internally refining the homepage, present the final desktop (1440px) and mobile (390px) screenshots for owner review. **STOP HERE and wait for explicit owner approval.** Do not implement the remaining pages until the owner approves the homepage design. If changes are requested, revise the homepage, take new screenshots and request approval again. Once approved, use the homepage as the definitive visual reference for all remaining pages. Do not reinterpret or redesign the approved visual identity.
6. **Build the remaining pages** with the same quality loop, following the approved homepage design.
6. **Final checks:**
   - Lighthouse (mobile): target 95+ (Performance 90+ acceptable, see A4 §6); report the scores;
   - axe accessibility scan with no serious issues;
   - no em or en dashes anywhere in the built HTML (grep `dist/` for U+2014 and U+2013);
   - every page has one H1, correct title and meta, canonical and JSON-LD;
   - no horizontal scroll at 360px;
   - reduced-motion mode works;
   - functional test: every `tel:` and WhatsApp link, the mobile menu and bottom bar, keyboard navigation, image loading, and the contact form (validation, success and error states).
7. **Deliver:**
   - a short **final report**: what is done, what was actually tested (with the real measured Lighthouse scores), known limitations, and what the owner still has to do (SiteGround setup, SMTP, real reviews/photos, price confirmation);
   - the GitHub repo link;
   - a deploy preview or local run instructions;
   - the final screenshots (mobile and desktop) of every page;
   - a `README.md` in Latvian explaining:
     - how to replace a photo (file name list);
     - how to turn a sample review into a real one; what the `showReviews` and `galleryIllustrative` flags do;
     - how to create the `noreply@zaigasdarbnica.lv` mailbox in SiteGround and fill `config.php` (outside `public_html`) with the SMTP settings;
     - how to publish: GitHub → Actions → Deploy → „Run workflow”;
     - how to change a price;
     - how to set up SiteGround: create the site for zaigasdarbnica.lv, point the .lv domain (registered at a Latvian/NIC.LV-accredited registrar) to SiteGround nameservers, enable free SSL, create an SSH key in Site Tools and add the five `SG_*` secrets in GitHub (Settings → Secrets and variables → Actions);
     - how to test the contact form after deploy (and what to do if e-mails land in spam: SPF/DKIM in SiteGround Site Tools → Email → Authentication);
     - how to set up the Google Business Profile with the same name, address and phone.

---

# PART B - WEBSITE COPY (LATVIAN)

## Kopējie elementi visās lapās

**Logo galvenē:** `assets/logo-header-transparent.png` - „Zaiga” bez apakšvirsraksta. Pilnais logo ar saukli „Šūšana un adīšana” (`assets/logo-transparent.png`) der kājenei un og attēlam. Zīmola nosaukums tekstā: **Zaigas darbnīca**.

**Augšējā informācijas josla:** Tālavas iela 18, Alūksne · P.-S. 9:00-20:00 · +371 26 423 325

**Izvēlne:** Sākums · Pakalpojumi (Apģērbu remonts · Pielāgošana un pāršūšana · Individuālā šūšana · Adīšana pēc pasūtījuma · Aizkari un mājas tekstils) · Cenas · Par mani · Kontakti

[POGA: Zvanīt Zaigai → tel]

**Mobilā apakšējā josla:** [POGA: Zvanīt → tel] · [POGA: WhatsApp → WhatsApp]

**Kājene:**

Zaigas darbnīca - šūšana un adīšana Alūksnē. Apģērbu remonts un pielāgošana, individuālā šūšana, adīšana pēc pasūtījuma, aizkari un mājas tekstils.

Tālavas iela 18, Alūksne, LV-4301

Tālrunis un WhatsApp: +371 26 423 325 · E-pasts: zaiga.paula@inbox.lv

Pirmdiena-sestdiena 9:00-20:00, svētdienā slēgts

Klienti no Alūksnes, Gulbenes, Balviem un apkārtnes.

Meistare: Zaiga Lemeševska

© 2026 Zaigas darbnīca · Privātuma politika

**Cenu piezīme (zem katras cenu tabulas):** Cenas ir orientējošas sākumcenas. Precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma.

---

## 1. Sākums

**SEO title:** Šuvēja Alūksnē - šūšana un adīšana | Zaigas darbnīca

**Meta description:** Zaigas darbnīca Alūksnē - 20 gadu pieredze: apģērbu remonts, bikšu saīsināšana no 5 €, rāvējslēdzēja maiņa, individuālā šūšana un adīšana pēc pasūtījuma.

**URL:** /

### 1.1. Hero

[FOTO: hero-darbnica.webp - pilna platuma attēls labajā pusē: šujmašīna, dzijas kamoli pīta grozā, adījums, misiņa šķēres, mērlente, ziedi vāzē, gaišs lina audums ar ziediņu rakstu. Kreisā puse maigi izplūst krēmīgā fonā, uz kura stāv teksts.]

(Hero sadaļā logo nav - tas ir tikai galvenē: `assets/logo-header-transparent.png`, alt teksts: „Zaigas darbnīca - sākumlapa”.)

**H1:** Zaigas darbnīca Alūksnē

**Apakšteksts:** Apģērbu labošana un pielāgošana, individuālā šūšana un adīšana pēc pasūtījuma. 20 gadu pieredze, skaidra cena jau sākumā.

[POGA: Zvanīt Zaigai → tel] [POGA: Atsūtīt foto WhatsApp → WhatsApp]

**Mazā informācijas rinda zem pogām:** Tālavas iela 18, Alūksne · P.-S. 9:00-20:00 · Klienti arī no Gulbenes un Balviem

### 1.2. Pakalpojumi

**H2:** Ar ko varu Jums palīdzēt?

No maza ielāpa līdz ar rokām adītam džemperim - visu dara viena meistare, ar kuru varat runāt tieši.

**Apģērbu remonts**
Rāvējslēdzēja maiņa jakām, mēteļiem un biksēm, atirušas vīles, caurumi, oderes nomaiņa. Cenas no 3,50 €.
[POGA: Uzzināt vairāk → /apgerbu-remonts]

**Pielāgošana un pāršūšana**
Bikšu saīsināšana, kleitu iespīlēšana, piedurkņu garums, izmēra maiņa. Cenas no 5 €.
[POGA: Uzzināt vairāk → /apgerbu-parsusana]

**Individuālā šūšana**
Kleitas, svārki, bikses, svētku un izlaiduma tērpi pēc Jūsu izmēriem un ieceres.
[POGA: Uzzināt vairāk → /individuala-susana]

**Adīšana pēc pasūtījuma**
Ar rokām adītas zeķes, dūraiņi, cepures, šalles, džemperi un pledi, kā arī adītu lietu labošana.
[POGA: Uzzināt vairāk → /adisana-pec-pasutijuma]

**Aizkari un mājas tekstils**
Aizkaru šūšana un saīsināšana, galdauti un pārvalki. Varu atbraukt nomērīt logus.
[POGA: Uzzināt vairāk → /aizkaru-susana]

### 1.3. Kāpēc Zaiga

**H2:** Kāpēc klienti uztic savas lietas Zaigai?

**20 gadu pieredze.** Šuju un adu jau 20 gadus. Esmu strādājusi ar ļoti dažādiem audumiem, dzijām un apģērbiem, tāpēc uzņemos arī sarežģītus un netipiskus darbus.

**Skaidra cena jau sākumā.** Pirms darba pateikšu, cik tas maksās. Remontam vajadzīgie materiāli - rāvējslēdzējs, odere, diegi - jau ir iekļauti cenā.

**Gatavs sarunātajā laikā.** Gatavības datumu sarunājam uzreiz, un es to ievēroju. Ja vajag ātri, piezvaniet - steidzamus darbus var paveikt ātrāk.

**Kvalitāte, nevis daudzums.** Katram darbam veltu tik daudz laika, cik tam vajag. Vīles taisnas, diegs piemērotā krāsā, apģērbs izskatās kārtīgi.

**Godīgs padoms.** Ja labošana nav naudas vērta, pateikšu to atklāti.

**Viena meistare no sākuma līdz beigām.** Jūs runājat ar to pašu cilvēku, kas šuj vai ada Jūsu lietu.

### 1.4. Vērtības vēstījums

**H2:** Ne vienmēr vajag pirkt jaunu

Mīļākā jaka ar salauztu rāvējslēdzēju, kleita, kas vairs neder kā agrāk, vai labas bikses, kurām tikai jāsaīsina garums - bieži pietiek ar nelielu šūšanas darbu, lai lieta atkal kalpotu gadiem. Tas maksā tikai daļu no jaunas lietas cenas, un Jums paliek apģērbs, kas jau patīk.

[POGA: Atsūtīt foto un uzzināt cenu → WhatsApp]

### 1.5. Par Zaigu

[FOTO: Zaigas portrets darbnīcā, smaidoša, ar šujmašīnu vai adīkli]

**H2:** Iepazīsimies! Esmu Zaiga

Adīt iemācījos jau bērnībā - vakaros adījām kopā ar mammu, kamēr viņa stāstīja stāstus. Šūšanas amatu apguvu Rīgā, šūšanas skolā „Burda Rīga”, un nu jau 20 gadus šuju un adu citiem. Man patīk redzēt, kā apģērbs, kas gaidīja skapī, atkal tiek valkāts, vai kā klients pirmo reizi uzvelk tieši viņam uzadītu džemperi.

[POGA: Vairāk par mani → /par-mani]

### 1.6. Paveiktie darbi

**H2:** Ko radu Zaigas darbnīcā?

Labāk par vārdiem runā rezultāts.

[FOTO: 6 attēlu režģis ar parakstiem:]
- Ziemas jakai nomainīts rāvējslēdzējs
- Bikses saīsinātas pēc auguma
- Izlaiduma kleita pielāgota pa augumam
- Ar rokām adīts džemperis pēc pasūtījuma
- Adītas vilnas zeķes un dūraiņi
- Aizkari saīsināti līdz grīdai

### 1.7. Atsauksmes

**H2:** Ko saka klienti

(Piezīme izstrādātājam: visas piecas atsauksmes ir paraugi ar etiķeti „Paraugs” - skat. A11.)

> „Ziemas jakai saplīsa rāvējslēdzējs, un jau domāju pirkt jaunu. Zaiga to nomainīja dažu dienu laikā, un jaka izskatās kā jauna. Cena bija tāda, kādu pateica jau sākumā.”
> - Inga, Alūksne · rāvējslēdzēja maiņa

> „Meitai bija jāpielāgo izlaiduma kleita, un laika bija maz. Zaiga visu izdarīja laikā un ļoti rūpīgi - kleita sēdēja perfekti.”
> - Lauma, Gulbene · kleitas pielāgošana

> „Pasūtīju vilnas džemperi vīram. Kopā izvēlējāmies dziju un rakstu, un rezultāts pārspēja cerības. Silts un skaists.”
> - Dace, Alūksne · adīšana pēc pasūtījuma

> „Vienmēr pērku bikses, kas ir par garām. Tagad zinu, kur tās saīsināt - ātri, kārtīgi un par saprātīgu cenu.”
> - Andris, Balvi · bikšu saīsināšana

> „Zaiga atbrauca nomērīt logus un uzšuva aizkarus tieši pēc mūsu izmēriem. Viesistaba tagad izskatās pavisam citādāk.”
> - Ilze, Alūksnes novads · aizkaru šūšana

Ja jau esam strādājuši kopā, būšu pateicīga par Jūsu atsauksmi Google.

[POGA: Atstāt atsauksmi → Google uzņēmuma profila saite] (Piezīme izstrādātājam: rādīt tikai tad, kad konfigurācijā ir saite.)

### 1.8. Kā notiek sadarbība

**H2:** Kā pieteikt darbu? Tikai trīs soļi

1. **Sazinieties ar mani.** Piezvaniet vai atsūtiet foto WhatsApp uz +371 26 423 325 un īsi aprakstiet, kas jādara. Pateikšu, vai to var izdarīt un aptuveni cik tas maksās.
2. **Atnesiet lietu uz darbnīcu Tālavas ielā 18.** Kopā visu apskatīsim, ja vajag - pielaikosim, un sarunāsim cenu un gatavības datumu.
3. **Saņemiet gatavu darbu.** Sarunātajā dienā viss būs gatavs. Pirms nodošanas visu pārbaudu.

[POGA: Sazināties ar Zaigu → /kontakti]

### 1.9. Teritorija

**H2:** Šuvēja Alūksnē - arī Gulbenes un Balvu klientiem

Mana darbnīca atrodas Alūksnē, Tālavas ielā 18. Pie manis brauc klienti arī no Gulbenes, Balviem un apkārtējiem pagastiem. Ja braucat no tālienes, vispirms atsūtiet foto, lai jau iepriekš zinātu, vai darbu var izdarīt un cik tas maksās. Ja iespējams, atvediet vairākas lietas uzreiz.

### 1.10. Biežāk uzdotie jautājumi

**H2:** Biežāk uzdotie jautājumi

**Cik maksā apģērbu labošana?**
Cena atkarīga no apģērba un darba apjoma. Piemēram, bikšu saīsināšana maksā no 5 €, rāvējslēdzēja maiņa biksēm no 7 €, bet jakai no 16 €. Materiāli jau ir iekļauti cenā. Visas cenas atradīsiet lapā „Cenas”.

**Cik ilgi jāgaida?**
Termiņš atkarīgs no darba apjoma, tāpēc gatavības datumu sarunājam uzreiz. Ja vajag steidzami, piezvaniet - steidzamus darbus var paveikt ātrāk, un visu sarunāsim pa telefonu.

**Vai var uzzināt cenu pēc foto?**
Jā. Atsūtiet foto WhatsApp uz +371 26 423 325 un īsi aprakstiet, kas jādara. Pateikšu, vai to var izdarīt un aptuveni cik tas maksās, pirms braucat uz darbnīcu.

**Vai Jūs arī adāt pēc pasūtījuma?**
Jā. Uzadu zeķes, dūraiņus, cepures, šalles, džemperus, jakas, pledus un citas lietas, kā arī laboju adītus apģērbus.

**Vai pieņemat klientus no Gulbenes un Balviem?**
Protams. Darbnīca atrodas Alūksnē, Tālavas ielā 18, un pie manis brauc klienti arī no Gulbenes, Balviem un apkārtnes.

**Vai var atnest savu audumu vai dziju?**
Jā, protams. Varat atnest savu audumu vai dziju, vai arī kopā izvēlēsimies piemērotāko.

**Vai ir vērts labot lētu apģērbu?**
Godīgi pateikšu. Ja labošana maksātu gandrīz tikpat, cik jauna lieta, ieteikšu to nedarīt.

### 1.11. Noslēguma aicinājums

**H2:** Ir apģērbs, ko salabot, vai ideja, ko uzšūt vai uzadīt?

Piezvaniet vai uzrakstiet man. Pateikšu, vai to var izdarīt, cik tas maksās un kad būs gatavs.

Tālrunis un WhatsApp: +371 26 423 325 · Tālavas iela 18, Alūksne · Pirmdiena-sestdiena 9:00-20:00

[POGA: Zvanīt Zaigai → tel] [POGA: Rakstīt WhatsApp → WhatsApp]

---

## 2. Apģērbu remonts

**SEO title:** Apģērbu remonts Alūksnē | Zaigas darbnīca

**Meta description:** Apģērbu remonts un labošana Alūksnē: rāvējslēdzēja maiņa no 7 €, atirušas vīles, caurumi un ielāpi, oderes nomaiņa. Materiāli iekļauti cenā. Zvani 26 423 325.

**URL:** /apgerbu-remonts

**H1:** Apģērbu remonts un labošana Alūksnē

### 2.1. Ievads

[FOTO: ziemas jaka ar tikko nomainītu rāvējslēdzēju uz darba galda]

**Saplīsis rāvējslēdzējs? Iemīļotais apģērbs vēl var kalpot.**

Mētelis vēl kā jauns, bet rāvējslēdzējs vairs neaizveras. Džinsi sēž lieliski, bet vīle atirusi. Tas nenozīmē, ka jāpērk jauns. Labošana maksā tikai daļu no jaunas lietas cenas, un Jums paliek apģērbs, kas jau der un patīk.

[POGA: Atsūtīt foto WhatsApp → WhatsApp] [POGA: Zvanīt Zaigai → tel]

### 2.2. Ko es laboju

**H2:** Biežākie apģērbu remontdarbi

- **Rāvējslēdzēja maiņa** - jakām, mēteļiem, kombinezoniem, biksēm, svārkiem, džemperiem un kleitām
- **Atirušas vīles** - sānos, piedurknēs, kabatās un kāju starpā
- **Caurumi un plīsumi** - ielāpi un salabošana, piemeklējot piemērotu audumu un diegus
- **Oderes nomaiņa vai salabošana** - jakām, mēteļiem, žaketēm un svārkiem
- **Kabatas** - izdilušu vai caurumainu kabatu salabošana
- **Pogas, spiedpogas un āķīši** - piešūšana un nomaiņa
- **Bērnu apģērbs** - kombinezoni, bikses ar caurumiem ceļgalos, jakas
- **Darba apģērbs, āda un biezi audumi** - netipiskus darbus labprāt apskatīšu, atsūtiet foto

### 2.3. Ieguvumi

**H2:** Kāpēc labot, nevis pirkt jaunu?

**Ietaupiet naudu.** Jaunas ziemas jakas cena nereti ir vairāki simti eiro. Rāvējslēdzēja maiņa jakai pie manis maksā no 16 €, un jaunais rāvējslēdzējs jau ir iekļauts cenā.

**Saglabājiet apģērbu, kas jau der.** Jauns apģērbs ne vienmēr sēž tik labi kā iemīļotais vecais, un kvalitāte nereti ir pat sliktāka.

**Izskatās kārtīgi.** Profesionāli salabots apģērbs neizskatās „salabots”. Diegus un materiālus piemeklēju piemērotā krāsā.

**Kalpo ilgāk.** Kvalitatīvs rāvējslēdzējs un stipra vīle bieži vien kalpo ilgāk par oriģinālo.

**Godīgs vērtējums.** Ne katru bojājumu var salabot pilnīgi neredzami, tāpēc pirms darba atklāti izrunāsim, kāds būs rezultāts. Ja labošana nav izdevīga, pateikšu to uzreiz.

### 2.4. Cenas

**H2:** Apģērbu remonta cenas

| Darbs | Cena |
| --- | --- |
| Pogas piešūšana | no 0,50 € |
| Rāvējslēdzēja slīdņa nomaiņa | no 3 € |
| Cauruma salabošana vai ielāps | no 3,50 € |
| Atirušas vīles salabošana | no 4 € |
| Rāvējslēdzēja maiņa biksēm, svārkiem, džinsiem | no 7 € |
| Rāvējslēdzēja maiņa kleitai | no 8 € |
| Rāvējslēdzēja maiņa bērnu jakai | no 12 € |
| Oderes nomaiņa svārkiem | no 15 € |
| Rāvējslēdzēja maiņa jakai vai mētelim | no 16 € |
| Oderes nomaiņa jakai vai mētelim | no 23 € |

Materiāli (rāvējslēdzējs, odere, diegi) ir iekļauti cenā. Cenas ir orientējošas sākumcenas - precīzu cenu pateikšu, kad būšu apskatījusi apģērbu, vienmēr pirms darba sākuma.

[FOTO: 3 „pirms / pēc” remonta darbi]

### 2.5. Biežāk uzdotie jautājumi

**H2:** Jautājumi par apģērbu remontu

**Vai rāvējslēdzēju vienmēr vajag mainīt pilnībā?**
Ne vienmēr. Ja zobiņi ir veseli un vainojams tikai slīdnis, pietiek nomainīt slīdni - tas ir lētāk un ātrāk. Apskatīšu un pateikšu, kas Jūsu apģērbam der labāk.

**Vai man pašam jānopērk rāvējslēdzējs?**
Nē. Rāvējslēdzējus, oderi un diegus nodrošinu es, un tie jau ir iekļauti cenā.

**Vai var salabot ziemas jaku vai ādas jaku?**
Jā, labprāt uzņemos arī biezus un netipiskus apģērbus. Atsūtiet foto, un pateikšu, kā to var salabot.

**Vai var salabot caurumu tā, lai to nevarētu redzēt?**
Tas atkarīgs no auduma un vietas. Dažreiz cauruma gandrīz nevar redzēt, citreiz labāks risinājums ir glīts ielāps. Pirms darba izrunāsim, kāds būs rezultāts.

**Vai apģērbam jābūt izmazgātam?**
Jā, lūdzu, atnesiet tīru apģērbu. Tā var strādāt precīzāk, un darbs būs kvalitatīvāks.

**Vai varat salabot ātri?**
Jā, steidzamus darbus var paveikt ātrāk. Piezvaniet uz +371 26 423 325, un sarunāsim termiņu.

### 2.6. Aicinājums

**H2:** Nepametiet iemīļoto apģērbu skapī

Atsūtiet foto WhatsApp, un es pateikšu, vai to var salabot un cik tas maksās. Darbnīca atrodas Alūksnē, Tālavas ielā 18.

[POGA: Atsūtīt foto WhatsApp → WhatsApp] [POGA: Zvanīt Zaigai → tel]

**Saistītie pakalpojumi:** [Apģērbu pielāgošana un pāršūšana → /apgerbu-parsusana] · [Cenas → /cenas]

---

## 3. Apģērbu pielāgošana un pāršūšana

**SEO title:** Apģērbu pāršūšana, bikšu saīsināšana | Zaigas darbnīca

**Meta description:** Apģērbu pāršūšana un pielāgošana Alūksnē: bikšu saīsināšana no 5 €, kleitu iespīlēšana, piedurkņu saīsināšana, izmēra maiņa. Lai apģērbs der tieši Jums.

**URL:** /apgerbu-parsusana

**H1:** Apģērbu pielāgošana un pāršūšana Alūksnē

### 3.1. Ievads

[FOTO: pielaikošana - ar adatām nosprausts bikšu garums vai kleitas sāni]

**Lai apģērbs derētu Jums, nevis otrādi.**

Bikses vienmēr par garām. Kleita patīk, bet sānos par platu. Internetā pirkts apģērbs dzīvē izskatās kā maiss. Vaina nav Jūsu augumā - veikalu izmēri vienkārši nav šūti tieši Jums. Es pielāgoju apģērbu tā, lai tas sēž tieši tā, kā vajag.

[POGA: Pieteikt pielaikošanu → forma] [POGA: Zvanīt Zaigai → tel]

### 3.2. Ko es pielāgoju

**H2:** Ko var pielāgot un pāršūt

- **Bikšu un džinsu saīsināšana** - klasiskām, darba un sporta biksēm
- **Bikšu un svārku iespīlēšana vai palaišana** - viduklī, gurnos vai kājās
- **Kleitu pielāgošana** - iespīlēšana sānos, garuma maiņa, plecu un siksniņu korekcija
- **Piedurkņu saīsināšana** - krekliem, blūzēm, jakām un mēteļiem
- **Izmēra maiņa** - ja apģērbs kļuvis par lielu vai par mazu
- **Svētku, izlaiduma un kāzu tērpu pielāgošana** - kleitas un uzvalki pirms pasākuma
- **Pāršūšana** - vecāka apģērba pārveidošana mūsdienīgākā vai citam lietotājam

### 3.3. Ieguvumi

**H2:** Kā jutīsieties apģērbā, kas tiešām der

**Izskatīsieties kārtīgi un sakopti.** Bikses nesaburzās pie kurpēm, kleita neslīd, piedurknes beidzas tur, kur vajag.

**Jutīsieties ērti un droši.** Apģērbs nespiež un nav visu laiku jālabo.

**Izmantosiet to, kas jau ir skapī.** Lieta, ko nevalkājāt, jo tā nederēja, atkal kļūst par iemīļotāko.

**Vispirms pielaikojam.** Nogrieztu audumu nevar pielikt atpakaļ, tāpēc vispirms visu nospraužu un pārbaudu uz Jums.

**Gatavs laikā pasākumam.** Ja apģērbs vajadzīgs izlaidumam, kāzām vai svētkiem, pasakiet datumu uzreiz - plānosim tā, lai paliek laiks arī otrai pielaikošanai.

### 3.4. Cenas

**H2:** Pielāgošanas cenas

| Darbs | Cena |
| --- | --- |
| Bikšu vai džinsu saīsināšana | no 5 € |
| Svārku saīsināšana | no 6 € |
| Kleitas saīsināšana | no 7 € |
| Piedurkņu saīsināšana kreklam vai blūzei | no 7 € |
| Bikšu vai svārku iespīlēšana | no 9 € |
| Kleitas vai blūzes iespīlēšana | no 9 € |
| Piedurkņu saīsināšana jakai vai mētelim | no 13 € |
| Jakas vai mēteļa iespīlēšana | no 13 € |

Cenas ir orientējošas sākumcenas, materiāli iekļauti. Precīzu cenu pateikšu pēc pielaikošanas, pirms darba sākuma.

[FOTO: 3 „pirms / pēc” pielāgošanas darbi]

### 3.5. Biežāk uzdotie jautājumi

**H2:** Jautājumi par apģērbu pielāgošanu

**Vai man jānāk uz pielaikošanu?**
Vairumā gadījumu jā - tā var precīzi noteikt garumu un platumu. Bikšu saīsināšanai var arī atnest līdzi bikses, kuras der, vai pateikt precīzu garumu. Uz pielaikošanu ņemiet līdzi apavus, ar kuriem valkāsiet apģērbu.

**Vai var saīsināt džinsus?**
Jā. Džinsus saīsinu tā, lai mala izskatītos kārtīgi un piestāvētu apģērbam.

**Cik laikā pirms pasākuma jānes kleita?**
Ieteicams vismaz divas nedēļas pirms pasākuma, īpaši pavasarī pirms izlaidumiem, kad darba ir daudz. Ja laika ir mazāk, piezvaniet - steidzamus darbus var paveikt ātrāk.

**Vai var apģērbu padarīt lielāku?**
Dažreiz var, ja vīlēs ir pietiekami daudz rezerves auduma. Apskatīšu un godīgi pateikšu, vai tas ir iespējams.

**Vai var pielāgot internetā nopirktu apģērbu?**
Jā. Tas ir viens no biežākajiem darbiem - apģērbs patīk, bet izmērs neder. Atnesiet to, un kopā izlemsim, ko var izdarīt.

**Vai pielāgo arī kāzu kleitas?**
Jā. Svētku un kāzu tērpiem plānojam vairākas pielaikošanas, lai viss būtu tieši tā, kā vajag.

### 3.6. Aicinājums

**H2:** Apģērbs ir labs, tikai mazliet neder?

Piesakieties uz pielaikošanu Alūksnē, Tālavas ielā 18. Kopā izlemsim, kā to padarīt tādu, lai Jūs tajā justos labi.

[POGA: Pieteikt pielaikošanu → forma] [POGA: Zvanīt Zaigai → tel]

**Saistītie pakalpojumi:** [Apģērbu remonts → /apgerbu-remonts] · [Individuālā šūšana → /individuala-susana]

---

## 4. Individuālā šūšana

**SEO title:** Individuālā šūšana Alūksnē | Zaigas darbnīca

**Meta description:** Apģērbu šūšana pēc individuāla pasūtījuma Alūksnē: kleitas, svārki, bikses, izlaiduma un svētku tērpi, tautastērpi. Pēc Jūsu izmēriem un ieceres.

**URL:** /individuala-susana

**H1:** Individuālā šūšana un apģērbi pēc pasūtījuma Alūksnē

### 4.1. Ievads

[FOTO: uz manekena uzšūta kleita darbnīcā]

**Ja veikalā neatrodat īsto, varam to uzšūt.**

Izstaigāti visi veikali, bet kleitas, kāda ir Jūsu iedomā, tur nav. Vai arī ir, bet neder pa augumu. Individuāli šūts apģērbs top pēc Jūsu izmēriem, gaumes un vajadzībām - lai Jūs tajā justos ērti un skaisti.

[POGA: Pārrunāt savu ieceri → forma] [POGA: Zvanīt Zaigai → tel]

### 4.2. Ko es šuju

**H2:** Ko var uzšūt pēc pasūtījuma

- **Kleitas** - ikdienai, darbam un svētkiem
- **Izlaiduma tērpi** - kleitas un tērpi skolu un augstskolu izlaidumiem
- **Svētku un pasākumu tērpi** - kāzām, jubilejām, kristībām
- **Svārki, blūzes, bikses** - ja veikala izmēri Jums neder
- **Apģērbs pēc parauga** - ja ir iemīļots apģērbs, ko gribētos vēl vienu
- **Tautastērpi un skatuves tērpi** - individuāli un kolektīviem
- **Vīriešu un bērnu apģērbs**

Uzņemos arī netipiskus pasūtījumus - pastāstiet savu ideju, un izdomāsim, kā to īstenot.

### 4.3. Process

**H2:** No ieceres līdz gatavam apģērbam

1. **Konsultācija.** Izrunājam, ko vēlaties, kad tas vajadzīgs un kāds ir budžets. Varat atnest bildes, skici vai līdzīgu apģērbu.
2. **Izmēri un audums.** Noņemu precīzus izmērus. Varat atnest savu audumu vai arī kopā izvēlēsimies piemērotāko.
3. **Cena un termiņš.** Pirms darba sākuma sarunājam cenu un gatavības datumu.
4. **Pielaikošana.** Kad apģērbs ir sašūts, to pielaikojam un vajadzības gadījumā pielāgojam, līdz tas sēž tā, kā vajag.
5. **Gatavs apģērbs.** Saņemiet apģērbu, kas uzšūts tieši Jums, sarunātajā laikā.

### 4.4. Ieguvumi

**H2:** Apģērbs, kas radīts ar domu par Jums

**Der Jūsu augumam, nevis izmēru tabulai.** Apģērbs top pēc Jūsu izmēriem, tāpēc tas sēž tā, kā veikalā pirkts apģērbs reti sēž.

**Tieši tāds, kādu vēlaties.** Jūs izvēlaties modeli, audumu, garumu un detaļas.

**Unikāls.** Pasākumā neviens cits nebūs tādā pašā kleitā.

**Kvalitāte, kas kalpo.** Rūpīgi apstrādātas vīles un labs audums nozīmē, ka apģērbs kalpos ilgi.

**Mierīgs prāts pirms pasākuma.** Termiņu sarunājam iepriekš, un pielaikošanas plānojam tā, lai ir laiks visu pabeigt.

### 4.5. Cenas

**H2:** Cik maksā apģērbs pēc pasūtījuma?

| Darbs | Cena |
| --- | --- |
| Svārku šūšana | no 40 € |
| Bikšu šūšana | no 50 € |
| Kleitas šūšana | no 65 € |
| Svētku, kāzu un sarežģītāki tērpi | pēc vienošanās |

Norādīta darba cena; audums - Jūsu vai iegādājams atsevišķi. Galīgo cenu ietekmē modelis, detaļas un pielaikošanu skaits - to pateikšu pēc konsultācijas, vienmēr pirms darba sākuma.

### 4.6. Biežāk uzdotie jautājumi

**H2:** Jautājumi par individuālo šūšanu

**Vai var uzšūt apģērbu pēc bildes?**
Jā, bilde ir labākais veids, kā parādīt savu ideju. Konsultācijā izrunāsim, kā to pielāgot tieši Jums.

**Vai varu atnest savu audumu?**
Jā, protams. Ja vēlaties, palīdzēšu arī izvēlēties piemērotu audumu un aptuveni izrēķināt, cik daudz tā vajag.

**Cik laikā iepriekš jāpiesakās?**
Ieteicams pieteikties vismaz 3-4 nedēļas pirms pasākuma, lai pietiek laika arī pielaikošanām. Pavasarī pirms izlaidumiem - vēl agrāk. Ja laika ir mazāk, piezvaniet - iespējams, varēsim paspēt.

**Vai var uzšūt tādu pašu apģērbu, kāds man jau ir?**
Bieži vien var. Atnesiet apģērbu, un es apskatīšu, kā to varētu atkārtot.

**Vai nepieciešama pielaikošana?**
Jā, individuāli šūtam apģērbam parasti ir viena vai vairākas pielaikošanas, lai tas sēdētu nevainojami.

### 4.7. Aicinājums

**H2:** Jums ir ideja jaunam apģērbam?

Piesakieties konsultācijai darbnīcā Alūksnē. Izrunāsim Jūsu ideju, termiņu un cenu, un tikai tad kopā izlemsim, kā turpināt.

[POGA: Pārrunāt savu ieceri → forma] [POGA: Zvanīt Zaigai → tel]

**Saistītie pakalpojumi:** [Apģērbu pielāgošana → /apgerbu-parsusana] · [Adīšana pēc pasūtījuma → /adisana-pec-pasutijuma]

---

## 5. Adīšana pēc pasūtījuma

**SEO title:** Adīšana pēc pasūtījuma Alūksnē | Zaigas darbnīca

**Meta description:** Ar rokām adītas zeķes no 16 €, dūraiņi, cepures, šalles, džemperi un pledi pēc pasūtījuma Alūksnē, kā arī adītu apģērbu labošana. Adītāja ar 20 gadu pieredzi.

**URL:** /adisana-pec-pasutijuma

**H1:** Adīšana pēc pasūtījuma Alūksnē

### 5.1. Ievads

[FOTO: rokas ada vilnas zeķi, blakus dziju kamoli]

**Silts adījums, kas radīts tieši Jums.**

Veikala džemperis pirmajā ziemā sabumbulojas, zeķes izdilst, un īsti siltu, kvalitatīvu adījumu atrast ir grūti. Ar rokām adīta lieta ir cits stāsts: tā ir silta, kalpo gadiem un top tieši Jums - Jūsu izmērā, Jūsu krāsā un ar Jūsu izvēlētu rakstu. Adu kopš bērnības un uzadīšu to, ko vēlaties.

[POGA: Pasūtīt adījumu → forma] [POGA: Zvanīt Zaigai → tel]

### 5.2. Ko es adu

**H2:** Ko varu uzadīt

- **Zeķes** - vilnas zeķes ikdienai, ziemai, mājām un dāvināšanai
- **Dūraiņi un cimdi** - arī ar latviskiem rakstiem
- **Cepures un šalles** - Jūsu gaumei, izmēram un sezonai
- **Džemperi un jakas** - sievietēm, vīriešiem un bērniem
- **Pledi un spilveni** - mājām un dāvināšanai
- **Bērnu adījumi** - zeķītes, cepurītes, jaciņas, komplekti jaundzimušajiem
- **Adījumi pēc parauga vai bildes** - ja ir ideja vai iemīļota lieta, ko gribētos vēl vienu

Uzņemos arī netipiskus pasūtījumus - idejas izdomāsim kopā.

### 5.3. Adītu lietu labošana

**H2:** Adītu apģērbu labošana

Arī iemīļotu adītu lietu bieži var izglābt:

- caurumu un izdilušu vietu salabošana džemperos un zeķēs
- noirušu valdziņu atjaunošana
- piedurkņu un garuma maiņa adītiem apģērbiem
- apdares, apkakļu un pogu nomaiņa

### 5.4. Kā pasūtīt

**H2:** No idejas līdz adījumam

1. **Izrunājam ideju.** Ko vēlaties, kam tas būs un kad vajadzīgs. Varat parādīt bildi vai līdzīgu lietu.
2. **Izvēlamies dziju un rakstu.** Varat atnest savu dziju vai kopā izvēlēsimies piemērotāko - vilnu, kokvilnu vai jauktu.
3. **Noņemu izmērus.** Lai džemperis vai jaka derētu tieši Jums.
4. **Sarunājam cenu un termiņu.** Pirms darba sākuma, lai nav pārsteigumu.
5. **Saņemiet gatavu adījumu.** Ja vajag, darba gaitā pielaikojam.

### 5.5. Ieguvumi

**H2:** Kāpēc ar rokām adīts?

**Siltums un kvalitāte.** Laba dzija un rūpīgs adījums kalpo gadiem un nesabumbulojas pēc pirmās ziemas.

**Tieši Jūsu izmērā.** Piedurknes pareizā garumā, džemperis nav ne par īsu, ne par platu.

**Jūsu gaumē.** Jūs izvēlaties krāsu, dziju un rakstu - arī latviskus rakstus.

**Dāvana ar dvēseli.** Ar rokām adītas zeķes, dūraiņi vai pleds ir īpaša dāvana Ziemassvētkiem, jubilejām un kristībām.

### 5.6. Cenas

**H2:** Adīšanas cenas

| Adījums | Cena |
| --- | --- |
| Bērnu zeķes | no 8 € |
| Zeķu pāris | no 16 € |
| Cimdu vai dūraiņu pāris | no 18 € |
| Cepure | no 18 € |
| Šalle | no 22 € |
| Bērnu jaciņa | no 40 € |
| Džemperis | no 65 € |
| Adīta apģērba labošana | no 5 € |
| Pledi un citi adījumi | pēc vienošanās |

Cena atkarīga no izmēra, raksta un dzijas - to saskaņosim pirms darba. Varat atnest arī savu dziju.

[FOTO: 4-6 adījumi - džemperis, zeķes, dūraiņi ar latviskiem rakstiem, pleds]

### 5.7. Biežāk uzdotie jautājumi

**H2:** Jautājumi par adīšanu

**Cik ilgi jāgaida adīts džemperis?**
Tas atkarīgs no izmēra un raksta. Termiņu sarunāsim jau sākumā, lai zinātu, kad tas būs gatavs. Ja adījums vajadzīgs dāvanai konkrētā datumā, pasakiet to uzreiz.

**Vai varu atnest savu dziju?**
Jā. Ja nezināt, cik dzijas vajag, pateikšu to pirms pirkšanas.

**Vai var uzadīt pēc bildes?**
Jā. Atsūtiet bildi WhatsApp uz +371 26 423 325, un izrunāsim, kā to uzadīt Jūsu izmērā.

**Vai adāt arī latviskos rakstus?**
Jā, dūraiņos, zeķēs un džemperos var adīt arī latviskos rakstus. Izvēlēsimies tos kopā.

**Vai var pasūtīt adījumu dāvanai?**
Jā. Ja zināt apdāvinātā izmēru un gaumi, uzadīšu dāvanu un pateikšu, kad tā būs gatava.

**Vai varat salabot adītu džemperi?**
Jā. Caurumus, izdilušas vietas un noirušus valdziņus var salabot. Atsūtiet foto, un pateikšu, kā to var izdarīt.

### 5.8. Aicinājums

**H2:** Vēlaties kaut ko siltu un adītu tieši Jums?

Pastāstiet savu ideju - uzadīšu to ar rūpību, kā to daru jau kopš bērnības. Darbnīca atrodas Alūksnē, Tālavas ielā 18.

[POGA: Pasūtīt adījumu → forma] [POGA: Rakstīt WhatsApp → WhatsApp]

**Saistītie pakalpojumi:** [Individuālā šūšana → /individuala-susana] · [Cenas → /cenas]

---

## 6. Aizkari un mājas tekstils

**SEO title:** Aizkaru šūšana un saīsināšana Alūksnē | Zaigas darbnīca

**Meta description:** Aizkaru šūšana un saīsināšana Alūksnē no 4 €/m, aizkaru lentes piešūšana, galdauti un pārvalki pēc Jūsu izmēriem. Varu atbraukt nomērīt logus.

**URL:** /aizkaru-susana

**H1:** Aizkaru un mājas tekstila šūšana Alūksnē

### 6.1. Ievads

[FOTO: gaiši lina aizkari, kas precīzi sniedzas līdz grīdai, saulainā istabā]

**Lai aizkari derētu tieši Jūsu mājai.**

Veikalā nopirktie aizkari ir par gariem, par īsiem vai nav tādā platumā, kā Jūsu logam vajag. Savukārt specializētu salonu cenas mēdz pārsteigt. Es uzšuju un pielāgoju aizkarus un citus mājas tekstilus tā, lai tie der tieši Jūsu mājai, un cenu pateikšu jau sākumā. Ja vēlaties, atbraukšu un nomērīšu logus pati.

[POGA: Pieteikt logu nomērīšanu → forma] [POGA: Zvanīt Zaigai → tel]

### 6.2. Ko es šuju

**H2:** Aizkari un mājas tekstils pēc izmēra

- **Aizkaru šūšana** pēc Jūsu logu izmēriem
- **Aizkaru saīsināšana** un apšūšana veikalā pirktiem aizkariem
- **Aizkaru lentes piešūšana** un aizkaru pārtaisīšana citam stienim vai sliedei
- **Galdauti un galda celiņi** - ikdienai un svētkiem
- **Pārvalki** - spilveniem, krēsliem, soliem un mēbelēm
- **Gultas veļa** un citi tekstili nestandarta izmēros
- **Mājas tekstila labošana** - atirušas malas, caurumi, saplēstas cilpas

Varat atnest savu audumu vai arī kopā izvēlēsimies piemērotāko.

### 6.3. Logu nomērīšana

**H2:** Atbraukšu nomērīt logus

Nezināt precīzus izmērus? Atbraukšu pie Jums, nomērīšu logus un palīdzēšu izvēlēties aizkaru garumu un krokojumu. Tā nebūs jāuztraucas par kļūdām izmēros. Piezvaniet uz +371 26 423 325, lai sarunātu laiku.

Ja vēlaties logus nomērīt paši:

1. **Platums.** Nomēriet aizkaru stieņa vai sliedes garumu, nevis loga platumu.
2. **Garums.** Mēriet no stieņa vai sliedes līdz vietai, kur aizkaram jābeidzas - līdz palodzei, līdz grīdai vai tikko pieskaroties grīdai.
3. **Izskats.** Pasakiet, vai vēlaties gludus vai bagātīgi krokotus aizkarus - no tā atkarīgs auduma daudzums.

### 6.4. Cenas

**H2:** Aizkaru un mājas tekstila cenas

| Darbs | Cena |
| --- | --- |
| Malu apstrāde ar overloku | no 1,50 € / m |
| Aizkaru lentes piešūšana | no 3 € / m |
| Veikalā pirktu aizkaru saīsināšana | no 4 € / m |
| Aizkaru šūšana pēc izmēriem | pēc izmēriem un auduma |
| Galdauti, pārvalki un cits tekstils | pēc izmēriem un auduma |

Materiāli (lente, diegi) iekļauti. Cenas ir orientējošas sākumcenas - precīzu cenu pateikšu, kad zināšu izmērus un audumu.

[FOTO: 3 uzšūti vai pielāgoti aizkari un galdauts]

### 6.5. Biežāk uzdotie jautājumi

**H2:** Jautājumi par aizkaru šūšanu

**Vai var saīsināt aizkarus, kas pirkti veikalā?**
Jā, tas ir viens no biežākajiem darbiem. Pasakiet, cik garus aizkarus vajag, vai atnesiet tos jau ar atzīmētu garumu.

**Vai atbraucat nomērīt logus?**
Jā. Piezvaniet uz +371 26 423 325, un sarunāsim laiku, kad atbraukt.

**Cik daudz auduma vajag aizkariem?**
Tas atkarīgs no loga lieluma un no tā, cik krokainus aizkarus vēlaties. Pasakiet izmērus, un es aptuveni izrēķināšu, cik auduma pirkt.

**Vai var uzšūt tekstilu nestandarta izmērā?**
Jā. Galdauts apaļam galdam, pārvalks vecam krēslam vai gultas veļa nestandarta matracim - pasakiet izmērus, un es uzšūšu.

### 6.6. Aicinājums

**H2:** Aizkariem vajag īsto garumu?

Atsūtiet loga izmērus vai foto WhatsApp, vai piezvaniet, lai sarunātu logu nomērīšanu.

[POGA: Pieteikt logu nomērīšanu → forma] [POGA: Zvanīt Zaigai → tel]

**Saistītie pakalpojumi:** [Individuālā šūšana → /individuala-susana] · [Cenas → /cenas]

---

## 7. Cenas

**SEO title:** Šūšanas un adīšanas cenas Alūksnē | Zaigas darbnīca

**Meta description:** Cenrādis: bikšu saīsināšana no 5 €, rāvējslēdzēja maiņa no 7 €, aizkaru saīsināšana no 4 €/m, adītas zeķes no 16 €. Šuvēja un adītāja Alūksnē.

**URL:** /cenas

**H1:** Šūšanas un adīšanas pakalpojumu cenas

### 7.1. Ievads

Šeit atradīsiet biežāko darbu sākumcenas. Katrs apģērbs un pasūtījums ir atšķirīgs, tāpēc precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma. Ja vēlaties, atsūtiet foto WhatsApp, un pateikšu aptuveno cenu jau iepriekš.

[POGA: Atsūtīt foto un uzzināt cenu → WhatsApp]

### 7.2. Apģērbu remonts

**H2:** Apģērbu remonts

| Darbs | Cena |
| --- | --- |
| Pogas piešūšana | no 0,50 € |
| Rāvējslēdzēja slīdņa nomaiņa | no 3 € |
| Cauruma salabošana vai ielāps | no 3,50 € |
| Atirušas vīles salabošana | no 4 € |
| Rāvējslēdzēja maiņa biksēm, svārkiem, džinsiem | no 7 € |
| Rāvējslēdzēja maiņa kleitai | no 8 € |
| Rāvējslēdzēja maiņa bērnu jakai | no 12 € |
| Oderes nomaiņa svārkiem | no 15 € |
| Rāvējslēdzēja maiņa jakai vai mētelim | no 16 € |
| Oderes nomaiņa jakai vai mētelim | no 23 € |

### 7.3. Pielāgošana un pāršūšana

**H2:** Apģērbu pielāgošana un pāršūšana

| Darbs | Cena |
| --- | --- |
| Bikšu vai džinsu saīsināšana | no 5 € |
| Svārku saīsināšana | no 6 € |
| Kleitas saīsināšana | no 7 € |
| Piedurkņu saīsināšana kreklam vai blūzei | no 7 € |
| Bikšu vai svārku iespīlēšana | no 9 € |
| Kleitas vai blūzes iespīlēšana | no 9 € |
| Piedurkņu saīsināšana jakai vai mētelim | no 13 € |
| Jakas vai mēteļa iespīlēšana | no 13 € |

### 7.4. Individuālā šūšana

**H2:** Individuālā šūšana

| Darbs | Cena |
| --- | --- |
| Svārku šūšana | no 40 € |
| Bikšu šūšana | no 50 € |
| Kleitas šūšana | no 65 € |
| Svētku, kāzu un sarežģītāki tērpi | pēc vienošanās |

Individuālajai šūšanai norādīta darba cena; audums - Jūsu vai iegādājams atsevišķi.

### 7.5. Adīšana

**H2:** Adīšana pēc pasūtījuma

| Adījums | Cena |
| --- | --- |
| Bērnu zeķes | no 8 € |
| Zeķu pāris | no 16 € |
| Cimdu vai dūraiņu pāris | no 18 € |
| Cepure | no 18 € |
| Šalle | no 22 € |
| Bērnu jaciņa | no 40 € |
| Džemperis | no 65 € |
| Adīta apģērba labošana | no 5 € |
| Pledi un citi adījumi | pēc vienošanās |

### 7.6. Aizkari un mājas tekstils

**H2:** Aizkari un mājas tekstils

| Darbs | Cena |
| --- | --- |
| Malu apstrāde ar overloku | no 1,50 € / m |
| Aizkaru lentes piešūšana | no 3 € / m |
| Veikalā pirktu aizkaru saīsināšana | no 4 € / m |
| Aizkaru šūšana pēc izmēriem | pēc izmēriem un auduma |
| Galdauti, pārvalki un cits tekstils | pēc izmēriem un auduma |

### 7.7. Svarīgi zināt

**H2:** Svarīgi zināt par cenām

- Visas cenas ir orientējošas sākumcenas. Precīzu cenu pateikšu pirms darba sākuma.
- Remontam un pielāgošanai vajadzīgie materiāli (rāvējslēdzēji, odere, diegi, lente) ir iekļauti cenā.
- Individuālajai šūšanai un adīšanai cena atkarīga no auduma vai dzijas - to saskaņosim pirms darba. Varat atnest arī savu.
- Steidzami darbi ir iespējami - piezvaniet, un sarunāsim termiņu.

### 7.8. Biežāk uzdotie jautājumi

**H2:** Jautājumi par cenām

**Vai cenrādī norādītā ir galīgā cena?**
Tā ir sākumcena. Precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma, lai nav pārsteigumu.

**Vai var uzzināt cenu pēc foto?**
Jā. Atsūtiet foto un īsu aprakstu WhatsApp uz +371 26 423 325, un pateikšu aptuveno cenu.

**Vai materiāli ir iekļauti cenā?**
Remontam un pielāgošanai - jā. Individuālajai šūšanai un adīšanai audumu vai dziju saskaņosim pirms darba.

**Nezināt, cik izmaksās Jūsu darbs?** Piezvaniet vai atsūtiet foto - pateikšu.

[POGA: Zvanīt Zaigai → tel] [POGA: Rakstīt WhatsApp → WhatsApp]

---

## 8. Par mani

**SEO title:** Par mani - Zaiga Lemeševska | Zaigas darbnīca

**Meta description:** Iepazīstiet Zaigu Lemeševsku - šuvēju un adītāju Alūksnē ar 20 gadu pieredzi, mācījusies šūšanas skolā „Burda Rīga”. Kvalitāte par demokrātisku cenu.

**URL:** /par-mani

**H1:** Zaiga Lemeševska - šuvēja un adītāja, kurai rūp Jūsu lietas

[FOTO: Zaigas portrets darbnīcā, smaidoša, ar šujmašīnu vai adīkli]

### 8.1. Mans stāsts

**H2:** Kā es kļuvu par šuvēju un adītāju

Mana mīlestība pret rokdarbiem sākās bērnībā. Vakaros sēdējām kopā ar mammu un adījām, kamēr viņa stāstīja stāstus. Tie vakari man joprojām ir sirdī - un adīt un šūt es turpinu arī šodien.

Šūšanas amatu apguvu Rīgā, šūšanas skolā „Burda Rīga”. Kopš tā laika šuju un adu jau 20 gadus - un joprojām labprāt mācos, jo teorija un jaunas tehnikas palīdz strādāt vēl precīzāk.

Šodien strādāju savā darbnīcā Alūksnē, Tālavas ielā 18, un pie manis brauc klienti no Alūksnes, Gulbenes, Balviem un apkārtnes. Man svarīgāka ir kvalitāte, nevis daudzums: katram darbam veltu tik daudz laika, cik tam vajag, un cenas paturu demokrātiskas.

### 8.2. Kā es strādāju

**H2:** Kā es strādāju

**Vispirms uzklausīt.** Katra lieta un katrs cilvēks ir atšķirīgs. Pirms ķeros pie darba, noskaidroju, kā Jūs to valkāsiet un kādu rezultātu vēlaties.

**Skaidra cena un termiņš.** Cenu un gatavības datumu pateikšu, pirms sāku darbu.

**Nedaudz vairāk, nekā sarunāts.** Esmu gatava pārbaudīt vēl vienu vīli, piemeklēt piemērotāku diegu un atrast risinājumu arī tad, ja sākumā šķiet, ka tāda nav.

**Uzticamība.** Darbu nododu sarunātajā laikā un tādā kvalitātē, kādu pati gribētu saņemt.

**Godīgums.** Ja labošana nav naudas vērta, to pateikšu uzreiz.

### 8.3. Kas sagādā prieku

**H2:** Kas man šajā darbā sagādā vislielāko prieku

Vislielāko prieku man sagādā brīdis, kad klients uzvelk apģērbu un smaida, jo tas beidzot der. Vai kad kāds pirmo reizi uzvelk tieši viņam uzadītu džemperi un saka: „Tieši tādu es gribēju.”

### 8.4. Pieredze

**H2:** Pieredze un prasmes

- **20 gadu pieredze** šūšanā, apģērbu labošanā, pielāgošanā un adīšanā
- **Izglītība:** šūšanas skola „Burda Rīga”
- **Adīšana kopš bērnības** - džemperi, zeķes, dūraiņi, arī latviskie raksti
- **Plašs darbu klāsts** - no maza ielāpa līdz kāzu kleitai, tautastērpam vai adītam pledam
- **Nepārtraukta mācīšanās** - jaunas tehnikas un teorētiskās zināšanas

### 8.5. Aicinājums

**H2:** Iepazīsimies klātienē?

Atnesiet savu apģērbu vai pastāstiet par savu ideju. Labprāt uzklausīšu un pateikšu, kā varu palīdzēt.

[POGA: Sazināties ar Zaigu → /kontakti] [POGA: Zvanīt Zaigai → tel]

---

## 9. Kontakti

**SEO title:** Kontakti - šuvēja Alūksnē | Zaigas darbnīca

**Meta description:** Zaigas darbnīca, Tālavas iela 18, Alūksne. Tālrunis un WhatsApp +371 26 423 325, zaiga.paula@inbox.lv. Pirmdiena-sestdiena 9:00-20:00.

**URL:** /kontakti

**H1:** Sazinieties ar Zaigu Lemeševsku

### 9.1. Ievads

Ir apģērbs, ko gribētu salabot vai pielāgot, vai ideja, ko uzšūt vai uzadīt? Piezvaniet, uzrakstiet WhatsApp vai atsūtiet foto. Atbildēšu, cik drīz vien varēšu.

### 9.2. Kontaktinformācija

**H2:** Kontaktinformācija

**Zaigas darbnīca** - meistare Zaiga Lemeševska

**Tālrunis:** +371 26 423 325

**WhatsApp:** +371 26 423 325 - ērtākais veids, kā atsūtīt foto

**E-pasts:** zaiga.paula@inbox.lv

**Darbnīca:** Tālavas iela 18, Alūksne, LV-4301

[POGA: Zvanīt Zaigai → tel] [POGA: Rakstīt WhatsApp → WhatsApp] [POGA: Rakstīt e-pastu → e-pasts]

### 9.3. Darba laiks

**H2:** Darba laiks

| Diena | Laiks |
| --- | --- |
| Pirmdiena-sestdiena | 9:00-20:00 |
| Svētdiena | Slēgts |

Pirms ierašanās, lūdzu, piezvaniet, lai Jums nebūtu jāgaida.

### 9.4. Kā atrast

**H2:** Kā atrast darbnīcu

[KARTE]

Darbnīca atrodas Alūksnē, Tālavas ielā 18. Pirms braucat, lūdzu, piezvaniet. Auto varat atstāt pie mājas, un iekšā nāciet pa mājas durvīm.

[POGA: Atvērt Google Maps → kartes saite]

### 9.5. Apkalpotās pilsētas

**H2:** Klienti no Alūksnes, Gulbenes un Balviem

Darbnīca atrodas Alūksnē, bet pie manis brauc klienti arī no Gulbenes, Balviem un apkārtējiem pagastiem.

- **Alūksne un Alūksnes novads** - darbnīca ir tepat Alūksnē
- **Gulbene un Gulbenes novads** - aptuveni 50 km līdz Alūksnei
- **Balvi un Balvu novads** - aptuveni 50 km līdz Alūksnei

**Padoms, ja braucat no tālienes:** vispirms atsūtiet foto WhatsApp, lai jau iepriekš zinātu, vai darbu var izdarīt un cik tas maksās. Ja iespējams, atvediet vairākas lietas uzreiz.

### 9.6. Kontaktforma

**H2:** Uzrakstiet man

Aprakstiet, kas jādara, un, ja varat, pievienojiet foto. Atbildēšu ar aptuvenu cenu un laiku.

**Formas lauki:**

- **Vārds** (obligāts)
- **Tālrunis** (obligāts)
- **E-pasts** (nav obligāts)
- **Pakalpojums** (izvēlne): Apģērbu remonts · Pielāgošana un pāršūšana · Individuālā šūšana · Adīšana pēc pasūtījuma · Aizkari un mājas tekstils · Logu nomērīšana · Cits
- **No kurienes esat?** (izvēlne): Alūksne · Gulbene · Balvi · Cita vieta
- **Kas jādara?** (teksta lauks, obligāts) - vietturis: „Piemēram: ziemas jakai jānomaina rāvējslēdzējs”
- **Kad tas vajadzīgs?** (nav obligāts) - vietturis: „Piemēram: līdz izlaidumam 15. jūnijā”
- **Pievienot foto** (nav obligāts)
- **Piekrišana** (obligāts): „Piekrītu, ka mani dati tiek izmantoti, lai atbildētu uz manu pieprasījumu.” (saite uz privātuma politiku)

[POGA: Nosūtīt]

**Kļūdu ziņas pie laukiem:** „Lūdzu, ierakstiet savu vārdu.” · „Lūdzu, ierakstiet tālruņa numuru.” · „Lūdzu, īsi aprakstiet, kas jādara.” · „Lūdzu, apstipriniet piekrišanu.”

**Ziņa pēc sekmīgas nosūtīšanas:** Paldies! Jūsu ziņa ir saņemta. Atbildēšu, cik drīz vien varēšu.

**Ziņa, ja rodas kļūda:** Ziņu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai piezvaniet uz +371 26 423 325.

### 9.7. Pirms ierašanās

**H2:** Pirms ierašanās

- Atnesiet apģērbu tīru un izmazgātu.
- Uz pielaikošanu ņemiet līdzi apavus, ar kuriem valkāsiet apģērbu.
- Ja lieta vajadzīga konkrētā datumā, pasakiet to uzreiz.

---

## 10. Privātuma politika

**SEO title:** Privātuma politika | Zaigas darbnīca

**Meta description:** Kā Zaigas darbnīca apstrādā kontaktformā un saziņā sniegtos personas datus.

**URL:** /privatuma-politika

**H1:** Privātuma politika

**Pārzinis.** Personas datus apstrādā Zaiga Lemeševska (Zaigas darbnīca), Tālavas iela 18, Alūksne, LV-4301, e-pasts zaiga.paula@inbox.lv, tālrunis +371 26 423 325.

**Kādus datus apstrādāju.** Vārdu, tālruņa numuru, e-pasta adresi, ziņas saturu un fotogrāfijas, ko nosūtāt kontaktformā, pa e-pastu, WhatsApp vai telefoniski.

**Kāpēc.** Lai atbildētu uz Jūsu pieprasījumu, sagatavotu cenas novērtējumu un izpildītu pasūtījumu.

**Tiesiskais pamats.** Jūsu piekrišana un pasākumi, ko veic pēc Jūsu pieprasījuma pirms līguma noslēgšanas un tā izpildei (Vispārīgās datu aizsardzības regulas 6. panta 1. punkta a) un b) apakšpunkts).

**Cik ilgi.** Datus glabāju tikai tik ilgi, cik nepieciešams, lai atbildētu uz pieprasījumu un izpildītu pasūtījumu, un pēc tam tos dzēšu, ja vien likums neprasa tos glabāt ilgāk.

**Kam datus nododu.** Datus nepārdodu un nenododu trešajām personām mārketinga nolūkos. Tehniski tie var tikt apstrādāti mājaslapas mitināšanas un e-pasta pakalpojumu sniedzēju sistēmās tikai ziņas nogādāšanai.

**Sīkdatnes.** Mājaslapa izmanto tikai tās darbībai nepieciešamās sīkdatnes. Apmeklējumu statistikas sīkdatnes tiek izmantotas tikai tad, ja tām piekrītat.

**Jūsu tiesības.** Jūs varat pieprasīt piekļuvi saviem datiem, to labošanu vai dzēšanu, kā arī atsaukt piekrišanu, rakstot uz zaiga.paula@inbox.lv. Ja uzskatāt, ka Jūsu dati apstrādāti nepareizi, varat iesniegt sūdzību Datu valsts inspekcijā (www.dvi.gov.lv).

**Spēkā no:** 2026. gada [publicēšanas datums].

---

## 11. Sīkdatņu josla (tikai ja ieslēgta analītika)

Mājaslapa izmanto sīkdatnes apmeklējumu statistikai, lai to uzlabotu. Varat tām piekrist vai atteikties.

[POGA: Piekrītu] [POGA: Atteikties] · Saite: Privātuma politika

---

## 12. 404 lapa

**SEO title:** Lapa nav atrasta | Zaigas darbnīca

**H1:** Šī lapa nav atrasta

Iespējams, saite ir mainījusies. Apskatiet pakalpojumus vai sazinieties ar mani tieši.

[POGA: Uz sākumlapu → /] [POGA: Zvanīt Zaigai → tel]
