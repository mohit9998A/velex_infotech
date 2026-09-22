import Link from "next/link";
import {
  Gem,
  Target,
  ShieldCheck,
  Rocket,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import type { StatItem } from "@/types";
import statsData from "@/content/stats.json";
import { siteConfig } from "@/config/site";
import { marketsShortLine, officesLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { StatCard } from "@/components/common/stat-card";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const stats = statsData as StatItem[];

const title = "About Velex Infotech — AI Engineering from India";
const description = `Velex Infotech builds AI agents, automation and custom software for businesses in the ${marketsShortLine}, with engineering hubs in ${officesLine}.`;

// Title omits the brand — the root layout's `%s | Velex Infotech` template
// appends it. Including it here produced "... | Velex Infotech | Velex Infotech".
export const metadata = pageMetadata({
  path: "/about",
  title,
  description,
});

const values = [
  {
    icon: Gem,
    title: "Crystalline quality",
    description:
      "Every build is faceted with precision. We ship production code we're proud to sign, audited for resilience and speed.",
  },
  {
    icon: Target,
    title: "Outcome-obsessed",
    description:
      "We define measurable benchmarks up front — latency, deflection rate, throughput — and engineer toward them relentlessly.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise trust",
    description:
      "Secure, compliant and reliable. Comprehensive data protection, non-disclosure agreements, and client-owned IP on every contract.",
  },
  {
    icon: Rocket,
    title: "Built to scale",
    description:
      "From proof-of-concept to global workload, we architect distributed systems ready for the traffic that follows.",
  },
];

const offshoreFaqs = [
  {
    q: "Who does the work?",
    a: "Our own salaried engineers in Ludhiana and Noida. We don't subcontract your project to a third party.",
  },
  {
    q: "How do we overlap with your timezone?",
    a: "We work 09:00–19:00 IST. That is full overlap with UK hours, a four-hour live window with US Eastern, and a two-hour window with US Pacific — with an async handover every morning.",
  },
  {
    q: "Where does your data live?",
    a: "In the region you choose. We deploy to your cloud account where you have one, and we'll sign a DPA before any production data moves.",
  },
];

export default function AboutPage() {
  // One value feeds both the visible trail and the schema, so they cannot drift.
  const trail = [{ name: "About", path: "/about" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({ path: "/about", title, description }),
            breadcrumbSchema(trail),
          ),
        }}
      />

      {/* Hero (design.md 2.1, 2.2, 3.1, 7.2) */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          <div className="text-center">
            
            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              We engineer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
                intelligence
              </span>
              .
            </h1>

            {/* Subtitle / Lede (design.md 3.1) */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              {siteConfig.name} builds autonomous AI agents, intelligent automation and
              mission-critical custom software for businesses in the {marketsShortLine}. We are
              headquartered in India, with engineering in {officesLine} — delivering senior-level
              craftsmanship with proven operational impact.
            </p>

            {/* Consultation & Action Buttons (design.md 4.1) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ConsultButtons
                primaryLabel="Book a Discovery Call"
                primaryIcon={<ArrowRight className="size-4" />}
                primaryClassName="rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] px-7 py-3.5 text-sm sm:text-base font-semibold transition-all"
                secondary={
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0D0A24] dark:text-white backdrop-blur-sm transition-all hover:bg-black/[0.07] dark:hover:bg-white/[0.08]"
                  >
                    Explore Services
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (design.md 2.2 & 4.3) 
      <section className="relative pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>*/}

      {/* Story (design.md 1, 3.1, 4.2, 4.3) */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                OUR ORIGIN &amp; MISSION
              </span>
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Founded to make AI useful
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              <p>
                <strong className="font-semibold text-[#0D0A24] dark:text-white">Velex Infotech</strong>{" "}
                was founded with a direct, engineering-first mission: to build applied AI automation
                and intelligent software systems that solve real operational bottlenecks for growing businesses.
              </p>
              <p>
                We started with a simple belief: most companies don&apos;t need more generic
                software — they need intelligence woven into the way they already work. So we build
                autonomous AI agents, multi-agent workflows, voice assistants, WhatsApp bots,
                analytics pipelines and custom platforms that move the numbers that matter.
              </p>
              <p>
                India is our home and our engineering base. Our headquarters are in Ludhiana, with a
                dedicated systems engineering hub in Noida — delivering senior-tier technical
                execution for clients across the United States, United Kingdom, Canada and India.
              </p>
            </div>

            {/* Buyer FAQs styled as crisp cards (design.md 4.3) */}
            <div className="mt-8 flex flex-col gap-3.5 border-t border-slate-200/80 dark:border-white/[0.08] pt-6">
              {offshoreFaqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors hover:border-purple-300 dark:hover:border-purple-500/40"
                >
                  <dt className="font-serif text-base font-bold text-[#0D0A24] dark:text-white">
                    {item.q}
                  </dt>
                  <dd className="mt-1.5 text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                    {item.a}
                  </dd>
                </div>
              ))}
            </div>

            {/* Pill Badge (design.md 4.2) */}
            <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
              <MapPin className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
              <span>{officesLine}</span>
            </div>
          </div>

          {/* Right Column (5 cols) - Velex Engineering Collective Showcase Card (design.md 4.3) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/[0.10] bg-white/85 dark:bg-white/[0.03] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              {/* Subtle Ambient Radial Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#7138FF]/15 dark:bg-[#8B4DFF]/20 blur-3xl [transform:translateZ(0)]" />

              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7138FF] via-[#5424D6] to-[#32108F] font-display text-2xl font-bold text-white shadow-[0_4px_24px_rgba(113,56,255,0.4)]">
                  VX
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
                    Velex Engineering
                  </h3>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#B99CFF]">
                    Applied AI &amp; Systems Collective
                  </p>
                </div>
              </div>

              <blockquote className="mt-6 border-l-2 border-[#7138FF] dark:border-[#8B4DFF] pl-4.5 font-sans italic text-base leading-relaxed text-slate-700 dark:text-white/80">
                &ldquo;We don&apos;t just write code or ship prototypes. We engineer production intelligence — architected cleanly, tested rigorously, and backed by verifiable business outcomes.&rdquo;
              </blockquote>

              <div className="mt-8 grid w-full grid-cols-2 gap-4 border-t border-slate-200/80 dark:border-white/[0.08] pt-6">
                <div>
                  <div className="font-display text-3xl font-extrabold text-[#0D0A24] dark:text-white tracking-tight">
                    100%
                  </div>
                  <div className="mt-1 text-xs font-sans text-slate-500 dark:text-white/60">
                    In-house salaried engineers
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold text-[#0D0A24] dark:text-white tracking-tight">
                    0
                  </div>
                  <div className="mt-1 text-xs font-sans text-slate-500 dark:text-white/60">
                    Third-party outsourcing
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 w-full border-t border-slate-200/80 dark:border-white/[0.08] pt-6 text-xs text-slate-600 dark:text-white/70 font-sans">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>Direct daily communication with lead engineers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="size-4 text-[#7138FF] dark:text-[#8B4DFF] shrink-0" />
                  <span>Modern stack: Next.js, Python, LangChain, PyTorch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-amber-500 shrink-0" />
                  <span>Enterprise DPA &amp; 100% client-owned IP rights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values (design.md 1, 3.1, 4.2, 4.3) */}
      <section className="relative pb-24 pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                WHAT WE STAND FOR
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Our principles
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              The foundational standards that guide how we architect, build, and deploy systems every single day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] group-hover:scale-105 transition-transform">
                  <v.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-white/70 font-sans">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
