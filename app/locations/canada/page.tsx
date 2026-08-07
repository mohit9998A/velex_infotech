import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema, webPageSchema } from "@/lib/schema";
import { LocationShell } from "@/components/sections/location-shell";

const services = servicesData as ServiceItem[];

const title = "AI Automation Agency for Canadian Businesses";
const description =
  "Velex Infotech builds AI automation, AI receptionists and custom software for businesses in Toronto, Vancouver, Calgary and across Canada. Invoiced in CAD, delivered from India.";

export const metadata = pageMetadata({ path: "/locations/canada", title, description });

/**
 * A market page, not an office page.
 *
 * Velex Infotech has no Canadian premises, so this emits WebPage + a
 * market-scoped Service and never LocalBusiness or PostalAddress —
 * `localBusinessSchema()` would throw here by design (AGENTS.md rule 6).
 *
 * Canada is first of the four markets deliberately: the `ai automation agency
 * toronto` SERP is the only one of the four with no directory wall — Clutch,
 * GoodFirms and DesignRush are all absent from the top 10 (Plan.md §1.6).
 */

const overlap = [
  { market: "Toronto / Ottawa (ET)", hours: "09:00–13:00 ET live, same-day replies after" },
  { market: "Halifax (AT)", hours: "10:00–14:00 AT live" },
  { market: "Calgary / Edmonton (MT)", hours: "07:00–11:00 MT live, plus async handover each morning" },
  { market: "Vancouver (PT)", hours: "06:00–10:00 PT live — most clients here work async by choice" },
];

const sections = [
  {
    title: "A SERP that boutiques still win",
    body: "Canadian AI-agency search results are unusual: the firms ranking in Toronto and Vancouver are small independents, not the directory listings that dominate US and UK equivalents. It means a Canadian buyer comparing options is comparing actual builders, and expects to talk to one.",
  },
  {
    title: "Bilingual service is a real requirement",
    body: "Federally regulated businesses and anyone selling into Quebec need French-language handling, not an English bot with a translation layer bolted on. We scope language coverage per deployment rather than assuming English-only.",
  },
  {
    title: "Small teams, high call volume",
    body: "The Canadian businesses that get the most from an AI receptionist are clinics, trades, property managers and professional services with more inbound calls than staff to answer them. The measurable number is the cost of a missed call, not headcount.",
  },
  {
    title: "PIPEDA shapes the architecture",
    body: "Canadian privacy law expects meaningful consent and limits on how personal data is used beyond its original purpose. That is an architectural decision about what gets logged and where inference runs, made at design time rather than patched later.",
  },
];

const faqs = [
  {
    question: "Do you have an office in Canada?",
    answer:
      "No. Velex Infotech is based in India and works with Canadian clients remotely — we would rather say that plainly than list a virtual address. Every engagement is delivered from Ludhiana with a named engineer you deal with directly.",
  },
  {
    question: "How do you invoice Canadian clients?",
    answer:
      "In Canadian dollars, from our Indian entity, by international bank transfer or a card payment link. As an offshore supplier we do not charge GST/HST; how you self-assess it depends on your registration status, and your accountant should confirm the treatment.",
  },
  {
    question: "Does the time difference actually work?",
    answer:
      "For Eastern Canada, yes — you get roughly four hours of live overlap each morning before we finish at 19:00 IST. Vancouver clients typically run the relationship async, with a written handover waiting each morning.",
  },
  {
    question: "Can an AI receptionist handle French calls?",
    answer:
      "Language coverage is configured per deployment, so a bilingual line is scoped explicitly rather than assumed. If you serve Quebec or are federally regulated, tell us at scoping — retrofitting a second language after launch costs more than building for it.",
  },
  {
    question: "How does PIPEDA affect an AI project?",
    answer:
      "It constrains what you may do with personal information beyond the purpose it was collected for, which in practice decides what the system logs and whether data leaves Canada. We scope those choices before building rather than treating privacy as a launch checklist.",
  },
  {
    question: "Why hire offshore rather than a Toronto agency?",
    answer:
      "Rate, mostly — but that gap narrows once you count specification and review time. Offshore works when scope is well defined and there is genuine morning overlap; if you need someone in the room weekly, hire locally and we will say so.",
  },
];

export default function CanadaPage() {
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: "Canada", path: "/locations/canada" },
  ];
  const featured = services.filter((s) =>
    ["ai-automation", "ai-receptionist", "agentic-ai", "software-development"].includes(s.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/locations/canada", title, description }),
            serviceSchema({
              slug: "ai-automation-canada",
              path: "/locations/canada",
              title: "AI Automation Services for Canada",
              description,
              areaServed: [{ "@type": "Country", name: "Canada" }],
            }),
            breadcrumbSchema(trail),
          ),
        }}
      />
      <LocationShell
        trail={trail}
        eyebrow="Canada"
        h1="AI automation agency for Canadian businesses"
        lede="Velex Infotech builds AI automation, AI receptionists and custom software for Canadian businesses, delivered remotely from India and invoiced in Canadian dollars. We have no Canadian office, and this page says so rather than implying otherwise."
        presetService="AI Automation"
        facts={[
          { label: "Contracting entity", value: "Velex Infotech, Ludhiana, India" },
          { label: "Invoice currency", value: "CAD" },
          { label: "Payment", value: "International bank transfer or card link" },
          { label: "Working hours", value: "09:00–19:00 IST, Mon–Fri" },
        ]}
        overlap={overlap}
        sections={sections}
        servicesTitle="What Canadian clients ask for most"
        services={featured}
        compliance={{
          heading: "How we contract and handle your data",
          body: "We contract from India, invoice in CAD, and are not a Canadian legal entity. On privacy: we build to PIPEDA's consent and purpose-limitation principles, but Velex Infotech holds no SOC 2 or ISO 27001 attestation today. If your procurement process requires one, we would rather tell you now than at the security review.",
          points: [
            "Data residency is a design decision — tell us at scoping if it must stay in Canada",
            "We sign NDAs and will sign your DPA; we do not have a pre-certified compliance package",
            "Personal data is not sent to public model endpoints by default",
          ],
        }}
        faqs={faqs}
        faqTitle="Working with us from Canada"
        siblings={[
          { name: "United States", path: "/locations/usa", blurb: "Same delivery model, invoiced in USD, with four hours of Eastern overlap." },
          { name: "United Kingdom", path: "/locations/uk", blurb: "Our closest market by working hours — full overlap with a UK business day." },
          { name: "India", path: "/locations/india", blurb: "Where we are actually based, across Ludhiana and Noida." },
        ]}
      />
    </>
  );
}
