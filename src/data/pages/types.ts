/**
 * Iekšlapu satura tipi. Katra pakalpojuma lapa ir viens datu fails
 * (src/data/pages/*.ts) ar Part B tekstu; izkārtojumu dara ServicePage.astro.
 */
import type { ImageKey } from '../images';
import type { PriceGroupId } from '../prices';
import type { Faq } from '../faq';

/** Formas izvēlnes vērtības (/kontakti#forma), lai poga var iepriekš izvēlēties pakalpojumu. */
export type FormService = 'remonts' | 'pielagosana' | 'susana' | 'adisana' | 'aizkari' | 'logi' | 'cits';

/**
 * Poga. `tel` un `whatsapp` ņem saites no config; `form` ved uz /kontakti#forma
 * (ar iepriekš izvēlētu pakalpojumu); `link` - uz `href`.
 * Pirmā poga sarakstā ir galvenā (pildīta), otrā - kontūras.
 */
export type Action =
  | { kind: 'tel' | 'whatsapp' | 'mail'; label: string }
  | { kind: 'form'; label: string; service: FormService }
  | { kind: 'link'; label: string; href: string };

/** Bilde blokā blakus tekstam. `realZaiga` bildes - tikai pie teksta par Zaigu. */
export type Aside = { image: ImageKey; shape?: 'arch' | 'print' | 'tall' };

/**
 * Saraksta rinda: treknais `title` + `text`. Parasti starp tiem ir „ - ”
 * („**Atirušas vīles** - sānos…”); `inline: true` - tikai atstarpe
 * („**Aizkaru šūšana** pēc Jūsu logu izmēriem”).
 */
export type ListItem = { title: string; text?: string; inline?: boolean };

export type Block =
  /** Saraksts ar treknu ievadu: „Rāvējslēdzēja maiņa - jakām, ...” */
  | { type: 'list'; title: string; intro?: string; items: ListItem[]; note?: string; aside?: Aside }
  /** Vienkāršs aizzīmju saraksts ar ievadteikumu (piem. adītu lietu labošana). */
  | { type: 'bullets'; title: string; intro?: string; items: string[]; aside?: Aside }
  /** Ieguvumi: trekns virsraksts + teksts. */
  | { type: 'benefits'; title: string; items: ListItem[]; aside?: Aside }
  /**
   * Numurēti soļi. `paragraphs` - teksts pirms soļiem, `lead` - teikums tieši pirms soļiem.
   * `sheet: true` - soļi uz piegrieztnes lapas režģa.
   */
  | {
      type: 'steps';
      title: string;
      paragraphs?: string[];
      lead?: string;
      steps: ListItem[];
      sheet?: boolean;
      aside?: Aside;
    }
  /** Cenu birka no src/data/prices.ts grupas un piezīme zem tās. */
  | { type: 'prices'; title: string; group: PriceGroupId; note: string }
  /** „Pirms / pēc” slīdnis (jaka). */
  | { type: 'compare' }
  /** Piemēru bildes, kas karājas uz diega (bez „pirms/pēc” apgalvojumiem). */
  | { type: 'examples'; images: { image: ImageKey; caption?: string }[] }
  /** Biežāk uzdotie jautājumi (+ FAQPage JSON-LD). Tālruņus saitēs pārvērš veidne. */
  | { type: 'faq'; title: string; items: Faq[] };

export type ServicePageData = {
  /** URL, piem. '/apgerbu-remonts'. */
  path: string;
  /** Nosaukums ceļvedī (breadcrumb) - kā izvēlnē. */
  name: string;
  seo: { title: string; description: string };
  h1: string;
  hero: {
    image: ImageKey;
    /** Trekna ievadrinda zem H1 (Part B §X.1 treknais teikums). */
    lead: string;
    text: string;
    actions: Action[];
    swatch: 'denim' | 'linen' | 'silk' | 'knit' | 'sheer';
  };
  blocks: Block[];
  cta: { title: string; text: string; actions: Action[]; aside?: Aside };
  related: { label: string; href: string }[];
};
