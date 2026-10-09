/** „Paveiktie darbi” - attēli un paraksti (Part B §1.6, tādā secībā). */
import type { ImageKey } from './images';

export type GalleryItem = { image: ImageKey; caption: string };

export const homeGallery: GalleryItem[] = [
  { image: 'darbi1', caption: 'Ziemas jakai nomainīts rāvējslēdzējs' },
  { image: 'darbi2', caption: 'Bikses saīsinātas pēc auguma' },
  { image: 'darbi3', caption: 'Izlaiduma kleita pielāgota pa augumam' },
  { image: 'darbi4', caption: 'Ar rokām adīts džemperis pēc pasūtījuma' },
  { image: 'darbi5', caption: 'Adītas vilnas zeķes un dūraiņi' },
  { image: 'darbi6', caption: 'Aizkari saīsināti līdz grīdai' },
];
