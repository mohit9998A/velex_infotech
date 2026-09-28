import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Globe2 } from "lucide-react";

import { markets, offices } from "@/config/site";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
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
    "Headquarters and primary engineering hub. A verifiable registered address, in-person meetings, and our core systems development teams.",
  noida:
    "A distributed engineering collective in Delhi-NCR. No staffed public office and no fabricated address — deliberately.",
};

const marketBlurbs: Record<string, string> = {
  us: "Our largest overseas market. Invoiced in USD, with four hours of live overlap with US Eastern every day.",
  uk: "Our closest market by working hours — our core day covers a full UK business morning. Invoiced in GBP.",
  ca: "Specialised software engineering for Canadian mid-market enterprises and scaleups. Invoiced in CAD.",
  in: "Domestic market. Invoiced in INR with GST compliance, with support in English, Hindi and Punjabi.",
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

      {/* Hero Section (design.md 2.1, 2.2, 3.1, 7.2) */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                GLOBAL DELIVERY FOOTPRINT
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              Where we{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
                work
              </span>
            </h1>

            {/* Subtitle / Lede (design.md 3.1) */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              Velex Infotech operates two engineering hubs in India and delivers mission-critical
              software for clients across four international markets. We keep these distinct: an office is
              where our engineers build; a market is where our clients scale.
            </p>

            {/* Consultation CTA (design.md 4.1) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ConsultButtons
                primaryLabel="Book a Discovery Call"
                primaryIcon={<ArrowRight className="size-4" />}
                primaryClassName="rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] px-7 py-3.5 text-sm sm:text-base font-semibold transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Hubs Section (design.md 4.2 & 4.3) */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                ENGINEERING HUBS
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Where our people are
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Two specialised hubs in India. One is our staffed registered headquarters; the other is a distributed systems engineering pod.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {offices.map((office) => (
              <Link
                key={office.id}
                href={office.path}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-8 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] shadow-[0_4px_20px_rgba(113,56,255,0.25)] group-hover:scale-105 transition-transform">
                    <Building2 className="size-7" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
                    {office.city}, {office.region}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#B99CFF]">
                    {office.hasAddress ? "Staffed Headquarters" : "Distributed Engineering Pod"}
                  </p>
                  <p className="mt-4 text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                    {hubBlurbs[office.id]}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                  View hub specifications
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client Markets Section (design.md 4.2 & 4.3) */}
      <section className="relative pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                CLIENT MARKETS
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Where our clients are
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Four primary countries with local currency invoicing, live time-zone overlap, and verified contract rails.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((market) => (
              <Link
                key={market.id}
                href={market.path}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] group-hover:scale-105 transition-transform">
                    <Globe2 className="size-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                    {market.countryName}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#B99CFF]">
                    Invoiced in {market.currency}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-white/70 font-sans line-clamp-3 leading-relaxed">
                    {marketBlurbs[market.id]}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                  Explore market details
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection faqs={faqs} title="Offices, markets and working hours" />

      {/* Closing CTA */}
      <CtaBanner />
    </>
  );
}
