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
 *
 * app/sitemap.ts referenced an `npm run verify:sitemap` that never existed.
 * This is that safety net, made real.
 *
 * Parsed with regex rather than imported, deliberately: this must run without
 * a TypeScript toolchain or a build step, so `npm run verify:content` works on
 * a clean checkout.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
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
  if (s.metaDescription && s.metaDescription.length > 165) {
    warnings.push(
      `services.json: "${s.slug}" metaDescription is ${s.metaDescription.length} chars (will truncate ~155-165)`,
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

// ------------------------------------------------------------------ report
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(` ERROR  ${e}`);

if (errors.length > 0) {
  console.error(`\nverify:content failed — ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(
  `verify:content passed — ${services.length} services, ${postSlugs.length} posts, ${warnings.length} warning(s).`,
);
