import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, webPageSchema } from "@/lib/schema";
import { LocationShell } from "@/components/sections/location-shell";

const services = servicesData as ServiceItem[];

const title = "Our Noida Engineering Team";
const description =
  "Velex Infotech's second engineering team works from Noida, Delhi-NCR. It is a distributed team rather than a staffed office — no public address, and this page explains what that means for clients.";

export const metadata = pageMetadata({ path: "/locations/noida", title, description });

/**
 * An engineering hub with `hasAddress: false`.
 *
 * This page exists to be honest about a presence we genuinely have, not to
 * rank for "software development company in noida" — Plan.md §1.6 rates that
 * SERP directory-locked (9 of 10 results are directories for the app-dev
 * variant) and not worth chasing.
 *
 * Emitting LocalBusiness or PostalAddress here would be fabricated NAP:
 * `localBusinessSchema("noida")` throws by design (AGENTS.md rule 6).
 */

const sections = [
  {
    title: "A team, not an office",
    body: "Noida is where part of our engineering team works, distributed rather than gathered in a staffed building. We do not publish an address here because there is no reception to walk into, and claiming otherwise is the kind of detail a buyer verifies.",
  },
  {
    title: "Why it exists",
    body: "Delhi-NCR has a deeper pool of senior backend and data engineers than Ludhiana does. The split lets us staff integration-heavy and data-platform work without relocating people or pretending a single city can cover every specialism.",
  },
  {
    title: "What it means for a client",
    body: "Nothing operationally. Engagements are contracted, managed and delivered as one team on shared hours, and you get named engineers rather than a handoff between locations. The distinction matters for honesty, not for your project plan.",
  },
  {
    title: "Where the front door is",
    body: "Ludhiana. In-person meetings, the registered address and the local business presence all sit there. If you want to meet face to face in Delhi-NCR we will travel, but we will not describe that as visiting our office.",
  },
];

const faqs = [
  {
    question: "Does Velex Infotech have an office in Noida?",
    answer:
      "Not a staffed one. Part of our engineering team is based in Noida and works distributed, so there is no address to visit and we do not publish one. The registered office is in Ludhiana, Punjab.",
  },
  {
    question: "Why list Noida at all if there is no office?",
    answer:
      "Because the people are real and it would be misleading to imply all engineering happens in Punjab. Listing a team without inventing an address is the honest version of both facts.",
  },
  {
    question: "Can we meet in Delhi-NCR?",
    answer:
      "Yes, we will travel to you. What we will not do is invite you to an office that does not exist, which is what a virtual-address listing on this page would amount to.",
  },
  {
    question: "Does the split affect delivery or accountability?",
    answer:
      "No. Both hubs work the same 09:00–19:00 IST hours as one team, on one contract, with named engineers on your project. There is no internal handoff between locations for you to manage.",
  },
  {
    question: "What kind of work does the Noida team do?",
    answer:
      "Mostly integration-heavy backend and data-platform work, where Delhi-NCR's engineering pool runs deeper. Client-facing scoping and delivery management stay with the Ludhiana team regardless of who writes the code.",
  },
];

export default function NoidaPage() {
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: "India", path: "/locations/india" },
    { name: "Noida", path: "/locations/noida" },
  ];
  const featured = services.filter((s) =>
    ["software-development", "data-analytics", "ai-integration", "app-development"].includes(s.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            // WebPage, never LocalBusiness. There is no address to publish.
            webPageSchema({ path: "/locations/noida", title, description }),
            breadcrumbSchema(trail),
          ),
        }}
      />
      <LocationShell
        trail={trail}
        eyebrow="Noida, Delhi-NCR"
        h1="Our Noida engineering team"
        lede="Part of Velex Infotech's engineering team works from Noida in Delhi-NCR. It is a distributed team, not a staffed office, so there is no address on this page — the registered office and in-person meetings are in Ludhiana, Punjab."
        presetService="Software Development"
        facts={[
          { label: "Status", value: "Distributed engineering team" },
          { label: "Public address", value: "None — by design, not omission" },
          { label: "Registered office", value: "Ludhiana, Punjab" },
          { label: "Working hours", value: "09:00–19:00 IST, Mon–Fri" },
        ]}
        sections={sections}
        servicesTitle="What this team mainly builds"
        services={featured}
        compliance={{
          heading: "Why this page has no address",
          body: "Publishing a postal address for a place that is not staffed is fabricated NAP data. It gets Google Business Profiles suspended, those suspensions cascade across an account, and a prospect who turns up to an empty address never comes back. The code enforces this: our schema helper throws if anyone tries to emit a LocalBusiness node for this location.",
        }}
        faqs={faqs}
        faqTitle="Questions about our Noida team"
        siblings={[
          { name: "Ludhiana", path: "/locations/ludhiana", blurb: "Headquarters — real address, in-person meetings, local manufacturing work." },
          { name: "India", path: "/locations/india", blurb: "The country page: GST, languages and how we work nationally." },
          { name: "All locations", path: "/locations", blurb: "Every hub and market, and the difference between the two." },
        ]}
      />
    </>
  );
}
