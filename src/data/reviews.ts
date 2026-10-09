/**
 * ATSAUKSMES
 *
 * Īstas klientu atsauksmes. Jaunu atsauksmi pievieno, nokopējot vienu ierakstu
 * un ierakstot klienta tekstu, vārdu, vietu un pakalpojumu.
 * Ja kādreiz jāparāda paraugs, `isSample: true` pie tā parāda zīmi „Paraugs”.
 * Visu sadaļu var paslēpt ar `flags.showReviews = false` failā src/config.ts.
 */
import { typo } from '../lib/typo';

export type Review = {
  quote: string;
  name: string;
  place: string;
  service: string;
  isSample: boolean;
};

const list: Review[] = [
  {
    quote:
      'Ziemas jakai saplīsa rāvējslēdzējs, un jau domāju pirkt jaunu. Zaiga to nomainīja dažu dienu laikā, un jaka izskatās kā jauna. Cena bija tāda, kādu pateica jau sākumā.',
    name: 'Inga',
    place: 'Alūksne',
    service: 'rāvējslēdzēja maiņa',
    isSample: false,
  },
  {
    quote:
      'Meitai bija jāpielāgo izlaiduma kleita, un laika bija maz. Zaiga visu izdarīja laikā un ļoti rūpīgi - kleita sēdēja perfekti.',
    name: 'Lauma',
    place: 'Gulbene',
    service: 'kleitas pielāgošana',
    isSample: false,
  },
  {
    quote:
      'Pasūtīju vilnas džemperi vīram. Kopā izvēlējāmies dziju un rakstu, un rezultāts pārspēja cerības. Silts un skaists.',
    name: 'Dace',
    place: 'Alūksne',
    service: 'adīšana pēc pasūtījuma',
    isSample: false,
  },
  {
    quote:
      'Vienmēr pērku bikses, kas ir par garām. Tagad zinu, kur tās saīsināt - ātri, kārtīgi un par saprātīgu cenu.',
    name: 'Andris',
    place: 'Balvi',
    service: 'bikšu saīsināšana',
    isSample: false,
  },
  {
    quote:
      'Zaiga atbrauca nomērīt logus un uzšuva aizkarus tieši pēc mūsu izmēriem. Viesistaba tagad izskatās pavisam citādāk.',
    name: 'Ilze',
    place: 'Alūksnes novads',
    service: 'aizkaru šūšana',
    isSample: false,
  },
];

export const reviews: Review[] = list.map((r) => ({ ...r, quote: typo(r.quote) }));

export const hasSampleReviews = reviews.some((r) => r.isSample);
