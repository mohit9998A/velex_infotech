import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import type { OfficeConfig } from "@/config/site";
import { headquarters, offices, siteConfig } from "@/config/site";
import { absoluteUrl, areaServedCountries } from "@/lib/seo";

const services = servicesData as ServiceItem[];

/**
 * Every JSON-LD block on the site is built here.
 *
 * These used to live inline in four different files, which is how the
 * Organization `logo` ended up pointing at a file that was never created and
 * how every `@id` ended up on a domain that does not resolve. Building them
 * from one `siteConfig`-derived base means a domain change is a one-line edit
 * that cannot leave a schema behind.
 *
 * Stable `@id`s let the graph cross-reference itself: the LocalBusiness on
 * /contact and /locations/ludhiana are the same node, and every Service points
 * at the same provider.
 */

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");
const PERSON_ID = absoluteUrl("/about#mohit-dutta");

/** Reference to the Organization node rather than repeating it inline. */
const orgRef = { "@id": ORG_ID };
/** Reference to the founder's Person node. Full node lives on /about only. */
const personRef = { "@id": PERSON_ID };

/** Only profiles that resolve. See the comment on siteConfig.social. */
const socialProfiles = Object.values(siteConfig.social);

function officeSchemaId(office: OfficeConfig) {
  return absoluteUrl(office.schemaId ?? `/#business-${office.id}`);
}

function postalAddress(office: OfficeConfig) {
  return {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.city,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: office.countryCode,
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo/velex-logo.svg"),
      width: 512,
      height: 128,
    },
    foundingDate: "2024",
    // Reference, not an inline Person — the full node is emitted once, on
    // /about, where the visible founder card backs it up.
    founder: { "@type": "Person", "@id": PERSON_ID, name: siteConfig.founder },
    // One registered address (the HQ). Additional presence goes in `location`
    // below, which is the correct property for multiple places.
    address: postalAddress(headquarters),
    location: offices
      .filter((o) => o.hasAddress)
      .map((o) => ({ "@id": officeSchemaId(o) })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "sales",
        // BCP-47 codes rather than language names — both are legal, codes are
        // unambiguous to parsers.
        availableLanguage: ["en", "hi", "pa"],
        areaServed: ["US", "GB", "CA", "IN"],
      },
    ],
    /**
     * A direct entity→topic edge. Cheap, and one of the few schema additions
     * that measurably helps an LLM answer "what does this company do?" without
     * having to infer it from marketing prose.
     */
    knowsAbout: [
      "AI agents",
      "agentic AI",
      "AI automation",
      "AI receptionists",
      "conversational AI",
      "WhatsApp Business API",
      "AI integration",
      "data analytics",
      "business intelligence",
      "custom software development",
      "web development",
      "mobile app development",
    ],
    areaServed: areaServedCountries,
    sameAs: socialProfiles,
    // Derived from content/services.json rather than a parallel hardcoded list,
    // so adding a service can't leave the catalog stale.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI & Digital Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: orgRef,
    inLanguage: siteConfig.htmlLang,
  };
}

/**
 * The founder. Emitted in full on /about only; everywhere else references
 * PERSON_ID. The `#mohit-dutta` fragment resolves to the visible founder card
 * on that page — an @id fragment pointing at nothing is a smell reviewers look
 * for.
 *
 * TODO(velex): add the founder's personal LinkedIn to `sameAs`. Author
 * authority is the E-E-A-T signal this site is currently missing entirely.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.founder,
    jobTitle: "Founder & CEO",
    worksFor: orgRef,
    url: absoluteUrl("/about"),
    knowsAbout: [
      "AI agents",
      "AI automation",
      "conversational AI",
      "custom software development",
    ],
  };
}

/**
 * A physical office. One node per staffed address, each with its own `@id`.
 *
 * Only call this for an office with `hasAddress: true`. Emitting a
 * LocalBusiness for a distributed team — or worse, for a country with no
 * address at all — is a fabricated-NAP problem: it gets Google Business
 * Profiles suspended and it is trivially falsifiable.
 *
 * `areaServed` here is the office's physical catchment, deliberately NOT the
 * four markets. The company serves four countries; this building serves a
 * region. Getting that backwards is the most common multi-location schema
 * error.
 *
 * No `aggregateRating` — publishing a rating without verifiable on-page reviews
 * violates Google's structured data policy and risks a manual action.
 * Reinstate it only when `content/testimonials.json` holds real reviews AND
 * they are displayed on the page carrying the markup.
 */
export function localBusinessSchema(officeId: string = headquarters.id) {
  const office = offices.find((o) => o.id === officeId);
  if (!office) throw new Error(`localBusinessSchema: unknown office "${officeId}"`);
  if (!office.hasAddress) {
    throw new Error(
      `localBusinessSchema: office "${officeId}" has no address. Distributed ` +
        `teams must not emit a LocalBusiness node — use webPageSchema instead.`,
    );
  }

  return {
    "@type": "ProfessionalService",
    "@id": officeSchemaId(office),
    name: `${siteConfig.name} — ${office.city}`,
    description: siteConfig.description,
    url: absoluteUrl(office.path),
    parentOrganization: orgRef,
    image: absoluteUrl("/images/logo/velex-logo.svg"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: postalAddress(office),
    ...(office.geo
      ? { geo: { "@type": "GeoCoordinates", ...office.geo } }
      : {}),
    areaServed: [
      { "@type": "AdministrativeArea", name: office.region },
      { "@type": "City", name: office.city },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };
}

/**
 * A generic page node. This is what market pages (a country we serve but have
 * no office in) use instead of LocalBusiness.
 */
export function webPageSchema(input: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef,
    inLanguage: siteConfig.htmlLang,
  };
}

/**
 * A Service node.
 *
 * `path` exists because industry pages (/industries/healthcare) describe a
 * service too, but must not claim the `@id` of a /services page — two nodes
 * sharing one identity is worse than a changed id. Defaults to the service
 * page for the given slug, which is the common case.
 */
export function serviceSchema(input: {
  slug: string;
  title: string;
  description: string;
  path?: string;
  /** Overrides the four default countries, e.g. a market-scoped page. */
  areaServed?: object[];
}) {
  const path = input.path ?? `/services/${input.slug}`;
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: input.title,
    serviceType: input.title,
    description: input.description,
    url: absoluteUrl(path),
    provider: orgRef,
    // Literally answers "do they serve the US?" for an extractor.
    areaServed: input.areaServed ?? areaServedCountries,
    audience: { "@type": "BusinessAudience" },
    // No `offers` block. An Offer with priceCurrency INR, no price and
    // availability "InStock" is product vocabulary applied to consulting — it
    // says nothing, and it says it in the wrong currency to three of the four
    // markets. Use priceSpecification with a real minPrice when prices are
    // published.
  };
}

/**
 * Q&A pairs.
 *
 * Note: since August 2023 Google shows FAQ rich results only for authoritative
 * government and health sites, so this will not produce a SERP accordion. It
 * stays because it is a clean machine-readable Q→A mapping that AI answer
 * engines consume, and because it costs nothing.
 *
 * The policy still applies: never emit this for Q&As that aren't visible on
 * the page.
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** A list of links, e.g. the services index or a locations hub. */
export function itemListSchema(input: {
  id: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@type": "ItemList",
    "@id": absoluteUrl(input.id),
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/**
 * Breadcrumbs. Pass the trail without the home crumb — it is prepended here so
 * every trail starts consistently at the site root.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    // @id ref plus name: the reference lets the graph resolve to the full
    // Person node on /about, the name keeps it self-describing for parsers
    // that don't cross-reference.
    author: { "@type": "Person", "@id": PERSON_ID, name: post.author },
    publisher: orgRef,
    inLanguage: siteConfig.htmlLang,
  };
}

/**
 * Wraps nodes in a single `@graph` so one script tag carries the whole page's
 * structured data and cross-references resolve by `@id`.
 *
 * The `<` escaping is required, not cosmetic: this output goes through
 * `dangerouslySetInnerHTML`, and `JSON.stringify` does not sanitise strings.
 * Without it, any schema field that ever carries user- or CMS-supplied text
 * could close the script tag and inject markup. Next's own JSON-LD guide
 * prescribes exactly this replacement.
 */
export function jsonLd(...nodes: object[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");
}

export { personRef };
