import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

/**
 * Optimized image descriptor passed to React islands (plain, serializable).
 */
export interface OptimizedImage {
  src: string;
  width: number;
  height: number;
  /** `srcset` with 1x and 2x candidates, when the source is large enough. */
  srcSet?: string;
}

const sources = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

/** Look up a source image by its short path, e.g. "/me.jpeg". */
export function imageSource(path: string): ImageMetadata | undefined {
  return sources[`/src/assets/images${path}`]?.default;
}

/**
 * Resize and convert an image at build time. `width` is the CSS width the
 * image is displayed at; a 2x variant is produced for high-DPI screens.
 */
export async function optimizeImage(
  path: string,
  width: number,
  options: { quality?: number; format?: "webp" | "avif" | "png" | "jpeg" } = {}
): Promise<OptimizedImage | null> {
  if (!path) return null;
  const source = imageSource(path);
  if (!source) return { src: path, width: 0, height: 0 };
  const format = options.format ?? "webp";
  const quality = options.quality ?? 80;
  const width1x = Math.min(width, source.width);
  const width2x = Math.min(width * 2, source.width);
  const [image1x, image2x] = await Promise.all([
    getImage({ src: source, width: width1x, format, quality }),
    width2x > width1x ? getImage({ src: source, width: width2x, format, quality }) : null,
  ]);
  const height = (w: number) => Math.round((source.height / source.width) * w);
  return {
    src: image1x.src,
    width: Number(image1x.attributes.width ?? width1x),
    height: Number(image1x.attributes.height ?? height(width1x)),
    srcSet: image2x ? `${image1x.src} 1x, ${image2x.src} 2x` : undefined,
  };
}
