import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { IndustryItem } from "@/types";
import industriesData from "@/content/industries.json";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const industries = industriesData as IndustryItem[];

export const metadata = pageMetadata({
  path: "/industries",
  title: "Industries We Build For",
  description: `Verticals where Velex Infotech has a specific answer rather than a generic one — starting with healthcare software development for businesses in the ${marketsShortLine}.`,
});

/**
 * A deliberately short list.
 *
 * An industries hub is where agency sites usually list twenty verticals they
 * have never worked in, because each one looks like free keyword coverage. A
 * vertical earns a page here when we can say something about it that would be
 * wrong for a different industry — otherwise the service page already covers it.
 */

export default function IndustriesIndexPage() {
  const trail = [{ name: "Industries", path: "/industries" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListSchema({
              id: "/industries#list",
              items: industries.map((i) => ({
                name: i.title,
                path: `/industries/${i.slug}`,
              })),
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
                VERTICAL SPECIALISATIONS
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              Industries we{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white">
                build for
              </span>
            </h1>

            {/* Subtitle / Lede (design.md 3.1) */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed">
              We publish an industry page only where the engineering genuinely differs —
              different clinical protocols, specialised compliance frameworks, or distinct integration
              surfaces. Everything else is covered under our core{" "}
              <Link
                href="/services"
                className="font-semibold text-[#7138FF] dark:text-[#B99CFF] underline underline-offset-4 hover:text-[#5424D6] dark:hover:text-white"
              >
                service catalog
              </Link>
              .
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
                    All Services
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals Grid Section (design.md 4.2 & 4.3) */}
      <section className="relative pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Aesthetic Kicker (design.md 4.2) */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                DEEP DOMAIN ARCHITECTURE
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Where we go deeper
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans">
              Domain-specific architectures designed around regulatory requirements, complex data models, and legacy integration surfaces.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {industries.map((industry) => {
              const Icon = getServiceIcon(industry.icon);
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-8 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] shadow-[0_4px_20px_rgba(113,56,255,0.25)] group-hover:scale-105 transition-transform">
                      <Icon className="size-7" />
                    </span>
                    <h3 className="mt-6 font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
                      {industry.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#B99CFF]">
                      {industry.tagline}
                    </p>
                    <p className="mt-4 text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                    Explore Vertical Systems
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
