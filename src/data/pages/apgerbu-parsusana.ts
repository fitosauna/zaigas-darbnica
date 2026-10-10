/**
 * /apgerbu-parsusana - Part B §3. Teksts burtiski no Part B (A12), cenas no prices.ts.
 * Atkāpju no Part B nav (meta aprakstā „no 5 €” nāk no price('bikses-saisinasana')).
 * Piemēru bildes bez „pirms/pēc” apgalvojumiem (DESIGN.md §8).
 */
import { price } from '../prices';
import type { ServicePageData } from './types';

export const page: ServicePageData = {
  path: '/apgerbu-parsusana',
  name: 'Pielāgošana un pāršūšana',
  seo: {
    title: 'Apģērbu pāršūšana, bikšu saīsināšana | Zaigas darbnīca',
    description: `Apģērbu pāršūšana un pielāgošana Alūksnē: bikšu saīsināšana ${price('bikses-saisinasana')}, kleitu iespīlēšana, piedurkņu saīsināšana, izmēra maiņa. Lai apģērbs der tieši Jums.`,
  },
  h1: 'Apģērbu pielāgošana un pāršūšana Alūksnē',
  hero: {
    image: 'pakalpojumsPielagosana',
    swatch: 'linen',
    lead: 'Lai apģērbs sēž kā uzliets.',
    text: 'Bikses vienmēr par garām. Kleita patīk, bet sānos par platu. Internetā pirkts apģērbs dzīvē izskatās kā maiss. Tā notiek bieži, jo veikalu izmēri nav šūti tieši Jums. Es apģērbu pielāgoju Jūsu augumam.',
    actions: [
      { kind: 'form', label: 'Pieteikt pielaikošanu', service: 'pielagosana' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  blocks: [
    {
      type: 'list',
      title: 'Ko var pielāgot un pāršūt',
      items: [
        { title: 'Bikšu un džinsu saīsināšana', text: 'klasiskām, darba un sporta biksēm' },
        { title: 'Bikšu un svārku iespīlēšana vai palaišana', text: 'viduklī, gurnos vai kājās' },
        { title: 'Kleitu pielāgošana', text: 'iespīlēšana sānos, garuma maiņa, plecu un siksniņu korekcija' },
        { title: 'Piedurkņu saīsināšana', text: 'krekliem, blūzēm, jakām un mēteļiem' },
        { title: 'Izmēra maiņa', text: 'ja apģērbs kļuvis par lielu vai par mazu' },
        { title: 'Svētku, izlaiduma un kāzu tērpu pielāgošana', text: 'kleitas un uzvalki pirms pasākuma' },
        { title: 'Pāršūšana', text: 'vecāka apģērba pārveidošana mūsdienīgākā vai citam lietotājam' },
      ],
    },
    {
      type: 'benefits',
      title: 'Kā jutīsieties apģērbā, kas tiešām der',
      aside: { image: 'pielagosanaPielaikosana', shape: 'arch' },
      items: [
        {
          title: 'Izskatīsieties kārtīgi un sakopti.',
          text: 'Bikses nesaburzās pie kurpēm, kleita neslīd, piedurknes beidzas tur, kur vajag.',
        },
        { title: 'Jutīsieties ērti un droši.', text: 'Apģērbs nespiež un nav visu laiku jālabo.' },
        {
          title: 'Izmantosiet to, kas jau ir skapī.',
          text: 'Lieta, ko nevalkājāt, jo tā nederēja, atkal kļūst par iemīļotāko.',
        },
        {
          title: 'Vispirms pielaikojam.',
          text: 'Nogrieztu audumu nevar pielikt atpakaļ, tāpēc vispirms visu nospraužu un pārbaudu uz Jums.',
        },
        {
          title: 'Gatavs laikā pasākumam.',
          text: 'Ja apģērbs vajadzīgs izlaidumam, kāzām vai svētkiem, pasakiet datumu uzreiz - plānosim tā, lai paliek laiks arī otrai pielaikošanai.',
        },
      ],
    },
    {
      type: 'prices',
      title: 'Pielāgošanas cenas',
      group: 'pielagosana',
      note: 'Cenas ir orientējošas sākumcenas, materiāli iekļauti. Precīzu cenu pateikšu pēc pielaikošanas, pirms darba sākuma.',
    },
    {
      type: 'examples',
      images: [
        { image: 'darbi2', caption: 'Bikses saīsinātas pēc auguma' },
        { image: 'darbi3', caption: 'Izlaiduma kleita pielāgota pa augumam' },
      ],
    },
    {
      type: 'faq',
      title: 'Jautājumi par apģērbu pielāgošanu',
      items: [
        {
          q: 'Vai man jānāk uz pielaikošanu?',
          a: 'Vairumā gadījumu jā - tā var precīzi noteikt garumu un platumu. Bikšu saīsināšanai var arī atnest līdzi bikses, kuras der, vai pateikt precīzu garumu. Tad es vai mana meita varam bikses paņemt pie Jums, un nekur nav jābrauc. Uz pielaikošanu ņemiet līdzi apavus, ar kuriem valkāsiet apģērbu.',
        },
        {
          q: 'Vai var saīsināt džinsus?',
          a: 'Jā. Džinsus saīsinu tā, lai mala izskatītos kārtīgi un piestāvētu apģērbam.',
        },
        {
          q: 'Cik laikā pirms pasākuma jānes kleita?',
          a: 'Ieteicams vismaz divas nedēļas pirms pasākuma, īpaši pavasarī pirms izlaidumiem, kad darba ir daudz. Ja laika ir mazāk, piezvaniet - steidzamus darbus var paveikt ātrāk.',
        },
        {
          q: 'Vai var apģērbu padarīt lielāku?',
          a: 'Dažreiz var, ja vīlēs ir pietiekami daudz rezerves auduma. Apskatīšu un godīgi pateikšu, vai tas ir iespējams.',
        },
        {
          q: 'Vai var pielāgot internetā nopirktu apģērbu?',
          a: 'Jā. Tas ir viens no biežākajiem darbiem - apģērbs patīk, bet izmērs neder. Atnesiet to, un kopā izlemsim, ko var izdarīt.',
        },
        {
          q: 'Vai pielāgo arī kāzu kleitas?',
          a: 'Jā. Svētku un kāzu tērpiem plānojam vairākas pielaikošanas, lai viss būtu tieši tā, kā vajag.',
        },
      ],
    },
  ],
  cta: {
    title: 'Apģērbs ir labs, tikai mazliet neder?',
    text: 'Piesakieties uz pielaikošanu Alūksnē, Tālavas ielā 18. Kopā izlemsim, kā to padarīt tādu, lai Jūs tajā justos labi.',
    actions: [
      { kind: 'form', label: 'Pieteikt pielaikošanu', service: 'pielagosana' },
      { kind: 'tel', label: 'Zvanīt Zaigai' },
    ],
  },
  related: [
    { label: 'Apģērbu remonts', href: '/apgerbu-remonts' },
    { label: 'Individuālā šūšana', href: '/individuala-susana' },
  ],
};
