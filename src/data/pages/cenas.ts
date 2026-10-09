/**
 * /cenas - Part B §7. Cenas pašas tabulās nāk no src/data/prices.ts.
 */
import { contact } from '../../config';
import { price, priceCompact, type PriceGroupId } from '../prices';
import type { Action } from './types';
import type { Faq } from '../faq';

export const cenas = {
  path: '/cenas',
  name: 'Cenas',
  seo: {
    title: 'Šūšanas un adīšanas cenas Alūksnē | Zaigas darbnīca',
    description: `Cenrādis: bikšu saīsināšana ${price('bikses-saisinasana')}, rāvējslēdzēja maiņa ${price('ravejsledzejs-bikses')}, aizkaru saīsināšana ${priceCompact('aizkaru-saisinasana')}, adītas zeķes ${price('zeku-paris')}. Šuvēja un adītāja Alūksnē.`,
  },
  h1: 'Šūšanas un adīšanas pakalpojumu cenas',
  intro:
    'Šeit atradīsiet biežāko darbu sākumcenas. Katrs apģērbs un pasūtījums ir atšķirīgs, tāpēc precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma. Ja vēlaties, atsūtiet foto WhatsApp, un pateikšu aptuveno cenu jau iepriekš.',
  introActions: [{ kind: 'whatsapp', label: 'Atsūtīt foto un uzzināt cenu' }] as Action[],
  /** Cenu grupas Part B secībā: virsraksts, īss nosaukums ātrajām saitēm, saite uz pakalpojumu, piezīme. */
  groups: [
    { group: 'remonts', title: 'Apģērbu remonts', short: 'Remonts', href: '/apgerbu-remonts' },
    { group: 'pielagosana', title: 'Apģērbu pielāgošana un pāršūšana', short: 'Pielāgošana', href: '/apgerbu-parsusana' },
    {
      group: 'susana',
      title: 'Individuālā šūšana',
      short: 'Šūšana',
      href: '/individuala-susana',
      note: 'Individuālajai šūšanai norādīta darba cena; audums - Jūsu vai iegādājams atsevišķi.',
    },
    { group: 'adisana', title: 'Adīšana pēc pasūtījuma', short: 'Adīšana', href: '/adisana-pec-pasutijuma' },
    { group: 'aizkari', title: 'Aizkari un mājas tekstils', short: 'Aizkari', href: '/aizkaru-susana' },
  ] as { group: PriceGroupId; title: string; short: string; href: string; note?: string }[],
  important: {
    title: 'Svarīgi zināt par cenām',
    items: [
      'Visas cenas ir orientējošas sākumcenas. Precīzu cenu pateikšu pirms darba sākuma.',
      'Remontam un pielāgošanai vajadzīgie materiāli (rāvējslēdzēji, odere, diegi, lente) ir iekļauti cenā.',
      'Individuālajai šūšanai un adīšanai cena atkarīga no auduma vai dzijas - to saskaņosim pirms darba. Varat atnest arī savu.',
      'Steidzami darbi ir iespējami - piezvaniet, un sarunāsim termiņu.',
    ],
  },
  faq: {
    title: 'Jautājumi par cenām',
    items: [
      {
        q: 'Vai cenrādī norādītā ir galīgā cena?',
        a: 'Tā ir sākumcena. Precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma, lai nav pārsteigumu.',
      },
      {
        q: 'Vai var uzzināt cenu pēc foto?',
        a: `Jā. Atsūtiet foto un īsu aprakstu WhatsApp uz ${contact.phoneDisplay}, un pateikšu aptuveno cenu.`,
      },
      {
        q: 'Vai materiāli ir iekļauti cenā?',
        a: 'Remontam un pielāgošanai - jā. Individuālajai šūšanai un adīšanai audumu vai dziju saskaņosim pirms darba.',
      },
    ] as Faq[],
  },
  cta: {
    title: 'Nezināt, cik izmaksās Jūsu darbs?',
    text: 'Piezvaniet vai atsūtiet foto - pateikšu.',
    actions: [
      { kind: 'tel', label: 'Zvanīt Zaigai' },
      { kind: 'whatsapp', label: 'Rakstīt WhatsApp' },
    ] as Action[],
  },
};
