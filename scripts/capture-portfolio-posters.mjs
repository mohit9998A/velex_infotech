/**
 * Captures a desktop screenshot of every portfolio entry that declares a
 * `preview.poster`, and writes it to public/ as WebP.
 *
 *   npm run posters              # capture everything
 *   npm run posters -- bonn daur # capture only these ids
 *
 * Uses the locally installed Chrome in headless mode (set CHROME_PATH to
 * override) and sharp, both already available — no extra dependencies.
 *
 * Note the generous --virtual-time-budget: several of these sites play a long
 * intro animation and screenshot completely blank if captured too early.
 */
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import sharp from "sharp";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "portfolio");

/** Logical viewport the sites are rendered at, matching the card's 16:10 cover. */
const VIEWPORT = { width: 1440, height: 900 };
/** Milliseconds of virtual time to let intro animations settle before capture. */
const RENDER_BUDGET_MS = 25_000;
const WEBP_QUALITY = 72;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function resolveChrome() {
  const found = CHROME_CANDIDATES.find((p) => p && existsSync(p));
  if (!found) {
    throw new Error(
      "No Chrome/Edge binary found. Set CHROME_PATH to your browser executable.",
    );
  }
  return found;
}

async function shoot(chrome, url, pngPath, budgetMs, profileDir) {
  await execFileAsync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--disable-extensions",
      "--run-all-compositor-stages-before-draw",
      `--user-data-dir=${profileDir}`,
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      `--virtual-time-budget=${budgetMs}`,
      `--screenshot=${pngPath}`,
      url,
    ],
    { timeout: budgetMs + 60_000, windowsHide: true },
  );
}

/**
 * Captures twice against a shared profile and keeps the second frame.
 *
 * `--virtual-time-budget` fast-forwards timers but cannot fast-forward the
 * network, so on a cold cache the budget expires before late hero images and
 * videos arrive and the poster comes out half-empty. The throwaway first pass
 * fills the disk cache; the second then paints a complete page. Verified on
 * bonn.in: 55 KB (cold, no hero) vs 1.13 MB (warm, full hero).
 */
async function capture(chrome, url, pngPath, budgetMs, profileDir) {
  await shoot(chrome, url, `${pngPath}.warmup.png`, budgetMs, profileDir);
  await shoot(chrome, url, pngPath, budgetMs, profileDir);
}

async function main() {
  const only = process.argv.slice(2);
  const items = JSON.parse(
    await readFile(path.join(ROOT, "content", "portfolio.json"), "utf8"),
  );

  const targets = items.filter(
    (i) => i.preview?.poster && (i.preview.url ?? i.href) &&
      (only.length === 0 || only.includes(i.id)),
  );

  if (targets.length === 0) {
    console.log("Nothing to capture.");
    return;
  }

  const chrome = resolveChrome();
  console.log(`Browser: ${chrome}`);
  await mkdir(OUT_DIR, { recursive: true });
  const scratch = await mkdtemp(path.join(tmpdir(), "vx-posters-"));

  let failed = 0;
  try {
    for (const item of targets) {
      const url = item.preview.url ?? item.href;
      const out = path.join(ROOT, "public", item.preview.poster);
      const png = path.join(scratch, `${item.id}.png`);
      // Sites with looping video heroes land on an arbitrary frame; nudge the
      // budget per item until the captured frame is well composed.
      const budget = Number(process.env.BUDGET_MS) ||
        item.preview.captureBudgetMs || RENDER_BUDGET_MS;

      process.stdout.write(`  ${item.id.padEnd(12)} ${url} … `);
      try {
        await capture(chrome, url, png, budget, path.join(scratch, `p-${item.id}`));
        const { size } = await sharp(png)
          .resize(VIEWPORT.width, VIEWPORT.height, {
            fit: "cover",
            position: "top",
          })
          .webp({ quality: WEBP_QUALITY })
          .toFile(out);
        console.log(`${(size / 1024).toFixed(0)} KB → ${item.preview.poster}`);
      } catch (err) {
        failed += 1;
        console.log(`FAILED (${err.message.split("\n")[0]})`);
      }
    }
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }

  if (failed > 0) {
    console.error(`\n${failed} capture(s) failed.`);
    process.exitCode = 1;
  }
}

await main();
