/**
 * /apgerbu-remonts - Part B §2. Teksts burtiski no Part B (A12), cenas no prices.ts.
 * Vienīgā atkāpe: meta aprakstā „Zvani” → „Zvaniet +371 26 423 325” (A12 „Jūs” forma).
 */
import { contact, pickup } from '../../config';
import { price } from '../prices';
import type { ServicePageData } from './types';

export const page: ServicePageData = {
  path: '/apgerbu-remonts',
  name: 'Apģērbu remonts',
  seo: {
    title: 'Apģērbu remonts Alūksnē | Zaigas darbnīca',
    description: `Apģērbu remonts un labošana Alūksnē: rāvējslēdzēja maiņa ${price('ravejsledzejs-bikses')}, atirušas vīles, caurumi un ielāpi, oderes nomaiņa. Materiāli iekļauti cenā. Zvaniet ${contact.phoneDisplay}.`,
  },
  h1: 'Apģērbu remonts un labošana Alūksnē',
  hero: {
    image: 'pakalpojumsRemonts',
    swatch: 'denim',
    lead: 'Saplīsis rāvējslēdzējs vai atirusi vīle? To var salabot.',
    text: 'Mētelis vēl kā jauns, bet rāvējslēdzējs vairs neaizveras. Džinsi sēž lieliski, bet vīle atirusi. Tas nenozīmē, ka jāpērk jauns. Labošana maksā daļu no jaunas lietas cenas, un Jums paliek apģērbs, kas jau der un patīk.',
    actions: [
      { kind: 'whatsapp', label: 'Atsūtīt foto WhatsApp' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  blocks: [
    {
      type: 'list',
      title: 'Biežākie apģērbu remontdarbi',
      items: [
        { title: 'Rāvējslēdzēja maiņa', text: 'jakām, mēteļiem, kombinezoniem, biksēm, svārkiem, džemperiem un kleitām' },
        { title: 'Atirušas vīles', text: 'sānos, piedurknēs, kabatās un kāju starpā' },
        { title: 'Caurumi un plīsumi', text: 'ielāpi un salabošana, piemeklējot piemērotu audumu un diegus' },
        { title: 'Oderes nomaiņa vai salabošana', text: 'jakām, mēteļiem, žaketēm un svārkiem' },
        { title: 'Kabatas', text: 'izdilušu vai caurumainu kabatu salabošana' },
        { title: 'Pogas, spiedpogas un āķīši', text: 'piešūšana un nomaiņa' },
        { title: 'Bērnu apģērbs', text: 'kombinezoni, bikses ar caurumiem ceļgalos, jakas' },
        { title: 'Darba apģērbs, āda un biezi audumi', text: 'netipiskus darbus labprāt apskatīšu, atsūtiet foto' },
      ],
    },
    {
      type: 'benefits',
      title: 'Kāpēc labot, nevis pirkt jaunu?',
      aside: { image: 'darbi1', shape: 'print' },
      items: [
        {
          title: 'Ietaupiet naudu.',
          text: `Jaunas ziemas jakas cena nereti ir vairāki simti eiro. Rāvējslēdzēja maiņa jakai pie manis maksā ${price('ravejsledzejs-jaka')}, un jaunais rāvējslēdzējs jau ir iekļauts cenā.`,
        },
        {
          title: 'Saglabājiet apģērbu, kas jau der.',
          text: 'Jauns apģērbs ne vienmēr sēž tik labi kā iemīļotais vecais, un kvalitāte nereti ir pat sliktāka.',
        },
        {
          title: 'Izskatās kārtīgi.',
          text: 'Labi salabots apģērbs neizskatās „salabots”. Diegus un materiālus piemeklēju audumam piemērotā krāsā.',
        },
        { title: 'Kalpo ilgāk.', text: 'Labs rāvējslēdzējs un stipra vīle bieži iztur ilgāk nekā oriģinālie.' },
        {
          title: 'Godīgs vērtējums.',
          text: 'Ne katru bojājumu var salabot pilnīgi neredzami, tāpēc pirms darba atklāti izrunāsim, kāds būs rezultāts. Ja labot neatmaksājas, pateikšu uzreiz.',
        },
      ],
    },
    {
      type: 'prices',
      title: 'Apģērbu remonta cenas',
      group: 'remonts',
      note: 'Materiāli (rāvējslēdzējs, odere, diegi) ir iekļauti cenā. Cenas ir orientējošas sākumcenas - precīzu cenu pateikšu, kad būšu apskatījusi apģērbu, vienmēr pirms darba sākuma.',
    },
    { type: 'compare' },
    {
      type: 'faq',
      title: 'Jautājumi par apģērbu remontu',
      items: [
        {
          q: 'Vai rāvējslēdzēju vienmēr vajag mainīt pilnībā?',
          a: 'Ne vienmēr. Ja zobiņi ir veseli un vainojams tikai slīdnis, pietiek nomainīt slīdni - tas ir lētāk un ātrāk. Apskatīšu un pateikšu, kas Jūsu apģērbam der labāk.',
        },
        {
          q: 'Vai man pašam jānopērk rāvējslēdzējs?',
          a: 'Nē. Rāvējslēdzējus, oderi un diegus nodrošinu es, un tie jau ir iekļauti cenā.',
        },
        {
          q: 'Vai var salabot ziemas jaku vai ādas jaku?',
          a: 'Jā, labprāt uzņemos arī biezus un netipiskus apģērbus. Atsūtiet foto, un pateikšu, kā to var salabot.',
        },
        {
          q: 'Vai var salabot caurumu tā, lai to nevarētu redzēt?',
          a: 'Tas atkarīgs no auduma un vietas. Dažreiz cauruma gandrīz nevar redzēt, citreiz labāks risinājums ir glīts ielāps. Pirms darba izrunāsim, kāds būs rezultāts.',
        },
        {
          q: 'Vai apģērbam jābūt izmazgātam?',
          a: 'Jā, lūdzu, atnesiet tīru apģērbu. Tā var strādāt precīzāk, un rezultāts būs labāks.',
        },
        {
          q: 'Vai varat salabot ātri?',
          a: `Jā, steidzamus darbus var paveikt ātrāk. Piezvaniet uz ${contact.phoneDisplay}, un sarunāsim termiņu.`,
        },
      ],
    },
  ],
  cta: {
    title: 'Nepametiet iemīļoto apģērbu skapī',
    text: `Atsūtiet foto WhatsApp, un pateikšu, vai to var salabot un cik tas maksās. Darbnīca atrodas Alūksnē, Tālavas ielā 18. ${pickup.sentence}`,
    actions: [
      { kind: 'whatsapp', label: 'Atsūtīt foto WhatsApp' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  related: [
    { label: 'Apģērbu pielāgošana un pāršūšana', href: '/apgerbu-parsusana' },
    { label: 'Cenas', href: '/cenas' },
  ],
};
