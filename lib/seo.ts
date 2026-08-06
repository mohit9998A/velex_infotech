import type { Metadata } from "next";

import { markets, offices, siteConfig } from "@/config/site";

/**
 * Bare hostname ("velexinfotech.com") for display in copy. Derived from
 * `siteConfig.url` so it can never disagree with the canonical origin — the
 * footer previously hardcoded a different domain than the one being linked.
 */
export const siteDomain = new URL(siteConfig.url).host;

/**
 * "Ludhiana & Noida, India" — for footer/OG/about copy.
 *
 * Derived rather than re-literalled, for the same reason as `siteDomain`. The
 * flat `siteConfig.location` string this replaces was interpolated in five
 * places, so "Ludhiana, Punjab, India" had become the site's entire stated
 * geography — including on pages meant to sell to US and UK buyers.
 */
export const officesLine = `${offices.map((o) => o.city).join(" & ")}, ${offices[0].country}`;

/** "United States · United Kingdom · Canada · India" */
export const marketsLine = markets.map((m) => m.countryName).join(" · ");

/** "US, UK, Canada and India" — the short form for titles and headlines. */
export const marketsShortLine = (() => {
  const names = markets.map((m) => m.shortName);
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
})();

/**
 * `areaServed` for Organization and Service nodes. An office's own
 * `areaServed` is its physical catchment and is deliberately NOT this — mixing
 * the two up is the most common multi-location schema error.
 */
export const areaServedCountries = markets.map((m) => ({
  "@type": "Country",
  name: m.countryName,
}));

/**
 * Absolute URL on the canonical origin. Pass a root-relative path ("/about")
 * or nothing for the homepage.
 *
 * Canonical tags, og:url and JSON-LD @ids must be absolute and must all agree,
 * so every one of them goes through here rather than interpolating
 * `siteConfig.url` at the call site.
 */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetadataInput {
  /** Root-relative path, e.g. "/services/ai-automation". Omit for the homepage. */
  path?: string;
  title: string;
  description: string;
  /** Defaults to "website"; blog posts pass "article". */
  type?: "website" | "article";
  /** ISO date — only meaningful when `type` is "article". */
  publishedTime?: string;
  /** ISO date — only meaningful when `type` is "article". */
  modifiedTime?: string;
  robots?: Metadata["robots"];
}

/**
 * Builds the per-page metadata every route needs: a self-referencing canonical
 * and a matching `og:url`.
 *
 * The `og:url` half matters — the root layout sets `openGraph.url` once, and
 * because metadata merges shallowly, any page that doesn't set its own
 * `openGraph` inherits the *homepage* URL. Every page previously advertised
 * `og:url` of the site root.
 *
 * Deliberately omits `openGraph.images` / `twitter.images`: those come from the
 * `opengraph-image` file convention, which takes priority over the metadata
 * object anyway (see `generate-metadata.md` — "File-based metadata has the
 * higher priority").
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
  publishedTime,
  modifiedTime,
  robots,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
      // Repeated here, not just in the root layout, for the same shallow-merge
      // reason as `url` above: a page that sets its own `openGraph` replaces
      // the layout's object wholesale rather than merging into it, so anything
      // declared only in the layout silently disappears from every page that
      // calls this helper — which is every page.
      alternateLocale: [...siteConfig.ogLocaleAlternate],
      type,
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
