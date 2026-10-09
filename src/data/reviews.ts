/**
 * ATSAUKSMES
 *
 * Šīs piecas atsauksmes ir PARAUGI (`isSample: true`). Kamēr kāda atsauksme
 * ir paraugs, sadaļā redzams neliels zīmogs „Paraugs”.
 *
 * Lai paraugu aizstātu ar īstu atsauksmi: ierakstiet klienta tekstu, vārdu,
 * vietu un pakalpojumu un nomainiet `isSample` uz `false`.
 * Visu sadaļu var paslēpt ar `flags.showReviews = false` failā src/config.ts.
 */
export type Review = {
  quote: string;
  name: string;
  place: string;
  service: string;
  isSample: boolean;
};

export const reviews: Review[] = [
  {
    quote:
      'Ziemas jakai saplīsa rāvējslēdzējs, un jau domāju pirkt jaunu. Zaiga to nomainīja dažu dienu laikā, un jaka izskatās kā jauna. Cena bija tāda, kādu pateica jau sākumā.',
    name: 'Inga',
    place: 'Alūksne',
    service: 'rāvējslēdzēja maiņa',
    isSample: true,
  },
  {
    quote:
      'Meitai bija jāpielāgo izlaiduma kleita, un laika bija maz. Zaiga visu izdarīja laikā un ļoti rūpīgi - kleita sēdēja perfekti.',
    name: 'Lauma',
    place: 'Gulbene',
    service: 'kleitas pielāgošana',
    isSample: true,
  },
  {
    quote:
      'Pasūtīju vilnas džemperi vīram. Kopā izvēlējāmies dziju un rakstu, un rezultāts pārspēja cerības. Silts un skaists.',
    name: 'Dace',
    place: 'Alūksne',
    service: 'adīšana pēc pasūtījuma',
    isSample: true,
  },
  {
    quote:
      'Vienmēr pērku bikses, kas ir par garām. Tagad zinu, kur tās saīsināt - ātri, kārtīgi un par saprātīgu cenu.',
    name: 'Andris',
    place: 'Balvi',
    service: 'bikšu saīsināšana',
    isSample: true,
  },
  {
    quote:
      'Zaiga atbrauca nomērīt logus un uzšuva aizkarus tieši pēc mūsu izmēriem. Viesistaba tagad izskatās pavisam citādāk.',
    name: 'Ilze',
    place: 'Alūksnes novads',
    service: 'aizkaru šūšana',
    isSample: true,
  },
];

export const hasSampleReviews = reviews.some((r) => r.isSample);
