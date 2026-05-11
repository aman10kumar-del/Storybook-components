/**
 * Downloads Figma MCP asset URLs and writes @3x PNGs (96×96) with light tile background #ccf1fa.
 * Uses curl for downloads (Node fetch can fail on some TLS setups).
 *
 * Usage: node scripts/fetch-icons-from-mcp-urls.mjs icons/light/_node-urls.json
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { execFileSync } from "child_process";

const SIZE = 96;
const TILE_BG = { r: 204, g: 241, b: 250, alpha: 1 };

const manifestPath = process.argv[2] || "icons/light/_node-urls.json";
const items = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const root = path.join(process.cwd(), "icons", "light");

function curlBuf(url) {
  return execFileSync("curl", ["-sL", url], { maxBuffer: 20 * 1024 * 1024 });
}

async function layerToPng96(buf) {
  return sharp(buf)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

(async () => {
  for (const item of items) {
    const urls = (item.urls || []).filter(Boolean);
    if (!urls.length) {
      console.warn("skip (no urls)", item.section, item.slug);
      continue;
    }
    const dir = path.join(root, item.section);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, `${item.slug}@3x.png`);
    const layers = [];
    for (const u of urls) layers.push(await layerToPng96(curlBuf(u)));
    const outBuf = await sharp({
      create: { width: SIZE, height: SIZE, channels: 4, background: TILE_BG },
    })
      .png()
      .composite(layers.map((input) => ({ input })))
      .toBuffer();
    await fs.promises.writeFile(dest, outBuf);
    console.log("wrote", dest);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
