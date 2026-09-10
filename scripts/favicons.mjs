// Generates the favicon set from the profile photo. Run: node scripts/favicons.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "src/assets/images/me.jpeg";
const circle = (size) =>
  Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);

async function round(size) {
  return sharp(SRC)
    .resize(size, size, { fit: "cover", position: "attention" })
    .composite([{ input: circle(size), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function square(size) {
  // Apple touch icons get rounded by iOS itself; keep them square with padding.
  return sharp(SRC).resize(size, size, { fit: "cover", position: "attention" }).png().toBuffer();
}

function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, png]);
}

await writeFile("public/favicon.ico", pngToIco(await round(48), 48));
await writeFile("public/favicon-96x96.png", await round(96));
await writeFile("public/apple-touch-icon.png", await square(180));
await writeFile("public/icon-192.png", await round(192));
await writeFile("public/icon-512.png", await round(512));
await writeFile(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "Zaber Bin Zahid",
      short_name: "Zaber",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "browser",
    },
    null,
    2
  )
);
console.log("favicons written");
