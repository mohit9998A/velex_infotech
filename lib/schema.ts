import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

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
const BUSINESS_ID = absoluteUrl("/#business");

/** Reference to the Organization node rather than repeating it inline. */
const orgRef = { "@id": ORG_ID };

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description:
      "Premium AI automation and digital services agency. Intelligent Solutions. Premium Results.",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo/velex-logo.svg"),
      width: 512,
      height: 128,
    },
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ludhiana",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      postalCode: "141001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Punjabi"],
      areaServed: "IN",
    },
    // All four profiles — the previous version listed only two.
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
    ],
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
    inLanguage: "en-IN",
  };
}

/**
 * The physical Ludhiana office. Shared by /contact and /locations/ludhiana via
 * a common `@id` so the two pages describe one business, not two.
 *
 * No `aggregateRating` — publishing a rating without verifiable on-page reviews
 * violates Google's structured data policy and risks a manual action.
 * Reinstate it only when `content/testimonials.json` holds real reviews.
 */
export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    parentOrganization: orgRef,
    image: absoluteUrl("/images/logo/velex-logo.svg"),
    priceRange: "₹₹₹",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ludhiana",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      postalCode: "141001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 30.9009, longitude: 75.8573 },
    areaServed: { "@type": "Country", name: "India" },
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

export function serviceSchema(input: {
  slug: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${input.slug}#service`),
    name: input.title,
    serviceType: input.title,
    description: input.description,
    url: absoluteUrl(`/services/${input.slug}`),
    provider: orgRef,
    areaServed: { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  };
}

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
    author: { "@type": "Person", name: post.author },
    publisher: orgRef,
    inLanguage: "en-IN",
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
