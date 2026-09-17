import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const publicFiles = [
  "index.html",
  "thanks.html",
  "Smartdoor-font.woff2",
  "og.png",
  "robots.txt",
  "sitemap.xml",
  "_headers",
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  await cp(resolve(root, file), resolve(output, file));
}
await cp(resolve(root, "assets"), resolve(output, "assets"), { recursive: true });

console.log(`Built ${publicFiles.length} files plus assets into dist/`);
