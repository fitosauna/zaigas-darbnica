import { services } from './services';

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/** Izvēlne: Sākums · Pakalpojumi (5) · Cenas · Par mani · Kontakti. */
export const mainNav: NavItem[] = [
  { label: 'Sākums', href: '/' },
  {
    label: 'Pakalpojumi',
    href: '/#pakalpojumi',
    children: services.map((s) => ({ label: s.name, href: s.href })),
  },
  { label: 'Cenas', href: '/cenas' },
  { label: 'Par mani', href: '/par-mani' },
  { label: 'Kontakti', href: '/kontakti' },
];
