// Takes a screenshot of the first screen of each project site
// and saves it to public/previews/<slug>.jpg.
// Run: node scripts/screenshot-projects.mjs
import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";

const sites = JSON.parse(await readFile(new URL("../src/data/project-sites.json", import.meta.url), "utf8"));
const outDir = new URL("../public/previews/", import.meta.url);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  locale: "pt-BR",
  colorScheme: "dark",
});

let failures = 0;
for (const { slug, url } of sites) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() =>
      page.waitForLoadState("load", { timeout: 15000 })
    );
    // Let entrance animations and lazy images settle.
    await page.waitForTimeout(3000);
    await page.screenshot({ path: new URL(`${slug}.jpg`, outDir).pathname, type: "jpeg", quality: 82 });
    console.log(`ok   ${slug}  ${url}`);
  } catch (err) {
    failures++;
    console.error(`fail ${slug}  ${url}  ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
if (failures === sites.length) process.exit(1);
