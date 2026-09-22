import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";

import type { ServiceItem } from "@/types";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";

export interface LocationShellProps {
  trail: { name: string; path: string }[];
  eyebrow: string;
  h1: string;
  /** The liftable answer. Keep the first sentence under 40 words. */
  lede: string;
  presetService?: string;
  /** Contracting entity, invoice currency, payment rails, hours. */
  facts: { label: string; value: string }[];
  /** Working-hours overlap. Omit on pages where it says nothing new. */
  overlap?: { market: string; hours: string }[];
  /** Why this market specifically — the anti-thin-content requirement. */
  sections: { title: string; body: string }[];
  servicesTitle: string;
  services: ServiceItem[];
  compliance: { heading: string; body: string; points?: string[] };
  faqs: { question: string; answer: string }[];
  faqTitle: string;
  /** Sibling locations. Every page links across, so none is a dead end. */
  siblings: { name: string; path: string; blurb: string }[];
}

/**
 * Chrome for a location page. Contains deliberately zero location strings.
 *
 * Every location is a hand-written file that supplies its own copy through
 * these props — there is no `app/locations/[slug]/page.tsx`, because a dynamic
 * route makes adding a thirtieth city a one-line edit, and that ergonomic is
 * how doorway pages get built (AGENTS.md rule 8). This component exists so the
 * layout is shared while the *content* stays impossible to template.
 *
 * If you find yourself passing the same `sections` or `faqs` to two locations,
 * the second page should not exist.
 */
export function LocationShell({
  trail,
  eyebrow,
  h1,
  lede,
  presetService,
  facts,
  overlap,
  sections,
  servicesTitle,
  services,
  compliance,
  faqs,
  faqTitle,
  siblings,
}: LocationShellProps) {
  return (
    <>
      {/* Hero Section (design.md 2.1, 2.2, 3.1, 7.2) */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Soft background ambient layers with hardware acceleration (design.md 7.2) */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/3 right-0 size-[32rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} className="mb-6 sm:mb-8" />

          <div className="text-center">
            {/* Pill Badge (design.md 4.2) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
              <MapPin className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
              <span>{eyebrow}</span>
            </div>

            {/* Main Headline (design.md 3.1 & 2.1) */}
            <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.25rem)] font-bold tracking-tight text-balance leading-[1.08] text-[#0D0A24] dark:text-white">
              {h1}
            </h1>

            {/* Lede (design.md 3.1) */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-white/70 font-sans leading-relaxed text-pretty">
              {lede}
            </p>

            {/* Consultation CTA (design.md 4.1) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ConsultButtons
                presetService={presetService}
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

          {/* Operational Facts Grid (design.md 4.3) */}
          <dl className="mt-12 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
              >
                <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#8B4DFF]">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-serif text-lg font-bold text-[#0D0A24] dark:text-white">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Working-hours overlap (design.md 3.1 & 4.3) */}
      {overlap && overlap.length > 0 && (
        <section className="relative pb-16 pt-4">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                  WORKING HOURS OVERLAP
                </span>
                <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
                When you can actually reach us
              </h2>
              <p className="mx-auto mt-2 text-sm sm:text-base text-slate-600 dark:text-white/70 font-sans">
                We work 09:00–19:00 IST, Monday to Friday. Nobody here claims fabricated 24/7 coverage.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-2 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-white/[0.08]">
                    <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-[#0D0A24] dark:text-white font-semibold">
                      Your time zone
                    </th>
                    <th className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-[#0D0A24] dark:text-white font-semibold">
                      Live overlap with our teams
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overlap.map((row) => (
                    <tr
                      key={row.market}
                      className="border-b border-slate-200/60 dark:border-white/[0.04] last:border-0"
                    >
                      <td className="py-3.5 px-4 font-semibold text-[#0D0A24] dark:text-white font-serif text-base">
                        {row.market}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-slate-600 dark:text-white/70 font-sans">
                        {row.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Market-specific substance (design.md 4.3) */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                MARKET CONTEXT
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              What this market actually needs
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {sections.map((item, idx) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#7138FF] dark:text-[#8B4DFF]">
                    0{idx + 1} // INSIGHT
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contracting, data and compliance posture (design.md 4.3) */}
      <section className="relative pb-20 pt-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                GOVERNANCE &amp; SECURITY
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              {compliance.heading}
            </h2>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <p className="text-base sm:text-lg text-slate-600 dark:text-white/80 font-sans leading-relaxed">
              {compliance.body}
            </p>

            {compliance.points && compliance.points.length > 0 && (
              <ul className="mt-6 flex flex-col gap-3 border-t border-slate-200/80 dark:border-white/[0.08] pt-6">
                {compliance.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-slate-700 dark:text-white/80 font-sans"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 mt-0.5">
                      <Check className="size-3.5" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Services emphasised for this market (design.md 4.3) */}
      <section className="relative pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                RECOMMENDED SERVICES
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              {servicesTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF] group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-bold text-[#0D0A24] dark:text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-white/70 font-sans line-clamp-2">
                      {s.tagline}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection faqs={faqs} title={faqTitle} />

      {/* Siblings Locations (design.md 4.3) */}
      {siblings.length > 0 && (
        <section className="relative pb-24 pt-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#8B4DFF]">
                GLOBAL PRESENCE
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Other places we work
            </h2>

            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {siblings.map((sib) => (
                <li key={sib.path}>
                  <Link
                    href={sib.path}
                    className="group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex h-full flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#0D0A24] dark:text-white">
                        {sib.name}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 dark:text-white/70 font-sans leading-relaxed">
                        {sib.blurb}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:text-[#5424D6] dark:group-hover:text-white transition-colors">
                      View location
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
