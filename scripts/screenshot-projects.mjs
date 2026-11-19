// Takes a screenshot of the first screen of each project site
// and saves it to public/previews/<slug>.jpg.
// Run: node scripts/screenshot-projects.mjs
import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";

const sites = JSON.parse(await readFile(new URL("../src/data/project-sites.json", import.meta.url), "utf8"));
const outDir = new URL("../public/previews/", import.meta.url);
await mkdir(outDir, { recursive: true });

// CHROMIUM_PATH lets you point to an already-installed Chromium.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
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
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    } catch (err) {
      // A page that never goes fully idle is fine; a certificate/network error is not.
      if (!/Timeout/i.test(err.message)) throw err;
      await page.waitForLoadState("load", { timeout: 15000 });
    }
    // Let entrance animations and lazy images settle.
    await page.waitForTimeout(2000);
    // Dismiss cookie banners so they don't cover the preview.
    const accept = page.getByRole("button", { name: /^(aceitar|aceito|accept|concordo|ok|entendi)/i }).first();
    if (await accept.isVisible().catch(() => false)) {
      await accept.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(800);
    }
    await page.waitForTimeout(1000);
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
