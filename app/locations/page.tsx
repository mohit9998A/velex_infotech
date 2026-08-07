import Link from "next/link";
import { ArrowUpRight, Building2, Globe2 } from "lucide-react";

import { markets, offices } from "@/config/site";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";

const title = "Where We Work";
const description = `Velex Infotech is based in Ludhiana, India, with an engineering team in Noida, and serves clients in the ${marketsShortLine}. An honest map of where we have offices and where we only have clients.`;

export const metadata = pageMetadata({ path: "/locations", title, description });

/**
 * The hub. Its main job is structural rather than editorial.
 *
 * /locations/ludhiana previously had zero inbound internal links — it existed
 * only in the sitemap, which is a textbook cause of "Discovered – currently not
 * indexed". This page, plus the Locations entry in config/navigation.ts, is
 * what puts every location inside the internal link graph.
 *
 * The hubs-vs-markets distinction is the editorial point: an office is
 * somewhere people sit, a market is somewhere clients are. Most agency
 * location pages blur the two deliberately. We separate them.
 */

const hubBlurbs: Record<string, string> = {
  ludhiana:
    "Headquarters and primary engineering. A real address, in-person meetings, and most of our manufacturing and export work.",
  noida:
    "A distributed engineering team in Delhi-NCR. No staffed office and no published address — deliberately.",
};

const marketBlurbs: Record<string, string> = {
  us: "Our largest overseas market. Invoiced in USD, with about four hours of live overlap with US Eastern.",
  uk: "Our closest market by working hours — our day covers a UK morning in full. Invoiced in GBP.",
  ca: "The softest of our four markets to reach, and the one where boutiques still outrank directories. Invoiced in CAD.",
  in: "Home market. Invoiced in INR with GST, in English, Hindi and Punjabi.",
};

const faqs = [
  {
    question: "Where is Velex Infotech actually based?",
    answer:
      "Ludhiana, Punjab, India. That is the registered office and where in-person meetings happen. A second engineering team works from Noida in Delhi-NCR as a distributed team, with no separate public address.",
  },
  {
    question: "Do you have offices in the US, UK or Canada?",
    answer:
      "No. Those are markets, not offices — we have clients there and no premises. We do not rent virtual addresses to imply otherwise, because a mailbox presented as an office is checkable in about a minute.",
  },
  {
    question: "What is the difference between a hub and a market on this page?",
    answer:
      "A hub is somewhere our people sit; a market is somewhere our clients are. Only hubs with a staffed address publish one, which is why the Noida page has no postal address on it.",
  },
  {
    question: "Does it matter that the team is offshore?",
    answer:
      "It matters for time zones and contracting, and not much else. The honest constraint is working hours: we run 09:00–19:00 IST, which suits the UK best, the US East Coast well, and the US West Coast only with async handovers.",
  },
  {
    question: "Which currency will we be invoiced in?",
    answer:
      "Yours, among USD, GBP, CAD and INR. Indian clients are billed in rupees with GST; overseas clients are billed without Indian GST, since export of services is treated differently.",
  },
];

export default function LocationsHubPage() {
  const trail = [{ name: "Locations", path: "/locations" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListSchema({
              id: "/locations#list",
              items: [
                ...offices.map((o) => ({ name: o.city, path: o.path })),
                ...markets.map((m) => ({ name: m.countryName, path: m.path })),
              ],
            }),
            breadcrumbSchema(trail),
          ),
        }}
      />

      <section className="relative overflow-hidden pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-2 font-display text-h1 text-balance text-primary">
            Where we work
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-secondary md:text-lg">
            Velex Infotech has two engineering hubs, both in India, and clients in
            four countries. This page keeps those two things separate: an office
            is somewhere people sit, a market is somewhere clients are. Only one
            of them gets an address.
          </p>
          <div className="mt-9">
            <ConsultButtons />
          </div>
        </div>
      </section>

      {/* Hubs */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Hubs"
            title="Where our people are"
            subtitle="Two locations, both in India. One has a staffed address; the other does not, and says so."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {offices.map((office) => (
              <Link
                key={office.id}
                href={office.path}
                className="group glass-card flex flex-col p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                  <Building2 className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-xl text-primary">
                  {office.city}, {office.region}
                </h2>
                <p className="mt-1 font-mono-label text-muted">
                  {office.hasAddress ? "Staffed office" : "Distributed team — no public address"}
                </p>
                <p className="mt-3 flex-1 text-sm text-secondary">
                  {hubBlurbs[office.id]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Markets"
            title="Where our clients are"
            subtitle="Four countries, no premises in any of them. Each page covers contracting, currency and the working-hours overlap you would actually get."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((market) => (
              <Link
                key={market.id}
                href={market.path}
                className="group glass-card flex flex-col p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                  <Globe2 className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-lg text-primary">
                  {market.countryName}
                </h2>
                <p className="mt-1 font-mono-label text-muted">
                  Invoiced in {market.currency}
                </p>
                <p className="mt-3 flex-1 text-sm text-secondary">
                  {marketBlurbs[market.id]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  View
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Offices, markets and working hours" />

      <CtaBanner />
    </>
  );
}
