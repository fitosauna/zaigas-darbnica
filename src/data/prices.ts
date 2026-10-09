/**
 * CENRĀDIS - katra cena glabājas tikai šeit.
 * Sākumlapa, pakalpojumu lapas un /cenas ņem cenas no šī faila,
 * tāpēc tās nekad nevar atšķirties.
 *
 * Lai mainītu cenu, nomainiet `amount` (eiro, ar punktu: 3.5 = 3,50 €).
 * `amount: null` nozīmē, ka tiek rādīts `note` (piem. „pēc vienošanās”).
 */

export type PriceItem = {
  /** Stabils identifikators, uz ko atsaucas teksti (nemainiet). */
  id: string;
  label: string;
  amount: number | null;
  /** Mērvienība aiz cenas, piem. „m” → „no 1,50 € / m”. */
  unit?: string;
  /** Teksts cenas vietā, ja `amount` ir null. */
  note?: string;
};

export type PriceGroupId = 'remonts' | 'pielagosana' | 'susana' | 'adisana' | 'aizkari';

export type PriceGroup = {
  id: PriceGroupId;
  title: string;
  /** Kolonnas virsraksts („Darbs” vai „Adījums”). */
  column: string;
  items: PriceItem[];
};

export const priceGroups: PriceGroup[] = [
  {
    id: 'remonts',
    title: 'Apģērbu remonts',
    column: 'Darbs',
    items: [
      { id: 'pogas-piesusana', label: 'Pogas piešūšana', amount: 0.5 },
      { id: 'slidna-nomaina', label: 'Rāvējslēdzēja slīdņa nomaiņa', amount: 3 },
      { id: 'cauruma-salabosana', label: 'Cauruma salabošana vai ielāps', amount: 3.5 },
      { id: 'viles-salabosana', label: 'Atirušas vīles salabošana', amount: 4 },
      { id: 'ravejsledzejs-bikses', label: 'Rāvējslēdzēja maiņa biksēm, svārkiem, džinsiem', amount: 7 },
      { id: 'ravejsledzejs-kleita', label: 'Rāvējslēdzēja maiņa kleitai', amount: 8 },
      { id: 'ravejsledzejs-bernu-jaka', label: 'Rāvējslēdzēja maiņa bērnu jakai', amount: 12 },
      { id: 'odere-svarki', label: 'Oderes nomaiņa svārkiem', amount: 15 },
      { id: 'ravejsledzejs-jaka', label: 'Rāvējslēdzēja maiņa jakai vai mētelim', amount: 16 },
      { id: 'odere-jaka', label: 'Oderes nomaiņa jakai vai mētelim', amount: 23 },
    ],
  },
  {
    id: 'pielagosana',
    title: 'Pielāgošana un pāršūšana',
    column: 'Darbs',
    items: [
      { id: 'bikses-saisinasana', label: 'Bikšu vai džinsu saīsināšana', amount: 5 },
      { id: 'svarki-saisinasana', label: 'Svārku saīsināšana', amount: 6 },
      { id: 'kleita-saisinasana', label: 'Kleitas saīsināšana', amount: 7 },
      { id: 'piedurknes-krekls', label: 'Piedurkņu saīsināšana kreklam vai blūzei', amount: 7 },
      { id: 'bikses-iespilesana', label: 'Bikšu vai svārku iespīlēšana', amount: 9 },
      { id: 'kleita-iespilesana', label: 'Kleitas vai blūzes iespīlēšana', amount: 9 },
      { id: 'piedurknes-jaka', label: 'Piedurkņu saīsināšana jakai vai mētelim', amount: 13 },
      { id: 'jaka-iespilesana', label: 'Jakas vai mēteļa iespīlēšana', amount: 13 },
    ],
  },
  {
    id: 'susana',
    title: 'Individuālā šūšana',
    column: 'Darbs',
    items: [
      { id: 'svarku-susana', label: 'Svārku šūšana', amount: 40 },
      { id: 'biksu-susana', label: 'Bikšu šūšana', amount: 50 },
      { id: 'kleitas-susana', label: 'Kleitas šūšana', amount: 65 },
      { id: 'svetku-terpi', label: 'Svētku, kāzu un sarežģītāki tērpi', amount: null, note: 'pēc vienošanās' },
    ],
  },
  {
    id: 'adisana',
    title: 'Adīšana pēc pasūtījuma',
    column: 'Adījums',
    items: [
      { id: 'bernu-zekes', label: 'Bērnu zeķes', amount: 8 },
      { id: 'zeku-paris', label: 'Zeķu pāris', amount: 16 },
      { id: 'cimdi', label: 'Cimdu vai dūraiņu pāris', amount: 18 },
      { id: 'cepure', label: 'Cepure', amount: 18 },
      { id: 'salle', label: 'Šalle', amount: 22 },
      { id: 'bernu-jacina', label: 'Bērnu jaciņa', amount: 40 },
      { id: 'dzemperis', label: 'Džemperis', amount: 65 },
      { id: 'adita-labosana', label: 'Adīta apģērba labošana', amount: 5 },
      { id: 'pledi', label: 'Pledi un citi adījumi', amount: null, note: 'pēc vienošanās' },
    ],
  },
  {
    id: 'aizkari',
    title: 'Aizkari un mājas tekstils',
    column: 'Darbs',
    items: [
      { id: 'overloks', label: 'Malu apstrāde ar overloku', amount: 1.5, unit: 'm' },
      { id: 'aizkaru-lente', label: 'Aizkaru lentes piešūšana', amount: 3, unit: 'm' },
      { id: 'aizkaru-saisinasana', label: 'Veikalā pirktu aizkaru saīsināšana', amount: 4, unit: 'm' },
      { id: 'aizkaru-susana', label: 'Aizkaru šūšana pēc izmēriem', amount: null, note: 'pēc izmēriem un auduma' },
      { id: 'galdauti', label: 'Galdauti, pārvalki un cits tekstils', amount: null, note: 'pēc izmēriem un auduma' },
    ],
  },
];

/** Cenu piezīme zem katras cenu tabulas (Part B, kopējie elementi). */
export const priceNote =
  'Cenas ir orientējošas sākumcenas. Precīzu cenu pateikšu, kad būšu apskatījusi darbu - vienmēr pirms darba sākuma.';

const NBSP = ' ';

/** 3.5 → „3,50”, 5 → „5”, 0.5 → „0,50”. */
export function formatAmount(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace('.', ',');
}

/** Atrod cenu pēc id jebkurā grupā. */
export function priceItem(id: string): PriceItem {
  for (const group of priceGroups) {
    const found = group.items.find((item) => item.id === id);
    if (found) return found;
  }
  throw new Error(`Cena ar id „${id}” nav atrasta src/data/prices.ts`);
}

/**
 * Cena tekstā ar nedalāmām atstarpēm: „no 5 €”, „no 1,50 € / m”
 * vai piezīme („pēc vienošanās”).
 */
export function formatPrice(item: PriceItem, withFrom = true): string {
  if (item.amount === null) return item.note ?? '';
  const base = `${withFrom ? `no${NBSP}` : ''}${formatAmount(item.amount)}${NBSP}€`;
  return item.unit ? `${base}${NBSP}/${NBSP}${item.unit}` : base;
}

/** Saīsinājums: price('bikses-saisinasana') → „no 5 €”. */
export function price(id: string, withFrom = true): string {
  return formatPrice(priceItem(id), withFrom);
}

/** Kā price(), bet mērvienība bez atstarpēm: „no 4 €/m” (meta aprakstiem, kā Part B). */
export function priceCompact(id: string): string {
  return price(id).replace(`${NBSP}/${NBSP}`, '/');
}
