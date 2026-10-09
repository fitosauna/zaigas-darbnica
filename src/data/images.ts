/**
 * ATTĒLU KARTE - vienīgā vieta, kur lapas atsaucas uz bildēm.
 *
 * Lai nomainītu bildi: mapē `assets/` aizstājiet failu ar jaunu failu
 * ar TIEŠI TĀDU PAŠU nosaukumu (piem. `pirms-jaka.webp`). Kods nav jāmaina.
 * Ja mainās bildes saturs, šeit atjaunojiet arī `alt` tekstu.
 *
 * Godīgums (A8): bildes ir ilustratīvas. Alt teksti apraksta redzamo,
 * bet neapgalvo, ka tie ir reāli klientu darbi vai īstās darbnīcas interjers.
 */
import type { ImageMetadata } from 'astro';

import heroDarbnica from '../../assets/hero-darbnica.webp';
import heroDarbnicaMobile from '../../assets/hero-darbnica-mobile.webp';
import pakalpojumsRemonts from '../../assets/pakalpojums-remonts.webp';
import pakalpojumsPielagosana from '../../assets/pakalpojums-pielagosana.webp';
import pakalpojumsIndividualaSusana from '../../assets/pakalpojums-individuala-susana.webp';
import pakalpojumsAdisana from '../../assets/pakalpojums-adisana.webp';
import pakalpojumsAizkari from '../../assets/pakalpojums-aizkari.webp';
import pirmsJaka from '../../assets/pirms-jaka.webp';
import pecJaka from '../../assets/pec-jaka.webp';
import zaigaPortrets from '../../assets/zaiga-portrets.webp';
import zaigaRokasAdisana from '../../assets/zaiga-rokas-adisana.webp';
import zaigaPieSujmasinas from '../../assets/zaiga-pie-sujmasinas.webp';
import pielagosanaPielaikosana from '../../assets/pielagosana-pielaikosana.webp';
import darbi1 from '../../assets/darbi-1.webp';
import darbi2 from '../../assets/darbi-2.webp';
import darbi3 from '../../assets/darbi-3.webp';
import darbi4 from '../../assets/darbi-4.webp';
import darbi5 from '../../assets/darbi-5.webp';
import darbi6 from '../../assets/darbi-6.webp';
import adisanaLatviskieRaksti from '../../assets/adisana-latviskie-raksti.webp';
import adisanaDzijas from '../../assets/adisana-dzijas.webp';
import aizkariGaldauts from '../../assets/aizkari-galdauts.webp';
import cenasDarbnicasGalds from '../../assets/cenas-darbnicas-galds.webp';
import kontaktiMaja from '../../assets/kontakti-maja.webp';

import logoHeader from '../../assets/logo-header-transparent.png';
import logoHeaderCream from '../../assets/logo-header-cream.png';
import logoFull from '../../assets/logo-transparent.png';
import logoFullCream from '../../assets/logo-cream.png';

export type SiteImage = {
  src: ImageMetadata;
  alt: string;
  /** Bildē redzama īstā Zaiga - lietot tikai tur, kur teksts runā par Zaigu. */
  realZaiga?: boolean;
};

export const images = {
  heroDarbnica: {
    src: heroDarbnica,
    alt: 'Saulains šūšanas galds ar baltu šujmašīnu, dzijas kamoliem pītā grozā, misiņa šķērēm, mērlenti un ziediem vāzē',
  },
  heroDarbnicaMobile: {
    src: heroDarbnicaMobile,
    alt: 'Saulains šūšanas galds ar baltu šujmašīnu, dzijas kamoliem pītā grozā, misiņa šķērēm, mērlenti un ziediem vāzē',
  },
  pakalpojumsRemonts: { src: pakalpojumsRemonts, alt: 'Tumša ziemas jaka ar jaunu rāvējslēdzēju uz darba galda' },
  pakalpojumsPielagosana: { src: pakalpojumsPielagosana, alt: 'Ar adatām nosprausta bikšu apakšmala un mērlente uz darba galda' },
  pakalpojumsIndividualaSusana: { src: pakalpojumsIndividualaSusana, alt: 'Rozā kleita ar uzpūstām piedurknēm uz manekena gaišā telpā' },
  pakalpojumsAdisana: { src: pakalpojumsAdisana, alt: 'Ar rokām adīti dūraiņi un zeķes ar latviskiem rakstiem uz adīta džempera' },
  pakalpojumsAizkari: { src: pakalpojumsAizkari, alt: 'Gaiši lina aizkari, kas sniedzas līdz grīdai, saulainā istabā' },
  pirmsJaka: { src: pirmsJaka, alt: 'Pirms: tumši zila ziemas jaka ar salūzušu, atvērtu rāvējslēdzēju' },
  pecJaka: { src: pecJaka, alt: 'Pēc: tā pati jaka ar jaunu, aizvērtu rāvējslēdzēju' },
  zaigaPortrets: { src: zaigaPortrets, alt: 'Smaidoša Zaiga Lemeševska ar adījumu rokās', realZaiga: true },
  zaigaRokasAdisana: { src: zaigaRokasAdisana, alt: 'Zaiga Lemeševska ada ar adāmadatām', realZaiga: true },
  zaigaPieSujmasinas: { src: zaigaPieSujmasinas, alt: 'Zaiga Lemeševska pie šujmašīnas', realZaiga: true },
  pielagosanaPielaikosana: { src: pielagosanaPielaikosana, alt: 'Zaiga Lemeševska ar mērlenti pielāgo kleitu uz manekena', realZaiga: true },
  darbi1: { src: darbi1, alt: 'Zaļa ziemas parka ar garu rāvējslēdzēju uz pakaramā' },
  darbi2: { src: darbi2, alt: 'Salocīti tumši zili džinsi, blakus šķēres un mērlente' },
  darbi3: { src: darbi3, alt: 'Gaiša, plīvojoša izlaiduma kleita uz pakaramā' },
  darbi4: { src: darbi4, alt: 'Ar rokām adīts krēmkrāsas džemperis ar bižu rakstu' },
  darbi5: { src: darbi5, alt: 'Adītas vilnas zeķes un dūraiņi ar sarkanbaltiem rakstiem' },
  darbi6: { src: darbi6, alt: 'Gaiši aizkari, kas sniedzas tieši līdz grīdai' },
  adisanaLatviskieRaksti: { src: adisanaLatviskieRaksti, alt: 'Dūraiņi ar sarkanbaltiem latviskiem rakstiem un adāmadatas' },
  adisanaDzijas: { src: adisanaDzijas, alt: 'Dažādu krāsu vilnas dzijas kamoli pītā grozā' },
  aizkariGaldauts: { src: aizkariGaldauts, alt: 'Lina galdauts uz apaļa galda gaišā ēdamistabā' },
  cenasDarbnicasGalds: { src: cenasDarbnicasGalds, alt: 'Darba galds ar misiņa šķērēm, mērlenti, diega spolēm un auduma paraugiem' },
  /** Īpašniece apstiprināja: īstā māja Tālavas ielā 18. */
  kontaktiMaja: { src: kontaktiMaja, alt: 'Zaigas darbnīcas māja Tālavas ielā 18, Alūksnē' },
} satisfies Record<string, SiteImage>;

export const logos = {
  /** Galvenes logo „Zaiga” ar adatu, diegu un sirsniņu (bez apakšvirsraksta). */
  header: { src: logoHeader, alt: 'Zaigas darbnīca - sākumlapa' },
  headerCream: { src: logoHeaderCream, alt: 'Zaigas darbnīca' },
  /** Pilnais logo ar „Šūšana un adīšana”. */
  full: { src: logoFull, alt: 'Zaiga - šūšana un adīšana' },
  fullCream: { src: logoFullCream, alt: 'Zaiga - šūšana un adīšana' },
} as const;

export type ImageKey = keyof typeof images;
