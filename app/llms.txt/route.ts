import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

const services = servicesData as ServiceItem[];

// Nothing here reads request state, so prerender it at build time rather than
// invoking a function per crawl.
export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text site summary for LLM crawlers.
 *
 * Generated from content/services.json and the blog registry rather than
 * committed as a static file in public/, so it cannot drift out of sync with
 * the site. A hand-maintained copy would rot exactly the way the /og-default.jpg
 * reference did.
 */
export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is an AI automation and software development company based in ${siteConfig.location}, serving clients across India. Founded ${2024} by ${siteConfig.founder}.

Contact: ${siteConfig.email} | ${siteConfig.phoneDisplay}
Website: ${siteConfig.url}

## Services

${services
  .map(
    (s) =>
      `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription ?? s.description}`,
  )
  .join("\n")}

## Guides

${blogPosts
  .map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`)
  .join("\n")}

## Locations

- [Ludhiana, Punjab](${absoluteUrl("/locations/ludhiana")}): Our office. We serve manufacturing, export and service businesses across Punjab, and clients throughout India remotely.

## Other pages

- [About](${absoluteUrl("/about")})
- [All services](${absoluteUrl("/services")})
- [Blog](${absoluteUrl("/blog")})
- [Contact](${absoluteUrl("/contact")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
