/**
 * /individuala-susana - Part B §4. Teksts burtiski no Part B (A12), cenas no prices.ts.
 * Atkāpju no Part B nav. Cenas tekstos šeit nav; cenu birka nāk no grupas 'susana'.
 * Īstā Zaiga (zaigaPieSujmasinas) - tikai pie procesa, kur teksts runā par viņas darbu.
 */
import type { ServicePageData } from './types';

export const page: ServicePageData = {
  path: '/individuala-susana',
  name: 'Individuālā šūšana',
  seo: {
    title: 'Individuālā šūšana Alūksnē | Zaigas darbnīca',
    description:
      'Apģērbu šūšana pēc individuāla pasūtījuma Alūksnē: kleitas, svārki, bikses, izlaiduma un svētku tērpi, tautastērpi. Pēc Jūsu izmēriem un ieceres.',
  },
  h1: 'Individuālā šūšana un apģērbi pēc pasūtījuma Alūksnē',
  hero: {
    image: 'pakalpojumsIndividualaSusana',
    swatch: 'silk',
    lead: 'Ja veikalā neatrodat īsto, varam to uzšūt.',
    text: 'Izstaigāti visi veikali, bet kleitas, kāda ir Jūsu iedomā, tur nav. Vai arī ir, bet neder pa augumu. Individuāli šūts apģērbs top pēc Jūsu izmēriem, gaumes un vajadzībām - lai Jūs tajā justos ērti un skaisti.',
    actions: [
      { kind: 'form', label: 'Pārrunāt savu ieceri', service: 'susana' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  blocks: [
    {
      type: 'list',
      title: 'Ko var uzšūt pēc pasūtījuma',
      items: [
        { title: 'Kleitas', text: 'ikdienai, darbam un svētkiem' },
        { title: 'Izlaiduma tērpi', text: 'kleitas un tērpi skolu un augstskolu izlaidumiem' },
        { title: 'Svētku un pasākumu tērpi', text: 'kāzām, jubilejām, kristībām' },
        { title: 'Svārki, blūzes, bikses', text: 'ja veikala izmēri Jums neder' },
        { title: 'Apģērbs pēc parauga', text: 'ja ir iemīļots apģērbs, ko gribētos vēl vienu' },
        { title: 'Tautastērpi un skatuves tērpi', text: 'individuāli un kolektīviem' },
        { title: 'Vīriešu un bērnu apģērbs' },
      ],
      note: 'Uzņemos arī netipiskus pasūtījumus - pastāstiet savu ideju, un izdomāsim, kā to īstenot.',
    },
    {
      type: 'steps',
      title: 'No ieceres līdz gatavam apģērbam',
      sheet: true,
      aside: { image: 'zaigaPieSujmasinas', shape: 'tall' },
      steps: [
        {
          title: 'Konsultācija.',
          text: 'Izrunājam, ko vēlaties, kad tas vajadzīgs un kāds ir budžets. Varat atnest bildes, skici vai līdzīgu apģērbu.',
        },
        {
          title: 'Izmēri un audums.',
          text: 'Noņemu precīzus izmērus. Varat atnest savu audumu vai arī kopā izvēlēsimies piemērotāko.',
        },
        { title: 'Cena un termiņš.', text: 'Pirms darba sākuma sarunājam cenu un gatavības datumu.' },
        {
          title: 'Pielaikošana.',
          text: 'Kad apģērbs ir sašūts, to pielaikojam un vajadzības gadījumā pielāgojam, līdz tas sēž tā, kā vajag.',
        },
        { title: 'Gatavs apģērbs.', text: 'Saņemiet apģērbu, kas uzšūts tieši Jums, sarunātajā laikā.' },
      ],
    },
    {
      type: 'benefits',
      title: 'Apģērbs, kas radīts ar domu par Jums',
      items: [
        {
          title: 'Der Jūsu augumam, nevis izmēru tabulai.',
          text: 'Apģērbs top pēc Jūsu izmēriem, tāpēc tas sēž tā, kā veikalā pirkts apģērbs reti sēž.',
        },
        { title: 'Tieši tāds, kādu vēlaties.', text: 'Jūs izvēlaties modeli, audumu, garumu un detaļas.' },
        { title: 'Unikāls.', text: 'Pasākumā neviens cits nebūs tādā pašā kleitā.' },
        {
          title: 'Kvalitāte, kas kalpo.',
          text: 'Rūpīgi apstrādātas vīles un labs audums nozīmē, ka apģērbs kalpos ilgi.',
        },
        {
          title: 'Mierīgs prāts pirms pasākuma.',
          text: 'Termiņu sarunājam iepriekš, un pielaikošanas plānojam tā, lai ir laiks visu pabeigt.',
        },
      ],
    },
    {
      type: 'prices',
      title: 'Cik maksā apģērbs pēc pasūtījuma?',
      group: 'susana',
      note: 'Norādīta darba cena; audums - Jūsu vai iegādājams atsevišķi. Galīgo cenu ietekmē modelis, detaļas un pielaikošanu skaits - to pateikšu pēc konsultācijas, vienmēr pirms darba sākuma.',
    },
    {
      type: 'faq',
      title: 'Jautājumi par individuālo šūšanu',
      items: [
        {
          q: 'Vai var uzšūt apģērbu pēc bildes?',
          a: 'Jā, bilde ir labākais veids, kā parādīt savu ideju. Konsultācijā izrunāsim, kā to pielāgot tieši Jums.',
        },
        {
          q: 'Vai varu atnest savu audumu?',
          a: 'Jā, protams. Ja vēlaties, palīdzēšu arī izvēlēties piemērotu audumu un aptuveni izrēķināt, cik daudz tā vajag.',
        },
        {
          q: 'Cik laikā iepriekš jāpiesakās?',
          a: 'Ieteicams pieteikties vismaz 3-4 nedēļas pirms pasākuma, lai pietiek laika arī pielaikošanām. Pavasarī pirms izlaidumiem - vēl agrāk. Ja laika ir mazāk, piezvaniet - iespējams, varēsim paspēt.',
        },
        {
          q: 'Vai var uzšūt tādu pašu apģērbu, kāds man jau ir?',
          a: 'Bieži vien var. Atnesiet apģērbu, un es apskatīšu, kā to varētu atkārtot.',
        },
        {
          q: 'Vai nepieciešama pielaikošana?',
          a: 'Jā, individuāli šūtam apģērbam parasti ir viena vai vairākas pielaikošanas, lai tas sēdētu nevainojami.',
        },
      ],
    },
  ],
  cta: {
    title: 'Jums ir ideja jaunam apģērbam?',
    text: 'Piesakieties konsultācijai darbnīcā Alūksnē. Izrunāsim Jūsu ideju, termiņu un cenu, un tikai tad kopā izlemsim, kā turpināt.',
    actions: [
      { kind: 'form', label: 'Pārrunāt savu ieceri', service: 'susana' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  related: [
    { label: 'Apģērbu pielāgošana', href: '/apgerbu-parsusana' },
    { label: 'Adīšana pēc pasūtījuma', href: '/adisana-pec-pasutijuma' },
  ],
};
