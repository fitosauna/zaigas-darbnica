/**
 * Biežāk uzdotie jautājumi. Cenas atbildēs nāk no src/data/prices.ts.
 * Atbildes var saturēt vienkāršu HTML saitēm (`html: true`).
 */
import { contact } from '../config';
import { price } from './prices';
import { linkContacts } from '../lib/typo';

export type Faq = { q: string; a: string; html?: boolean };

/** Visas atbildes iet caur linkContacts(): nedalāmas atstarpes + tel:/WhatsApp saites. */
const prepare = (items: Faq[]): Faq[] => items.map((f) => ({ q: f.q, a: linkContacts(f.a), html: true }));

export const homeFaq: Faq[] = prepare([
  {
    q: 'Cik maksā apģērbu labošana?',
    a: `Cena atkarīga no apģērba un darba apjoma. Piemēram, bikšu saīsināšana maksā ${price('bikses-saisinasana')}, rāvējslēdzēja maiņa biksēm ${price('ravejsledzejs-bikses')}, bet jakai ${price('ravejsledzejs-jaka')}. Materiāli jau ir iekļauti cenā. Visas cenas atradīsiet lapā <a href="/cenas">„Cenas”</a>.`,
  },
  {
    q: 'Cik ilgi jāgaida?',
    a: 'Termiņš atkarīgs no darba apjoma, tāpēc gatavības datumu sarunājam uzreiz. Ja vajag steidzami, piezvaniet - steidzamus darbus var paveikt ātrāk, un visu sarunāsim pa telefonu.',
  },
  {
    q: 'Vai var uzzināt cenu pēc foto?',
    a: `Jā. Atsūtiet foto WhatsApp uz ${contact.phoneDisplay} un īsi aprakstiet, kas jādara. Pateikšu, vai to var izdarīt un aptuveni cik tas maksās, pirms braucat uz darbnīcu.`,
  },
  {
    q: 'Vai Jūs arī adāt pēc pasūtījuma?',
    a: 'Jā. Uzadu zeķes, dūraiņus, cepures, šalles, džemperus, jakas, pledus un citas lietas, kā arī laboju adītus apģērbus.',
  },
  {
    q: 'Vai pieņemat klientus no Gulbenes un Balviem?',
    a: `Protams. Darbnīca atrodas Alūksnē, ${contact.address.streetLocative}, un pie manis brauc klienti arī no Gulbenes, Balviem un apkārtnes.`,
  },
  {
    q: 'Vai var atnest savu audumu vai dziju?',
    a: 'Jā, protams. Varat atnest savu audumu vai dziju, vai arī kopā izvēlēsimies piemērotāko.',
  },
  {
    q: 'Vai ir vērts labot lētu apģērbu?',
    a: 'Godīgi pateikšu. Ja labošana maksātu gandrīz tikpat, cik jauna lieta, ieteikšu to nedarīt.',
  },
]);

/** Teksts bez HTML (FAQPage JSON-LD). */
export function faqPlainText(faq: Faq): string {
  return faq.html ? faq.a.replace(/<[^>]+>/g, '') : faq.a;
}
