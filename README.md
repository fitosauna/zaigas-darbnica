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

Tiks pievienota nākamajā posmā kopā ar kontaktformu: `.htaccess`, `send.php` (e-pasts caur
SiteGround SMTP), manuāla publicēšanas darbība GitHub (Actions → Deploy → „Run workflow”) un
soli pa solim norādījumi par domēnu, SSL, SSH atslēgu, e-pasta kastīti un Google uzņēmuma profilu.
Līdz tam nekas netiek publicēts uz zaigasdarbnica.lv.

---

## Struktūra (izstrādātājam)

```
assets/                 bildes un logo (aizstāt ar tādu pašu nosaukumu)
public/                 favikons, og-image.jpg, site.webmanifest
scripts/                brand-assets.py (favikons, og attēls)
integrations/           būvēšanas palīgs (izdzēš neizmantotas bilžu kopijas no dist/)
src/config.ts           kontakti, darba laiks, karodziņi
src/data/               cenas, pakalpojumi, bildes, atsauksmes, BUJ, galerija, izvēlne
src/lib/                bilžu izmēri, tipogrāfija (nedalāmas atstarpes), JSON-LD
src/components/         galvene, kājene, pogas, apakšējā josla, BUJ u.c.
src/components/home/    sākumlapas sadaļas
src/styles/             dizaina žetoni, fonti, pamatstili
src/fonts/              Fraunces, Mulish, Caveat (SIL OFL, apakškopa latīņu + latīņu paplašinātā)
```
