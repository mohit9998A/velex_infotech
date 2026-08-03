import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/**
 * Bare hostname ("velexinfotech.com") for display in copy. Derived from
 * `siteConfig.url` so it can never disagree with the canonical origin — the
 * footer previously hardcoded a different domain than the one being linked.
 */
export const siteDomain = new URL(siteConfig.url).host;

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
      locale: siteConfig.locale,
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
