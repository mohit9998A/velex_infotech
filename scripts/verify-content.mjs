#!/usr/bin/env node
/**
 * Content integrity checks.
 *
 * Catches the class of mistake that fails silently rather than loudly:
 *   - a service whose icon isn't in serviceIconMap (renders the wrong icon,
 *     no error, no warning, no build failure)
 *   - a service title that doesn't byte-match SERVICE_OPTIONS (the lead form's
 *     preselect silently does nothing)
 *   - a blog post with no MDX file, or an MDX file with no registry entry
 *   - a service with no hero image mapping (cosmetic, so a warning not an error)
 *   - double-encoded UTF-8, which corrupts <title> tags and JSON-LD in a way
 *     that looks fine in the editor that caused it
 *
 * app/sitemap.ts referenced an `npm run verify:sitemap` that never existed.
 * This is that safety net, made real.
 *
 * Parsed with regex rather than imported, deliberately: this must run without
 * a TypeScript toolchain or a build step, so `npm run verify:content` works on
 * a clean checkout.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const read = (p) => readFileSync(join(root, p), "utf8");

// ---------------------------------------------------------------- services
const services = JSON.parse(read("content/services.json"));

const iconSource = read("lib/icons.ts");
const iconMapBody = iconSource.match(
  /serviceIconMap:\s*Record<string,\s*LucideIcon>\s*=\s*\{([\s\S]*?)\}/,
)?.[1];
if (!iconMapBody) {
  errors.push("lib/icons.ts: could not parse serviceIconMap");
}
const mappedIcons = new Set(
  (iconMapBody ?? "").split(",").map((s) => s.trim().replace(/:.*$/, "")).filter(Boolean),
);

const leadSource = read("lib/validations/lead.ts");
const serviceOptionsBody = leadSource.match(
  /SERVICE_OPTIONS\s*=\s*\[([\s\S]*?)\]\s*as const/,
)?.[1];
if (!serviceOptionsBody) {
  errors.push("lib/validations/lead.ts: could not parse SERVICE_OPTIONS");
}
const serviceOptions = new Set(
  [...(serviceOptionsBody ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]),
);

const imagesSource = read("lib/service-images.ts");
const mappedImages = new Set(
  [...imagesSource.matchAll(/"([a-z0-9-]+)":\s*[a-zA-Z]/g)].map((m) => m[1]),
);

const navSource = read("config/navigation.ts");

const seenSlugs = new Set();
for (const s of services) {
  if (seenSlugs.has(s.slug)) errors.push(`services.json: duplicate slug "${s.slug}"`);
  seenSlugs.add(s.slug);

  if (!mappedIcons.has(s.icon)) {
    errors.push(
      `services.json: "${s.slug}" uses icon "${s.icon}", which is not in ` +
        `serviceIconMap — getServiceIcon would silently fall back to Workflow`,
    );
  }
  if (!serviceOptions.has(s.title)) {
    errors.push(
      `services.json: title "${s.title}" is not in SERVICE_OPTIONS — the lead ` +
        `form preselect will silently do nothing for this service`,
    );
  }
  if (s.href !== `/services/${s.slug}`) {
    errors.push(`services.json: "${s.slug}" has href "${s.href}", expected "/services/${s.slug}"`);
  }
  if (!navSource.includes(`/services/${s.slug}`)) {
    warnings.push(
      `config/navigation.ts: "/services/${s.slug}" is not linked from the nav — the page will be orphaned`,
    );
  }
  if (!mappedImages.has(s.slug)) {
    warnings.push(`lib/service-images.ts: no hero image for "${s.slug}" (page renders without one)`);
  }
  for (const field of ["title", "tagline", "description", "overview", "metaTitle", "metaDescription"]) {
    if (!s[field]) errors.push(`services.json: "${s.slug}" is missing "${field}"`);
  }
  // Feeds sitemap lastModified. Without it the entry would read `undefined`.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.updatedAt ?? "")) {
    errors.push(
      `services.json: "${s.slug}" needs an "updatedAt" ISO date (YYYY-MM-DD) — ` +
        `app/sitemap.ts reads it for lastModified`,
    );
  }
  // FAQ markup and the rendered accordion travel together (AGENTS.md rule 2),
  // so an empty array is a mistake worth catching rather than a no-op.
  if (s.faqs && s.faqs.length < 3) {
    warnings.push(
      `services.json: "${s.slug}" has only ${s.faqs.length} FAQ(s) — aim for 5 per service page`,
    );
  }
  if (s.metaDescription && s.metaDescription.length > 165) {
    warnings.push(
      `services.json: "${s.slug}" metaDescription is ${s.metaDescription.length} chars (will truncate ~155-165)`,
    );
  }
}

// -------------------------------------------------------------- industries
const industries = JSON.parse(read("content/industries.json"));

for (const i of industries) {
  if (!mappedIcons.has(i.icon)) {
    errors.push(
      `industries.json: "${i.slug}" uses icon "${i.icon}", which is not in serviceIconMap`,
    );
  }
  if (!existsSync(join(root, "app/industries", i.slug, "page.tsx"))) {
    errors.push(
      `industries.json: "${i.slug}" has no app/industries/${i.slug}/page.tsx — it would ` +
        `404 while staying in the sitemap`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(i.updatedAt ?? "")) {
    errors.push(`industries.json: "${i.slug}" needs an "updatedAt" ISO date (YYYY-MM-DD)`);
  }
  for (const ref of i.relatedServices ?? []) {
    if (!seenSlugs.has(ref)) {
      errors.push(`industries.json: "${i.slug}" references unknown service "${ref}"`);
    }
  }
  if (!navSource.includes("/industries")) {
    warnings.push("config/navigation.ts: /industries is not linked from the nav");
  }
}

// ----------------------------------------------------------------- sitemap
/**
 * Every hardcoded static route must resolve to a real page file.
 *
 * The sitemap previously advertised /pricing and /portfolio, both of which
 * 404'd. Submitting 404s wastes crawl budget and undermines trust in the rest
 * of the file — and on a site with one indexed page, crawl trust is the whole
 * problem. Service, industry and blog URLs derive from content and are checked
 * above, so only the hand-maintained list needs this.
 */
const sitemapSource = read("app/sitemap.ts");
const staticBlock = sitemapSource.match(/lastModified: string;\s*\}\[\] = \[([\s\S]*?)\n\];/)?.[1];
if (!staticBlock) {
  errors.push("app/sitemap.ts: could not parse staticRoutes");
}
for (const m of (staticBlock ?? "").matchAll(/path:\s*"([^"]*)"/g)) {
  const route = m[1];
  const file = route === "" ? "app/page.tsx" : `app${route}/page.tsx`;
  if (!existsSync(join(root, file))) {
    errors.push(
      `app/sitemap.ts: staticRoutes lists "${route || "/"}" but ${file} does not exist — ` +
        `the sitemap would advertise a 404`,
    );
  }
}

// -------------------------------------------------------------------- blog
const blogSource = read("content/blog/index.ts");
const postSlugs = [...blogSource.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const loaderSlugs = [...blogSource.matchAll(/"([^"]+)":\s*\(\)\s*=>\s*import\(/g)].map((m) => m[1]);

for (const slug of postSlugs) {
  if (!loaderSlugs.includes(slug)) {
    errors.push(`content/blog/index.ts: "${slug}" has no postLoaders entry — it would 404 while staying in the sitemap`);
  }
  if (!existsSync(join(root, "content/blog", `${slug}.mdx`))) {
    errors.push(`content/blog: missing file ${slug}.mdx`);
  }
}
for (const slug of loaderSlugs) {
  if (!postSlugs.includes(slug)) {
    errors.push(`content/blog/index.ts: postLoaders has "${slug}" with no matching post`);
  }
}
for (const file of readdirSync(join(root, "content/blog")).filter((f) => f.endsWith(".mdx"))) {
  const slug = file.replace(/\.mdx$/, "");
  if (!postSlugs.includes(slug)) {
    warnings.push(`content/blog: ${file} exists but is not registered in blogPosts`);
  }
}

// ------------------------------------------------------------- blog links
// Every relatedServices slug must resolve, or the service page's "related
// reading" block silently drops the post.
for (const match of blogSource.matchAll(/relatedServices:\s*\[([^\]]*)\]/g)) {
  for (const ref of [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])) {
    if (!seenSlugs.has(ref)) {
      errors.push(`content/blog/index.ts: relatedServices references unknown service "${ref}"`);
    }
  }
}

// -------------------------------------------------------------- encoding
/**
 * Catches double-encoded UTF-8 (mojibake) and stray BOMs.
 *
 * Eight files once rendered every em dash as three garbled characters, which
 * reached the live <title> of /about and /contact and corrupted the FAQPage and
 * Blog JSON-LD nodes. The cause was an editor that read UTF-8 as cp1252 and
 * saved it back as UTF-8; every one of those files also carried a BOM, which is
 * the fingerprint of that editor.
 *
 * This comment deliberately contains no example of the corruption: the check
 * below scans this file too, and an example would trip it.
 *
 * Detection is exact rather than a blocklist of known-bad strings: map each
 * character back to the cp1252 byte it would have come from, and flag any run
 * that decodes as a *valid* UTF-8 scalar. Genuine accented text ("château")
 * never forms one, because 't' is not a UTF-8 continuation byte.
 */
const CP1252_HIGH = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
  0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
  0x017e: 0x9e, 0x0178: 0x9f,
};
const cp1252Byte = (cp) =>
  CP1252_HIGH[cp] ?? (cp <= 0xff && !(cp >= 0x80 && cp <= 0x9f) ? cp : undefined);
const leadLen = (b) =>
  b >= 0xc2 && b <= 0xdf ? 2 : b >= 0xe0 && b <= 0xef ? 3 : b >= 0xf0 && b <= 0xf4 ? 4 : 0;
const utf8 = new TextDecoder("utf-8", { fatal: true });

function findMojibake(text) {
  const chars = [...text];
  for (let i = 0; i < chars.length; i++) {
    const lead = cp1252Byte(chars[i].codePointAt(0));
    const len = lead === undefined ? 0 : leadLen(lead);
    if (len === 0 || i + len > chars.length) continue;

    const bytes = [lead];
    for (let k = 1; k < len; k++) {
      const b = cp1252Byte(chars[i + k].codePointAt(0));
      if (b === undefined || b < 0x80 || b > 0xbf) break;
      bytes.push(b);
    }
    if (bytes.length !== len) continue;

    try {
      const decoded = utf8.decode(new Uint8Array(bytes));
      return { garbled: chars.slice(i, i + len).join(""), intended: decoded };
    } catch {
      // Not valid UTF-8, so not mojibake — real accented text lands here.
    }
  }
  return null;
}

const SOURCE_DIRS = ["app", "components", "config", "content", "hooks", "lib", "scripts", "types"];
const SOURCE_EXT = /\.(tsx?|jsx?|mjs|mdx|json|css)$/;

function* sourceFiles(dir) {
  for (const entry of readdirSync(join(root, dir))) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const rel = `${dir}/${entry}`;
    if (statSync(join(root, rel)).isDirectory()) yield* sourceFiles(rel);
    else if (SOURCE_EXT.test(entry)) yield rel;
  }
}

let encodingChecked = 0;
for (const dir of SOURCE_DIRS) {
  for (const file of sourceFiles(dir)) {
    encodingChecked++;
    const raw = readFileSync(join(root, file));
    if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
      errors.push(
        `${file}: starts with a UTF-8 BOM — strip it. Every file that shipped ` +
          `mojibake also carried one`,
      );
    }
    // A NUL in a source file is always an accident, and it is the one encoding
    // fault that hides completely: the file still compiles, still lints, still
    // passes the UTF-8 checks above, and the character is invisible in every
    // editor. What it does do is make git classify the file as BINARY, so it
    // silently stops being diffable and can never be code-reviewed again.
    // lib/rate-limit.ts shipped one inside a string literal and that is exactly
    // how it was found — by noticing `Bin` in a diffstat.
    const nul = raw.indexOf(0);
    if (nul !== -1) {
      const line = raw.subarray(0, nul).toString("latin1").split("\n").length;
      errors.push(
        `${file}: contains a NUL byte at line ${line} — git will treat the file ` +
          `as binary and stop diffing it. Delete the character`,
      );
    }
    const hit = findMojibake(raw.toString("utf8"));
    if (hit) {
      errors.push(
        `${file}: double-encoded UTF-8 — contains "${hit.garbled}" where ` +
          `"${hit.intended}" was intended. Re-save the file as UTF-8`,
      );
    }
  }
}

// ------------------------------------------------------------------ report
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(` ERROR  ${e}`);

if (errors.length > 0) {
  console.error(`\nverify:content failed — ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(
  `verify:content passed — ${services.length} services, ${industries.length} industries, ` +
    `${postSlugs.length} posts, ${encodingChecked} files encoding-checked, ` +
    `${warnings.length} warning(s).`,
);
