/**
 * /aizkaru-susana - Part B §6. Teksts burtiski no Part B (A12), cenas no prices.ts.
 * Vienīgā atkāpe: meta aprakstā „no 4 €/m” → „no 4 € / m” (price('aizkaru-saisinasana'),
 * tāds pats formāts kā cenu birkā).
 */
import { contact } from '../../config';
import { price } from '../prices';
import type { ServicePageData } from './types';

export const page: ServicePageData = {
  path: '/aizkaru-susana',
  name: 'Aizkari un mājas tekstils',
  seo: {
    title: 'Aizkaru šūšana un saīsināšana Alūksnē | Zaigas darbnīca',
    description: `Aizkaru šūšana un saīsināšana Alūksnē ${price('aizkaru-saisinasana')}, aizkaru lentes piešūšana, galdauti un pārvalki pēc Jūsu izmēriem. Varu atbraukt nomērīt logus.`,
  },
  h1: 'Aizkaru un mājas tekstila šūšana Alūksnē',
  hero: {
    image: 'pakalpojumsAizkari',
    swatch: 'sheer',
    lead: 'Lai aizkari derētu tieši Jūsu mājai.',
    text: 'Veikalā nopirktie aizkari ir par gariem, par īsiem vai nav tādā platumā, kā Jūsu logam vajag. Savukārt specializētu salonu cenas mēdz pārsteigt. Es uzšuju un pielāgoju aizkarus un citus mājas tekstilus tā, lai tie der tieši Jūsu mājai, un cenu pateikšu jau sākumā. Ja vēlaties, atbraukšu un nomērīšu logus pati.',
    actions: [
      { kind: 'form', label: 'Pieteikt logu nomērīšanu', service: 'logi' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  blocks: [
    {
      type: 'list',
      title: 'Aizkari un mājas tekstils pēc izmēra',
      items: [
        { title: 'Aizkaru šūšana', text: 'pēc Jūsu logu izmēriem', inline: true },
        { title: 'Aizkaru saīsināšana', text: 'un apšūšana veikalā pirktiem aizkariem', inline: true },
        { title: 'Aizkaru lentes piešūšana', text: 'un aizkaru pārtaisīšana citam stienim vai sliedei', inline: true },
        { title: 'Galdauti un galda celiņi', text: 'ikdienai un svētkiem' },
        { title: 'Pārvalki', text: 'spilveniem, krēsliem, soliem un mēbelēm' },
        { title: 'Gultas veļa', text: 'un citi tekstili nestandarta izmēros', inline: true },
        { title: 'Mājas tekstila labošana', text: 'atirušas malas, caurumi, saplēstas cilpas' },
      ],
      note: 'Varat atnest savu audumu vai arī kopā izvēlēsimies piemērotāko.',
    },
    {
      type: 'steps',
      title: 'Atbraukšu nomērīt logus',
      paragraphs: [
        `Nezināt precīzus izmērus? Atbraukšu pie Jums, nomērīšu logus un palīdzēšu izvēlēties aizkaru garumu un krokojumu. Tā nebūs jāuztraucas par kļūdām izmēros. Piezvaniet uz ${contact.phoneDisplay}, lai sarunātu laiku.`,
      ],
      lead: 'Ja vēlaties logus nomērīt paši:',
      steps: [
        { title: 'Platums.', text: 'Nomēriet aizkaru stieņa vai sliedes garumu, nevis loga platumu.' },
        {
          title: 'Garums.',
          text: 'Mēriet no stieņa vai sliedes līdz vietai, kur aizkaram jābeidzas - līdz palodzei, līdz grīdai vai tikko pieskaroties grīdai.',
        },
        {
          title: 'Izskats.',
          text: 'Pasakiet, vai vēlaties gludus vai bagātīgi krokotus aizkarus - no tā atkarīgs auduma daudzums.',
        },
      ],
    },
    {
      type: 'prices',
      title: 'Aizkaru un mājas tekstila cenas',
      group: 'aizkari',
      note: 'Materiāli (lente, diegi) iekļauti. Cenas ir orientējošas sākumcenas - precīzu cenu pateikšu, kad zināšu izmērus un audumu.',
    },
    {
      type: 'examples',
      images: [{ image: 'darbi6', caption: 'Aizkari saīsināti līdz grīdai' }, { image: 'aizkariGaldauts' }],
    },
    {
      type: 'faq',
      title: 'Jautājumi par aizkaru šūšanu',
      items: [
        {
          q: 'Vai var saīsināt aizkarus, kas pirkti veikalā?',
          a: 'Jā, tas ir viens no biežākajiem darbiem. Pasakiet, cik garus aizkarus vajag, vai atnesiet tos jau ar atzīmētu garumu.',
        },
        {
          q: 'Vai atbraucat nomērīt logus?',
          a: `Jā. Piezvaniet uz ${contact.phoneDisplay}, un sarunāsim laiku, kad atbraukt.`,
        },
        {
          q: 'Cik daudz auduma vajag aizkariem?',
          a: 'Tas atkarīgs no loga lieluma un no tā, cik krokainus aizkarus vēlaties. Pasakiet izmērus, un es aptuveni izrēķināšu, cik auduma pirkt.',
        },
        {
          q: 'Vai var uzšūt tekstilu nestandarta izmērā?',
          a: 'Jā. Galdauts apaļam galdam, pārvalks vecam krēslam vai gultas veļa nestandarta matracim - pasakiet izmērus, un es uzšūšu.',
        },
      ],
    },
  ],
  cta: {
    title: 'Aizkariem vajag īsto garumu?',
    text: 'Atsūtiet loga izmērus vai foto WhatsApp, vai piezvaniet, lai sarunātu logu nomērīšanu.',
    actions: [
      { kind: 'form', label: 'Pieteikt logu nomērīšanu', service: 'logi' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  related: [
    { label: 'Individuālā šūšana', href: '/individuala-susana' },
    { label: 'Cenas', href: '/cenas' },
  ],
};
