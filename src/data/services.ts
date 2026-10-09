/**
 * Pakalpojumi - nosaukumi, saites un īsie apraksti sākumlapai.
 * Cenas tekstos ņemtas no src/data/prices.ts (nevis ierakstītas šeit).
 */
import { price } from './prices';
import { images, type ImageKey } from './images';

export type Service = {
  slug: string;
  href: string;
  /** Nosaukums izvēlnē un sākumlapā. */
  name: string;
  /** Īsais apraksts sākumlapā (Part B §1.2). */
  summary: string;
  /** Bilde sākumlapas „moodboard” un pakalpojuma lapas hero. */
  image: ImageKey;
  /** Auduma paraugs (moodboard): faktūras nosaukums un krāsa. */
  swatch: 'denim' | 'linen' | 'silk' | 'knit' | 'sheer';
};

export const services: Service[] = [
  {
    slug: 'apgerbu-remonts',
    href: '/apgerbu-remonts',
    name: 'Apģērbu remonts',
    summary: `Rāvējslēdzēja maiņa jakām, mēteļiem un biksēm, atirušas vīles, caurumi, oderes nomaiņa. Cenas ${price('cauruma-salabosana')}.`,
    image: 'pakalpojumsRemonts',
    swatch: 'denim',
  },
  {
    slug: 'apgerbu-parsusana',
    href: '/apgerbu-parsusana',
    name: 'Pielāgošana un pāršūšana',
    summary: `Bikšu saīsināšana, kleitu iespīlēšana, piedurkņu garums, izmēra maiņa. Cenas ${price('bikses-saisinasana')}.`,
    image: 'pakalpojumsPielagosana',
    swatch: 'linen',
  },
  {
    slug: 'individuala-susana',
    href: '/individuala-susana',
    name: 'Individuālā šūšana',
    summary: 'Kleitas, svārki, bikses, svētku un izlaiduma tērpi pēc Jūsu izmēriem un ieceres.',
    image: 'pakalpojumsIndividualaSusana',
    swatch: 'silk',
  },
  {
    slug: 'adisana-pec-pasutijuma',
    href: '/adisana-pec-pasutijuma',
    name: 'Adīšana pēc pasūtījuma',
    summary: 'Ar rokām adītas zeķes, dūraiņi, cepures, šalles, džemperi un pledi, kā arī adītu lietu labošana.',
    image: 'pakalpojumsAdisana',
    swatch: 'knit',
  },
  {
    slug: 'aizkaru-susana',
    href: '/aizkaru-susana',
    name: 'Aizkari un mājas tekstils',
    summary: 'Aizkaru šūšana un saīsināšana, galdauti un pārvalki. Varu atbraukt nomērīt logus.',
    image: 'pakalpojumsAizkari',
    swatch: 'sheer',
  },
];

export function serviceImage(service: Service) {
  return images[service.image];
}
