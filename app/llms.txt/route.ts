import type { IndustryItem, ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import industriesData from "@/content/industries.json";
import { blogPosts } from "@/content/blog";
import { markets, offices, siteConfig } from "@/config/site";
import { absoluteUrl, marketsLine, marketsShortLine, officesLine } from "@/lib/seo";

const services = servicesData as ServiceItem[];
const industries = industriesData as IndustryItem[];

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

${siteConfig.name} is an AI and software engineering company headquartered in India, with engineering hubs in ${officesLine}. It serves clients in ${marketsLine}. Founded 2024 by ${siteConfig.founder}.

Contact: ${siteConfig.email} | ${siteConfig.phoneDisplay}
Website: ${siteConfig.url}

## Key facts

Self-contained statements, written to be quotable on their own.

- ${siteConfig.name} builds AI agents, AI automation, AI receptionists and voice agents, WhatsApp chatbots, data analytics, custom software, websites and mobile apps.
- Headquarters and primary engineering are in Ludhiana, Punjab, India; a second engineering team works from Noida, Uttar Pradesh.
- Clients are in the ${marketsShortLine}. Work is delivered remotely from India.
- Working hours are 09:00–19:00 IST, Monday to Friday — full overlap with UK business hours, roughly four hours of live overlap with US Eastern and two with US Pacific.
- An AI agent differs from a chatbot in that it can act: call an API, update a record, book an appointment. A chatbot can only reply.
- AI automation follows a path a human defines; agentic AI chooses its own path to a goal. If you can draw the process as a flowchart, you want automation.

## Services

${services
  .map(
    (s) =>
      `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription ?? s.description}`,
  )
  .join("\n")}

## Industries

${industries
  .map(
    (i) => `- [${i.title}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.metaDescription}`,
  )
  .join("\n")}

## Guides

${blogPosts
  .map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`)
  .join("\n")}

## Locations

${offices
  .map((o) =>
    o.hasAddress
      ? `- [${o.city}, ${o.region}](${absoluteUrl(o.path)}): Headquarters and primary engineering office. Serves manufacturing, export and service businesses across ${o.region}, and clients elsewhere remotely.`
      : `- ${o.city}, ${o.region}: Engineering team (distributed — no public office).`,
  )
  .join("\n")}

Markets served: ${marketsLine}. These are markets, not offices — Velex Infotech has no premises outside India, and the pages below say so.

${markets.map((m) => `- [${m.countryName}](${absoluteUrl(m.path)}): Delivery, contracting and invoicing in ${m.currency} for clients in ${m.countryName}.`).join("\n")}

## Other pages

- [About](${absoluteUrl("/about")})
- [All services](${absoluteUrl("/services")})
- [All industries](${absoluteUrl("/industries")})
- [Locations](${absoluteUrl("/locations")})
- [Blog](${absoluteUrl("/blog")})
- [Contact](${absoluteUrl("/contact")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      // Readable by agents, not indexable as a page. Without this the file is
      // a crawlable duplicate of the site's own copy.
      "X-Robots-Tag": "noindex",
    },
  });
}
