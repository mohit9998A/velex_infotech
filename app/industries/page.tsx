import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { IndustryItem } from "@/types";
import industriesData from "@/content/industries.json";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
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

      <section className="relative overflow-hidden pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />
          <h1 className="mt-2 font-display text-h1 text-balance text-primary">
            Industries we build for
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-secondary md:text-lg">
            We publish an industry page only where the work genuinely differs —
            different systems to integrate with, a different regulatory surface,
            or a different definition of what &ldquo;done&rdquo; means. Everything
            else is covered better by the{" "}
            <Link href="/services" className="text-purple-glow hover:text-primary">
              service pages
            </Link>
            .
          </p>
          <div className="mt-9">
            <ConsultButtons />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="Verticals" title="Where we go deeper" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {industries.map((industry) => {
              const Icon = getServiceIcon(industry.icon);
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow shadow-[0_0_24px_rgba(107,33,255,0.25)]">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-xl text-primary">
                    {industry.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-purple-glow">
                    {industry.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-secondary">
                    {industry.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
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
