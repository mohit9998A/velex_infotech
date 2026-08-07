import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

import type { ServiceItem } from "@/types";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
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
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />

          <span className="badge-pill w-fit">
            <MapPin className="size-3.5 text-gold" />
            <span className="font-mono-label text-primary">{eyebrow}</span>
          </span>

          <h1 className="mt-6 font-display text-h1 text-balance text-primary">{h1}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-secondary md:text-lg">{lede}</p>

          <div className="mt-9">
            <ConsultButtons presetService={presetService} />
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="glass-card p-5">
                <dt className="font-mono-label text-muted">{fact.label}</dt>
                <dd className="mt-1 text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Working-hours overlap */}
      {overlap && overlap.length > 0 && (
        <section className="relative pb-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Working hours"
              title="When you can actually reach us"
              subtitle="We work 09:00–19:00 IST, Monday to Friday. Nobody here claims 24/7."
            />
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-vx-border">
                    <th className="py-3 pr-4 font-mono-label text-muted">Your time zone</th>
                    <th className="py-3 font-mono-label text-muted">Live overlap with us</th>
                  </tr>
                </thead>
                <tbody>
                  {overlap.map((row) => (
                    <tr key={row.market} className="border-b border-vx-border/50">
                      <td className="py-3 pr-4 text-primary">{row.market}</td>
                      <td className="py-3 text-secondary">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Market-specific substance */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="Context" title="What this market actually needs" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {sections.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h2 className="font-display text-xl text-primary">{item.title}</h2>
                <p className="mt-2 text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contracting, data and compliance posture */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader eyebrow="Contracting & data" title={compliance.heading} />
          <p className="mt-8 text-secondary">{compliance.body}</p>
          {compliance.points && compliance.points.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3">
              {compliance.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-secondary">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Services emphasised for this market */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="Services" title={servicesTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = getServiceIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title={faqTitle} />

      {/* Siblings — keeps every location page inside the internal link graph
          rather than a leaf hanging off the sitemap. */}
      {siblings.length > 0 && (
        <section className="relative pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-h3 text-primary">Other places we work</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {siblings.map((sib) => (
                <li key={sib.path}>
                  <Link
                    href={sib.path}
                    className="group glass-card flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="font-display text-lg text-primary">{sib.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-secondary">{sib.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View
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
