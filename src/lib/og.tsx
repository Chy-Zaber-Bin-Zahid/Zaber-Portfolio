import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { DATA } from "@/data/resume";

export const OG_SIZE = { width: 1200, height: 630 } as const;

interface OgOptions {
  title: string;
  description?: string;
  /** Show the avatar in the top-left corner. */
  showAvatar?: boolean;
  /** Small caption rendered above the title (e.g. a date). */
  eyebrow?: string;
}

// Astro bundles this module into dist/.prerender, so resolve assets from the
// project root (the build's working directory) rather than import.meta.url.
const ROOT = process.cwd();
const FONTS_DIR = path.join(ROOT, "src/assets/fonts");
const IMAGES_DIR = path.join(ROOT, "src/assets/images");

let fontCache: { cabinetGrotesk: Buffer; clashDisplay: Buffer } | null = null;
let avatarCache: string | null = null;

async function loadFonts() {
  if (!fontCache) {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(path.join(FONTS_DIR, "CabinetGrotesk-Medium.ttf")),
      readFile(path.join(FONTS_DIR, "ClashDisplay-Semibold.ttf")),
    ]);
    fontCache = { cabinetGrotesk, clashDisplay };
  }
  return fontCache;
}

async function loadAvatar() {
  if (avatarCache === null) {
    const file = await readFile(path.join(IMAGES_DIR, DATA.avatarUrl));
    avatarCache = `data:image/jpeg;base64,${file.toString("base64")}`;
  }
  return avatarCache;
}

const styles = {
  outerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "40px",
    fontFamily: "Cabinet Grotesk",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    position: "relative",
    padding: "40px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
  },
  imageSection: {
    position: "absolute",
    top: "40px",
    left: "40px",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "140px",
    height: "140px",
    borderRadius: "24px",
    border: "4px solid #e5e5e5",
    objectFit: "cover",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  eyebrow: {
    fontSize: "20px",
    fontWeight: 400,
    color: "#737373",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: "56px",
    fontWeight: 600,
    lineHeight: 1.1,
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    maxWidth: "1000px",
  },
  description: {
    fontSize: "22px",
    fontWeight: 400,
    lineHeight: 1.5,
    maxWidth: "900px",
    color: "#404040",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    marginTop: "32px",
    fontSize: "18px",
    color: "#737373",
  },
} as const;

/** Render a 1200x630 OpenGraph PNG at build time (satori -> SVG -> sharp). */
export async function renderOgImage({
  title,
  description,
  showAvatar = true,
  eyebrow,
}: OgOptions): Promise<Uint8Array<ArrayBuffer>> {
  const [fonts, avatar] = await Promise.all([loadFonts(), showAvatar ? loadAvatar() : null]);

  const svg = await satori(
    <div style={styles.outerWrapper}>
      <div style={styles.wrapper}>
        {avatar && (
          <div style={styles.imageSection}>
            <img src={avatar} alt={DATA.name} style={styles.image} />
          </div>
        )}
        <div style={styles.mainContainer}>
          {eyebrow && <div style={styles.eyebrow}>{eyebrow}</div>}
          <div style={styles.title}>{title}</div>
          {description && <div style={styles.description}>{description}</div>}
          <div style={styles.footer}>{new URL(DATA.url).host}</div>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cabinet Grotesk", data: fonts.cabinetGrotesk, weight: 400, style: "normal" },
        { name: "Cabinet Grotesk", data: fonts.cabinetGrotesk, weight: 700, style: "normal" },
        { name: "Clash Display", data: fonts.clashDisplay, weight: 600, style: "normal" },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png);
}

export function pngResponse(body: Uint8Array<ArrayBuffer>): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
