/**
 * Fetches 32×32 icon frames as PNG @3x (96×96) via Figma REST Images API.
 * Requires FIGMA_ACCESS_TOKEN or FIGMA_TOKEN (personal access token).
 *
 * Usage: FIGMA_ACCESS_TOKEN=... node scripts/fetch-figma-homepage-icons-api.mjs
 */
import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "child_process";

const FILE_KEY = "SstJeyxLbrXnH7ATm19Hn7";
function readTokenFile(p) {
  try {
    return fs.readFileSync(p, "utf8").trim();
  } catch {
    return "";
  }
}
const TOKEN =
  process.env.FIGMA_ACCESS_TOKEN ||
  process.env.FIGMA_TOKEN ||
  readTokenFile(path.join(process.cwd(), "icons", ".figma-token")) ||
  readTokenFile(path.join(os.homedir(), ".config", "figma-access-token"));
const manifest = JSON.parse(fs.readFileSync("icons/light/manifest.json", "utf8"));
const root = path.join(process.cwd(), "icons", "light");

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

if (!TOKEN) {
  console.error(
    "Set FIGMA_ACCESS_TOKEN, or put the token in icons/.figma-token (one line, gitignored).\n" +
      "Figma → Settings → Security → Personal access tokens."
  );
  process.exit(1);
}

for (const batch of chunk(manifest, 40)) {
  const ids = batch.map((b) => encodeURIComponent(b.nodeId)).join(",");
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=png&scale=3`;
  const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
  const data = await res.json();
  if (!res.ok) {
    console.error(data);
    process.exit(1);
  }
  const images = data.images || {};
  for (const item of batch) {
    const src = images[item.nodeId];
    if (!src) {
      console.warn("No image for", item.nodeId, item.slug);
      continue;
    }
    const dir = path.join(root, item.section);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, `${item.slug}@3x.png`);
    let buf;
    try {
      const imgRes = await fetch(src);
      if (!imgRes.ok) throw new Error(String(imgRes.status));
      buf = Buffer.from(await imgRes.arrayBuffer());
    } catch {
      buf = execFileSync("curl", ["-sL", src], { maxBuffer: 25 * 1024 * 1024 });
    }
    await fs.promises.writeFile(dest, buf);
    console.log("wrote", dest);
  }
}
