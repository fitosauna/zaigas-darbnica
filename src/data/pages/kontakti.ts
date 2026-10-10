/**
 * /kontakti - Part B §9. Kontaktdati un darba laiks nāk no src/config.ts.
 * Formas papildu teksti (foto lauka norāde, kartes poga un sīkdatņu piezīme,
 * e-pasta un foto kļūdas) nav Part B - tie ir īsi, „Jūs” formā (DESIGN.md).
 */
import { contact, hours } from '../../config';
import type { FormService, ListItem } from './types';

export const kontakti = {
  path: '/kontakti',
  name: 'Kontakti',
  seo: {
    title: 'Kontakti - šuvēja Alūksnē | Zaigas darbnīca',
    description: `Zaigas darbnīca, ${contact.address.street}, ${contact.address.city}. Tālrunis un WhatsApp ${contact.phoneDisplay}, ${contact.email}. ${hours.long}.`,
  },
  h1: 'Sazinieties ar Zaigu',
  intro:
    'Ir apģērbs, ko gribētu salabot vai pielāgot, vai ideja, ko uzšūt vai uzadīt? Piezvaniet, uzrakstiet WhatsApp vai atsūtiet foto. Atbildēšu, cik drīz vien varēšu.',
  info: {
    title: 'Kontaktinformācija',
    business: 'Zaigas darbnīca',
    master: 'meistare Zaiga Lemeševska',
    whatsappNote: 'ērtākais veids, kā atsūtīt foto',
  },
  hours: {
    title: 'Darba laiks',
    rows: [
      { label: hours.daysLong, value: hours.time },
      { label: 'Svētdiena', value: 'Slēgts', note: true },
    ],
    note: 'Pirms ierašanās, lūdzu, piezvaniet, lai Jums nebūtu jāgaida.',
  },
  find: {
    title: 'Kā atrast darbnīcu',
    text: 'Darbnīca atrodas Alūksnē, Tālavas ielā 18. Pirms braucat, lūdzu, piezvaniet. Auto varat atstāt pie mājas, un iekšā nāciet pa mājas durvīm.',
    mapButton: 'Atvērt Google Maps',
    /** Kartes priekšskatījums (karte ielādējas tikai pēc klikšķa). */
    loadMap: 'Rādīt karti',
    mapNote: 'Karte tiek ielādēta no Google tikai pēc klikšķa. Tad Google var saglabāt sīkdatnes.',
    mapTitle: 'Karte: Tālavas iela 18, Alūksne',
  },
  cities: {
    title: 'Klienti no Alūksnes, Gulbenes un Balviem',
    intro:
      'Darbnīca atrodas Alūksnē, bet pie manis brauc klienti arī no Gulbenes, Balviem un apkārtējiem pagastiem.',
    items: [
      { title: 'Alūksne un Alūksnes novads', text: 'darbnīca ir tepat Alūksnē' },
      { title: 'Gulbene un Gulbenes novads', text: '42 km līdz darbnīcai' },
      { title: 'Balvi un Balvu novads', text: '42 km līdz darbnīcai' },
    ] as ListItem[],
    tipLead: 'Padoms, ja braucat no tālienes:',
    tip: 'vispirms atsūtiet foto WhatsApp, lai jau iepriekš zinātu, vai darbu var izdarīt un cik tas maksās. Ja iespējams, atvediet vairākas lietas uzreiz.',
  },
  form: {
    title: 'Uzrakstiet man',
    intro: 'Aprakstiet, kas jādara, un, ja varat, pievienojiet foto. Atbildēšu ar aptuvenu cenu un laiku.',
    services: [
      { value: 'remonts', label: 'Apģērbu remonts' },
      { value: 'pielagosana', label: 'Pielāgošana un pāršūšana' },
      { value: 'susana', label: 'Individuālā šūšana' },
      { value: 'adisana', label: 'Adīšana pēc pasūtījuma' },
      { value: 'aizkari', label: 'Aizkari un mājas tekstils' },
      { value: 'logi', label: 'Logu nomērīšana' },
      { value: 'cits', label: 'Cits' },
    ] as { value: FormService; label: string }[],
    places: [
      { value: 'aluksne', label: 'Alūksne' },
      { value: 'gulbene', label: 'Gulbene' },
      { value: 'balvi', label: 'Balvi' },
      { value: 'cita', label: 'Cita vieta' },
    ],
    labels: {
      name: 'Vārds',
      phone: 'Tālrunis',
      email: 'E-pasts',
      service: 'Pakalpojums',
      place: 'No kurienes esat?',
      what: 'Kas jādara?',
      when: 'Kad tas vajadzīgs?',
      photo: 'Pievienot foto',
      optional: 'nav obligāts',
      choose: 'Izvēlieties',
      consent: 'Piekrītu, ka mani dati tiek izmantoti, lai atbildētu uz manu pieprasījumu.',
      privacy: 'Privātuma politika',
      submit: 'Nosūtīt',
      sending: 'Sūta…',
      photoHint: 'JPG, PNG, WebP vai HEIC, līdz 10 MB',
    },
    placeholders: {
      what: 'Piemēram: ziemas jakai jānomaina rāvējslēdzējs',
      when: 'Piemēram: līdz izlaidumam 15. jūnijā',
    },
    errors: {
      vards: 'Lūdzu, ierakstiet savu vārdu.',
      talrunis: 'Lūdzu, ierakstiet tālruņa numuru.',
      apraksts: 'Lūdzu, īsi aprakstiet, kas jādara.',
      piekrisana: 'Lūdzu, apstipriniet piekrišanu.',
      epasts: 'Lūdzu, pārbaudiet e-pasta adresi.',
      fotoSize: 'Foto ir par lielu. Lūdzu, pievienojiet failu līdz 10 MB.',
      fotoType: 'Lūdzu, pievienojiet foto JPG, PNG, WebP vai HEIC formātā.',
    },
    success: 'Paldies! Jūsu ziņa ir saņemta. Atbildēšu, cik drīz vien varēšu.',
    failure: `Ziņu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai piezvaniet uz ${contact.phoneDisplay}.`,
  },
  before: {
    title: 'Pirms ierašanās',
    items: [
      'Atnesiet apģērbu tīru un izmazgātu.',
      'Uz pielaikošanu ņemiet līdzi apavus, ar kuriem valkāsiet apģērbu.',
      'Ja lieta vajadzīga konkrētā datumā, pasakiet to uzreiz.',
    ],
  },
};
