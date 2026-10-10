/** /par-mani - Part B §8, teksts burtiski. */
import type { Action, ListItem } from './types';

export const parMani = {
  path: '/par-mani',
  name: 'Par mani',
  seo: {
    title: 'Par mani - Zaiga Lemeševska | Zaigas darbnīca',
    description:
      'Iepazīstiet Zaigu Lemeševsku - šuvēju un adītāju Alūksnē ar 20 gadu pieredzi, mācījusies šūšanas skolā „Burda Rīga”. Rūpīgs darbs par saprātīgu cenu.',
  },
  h1: 'Zaiga Lemeševska - šuvēja un adītāja, kurai rūp Jūsu lietas',
  story: {
    title: 'Kā es kļuvu par šuvēju un adītāju',
    paragraphs: [
      'Adīt mani jau bērnībā iemācīja mamma. Vakaros sēdējām kopā un adījām, un viņa stāstīja stāstus. No viņas iemācījos arī to, ka katrs darbs jādara rūpīgi. Tie vakari man joprojām ir sirdī.',
      'Vēlāk šūšanas amatu apguvu Rīgā, šūšanas skolā „Burda Rīga”. Kopš tā laika šuju un adu vairāk nekā 20 gadus. Šūšana man ir sirdslieta, un joprojām labprāt iemācos ko jaunu.',
      'Šodien strādāju savā darbnīcā Alūksnē, Tālavas ielā 18. Pie manis brauc klienti no Alūksnes, Gulbenes, Balviem un apkārtnes. Ja kādam nav laika atbraukt, es vai mana meita aizbraucam pēc apģērba paši. Katram darbam veltu tik laika, cik tam vajag, un cenas turu saprātīgas.',
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
      { title: 'Dažādi darbi', text: 'no maza ielāpa līdz kāzu kleitai, tautastērpam vai adītam pledam' },
      { title: 'Joprojām mācos', text: 'jaunas tehnikas un šūšanas teoriju' },
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
