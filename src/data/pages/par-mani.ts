/** /par-mani - Part B §8, teksts burtiski. */
import type { Action, ListItem } from './types';

export const parMani = {
  path: '/par-mani',
  name: 'Par mani',
  seo: {
    title: 'Par mani - Zaiga Lemeševska | Zaigas darbnīca',
    description:
      'Iepazīstiet Zaigu Lemeševsku - šuvēju un adītāju Alūksnē ar 20 gadu pieredzi, mācījusies šūšanas skolā „Burda Rīga”. Kvalitāte par demokrātisku cenu.',
  },
  h1: 'Zaiga Lemeševska - šuvēja un adītāja, kurai rūp Jūsu lietas',
  /** Īsi fakti zem virsraksta (no §8.4). */
  facts: ['20 gadu pieredze', 'Šūšanas skola „Burda Rīga”', 'Darbnīca Alūksnē'],
  story: {
    title: 'Kā es kļuvu par šuvēju un adītāju',
    paragraphs: [
      'Mana mīlestība pret rokdarbiem sākās bērnībā. Vakaros sēdējām kopā ar mammu un adījām, kamēr viņa stāstīja stāstus. Tie vakari man joprojām ir sirdī - un adīt un šūt es turpinu arī šodien.',
      'Šūšanas amatu apguvu Rīgā, šūšanas skolā „Burda Rīga”. Kopš tā laika šuju un adu jau 20 gadus - un joprojām labprāt mācos, jo teorija un jaunas tehnikas palīdz strādāt vēl precīzāk.',
      'Šodien strādāju savā darbnīcā Alūksnē, Tālavas ielā 18, un pie manis brauc klienti no Alūksnes, Gulbenes, Balviem un apkārtnes. Man svarīgāka ir kvalitāte, nevis daudzums: katram darbam veltu tik daudz laika, cik tam vajag, un cenas paturu demokrātiskas.',
    ],
  },
  how: {
    title: 'Kā es strādāju',
    items: [
      {
        title: 'Vispirms uzklausīt.',
        text: 'Katra lieta un katrs cilvēks ir atšķirīgs. Pirms ķeros pie darba, noskaidroju, kā Jūs to valkāsiet un kādu rezultātu vēlaties.',
      },
      { title: 'Skaidra cena un termiņš.', text: 'Cenu un gatavības datumu pateikšu, pirms sāku darbu.' },
      {
        title: 'Nedaudz vairāk, nekā sarunāts.',
        text: 'Esmu gatava pārbaudīt vēl vienu vīli, piemeklēt piemērotāku diegu un atrast risinājumu arī tad, ja sākumā šķiet, ka tāda nav.',
      },
      { title: 'Uzticamība.', text: 'Darbu nododu sarunātajā laikā un tādā kvalitātē, kādu pati gribētu saņemt.' },
      { title: 'Godīgums.', text: 'Ja labošana nav naudas vērta, to pateikšu uzreiz.' },
    ] as ListItem[],
  },
  joy: {
    title: 'Kas man šajā darbā sagādā vislielāko prieku',
    text: 'Vislielāko prieku man sagādā brīdis, kad klients uzvelk apģērbu un smaida, jo tas beidzot der. Vai kad kāds pirmo reizi uzvelk tieši viņam uzadītu džemperi un saka: „Tieši tādu es gribēju.”',
  },
  experience: {
    title: 'Pieredze un prasmes',
    items: [
      { title: '20 gadu pieredze', text: 'šūšanā, apģērbu labošanā, pielāgošanā un adīšanā', inline: true },
      { title: 'Izglītība:', text: 'šūšanas skola „Burda Rīga”', inline: true },
      { title: 'Adīšana kopš bērnības', text: 'džemperi, zeķes, dūraiņi, arī latviskie raksti' },
      { title: 'Plašs darbu klāsts', text: 'no maza ielāpa līdz kāzu kleitai, tautastērpam vai adītam pledam' },
      { title: 'Nepārtraukta mācīšanās', text: 'jaunas tehnikas un teorētiskās zināšanas' },
    ] as ListItem[],
  },
  cta: {
    title: 'Iepazīsimies klātienē?',
    text: 'Atnesiet savu apģērbu vai pastāstiet par savu ideju. Labprāt uzklausīšu un pateikšu, kā varu palīdzēt.',
    actions: [
      { kind: 'link', label: 'Sazināties ar Zaigu', href: '/kontakti' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ] as Action[],
  },
};
