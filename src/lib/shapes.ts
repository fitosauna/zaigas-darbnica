/**
 * Formu palīgi: „zigzag” (pinked) auduma malas kā clip-path polygon.
 * Zobu dziļums ir pikseļos (vienāds jebkurā izmērā), zobu skaits - pēc malas garuma.
 */

function edge(count: number, fn: (i: number) => string): string[] {
  return Array.from({ length: count + 1 }, (_, i) => fn(i));
}

/**
 * @param teethX zobu skaits augšējā/apakšējā malā
 * @param teethY zobu skaits sānu malās
 * @param depth zoba dziļums px
 */
export function pinkedPolygon(teethX = 34, teethY = 26, depth = 5): string {
  const d = depth;
  const top = edge(teethX * 2, (i) => `${((i / (teethX * 2)) * 100).toFixed(3)}% ${i % 2 ? d : 0}px`);
  const right = edge(teethY * 2, (i) => `calc(100% - ${i % 2 ? d : 0}px) ${((i / (teethY * 2)) * 100).toFixed(3)}%`).slice(1);
  const bottom = edge(teethX * 2, (i) => `${(100 - (i / (teethX * 2)) * 100).toFixed(3)}% calc(100% - ${i % 2 ? d : 0}px)`).slice(1);
  const left = edge(teethY * 2, (i) => `${i % 2 ? d : 0}px ${(100 - (i / (teethY * 2)) * 100).toFixed(3)}%`).slice(1, -1);
  return `polygon(${[...top, ...right, ...bottom, ...left].join(',')})`;
}
