/**
 * Responsīvu attēlu palīgs: AVIF + WebP ar srcset, skaidriem izmēriem
 * un neobligātu „art direction” (cits kadrējums pēc media query).
 * To pašu rezultātu izmanto gan <Picture>, gan hero preload saitēm.
 */
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type PictureSourceInput = {
  /** Piem. '(max-width: 699px)'. */
  media: string;
  src: ImageMetadata;
  widths: number[];
  sizes?: string;
};

export type PictureInput = {
  src: ImageMetadata;
  widths: number[];
  sizes: string;
  art?: PictureSourceInput[];
  quality?: { avif: number; webp: number };
};

export type BuiltSource = {
  media?: string;
  type: 'image/avif' | 'image/webp';
  srcset: string;
  sizes: string;
  width: number;
  height: number;
};

export type BuiltPicture = {
  sources: BuiltSource[];
  img: { src: string; srcset: string; sizes: string; width: number; height: number };
};

const DEFAULT_QUALITY = { avif: 58, webp: 74 };

/** Nekad nepalielina virs oriģināla platuma. */
function clampWidths(src: ImageMetadata, widths: number[]): number[] {
  const capped = widths.filter((w) => w < src.width);
  if (!capped.length || capped[capped.length - 1] !== src.width) capped.push(src.width);
  return [...new Set(capped)].sort((a, b) => a - b);
}

async function buildSet(src: ImageMetadata, widths: number[], format: 'avif' | 'webp', quality: number) {
  const result = await getImage({ src, widths: clampWidths(src, widths), format, quality });
  return result.srcSet.attribute;
}

export async function buildPicture(input: PictureInput): Promise<BuiltPicture> {
  const quality = input.quality ?? DEFAULT_QUALITY;
  const sources: BuiltSource[] = [];

  for (const art of input.art ?? []) {
    const sizes = art.sizes ?? input.sizes;
    for (const format of ['avif', 'webp'] as const) {
      sources.push({
        media: art.media,
        type: `image/${format}`,
        srcset: await buildSet(art.src, art.widths, format, quality[format]),
        sizes,
        width: art.src.width,
        height: art.src.height,
      });
    }
  }

  for (const format of ['avif', 'webp'] as const) {
    sources.push({
      type: `image/${format}`,
      srcset: await buildSet(input.src, input.widths, format, quality[format]),
      sizes: input.sizes,
      width: input.src.width,
      height: input.src.height,
    });
  }

  const widths = clampWidths(input.src, input.widths);
  const fallbackWidth = widths[Math.min(widths.length - 1, Math.floor(widths.length / 2))];
  const fallback = await getImage({ src: input.src, width: fallbackWidth, format: 'webp', quality: quality.webp });

  return {
    sources,
    img: {
      src: fallback.src,
      srcset: sources[sources.length - 1].srcset,
      sizes: input.sizes,
      width: input.src.width,
      height: input.src.height,
    },
  };
}

/** PNG logo ar 1x/2x/3x blīvumu (logo paliek PNG, A8). */
export async function buildLogo(src: ImageMetadata, displayHeight: number) {
  const width = Math.round((src.width / src.height) * displayHeight);
  const result = await getImage({ src, width, densities: [1, 2, 3], format: 'png' });
  return { src: result.src, srcset: result.srcSet.attribute, width, height: displayHeight };
}
