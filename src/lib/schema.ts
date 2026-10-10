/** JSON-LD struktūrdati (bez atsauksmju/vērtējumu shēmas, A9). */
import { absoluteUrl, contact, hours, owner, site } from '../config';
import { faqPlainText, type Faq } from '../data/faq';

export function localBusiness(logoUrl: string) {
  return {
    '@context': 'https://schema.org',
    // schema.org nav tipa „Tailor”; lietojam LocalBusiness + knowsAbout (sk. DESIGN.md).
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#darbnica`,
    name: site.name,
    description: 'Šūšana un adīšana Alūksnē: apģērbu remonts un pielāgošana, individuālā šūšana, adīšana pēc pasūtījuma, aizkari un mājas tekstils.',
    url: absoluteUrl('/'),
    logo: new URL(logoUrl, site.url).href,
    image: absoluteUrl('/og-image.jpg'),
    telephone: contact.phoneE164,
    email: contact.email,
    founder: { '@type': 'Person', name: owner.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    openingHours: hours.schema,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    areaServed: contact.areaServed.map((name) => ({ '@type': 'City', name })),
    priceRange: '€',
    knowsAbout: [
      'Apģērbu remonts',
      'Apģērbu pielāgošana un pāršūšana',
      'Individuālā šūšana',
      'Adīšana pēc pasūtījuma',
      'Aizkaru un mājas tekstila šūšana',
    ],
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: faqPlainText(f) },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Droša JSON ievietošana <script> tagā. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
