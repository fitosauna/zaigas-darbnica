/**
 * Latviešu tipogrāfijas palīgi (A12):
 *  - nedalāma atstarpe starp skaitli un mērvienību (5 €, 50 km, 20 gadu),
 *  - nedalāma atstarpe pirms „ - ”, lai domuzīme nepaliek rindas sākumā,
 *  - nedalāma atstarpe ielas numurā („Tālavas ielā 18”),
 *  - diapazoni („3-4”) un „e-pasts” nelūzt pie defises (U+2060).
 * Lieto tikai ar parasto defisi „-” (nekad U+2013/U+2014).
 */
import { contact, links } from '../config';

const NBSP = ' ';

/** U+2060 (vārdu savienotājs): neredzams, neļauj rindai lūzt pie defises. */
const WJ = '\u2060';

export function typo(text: string): string {
  return text
    .replace(/ - /g, `${NBSP}- `)
    .replace(/(\d)-(\d)/g, `$1-${WJ}$2`)
    .replace(/\b([eE])-(past)/g, `$1-${WJ}$2`)
    .replace(/(\d) (€|km|gadu|gadus|gadiem|MB|nedēļas)/g, `$1${NBSP}$2`)
    .replace(/\b(iela|ielā|ielu) (\d+)/g, `$1${NBSP}$2`)
    .replace(/\bno (\d)/g, `no${NBSP}$1`)
    .replace(/© (\d)/g, `©${NBSP}$1`);
}

/** HTML saite uz tālruni ar nedalāmām atstarpēm (katrs tālrunis ir tel: saite, A10). */
export function telLinkHtml(): string {
  return `<a class="tel" href="${links.tel}">${contact.phoneDisplay}</a>`;
}

/** HTML saite uz WhatsApp. */
export function waLinkHtml(label = 'WhatsApp'): string {
  return `<a href="${links.whatsapp}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

/** Aizstāj tekstā „WhatsApp uz +371 26 423 325” ar abām saitēm. */
export function linkContacts(text: string): string {
  return typo(text)
    .replace(`WhatsApp uz ${contact.phoneDisplay}`, `${waLinkHtml()} uz ${telLinkHtml()}`)
    .replace(`uz ${contact.phoneDisplay}`, `uz ${telLinkHtml()}`);
}
