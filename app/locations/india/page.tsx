import Link from "next/link";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { offices } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema, webPageSchema } from "@/lib/schema";
import { LocationShell } from "@/components/sections/location-shell";

const services = servicesData as ServiceItem[];

const title = "IT & AI Services Company in India";
const description =
  "Velex Infotech is an AI and software company based in Ludhiana with an engineering team in Noida. AI automation, WhatsApp chatbots and custom software for Indian businesses, invoiced in INR with GST.";

export const metadata = pageMetadata({ path: "/locations/india", title, description });

/**
 * The country page. Sits above the two hubs and below the /locations hub.
 *
 * This is the one market page where we DO have addresses — but the
 * LocalBusiness node belongs to /locations/ludhiana, which is the page with the
 * real NAP on it. Emitting a second one here would give one entity two @ids
 * (AGENTS.md rule 5), so this page uses WebPage and links down instead.
 */

const sections = [
  {
    title: "Two hubs, one delivery team",
    body: "Ludhiana is the headquarters and where client meetings happen in person. Noida is a distributed engineering team, not a staffed office — we say that plainly rather than listing an address we do not occupy.",
  },
  {
    title: "Manufacturing and export is the home market",
    body: "Ludhiana runs on hosiery, bicycle components, agricultural machinery and export trade. Those businesses share a pattern: high enquiry volume in mixed languages, and documentation work that consumes staff who should be selling.",
  },
  {
    title: "WhatsApp is the default channel, not an extra",
    body: "In India a customer will message on WhatsApp before they email or call. That inverts the usual build order — the WhatsApp flow is the product surface, and the website is what people check afterwards.",
  },
  {
    title: "Language coverage decides adoption",
    body: "A voice agent that handles English but stumbles in Hindi or Punjabi gets abandoned in week two. We test in the languages your customers actually use, in the accents they actually have, before launch rather than after.",
  },
];

const faqs = [
  {
    question: "Where is Velex Infotech based in India?",
    answer:
      "Headquarters are in Ludhiana, Punjab, which is where in-person meetings happen. A second engineering team works from Noida in Delhi-NCR as a distributed team rather than a staffed office, and we do not publish an address for it.",
  },
  {
    question: "Do you charge GST?",
    answer:
      "Yes. Indian clients are invoiced in rupees with GST applied at the applicable rate, from our Indian entity. Overseas clients are invoiced in their own currency without Indian GST, since export of services is treated differently.",
  },
  {
    question: "Do you work with businesses outside Punjab?",
    answer:
      "Yes — most Indian work is delivered remotely, and Ludhiana matters mainly for clients who want to meet face to face. Delhi-NCR, Mumbai and Bengaluru clients typically never need an in-person visit.",
  },
  {
    question: "Can your systems handle Hindi and Punjabi?",
    answer:
      "Yes. Voice agents and WhatsApp chatbots handle English, Hindi and Punjabi, including switching mid-conversation when a customer does. We test with real recordings before launch, because that is where multilingual systems usually fail.",
  },
  {
    question: "How does the DPDP Act affect an AI project?",
    answer:
      "India's Digital Personal Data Protection Act 2023 makes consent and purpose limitation operative requirements, including for health and financial data. In practice it decides what a system may log and how long it keeps it, which is a design decision.",
  },
  {
    question: "Is AI worth it for a mid-size Indian manufacturer?",
    answer:
      "It depends entirely on volume. If enquiries and documentation are handled by people who re-type the same information between systems, the case is strong; if volumes are low, a cheaper process fix usually beats an AI build and we will say so.",
  },
];

export default function IndiaPage() {
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: "India", path: "/locations/india" },
  ];
  const featured = services.filter((s) =>
    ["whatsapp-bot", "ai-receptionist", "software-development", "web-development"].includes(s.slug),
  );
  const hubs = offices;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/locations/india", title, description }),
            serviceSchema({
              slug: "it-services-india",
              path: "/locations/india",
              title: "IT and AI Services for India",
              description,
              areaServed: [{ "@type": "Country", name: "India" }],
            }),
            breadcrumbSchema(trail),
          ),
        }}
      />
      <LocationShell
        trail={trail}
        eyebrow="India"
        h1="IT and AI services company in India"
        lede="Velex Infotech is an AI and software company headquartered in Ludhiana, Punjab, with an engineering team in Noida. We build AI automation, WhatsApp chatbots, voice agents and custom software for Indian businesses, invoiced in rupees with GST."
        presetService="WhatsApp AI Chatbot"
        facts={[
          { label: "Headquarters", value: "Ludhiana, Punjab 141001" },
          { label: "Engineering team", value: "Noida, Uttar Pradesh (distributed)" },
          { label: "Invoice currency", value: "INR, with GST" },
          { label: "Languages", value: "English, Hindi, Punjabi" },
        ]}
        sections={sections}
        servicesTitle="What Indian clients ask for most"
        services={featured}
        compliance={{
          heading: "Contracting, GST and data handling",
          body: "Indian clients contract with our Indian entity and are invoiced in rupees with GST. On data: we build to the DPDP Act's consent and purpose-limitation requirements, treating them as architecture rather than paperwork. Velex Infotech holds no ISO 27001 certification today.",
          points: [
            "GST applied at the applicable rate for domestic clients",
            "Consent and retention decided at design time, not before launch",
            "Personal data is not sent to public model endpoints by default",
          ],
        }}
        faqs={faqs}
        faqTitle="Working with us in India"
        siblings={hubs
          .map((o) => ({
            name: o.city,
            path: o.path,
            blurb: o.hasAddress
              ? "Headquarters — real address, in-person meetings, and our local manufacturing and export work."
              : "Distributed engineering team in Delhi-NCR. No public office, and this page says so.",
          }))
          .concat([
            {
              name: "United States",
              path: "/locations/usa",
              blurb: "Our largest overseas market, invoiced in USD.",
            },
          ])}
      />

      <section className="relative pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-secondary">
            Looking for the office address and local Ludhiana context?{" "}
            <Link
              href="/locations/ludhiana"
              className="text-purple-glow hover:text-primary"
            >
              See the Ludhiana page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
