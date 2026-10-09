# Zaigas darbnīca - zaigasdarbnica.lv

Mājaslapa Zaigas Lemeševskas šūšanas un adīšanas darbnīcai Alūksnē.
Uzbūvēta ar [Astro](https://astro.build) (statiska lapa), bez smagiem ietvariem.

> **Statuss:** gatava **sākumlapa** un kopīgās daļas (galvene, izvēlne, apakšējā josla, kājene).
> Pārējās lapas (pakalpojumi, cenas, par mani, kontakti, privātuma politika, 404) tiks veidotas
> pēc tam, kad īpašniece apstiprinās sākumlapas dizainu. Ekrānuzņēmumi: mape `screenshots/`.
> Dizaina lēmumi un atklātie jautājumi: `DESIGN.md`.

---

## Kā palaist savā datorā

Vajag [Node.js](https://nodejs.org) 22 vai jaunāku.

```bash
npm install        # vienreiz
npm run dev        # izstrādes režīms: http://localhost:4321
npm run build      # gatavā lapa mapē dist/
npm run preview    # apskatīt dist/ pārlūkā
npm run check      # pārbaudīt kodu (kļūdas)
```

Katrā `git push` GitHub automātiski palaiž pārbaudi un būvēšanu (Actions → CI).

---

## Kā nomainīt bildi

Visas bildes atrodas mapē **`assets/`**. Lai nomainītu bildi, aizstājiet failu ar jaunu failu
ar **tieši tādu pašu nosaukumu** (piem. `pirms-jaka.webp`). Kods nav jāmaina - lapa pati izveido
visus vajadzīgos izmērus (AVIF un WebP).

Ja mainās tas, kas redzams bildē, failā `src/data/images.ts` pielabojiet arī `alt` tekstu
(apraksts cilvēkiem, kas neredz bildi).

| Fails | Kur redzams |
| --- | --- |
| `hero-darbnica.webp` | Sākumlapas augša (dators, planšete) |
| `hero-darbnica-mobile.webp` | Sākumlapas augša (telefons) |
| `pakalpojums-remonts.webp`, `pakalpojums-pielagosana.webp`, `pakalpojums-individuala-susana.webp`, `pakalpojums-adisana.webp`, `pakalpojums-aizkari.webp` | Sākumlapa „Ar ko varu Jums palīdzēt?” un pakalpojumu lapas |
| `pirms-jaka.webp`, `pec-jaka.webp` | „Ne vienmēr vajag pirkt jaunu” (pirms / pēc) |
| `zaiga-pie-sujmasinas.webp` | „Kāpēc klienti uztic savas lietas Zaigai?” |
| `zaiga-portrets.webp` | „Iepazīsimies! Esmu Zaiga” |
| `darbi-1.webp` … `darbi-6.webp` | „Ko radu Zaigas darbnīcā?” (paraksti failā `src/data/gallery.ts`) |
| `zaiga-rokas-adisana.webp`, `pielagosana-pielaikosana.webp`, `adisana-latviskie-raksti.webp`, `adisana-dzijas.webp`, `aizkari-galdauts.webp`, `cenas-darbnicas-galds.webp`, `kontakti-maja.webp` | Pārējās lapas (nākamajā posmā) |
| `og-fons.webp` | Tikai kopīgošanas attēlam (`public/og-image.jpg`), lapā nav redzams |

**Ieteicams vēlāk aizstāt ar īstām bildēm:** `pirms-jaka.webp` / `pec-jaka.webp` (īsts pirms/pēc
darbs) un `kontakti-maja.webp` (īstā māja Tālavas ielā 18). Pārējās bildes ir ilustratīvas.

**Logo** (`assets/logo-*.png`) netiek pārzīmēti - lapa tos tikai samazina.
Favikonu un kopīgošanas attēlu (`public/og-image.jpg`) var izveidot no jauna ar
`python3 scripts/brand-assets.py` (vajag Python ar Pillow).

---

## Kā mainīt cenu

Visas cenas ir **vienā failā**: `src/data/prices.ts`. Katra cena tur ir tikai vienreiz, tāpēc
sākumlapa, pakalpojumu lapas un cenrādis nekad nevar atšķirties.

```ts
{ id: 'bikses-saisinasana', label: 'Bikšu vai džinsu saīsināšana', amount: 5 },
```

- Nomainiet `amount` (eiro, decimāldaļu raksta ar punktu: `3.5` lapā kļūst par „3,50 €”).
- `amount: null` + `note: 'pēc vienošanās'` - cenas vietā tiek rādīts teksts.
- `id` nemainiet - uz to atsaucas teksti (piem. „Cenas no 3,50 €” sākumlapā).

---

## Kontakti, darba laiks un iestatījumi

Failā **`src/config.ts`**:

- tālrunis, WhatsApp, e-pasts, adrese, darba laiks, domēns;
- **`showReviews`** - `true` rāda atsauksmju sadaļu, `false` to paslēpj;
- **`galleryIllustrative`** - `true` zem galerijas un „pirms / pēc” bildes parāda
  „Attēli ir ilustratīvi” (pašlaik `false`);
- **`googleReviewUrl`** - ja ierakstīta Google uzņēmuma profila atsauksmju saite, parādās teikums
  „Ja jau esam strādājuši kopā…” un poga „Atstāt atsauksmi”;
- **`ga4Id`** - tukšs = nav apmeklējumu statistikas un nav sīkdatņu joslas.

---

## Atsauksmes

Failā `src/data/reviews.ts` ir piecas īstas klientu atsauksmes. Jaunu atsauksmi pievieno,
nokopējot vienu ierakstu (no `{` līdz `},`) un ierakstot klienta tekstu, vārdu, vietu un
pakalpojumu. Pirmā atsauksme sarakstā ir izcelta lielāka.

Ja kādreiz vajag parādīt paraugu, pie tā ieraksta `isSample: true`, un lapā parādās zīme „Paraugs”.
Izdomātas atsauksmes nedrīkst uzdot par īstām.

---

## Publicēšana (SiteGround)

Lapa atrodas SiteGround hostingā. Tā tiek publicēta **tikai tad, kad Jūs to palaižat** ar pogu
GitHub (4. solis). Nekas netiek publicēts automātiski: `git push` palaiž tikai pārbaudi (CI), uz
zaigasdarbnica.lv tas neko neaizsūta.

Soļi 1-3 jādara tikai vienreiz, pēc tam katru reizi pietiek ar 4. soli (pēc pirmās publicēšanas
vēl vienreiz 5. solis - pārbaude).

### 1. Vietne, domēns un SSL (vienreiz)

1. SiteGround kontā izveidojiet jaunu vietni domēnam **zaigasdarbnica.lv** (Websites → New Website →
   esošs domēns). Kad jautā par saturu, izvēlieties tukšu vietni (bez WordPress).
2. Domēns `.lv` ir reģistrēts pie NIC.LV akreditēta reģistratora (tur, kur domēns tika pirkts).
   Reģistratora pašapkalpošanās vidē nomainiet domēna **DNS serverus (nameservers)** uz tiem, ko
   rāda SiteGround (piemēram, `ns1.siteground.net` un `ns2.siteground.net`; precīzos nosaukumus
   SiteGround parāda pie vietnes informācijas). Izmaiņas parasti darbojas pēc dažām stundām,
   retāk pēc 48 stundām.
3. Kad domēns jau atveras SiteGround: Site Tools → Security → **SSL Manager** → izvēlieties
   zaigasdarbnica.lv un bezmaksas **Let's Encrypt** → Get.
4. Site Tools → Security → **HTTPS Enforce** → ieslēgt. (Lapas `.htaccess` arī pati pāradresē
   visus apmeklētājus uz `https://zaigasdarbnica.lv` bez „www”.)

### 2. SSH atslēga (vienreiz)

Ar SSH atslēgu GitHub drīkst augšupielādēt lapu Jūsu SiteGround vietnē.

1. Site Tools → Devs → **SSH Keys Manager** → Create: ierakstiet nosaukumu (piem. `github-deploy`)
   un paroli → Create. Paroli pierakstiet.
2. Pie izveidotās atslēgas atveriet izvēlni (⋮) → **SSH Credentials**. Pierakstiet **Hostname**,
   **Username** un **Port** (SiteGround parasti 18765).
3. Turpat izvēlnē → **Private Key**: nokopējiet visu tekstu, no `-----BEGIN` līdz
   `-----END ... KEY-----` ieskaitot.

Privātā atslēga ir kā mājas atslēga: nesūtiet to e-pastā un nekur nesaglabājiet, izņemot GitHub
noslēpumus (3. solis).

### 3. GitHub noslēpumi (vienreiz)

GitHub repozitorijā: **Settings → Secrets and variables → Actions → New repository secret**.
Pievienojiet katru rindu atsevišķi, nosaukumu rakstot tieši tā (lieliem burtiem):

| Nosaukums | Ko ierakstīt |
| --- | --- |
| `SG_HOST` | Hostname no SSH Credentials |
| `SG_USER` | Username no SSH Credentials |
| `SG_PORT` | Port no SSH Credentials (parasti `18765`) |
| `SG_SSH_KEY` | Viss privātās atslēgas teksts (Private Key) |
| `SG_PATH` | Lapas mape serverī: `~/www/zaigasdarbnica.lv/public_html/` |
| `SG_SSH_PASSPHRASE` | Atslēgas parole no 2. soļa (vajadzīga, ja atslēgai ir parole) |

Noslēpumus GitHub vairs nerāda pat Jums, tos var tikai nomainīt. Tie nekad nenonāk kodā.

### 4. Kā publicēt lapu

1. GitHub → **Actions** → kreisajā pusē **Deploy** → poga **„Run workflow”** → zaļā poga
   **„Run workflow”**. Laukā „Use workflow from” atstājiet zaru **`main`**.
2. Pēc 2-4 minūtēm pie darba parādās zaļa ķeksīte: lapa ir publicēta. Atveriet
   https://zaigasdarbnica.lv un pārbaudiet (ja redzat veco versiju, pārlādējiet lapu; ja tas
   nepalīdz, Site Tools → Speed → Caching → Flush Cache).
3. Ja noslēpumi vēl nav pievienoti, darbs beidzas zaļš ar paziņojumu „Publicēšana izlaista”, un
   lapā nekas nemainās.
4. Sarkans krustiņš nozīmē kļūdu. Atveriet darbu un izlasiet sarkano paziņojumu (piemēram,
   nepareizs ports, ceļš vai atslēgas parole).
5. Ķeksītis „Izmēģinājums: tikai parādīt, kas mainītos...” (dry run) neko neaugšupielādē, tikai
   parāda, kuri faili mainītos.

**Svarīgi:** publicēšana padara mapi `public_html` tieši tādu pašu kā gatavā lapa (`dist/`). Faili,
ko kāds `public_html` mapē ielicis ar roku, tiek izdzēsti. Paliek tikai `.well-known` (vajadzīga SSL
sertifikātam) un PHP iestatījumu faili `.user.ini` un `php.ini`. Tāpēc `config.php` glabājas mapē
**virs** `public_html` (sk. „Kontaktforma un e-pasts”). Arī `public_html/.htaccess` katru reizi tiek
pārrakstīts: ja tajā kaut kas jāpievieno, to dara repozitorija failā `public/.htaccess`.

### 5. Pārbaude pēc pirmās publicēšanas (vienreiz)

1. Atveriet `http://www.zaigasdarbnica.lv/cenas.html`. Adreses joslā jāparādās
   `https://zaigasdarbnica.lv/cenas` un cenu lapai.
2. Atveriet `https://zaigasdarbnica.lv/nav-tadas`. Jāparādās lapai „Šī lapa nav atrasta”.
3. Nosūtiet formu (sk. „Kā pārbaudīt formu pēc publicēšanas”).

Ja pārlūks rāda kļūdu `ERR_TOO_MANY_REDIRECTS` (pārāk daudz pāradresāciju) vai kāds solis neizdodas,
sazinieties ar izstrādātāju.

Izstrādātājam: `curl -sI https://zaigasdarbnica.lv/cenas` jārāda `Content-Security-Policy`,
`Strict-Transport-Security` un `Cache-Control: no-cache, max-age=0, must-revalidate`, bet kāds no
`/_astro/` failiem `Cache-Control: public, max-age=31536000, immutable`. Ja galveņu nav, SiteGround
Nginx pasniedz failus, neņemot vērā `.htaccess` (Site Tools → Speed → Caching, NGINX Direct
Delivery). Pāradresāciju cilpa nozīmē, ka Apache neredz https ne `%{HTTPS}`, ne
`X-Forwarded-Proto` veidā: `public/.htaccess` sadaļā „Shēma” jāpievieno pazīme, ko SiteGround nodod.

### Rezerves variants: augšupielāde ar roku

Ja GitHub publicēšana nav iestatīta vai nedarbojas:

1. Savā datorā palaidiet `npm run build`. Gatavā lapa ir mapē `dist/`.
2. Site Tools → Site → **File Manager** → atveriet `www/zaigasdarbnica.lv/public_html/`.
3. Augšupielādējiet **mapes `dist/` saturu** (nevis pašu mapi `dist`): visus failus un mapes, arī
   `_astro`, `lib` un slēpto failu **`.htaccess`**. Ērtāk: saspiediet `dist/` saturu vienā ZIP failā,
   augšupielādējiet to un File Manager izvēlieties Extract.
4. Faili, kuru nosaukums sākas ar punktu, datorā mēdz būt paslēpti (macOS Finder: Cmd+Shift+.;
   Windows: Skats → Paslēptie vienumi). Bez `.htaccess` nedarbosies adreses bez `.html`
   (piem. `/cenas`), latviskā 404 lapa un drošības iestatījumi.
5. Vecos failus, kuru vairs nav `dist/` mapē, izdzēsiet ar roku (`.well-known` neaiztieciet).

---

## Kontaktforma un e-pasts

Forma lapā `/kontakti` sūta pieprasījumus uz zaiga.paula@inbox.lv caur failu `send.php`, kas
izmanto SiteGround e-pasta kastīti `noreply@zaigasdarbnica.lv`.

### 1. E-pasta kastīte (vienreiz)

1. Site Tools → **Email → Accounts** → Create: nosaukums `noreply`, domēns zaigasdarbnica.lv,
   gara parole (pierakstiet to).
2. Pie kastītes atveriet izvēlni (⋮) → **Mail Configuration** (Manual Settings). Tur redzams
   izejošā pasta (SMTP) serveris, ports un lietotājvārds.

### 2. config.php ar SMTP iestatījumiem (vienreiz)

Parole glabājas tikai serverī, nekad GitHub.

1. File Manager atveriet mapi `www/zaigasdarbnica.lv/`. Tā ir **vienu līmeni virs** `public_html`
   (tajā redzama mape `public_html`).
2. Izveidojiet tur jaunu failu **`config.php`** un iekopējiet tajā visu faila `config.example.php`
   saturu no šī repozitorija.
3. Aizpildiet vērtības no Mail Configuration:
   - `smtp_host` - SMTP serveris (parasti `mail.zaigasdarbnica.lv`);
   - `smtp_port` un `smtp_secure` - `465` un `'ssl'` (vai `587` un `'tls'`, ja SiteGround rāda 587);
   - `smtp_user` - `noreply@zaigasdarbnica.lv`;
   - `smtp_pass` - kastītes parole;
   - `rate_salt` - gara nejauša burtu un ciparu virkne (aizsardzībai pret masveida sūtīšanu).
4. Saglabājiet. `config.php` nekad neievietojiet GitHub un nelieciet mapē `public_html`.

Ja `config.php` nav vai `smtp_host` ir tukšs, forma sūta ar PHP `mail()`, kas ir mazāk uzticami.

### 3. Kā pārbaudīt formu pēc publicēšanas

1. Atveriet https://zaigasdarbnica.lv/kontakti#forma, aizpildiet formu (vārds, tālrunis, īss
   apraksts), pievienojiet nelielu foto un nosūtiet. Jāparādās apstiprinājumam, ka ziņa nosūtīta.
2. Pārbaudiet pastkastīti zaiga.paula@inbox.lv, arī surogātpasta (spam) mapi. Vēstulē jābūt
   formas tekstam un foto. Ja nospiežat „Atbildēt”, atbilde aiziet klientam.
3. Pamēģiniet arī no telefona un vienreiz bez foto.

### Ja vēstules nonāk surogātpastā (spam)

1. Site Tools → **Email → Authentication**: pārliecinieties, ka **SPF** un **DKIM** ir ieslēgti
   (ja domēna DNS ir SiteGround, tos ieslēdz ar vienu klikšķi).
2. Pagaidiet dažas stundas un nosūtiet formu vēlreiz.
3. Pastkastītē atzīmējiet vēstuli kā „nav surogātpasts” un pievienojiet `noreply@zaigasdarbnica.lv`
   saviem kontaktiem.

### Rezerves variants: Web3Forms

Ja SiteGround e-pasts nedarbojas uzticami, formu var pārslēgt uz bezmaksas pakalpojumu Web3Forms:

1. Vietnē https://web3forms.com ierakstiet zaiga.paula@inbox.lv un saņemiet piekļuves atslēgu
   (Access Key) e-pastā. Šī atslēga nav slepena.
2. Failā `src/config.ts` ierakstiet to pie `formConfig`: `web3formsKey: 'Jūsu-atslēga'`.
3. Publicējiet lapu no jauna (Actions → Deploy). Drošības iestatījumi (CSP) Web3Forms atļauj paši.
4. Bezmaksas plānā **foto pievienot nevar**, tāpēc foto lauks formā tad netiek rādīts.

Lai atgrieztos pie `send.php`, ierakstiet atkal `web3formsKey: ''` un publicējiet.

---

## Google uzņēmuma profils

Profils palīdz Jūs atrast Google Maps un meklēšanā (piem. „šuvēja Alūksnē”).

1. Atveriet https://business.google.com un pievienojiet uzņēmumu.
2. Nosaukums tieši **„Zaigas darbnīca”**, tāpat kā lapā (bez papildu vārdiem).
3. Kategorija, piemēram, **„Drēbnieks”** vai **„Šuvējs”**.
4. Adrese: **Tālavas iela 18, Alūksne, LV-4301** (klienti nāk uz darbnīcu). Apkalpošanas
   teritorija: Alūksne, Gulbene, Balvi.
5. Tālrunis: **+371 26 423 325**. Mājaslapa: **https://zaigasdarbnica.lv**.
6. Darba laiks: **P.-S. 9:00-20:00** (pirmdiena-sestdiena), svētdienā slēgts.
7. Apstipriniet uzņēmumu tā, kā Google piedāvā (video, zvans vai pastkarte), un pievienojiet bildes.
8. Kad profils apstiprināts, nokopējiet saiti atsauksmju lūgšanai un ierakstiet to `src/config.ts`
   pie `googleReviewUrl`. Pēc publicēšanas lapā parādīsies poga „Atstāt atsauksmi”.

Nosaukumu, adresi un tālruni visur (lapā, Google, sociālajos tīklos, katalogos) rakstiet vienādi.

Bildes `pirms-jaka.webp` un `pec-jaka.webp` (pirms / pēc) un `kontakti-maja.webp` (māja Tālavas
ielā 18) vēlāk var nomainīt pret jaunām, piemēram, tām pašām, ko ievietojat Google profilā
(sk. „Kā nomainīt bildi”).

---

## Struktūra (izstrādātājam)

```
assets/                 bildes un logo (aizstāt ar tādu pašu nosaukumu)
public/                 favikons, og-image.jpg, site.webmanifest
public/.htaccess        Apache: https bez www, adreses bez .html, 404, kešatmiņa, drošības galvenes
public/send.php         kontaktformas apstrāde (SMTP caur PHPMailer)
public/lib/             PHPMailer (no pārlūka nav pieejams)
config.example.php      config.php paraugs (īstais config.php - serverī virs public_html, ne Git)
scripts/                brand-assets.py (favikons, og attēls)
integrations/           būvēšanas palīgs (izdzēš neizmantotas bilžu kopijas no dist/)
integrations/csp-htaccess.mjs  ieraksta CSP (inline skriptu sha256) dist/.htaccess
.github/workflows/      ci.yml (pārbaude katrā push), deploy.yml (publicēšana tikai ar roku)
src/config.ts           kontakti, darba laiks, karodziņi
src/pages/              lapas; sitemap.xml.ts un robots.txt.ts (SEO faili)
src/data/               cenas, pakalpojumi, bildes, atsauksmes, BUJ, galerija, izvēlne
src/lib/                bilžu izmēri, tipogrāfija (nedalāmas atstarpes), JSON-LD
src/components/         galvene, kājene, pogas, apakšējā josla, BUJ u.c.
src/components/home/    sākumlapas sadaļas
src/styles/             dizaina žetoni, fonti, pamatstili
src/fonts/              Fraunces, Mulish, Caveat (SIL OFL, apakškopa latīņu + latīņu paplašinātā)
```
