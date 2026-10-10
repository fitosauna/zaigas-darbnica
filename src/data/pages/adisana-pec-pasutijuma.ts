/**
 * /adisana-pec-pasutijuma - Part B §5. Teksts burtiski no Part B (A12), cenas no prices.ts.
 * Atkāpju no Part B nav (meta aprakstā „no 16 €” nāk no price('zeku-paris')).
 * Piemēros nav pleda - tā bildes nav, to neizdomājam (DESIGN.md §8).
 */
import { contact } from '../../config';
import { price } from '../prices';
import type { ServicePageData } from './types';

export const page: ServicePageData = {
  path: '/adisana-pec-pasutijuma',
  name: 'Adīšana pēc pasūtījuma',
  seo: {
    title: 'Adīšana pēc pasūtījuma Alūksnē | Zaigas darbnīca',
    description: `Ar rokām adītas zeķes ${price('zeku-paris')}, dūraiņi, cepures, šalles, džemperi un pledi pēc pasūtījuma Alūksnē, kā arī adītu apģērbu labošana. Adītāja ar 20 gadu pieredzi.`,
  },
  h1: 'Adīšana pēc pasūtījuma Alūksnē',
  hero: {
    image: 'pakalpojumsAdisana',
    swatch: 'knit',
    lead: 'Ar rokām adītas zeķes, dūraiņi un džemperi pēc pasūtījuma.',
    text: 'Veikala džemperis pirmajā ziemā sabumbulojas, zeķes ātri izdilst, un īsti siltu adījumu atrast ir grūti. Ar rokām adīta lieta ir siltāka un valkājas gadiem. Uzadīšu to Jūsu izmērā, krāsā un ar rakstu, kādu izvēlaties. Adīt mani iemācīja mamma, kad biju vēl maza.',
    actions: [
      { kind: 'form', label: 'Pasūtīt adījumu', service: 'adisana' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  blocks: [
    {
      type: 'list',
      title: 'Ko varu uzadīt',
      items: [
        { title: 'Zeķes', text: 'vilnas zeķes ikdienai, ziemai, mājām un dāvināšanai' },
        { title: 'Dūraiņi un cimdi', text: 'arī ar latviskiem rakstiem' },
        { title: 'Cepures un šalles', text: 'Jūsu gaumei, izmēram un sezonai' },
        { title: 'Džemperi un jakas', text: 'sievietēm, vīriešiem un bērniem' },
        { title: 'Pledi un spilveni', text: 'mājām un dāvināšanai' },
        { title: 'Bērnu adījumi', text: 'zeķītes, cepurītes, jaciņas, komplekti jaundzimušajiem' },
        { title: 'Adījumi pēc parauga vai bildes', text: 'ja ir ideja vai iemīļota lieta, ko gribētos vēl vienu' },
      ],
      note: 'Uzņemos arī netipiskus pasūtījumus - idejas izdomāsim kopā.',
    },
    {
      type: 'bullets',
      title: 'Adītu apģērbu labošana',
      intro: 'Arī iemīļotu adītu lietu bieži var izglābt:',
      items: [
        'caurumu un izdilušu vietu salabošana džemperos un zeķēs',
        'noirušu valdziņu atjaunošana',
        'piedurkņu un garuma maiņa adītiem apģērbiem',
        'apdares, apkakļu un pogu nomaiņa',
      ],
    },
    {
      type: 'steps',
      title: 'No idejas līdz adījumam',
      aside: { image: 'adisanaDzijas', shape: 'print' },
      steps: [
        {
          title: 'Izrunājam ideju.',
          text: 'Ko vēlaties, kam tas būs un kad vajadzīgs. Varat parādīt bildi vai līdzīgu lietu.',
        },
        {
          title: 'Izvēlamies dziju un rakstu.',
          text: 'Varat atnest savu dziju vai kopā izvēlēsimies piemērotāko - vilnu, kokvilnu vai jauktu.',
        },
        { title: 'Noņemu izmērus.', text: 'Lai džemperis vai jaka derētu tieši Jums.' },
        { title: 'Sarunājam cenu un termiņu.', text: 'Pirms darba sākuma, lai nav pārsteigumu.' },
        { title: 'Saņemiet gatavu adījumu.', text: 'Ja vajag, darba gaitā pielaikojam.' },
      ],
    },
    {
      type: 'benefits',
      title: 'Kāpēc ar rokām adīts?',
      items: [
        {
          title: 'Silts un izturīgs.',
          text: 'Laba dzija un blīvs adījums valkājas gadiem un nesabumbulojas pēc pirmās ziemas.',
        },
        {
          title: 'Tieši Jūsu izmērā.',
          text: 'Piedurknes pareizā garumā, džemperis nav ne par īsu, ne par platu.',
        },
        { title: 'Jūsu gaumē.', text: 'Jūs izvēlaties krāsu, dziju un rakstu - arī latviskus rakstus.' },
        {
          title: 'Laba dāvana.',
          text: 'Ar rokām adītas zeķes, dūraiņi vai pleds ir īpaša dāvana Ziemassvētkiem, jubilejām un kristībām.',
        },
      ],
    },
    {
      type: 'prices',
      title: 'Adīšanas cenas',
      group: 'adisana',
      note: 'Cena atkarīga no izmēra, raksta un dzijas - to saskaņosim pirms darba. Varat atnest arī savu dziju.',
    },
    {
      type: 'examples',
      images: [
        { image: 'darbi4', caption: 'Ar rokām adīts džemperis pēc pasūtījuma' },
        { image: 'darbi5', caption: 'Adītas vilnas zeķes un dūraiņi' },
        { image: 'adisanaLatviskieRaksti', caption: 'Dūraiņi ar latviskiem rakstiem' },
      ],
    },
    {
      type: 'faq',
      title: 'Jautājumi par adīšanu',
      items: [
        {
          q: 'Cik ilgi jāgaida adīts džemperis?',
          a: 'Tas atkarīgs no izmēra un raksta. Termiņu sarunāsim jau sākumā, lai zinātu, kad tas būs gatavs. Ja adījums vajadzīgs dāvanai konkrētā datumā, pasakiet to uzreiz.',
        },
        {
          q: 'Vai varu atnest savu dziju?',
          a: 'Jā. Ja nezināt, cik dzijas vajag, pateikšu to pirms pirkšanas.',
        },
        {
          q: 'Vai var uzadīt pēc bildes?',
          a: `Jā. Atsūtiet bildi WhatsApp uz ${contact.phoneDisplay}, un izrunāsim, kā to uzadīt Jūsu izmērā.`,
        },
        {
          q: 'Vai adāt arī latviskos rakstus?',
          a: 'Jā, dūraiņos, zeķēs un džemperos var adīt arī latviskos rakstus. Izvēlēsimies tos kopā.',
        },
        {
          q: 'Vai var pasūtīt adījumu dāvanai?',
          a: 'Jā. Ja zināt apdāvinātā izmēru un gaumi, uzadīšu dāvanu un pateikšu, kad tā būs gatava.',
        },
        {
          q: 'Vai varat salabot adītu džemperi?',
          a: 'Jā. Caurumus, izdilušas vietas un noirušus valdziņus var salabot. Atsūtiet foto, un pateikšu, kā to var izdarīt.',
        },
      ],
    },
  ],
  cta: {
    title: 'Vēlaties kaut ko siltu un adītu tieši Jums?',
    text: 'Pastāstiet, ko vēlaties, un uzadīšu. Darbnīca atrodas Alūksnē, Tālavas ielā 18.',
    actions: [
      { kind: 'form', label: 'Pasūtīt adījumu', service: 'adisana' },
      { kind: 'whatsapp', label: 'Rakstīt WhatsApp' },
    ],
    aside: { image: 'zaigaRokasAdisana', shape: 'arch' },
  },
  related: [
    { label: 'Individuālā šūšana', href: '/individuala-susana' },
    { label: 'Cenas', href: '/cenas' },
  ],
};
