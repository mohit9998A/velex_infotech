import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const services = servicesData as ServiceItem[];

export const metadata = pageMetadata({
  path: "/services",
  title: "AI, Data & Software Services",
  description: `AI agents, automation, AI receptionists, WhatsApp chatbots, AI integration, data analytics, custom software, websites and apps — for businesses in the ${marketsShortLine}.`,
});

// Lists every service as a crawlable collection rather than leaving Google to
// infer the set from links alone.
const serviceListSchema = itemListSchema({
  id: "/services#list",
  items: services.map((s) => ({
    name: s.title,
    path: `/services/${s.slug}`,
  })),
});

export default function ServicesIndexPage() {
  // One value feeds both the visible trail and the schema. This page emitted
  // BreadcrumbList with no rendered trail to match it — markup describing
  // content that wasn't on the page, which is exactly what breadcrumbs.tsx
  // warns against.
  const trail = [{ name: "Services", path: "/services" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(serviceListSchema, breadcrumbSchema(trail)),
        }}
      />
      <section className="relative overflow-hidden pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />
          <div className="mt-6 text-center">
            <span className="font-mono-label text-purple-glow">Our Services</span>
            <h1 className="mt-4 font-display text-h1 text-balance text-primary">
              AI, data &amp; software services
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-secondary md:text-lg">
              {services.length} capabilities, from autonomous AI agents to the
              data layer that makes them useful — built for businesses in the{" "}
              {marketsShortLine}.
            </p>
            <div className="mt-9 flex justify-center">
              <ConsultButtons />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader eyebrow="What we build" title="Explore every capability" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow shadow-[0_0_24px_rgba(107,33,255,0.25)]">
                      <Icon className="size-6" />
                    </span>
                    {service.badge && <Badge variant="gold">{service.badge}</Badge>}
                  </div>
                  <h2 className="mt-5 font-display text-xl text-primary">{service.title}</h2>
                  <p className="mt-1 text-sm font-medium text-purple-glow">{service.tagline}</p>
                  <p className="mt-3 flex-1 text-sm text-secondary">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
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
