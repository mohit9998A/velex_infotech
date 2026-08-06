#!/usr/bin/env node
/**
 * One-off: re-encode the service hero images.
 *
 * The committed sources are a mess in three separate ways:
 *   1. They are JPEG bytes with a `.png` extension (magic bytes FF D8 FF E0
 *      JFIF). Next's optimizer sniffs bytes so it works anyway, but a direct
 *      /public serve sends the wrong Content-Type.
 *   2. They are 1024x1024 SQUARE, while the page renders them
 *      `aspect-[16/9] object-cover` — so ~44% of every image is thrown away.
 *   3. At 1024px wide they cannot satisfy the 2x request a retina desktop
 *      makes for the 896px container, so those screens get an effectively
 *      1x image off a ~800 KB source.
 *
 * Target is 1792x1008: exactly 2x the 896px CSS box, which is the hard cap set
 * by `max-w-4xl`. Going bigger buys nothing and costs bytes.
 *
 * WebP rather than AVIF on disk: next/image re-encodes to AVIF/WebP at request
 * time anyway, so the on-disk format only affects repo size and the
 * optimizer's DECODE cost — and sharp decodes WebP far faster than AVIF, which
 * keeps cold /_next/image requests and build-time blurDataURL generation quick.
 *
 * Squeezing a square into 16:9 forces a framing choice, so this writes BOTH
 * candidates per image into a review directory. Nothing is overwritten and
 * nothing is deleted; picking the winner is a human step.
 *
 * Usage:
 *   node scripts/optimize-service-images.mjs            # write candidates
 *   node scripts/optimize-service-images.mjs --apply c  # commit centre crop
 *   node scripts/optimize-service-images.mjs --apply a  # commit attention crop
 */
import { readdirSync, mkdirSync, existsSync, copyFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(root, "public/images/services");
const REVIEW_DIR = join(SRC_DIR, "_review");

const WIDTH = 1792;
const HEIGHT = 1008;
const QUALITY = 82;

const applyArg = process.argv.indexOf("--apply");
const applyMode = applyArg !== -1 ? (process.argv[applyArg + 1] ?? "c") : null;

const sources = readdirSync(SRC_DIR).filter((f) => f.endsWith(".png"));
if (sources.length === 0) {
  console.error("No .png sources found in public/images/services — already applied?");
  process.exit(1);
}

const kb = (p) => (statSync(p).size / 1024).toFixed(0);

if (applyMode) {
  // Promote one candidate set to the real filenames.
  const suffix = applyMode.startsWith("a") ? "attention" : "centre";
  let moved = 0;
  for (const file of sources) {
    const slug = file.replace(/\.png$/, "");
    const from = join(REVIEW_DIR, `${slug}.${suffix}.webp`);
    const to = join(SRC_DIR, `${slug}.webp`);
    if (!existsSync(from)) {
      console.error(`  missing candidate: ${from} — run without --apply first`);
      process.exit(1);
    }
    copyFileSync(from, to);
    console.log(`  ${slug}.webp  <- ${suffix}  (${kb(to)} KB)`);
    moved++;
  }
  console.log(
    `\nApplied ${moved} images. The .png originals are untouched and still ` +
      `committed — delete them once lib/service-images.ts points at .webp and ` +
      `the build passes.`,
  );
  process.exit(0);
}

mkdirSync(REVIEW_DIR, { recursive: true });

console.log(`Generating ${WIDTH}x${HEIGHT} WebP candidates (quality ${QUALITY})\n`);

let before = 0;
let afterCentre = 0;

for (const file of sources) {
  const slug = file.replace(/\.png$/, "");
  const src = join(SRC_DIR, file);
  const meta = await sharp(src).metadata();
  before += statSync(src).size;

  for (const [label, position] of [
    ["centre", "centre"],
    // Entropy-based: picks the busiest band of the image rather than the
    // middle. Usually better when the subject is off-centre, occasionally
    // worse when the background is noisy — hence generating both.
    ["attention", sharp.strategy.attention],
  ]) {
    const out = join(REVIEW_DIR, `${slug}.${label}.webp`);
    await sharp(src)
      .resize(WIDTH, HEIGHT, { fit: "cover", position })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);
    if (label === "centre") afterCentre += statSync(out).size;
  }

  console.log(
    `  ${slug.padEnd(20)} ${meta.width}x${meta.height} ${String(kb(src)).padStart(4)} KB` +
      ` ->  centre ${String(kb(join(REVIEW_DIR, `${slug}.centre.webp`))).padStart(4)} KB` +
      ` | attention ${String(kb(join(REVIEW_DIR, `${slug}.attention.webp`))).padStart(4)} KB`,
  );
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(afterCentre / 1024 / 1024).toFixed(2)} MB` +
    ` (${(100 - (afterCentre / before) * 100).toFixed(0)}% smaller)`,
);
console.log(`\nCandidates written to public/images/services/_review/`);
console.log(`Compare the two crops, then run:  node scripts/optimize-service-images.mjs --apply c`);
