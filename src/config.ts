/**
 * Vienīgā vieta, kur glabājas vietnes iestatījumi un kontaktinformācija.
 * Site-wide settings and contact details live only here.
 */

export const site = {
  /** Domēns - viena vērtība visai vietnei (canonical, sitemap, og). */
  url: 'https://zaigasdarbnica.lv',
  name: 'Zaigas darbnīca',
  tagline: 'Šūšana un adīšana',
  locale: 'lv_LV',
  lang: 'lv',
  /**
   * Privātuma politikas „Spēkā no” datums, piem. '1. novembra'
   * → „Spēkā no: 2026. gada 1. novembra.” Tukšs = rinda netiek rādīta.
   */
  privacyDate: '',
} as const;

export const owner = {
  name: 'Zaiga Lemeševska',
  givenName: 'Zaiga',
} as const;

export const contact = {
  /** Tālrunis E.164 formātā tel: saitēm. */
  phoneE164: '+37126423325',
  /** Tālrunis rādīšanai (ar nedalāmām atstarpēm). */
  phoneDisplay: '+371 26 423 325',
  whatsappUrl: 'https://wa.me/37126423325',
  email: 'zaiga.paula@inbox.lv',
  address: {
    street: 'Tālavas iela 18',
    /** Lokatīvā: „Tālavas ielā 18”. */
    streetLocative: 'Tālavas ielā 18',
    city: 'Alūksne',
    postalCode: 'LV-4301',
    country: 'LV',
  },
  /** Google Maps saite „Atvērt Google Maps”. */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=T%C4%81lavas%20iela%2018%2C%20Al%C5%ABksne%2C%20LV-4301',
  areaServed: ['Alūksne', 'Gulbene', 'Balvi'],
} as const;

export const hours = {
  /** Īsā forma (informācijas rindām). */
  short: 'P.-S. 9:00-20:00',
  /** Garā forma (kājene, noslēgums). */
  long: 'Pirmdiena-sestdiena 9:00-20:00',
  /** Daļas, lai laika diapazons nekad nepārlūzt pie defises. */
  daysShort: 'P.-S.',
  daysLong: 'Pirmdiena-sestdiena',
  time: '9:00-20:00',
  closed: 'svētdienā slēgts',
  /** schema.org openingHours */
  schema: 'Mo-Sa 09:00-20:00',
  opens: '09:00',
  closes: '20:00',
} as const;

export const flags = {
  /** Rādīt atsauksmju sadaļu sākumlapā. */
  showReviews: true,
  /** Ja true, zem galerijas rāda „Attēli ir ilustratīvi”. */
  galleryIllustrative: false,
  /**
   * Google uzņēmuma profila atsauksmju saite. Kamēr tukša,
   * poga „Atstāt atsauksmi” netiek rādīta.
   */
  googleReviewUrl: '',
  /** GA4 mērījuma ID (piem. „G-XXXXXXX”). Tukšs = nav analītikas un nav sīkdatņu joslas. */
  ga4Id: '',
} as const;

/**
 * Kontaktforma. Parasti tā sūta uz /send.php (SiteGround, e-pasts caur SMTP).
 * Ja PHP e-pasts nedarbojas uzticami, ierakstiet šeit Web3Forms piekļuves atslēgu
 * (https://web3forms.com): forma sūtīs caur Web3Forms. Bezmaksas plānā foto
 * pievienot nevar, tāpēc foto lauks tad netiek rādīts.
 */
export const formConfig = {
  web3formsKey: '',
} as const;

/** Palīgfunkcijas saitēm. */
export const links = {
  tel: `tel:${contact.phoneE164}`,
  whatsapp: contact.whatsappUrl,
  mail: `mailto:${contact.email}`,
} as const;

/** Pilna absolūtā adrese ceļam (canonical, og). */
export function absoluteUrl(path = '/'): string {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return clean === '/' ? `${site.url}/` : `${site.url}${clean}`;
}
