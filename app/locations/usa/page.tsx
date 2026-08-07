import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema, webPageSchema } from "@/lib/schema";
import { LocationShell } from "@/components/sections/location-shell";

const services = servicesData as ServiceItem[];

const title = "AI Automation Company for US Businesses";
const description =
  "Velex Infotech builds AI automation, AI agents and custom software for US businesses. Invoiced in USD, delivered from India, with four hours of live Eastern overlap every morning.";

export const metadata = pageMetadata({ path: "/locations/usa", title, description });

/**
 * Market page — no US premises, so WebPage + market-scoped Service only.
 *
 * Note the keyword posture: this page targets "ai automation company usa" and
 * "offshore ai development for us clients", not "ai agent development company
 * usa", which Plan.md §1.6 rates a vanity term (two directories and seven
 * listicles hold the top 10, so a DR-2 domain cannot enter it).
 */

const overlap = [
  { market: "New York / Miami (ET)", hours: "09:00–13:00 ET live, same-day replies after" },
  { market: "Chicago / Austin (CT)", hours: "08:00–12:00 CT live" },
  { market: "Denver / Phoenix (MT)", hours: "07:00–11:00 MT live" },
  { market: "San Francisco / Seattle (PT)", hours: "06:00–10:00 PT live, plus an async handover each morning" },
];

const sections = [
  {
    title: "The cost case is per missed lead, not per seat",
    body: "US buyers usually arrive with a number already in mind: what an unanswered inbound enquiry is worth. That is the right frame, and it is why AI receptionists and lead-routing automations pay back faster here than internal tooling does.",
  },
  {
    title: "Tier-2 cities are where a new domain can rank",
    body: "Search results for AI agencies in New York and San Francisco are held by directories and funded competitors. Austin, Denver, Phoenix and Charlotte are not. If you found us, it is probably from one of the latter.",
  },
  {
    title: "Integration debt is the usual blocker",
    body: "Most US mid-market businesses run more SaaS than they can name, and the AI project stalls on the one system without a usable API. We scope that surface first, because it decides the timeline more than the model choice does.",
  },
  {
    title: "State privacy law is now a design input",
    body: "California, Colorado, Virginia, Texas and others each impose their own consumer-privacy duties. Which apply to you depends on where your customers are, and that changes what a system may log and retain.",
  },
];

const faqs = [
  {
    question: "Do you have a US office?",
    answer:
      "No. Velex Infotech operates from India and serves US clients remotely. We do not list a US virtual address, because a mailbox presented as an office is the first thing a serious buyer checks and the fastest way to lose their trust.",
  },
  {
    question: "How do you invoice US clients?",
    answer:
      "In US dollars from our Indian entity, by international wire or a card payment link. As a foreign supplier we do not charge US sales tax; you may need a Form W-8BEN-E from us for withholding purposes, which we provide on request.",
  },
  {
    question: "How much overlap is there with US working hours?",
    answer:
      "Roughly four hours with US Eastern and two with US Pacific, since we work 09:00–19:00 IST. West Coast clients typically run async with a written handover each morning rather than trying to hold live calls.",
  },
  {
    question: "Is offshore AI development actually cheaper for a US business?",
    answer:
      "The hourly gap is large, but total cost narrows once you count specification, review and management time. Offshore works when scope is well defined; if your requirements are still moving weekly, the coordination cost will eat the saving.",
  },
  {
    question: "Who owns the code and the models?",
    answer:
      "You do, on payment, including infrastructure configuration and prompts. We hand over repositories and deployment access rather than hosting your system inside an account you cannot reach — vendor lock-in is a support-revenue tactic, not an architecture.",
  },
  {
    question: "Can you sign a US-style MSA and NDA?",
    answer:
      "Yes, and most US engagements run on the client's paper. We will flag anything we cannot meet — for example we hold no SOC 2 attestation today, so a clause requiring one is something to resolve before signature rather than after.",
  },
];

export default function UsaPage() {
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: "United States", path: "/locations/usa" },
  ];
  const featured = services.filter((s) =>
    ["ai-automation", "agentic-ai", "ai-receptionist", "ai-consulting"].includes(s.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/locations/usa", title, description }),
            serviceSchema({
              slug: "ai-automation-usa",
              path: "/locations/usa",
              title: "AI Automation Services for the United States",
              description,
              areaServed: [{ "@type": "Country", name: "United States" }],
            }),
            breadcrumbSchema(trail),
          ),
        }}
      />
      <LocationShell
        trail={trail}
        eyebrow="United States"
        h1="AI automation company for US businesses"
        lede="Velex Infotech builds AI automation, AI agents and custom software for US businesses, delivered remotely from India and invoiced in US dollars. There is no US office — you work directly with the engineers building the system."
        presetService="AI Automation"
        facts={[
          { label: "Contracting entity", value: "Velex Infotech, Ludhiana, India" },
          { label: "Invoice currency", value: "USD" },
          { label: "Payment", value: "International wire or card link" },
          { label: "Live overlap", value: "~4 hours with US Eastern" },
        ]}
        overlap={overlap}
        sections={sections}
        servicesTitle="What US clients ask for most"
        services={featured}
        compliance={{
          heading: "How we contract and handle your data",
          body: "We contract from India and invoice in USD. Velex Infotech is not a US entity and holds no SOC 2, HITRUST or ISO 27001 attestation today. That is a real constraint for enterprise procurement, and we would rather it surface on this page than three weeks into a security review.",
          points: [
            "We provide Form W-8BEN-E on request for withholding purposes",
            "We work on your MSA and NDA, and flag any clause we cannot meet before signing",
            "Code, infrastructure config and prompts transfer to you on payment",
          ],
        }}
        faqs={faqs}
        faqTitle="Working with us from the United States"
        siblings={[
          { name: "Canada", path: "/locations/canada", blurb: "Same delivery model, invoiced in CAD, with bilingual scoping where needed." },
          { name: "United Kingdom", path: "/locations/uk", blurb: "Full overlap with a UK business day — our closest market by hours." },
          { name: "India", path: "/locations/india", blurb: "Where we are actually based, across Ludhiana and Noida." },
        ]}
      />
    </>
  );
}
