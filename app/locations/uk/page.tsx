import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema, webPageSchema } from "@/lib/schema";
import { LocationShell } from "@/components/sections/location-shell";

const services = servicesData as ServiceItem[];

const title = "AI Automation Agency for UK Businesses";
const description =
  "Velex Infotech builds AI automation, WhatsApp chatbots and custom software for UK businesses. Invoiced in GBP, with full overlap between our working day and yours.";

export const metadata = pageMetadata({ path: "/locations/uk", title, description });

/**
 * Market page — no UK premises, so WebPage + market-scoped Service only.
 *
 * Targets "ai automation agency [Manchester/Birmingham/Leeds/Bristol]" and
 * "whatsapp chatbot development uk" rather than "ai automation agency london",
 * which Plan.md §1.6 rates vanity — Clutch sits at #4 on that SERP.
 *
 * The UK is our strongest market on working hours: 09:00-19:00 IST fully
 * contains a UK business day, which is the one genuine structural advantage we
 * have over a US-based competitor selling into Britain.
 */

const overlap = [
  { market: "London / all UK (GMT)", hours: "09:00–13:30 GMT live — our full afternoon is your morning" },
  { market: "London / all UK (BST)", hours: "09:00–14:30 BST live during British Summer Time" },
];

const sections = [
  {
    title: "The one market where hours are an advantage",
    body: "Our 09:00–19:00 IST day covers a UK morning entirely. A question asked at 09:00 in Manchester is answered before lunch, which is not true of an agency working from the US West Coast — and it is the reason UK engagements need less async process than American ones.",
  },
  {
    title: "Regional cities, not London",
    body: "Search results for AI agencies in London are held by directories and funded firms. Manchester, Birmingham, Leeds and Bristol are contested by actual builders, and the businesses there are the size where one automation changes the week.",
  },
  {
    title: "WhatsApp is underused by UK businesses",
    body: "UK adoption of WhatsApp Business lags India and much of Europe, which makes it a cheaper channel to win on. For businesses with international or diaspora customer bases it is often the channel those customers already prefer.",
  },
  {
    title: "UK GDPR is stricter than it looks",
    body: "UK GDPR and PECR govern consent, lawful basis and any automated decision that significantly affects a person. If an AI system declines an application or prioritises a case, that is a design constraint and not a legal footnote.",
  },
];

const faqs = [
  {
    question: "Do you have a UK office?",
    answer:
      "No. Velex Infotech works from India and serves UK clients remotely. We deliberately do not list a London virtual address, because presenting a mailbox as an office is trivially checkable and destroys credibility when it is.",
  },
  {
    question: "How do you invoice UK clients?",
    answer:
      "In pounds sterling from our Indian entity, by international transfer or a card payment link. As a non-UK supplier we do not charge UK VAT; business customers normally account for it under the reverse charge, and your accountant should confirm the treatment.",
  },
  {
    question: "What is the working-hours overlap with the UK?",
    answer:
      "Full overlap with your morning. We work 09:00–19:00 IST, which covers a UK working day from 09:00 until roughly 13:30 GMT — so you get live hours every day rather than an overnight handover.",
  },
  {
    question: "How do you handle UK GDPR?",
    answer:
      "By deciding lawful basis, retention and data location at design time rather than before launch. We will sign your DPA and act as processor, but Velex Infotech holds no ISO 27001 certification today, which matters if your procurement requires one.",
  },
  {
    question: "Does an AI receptionist work with UK numbers and accents?",
    answer:
      "Yes, on a UK number, and regional accent handling is part of what we test before launch rather than assume. We run real recorded calls through the agent during build, because accent coverage is where voice systems most often disappoint.",
  },
  {
    question: "Can you help with automated decision-making rules?",
    answer:
      "We design so that any decision materially affecting a person keeps a human in the loop, with the reasoning logged. That is both a UK GDPR expectation and, in practice, the only way to defend a decision when someone challenges it.",
  },
];

export default function UkPage() {
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: "United Kingdom", path: "/locations/uk" },
  ];
  const featured = services.filter((s) =>
    ["ai-automation", "whatsapp-bot", "ai-receptionist", "web-development"].includes(s.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/locations/uk", title, description }),
            serviceSchema({
              slug: "ai-automation-uk",
              path: "/locations/uk",
              title: "AI Automation Services for the United Kingdom",
              description,
              areaServed: [{ "@type": "Country", name: "United Kingdom" }],
            }),
            breadcrumbSchema(trail),
          ),
        }}
      />
      <LocationShell
        trail={trail}
        eyebrow="United Kingdom"
        h1="AI automation agency for UK businesses"
        lede="Velex Infotech builds AI automation, WhatsApp chatbots and custom software for UK businesses, invoiced in pounds and delivered from India. Our working day fully covers a UK morning, so you get live hours rather than an overnight handover."
        presetService="AI Automation"
        facts={[
          { label: "Contracting entity", value: "Velex Infotech, Ludhiana, India" },
          { label: "Invoice currency", value: "GBP" },
          { label: "VAT", value: "Not charged — reverse charge normally applies" },
          { label: "Live overlap", value: "Your full morning, every weekday" },
        ]}
        overlap={overlap}
        sections={sections}
        servicesTitle="What UK clients ask for most"
        services={featured}
        compliance={{
          heading: "How we contract and handle your data",
          body: "We contract from India and invoice in GBP. We will sign your DPA and act as a processor under UK GDPR, deciding retention and data location during design rather than before launch. Velex Infotech holds no ISO 27001 or Cyber Essentials certification today — if your procurement requires either, that is a blocker worth raising now.",
          points: [
            "UK VAT is not charged; business customers normally apply the reverse charge",
            "Lawful basis, retention and data location are settled at scoping, not at launch",
            "Decisions that materially affect a person keep a human in the loop, with reasoning logged",
          ],
        }}
        faqs={faqs}
        faqTitle="Working with us from the UK"
        siblings={[
          { name: "United States", path: "/locations/usa", blurb: "Same delivery model, invoiced in USD, with four hours of Eastern overlap." },
          { name: "Canada", path: "/locations/canada", blurb: "Invoiced in CAD, with bilingual scoping where you serve Quebec." },
          { name: "India", path: "/locations/india", blurb: "Where we are actually based, across Ludhiana and Noida." },
        ]}
      />
    </>
  );
}
