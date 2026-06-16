import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";

import type { ProcessStep, ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import processData from "@/content/process.json";
import { siteConfig } from "@/config/site";
import { getServiceIcon } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const services = servicesData as ServiceItem[];
const steps = processData as ProcessStep[];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle ?? `${service.title} | Velex Infotech`,
    description: service.metaDescription ?? service.description,
    alternates: { canonical: `${siteConfig.url}/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = getServiceIcon(service.icon);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Services`,
    serviceType: service.title,
    description: service.metaDescription ?? service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "India" },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-purple-core/15 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex size-16 items-center justify-center rounded-2xl border border-vx-border-bright bg-purple-core/10 text-purple-glow shadow-[0_0_30px_rgba(107,33,255,0.3)]">
            <Icon className="size-8" />
          </span>
          <div className="mt-5 flex items-center justify-center gap-2">
            {service.badge && <Badge variant="gold">{service.badge}</Badge>}
            <Badge variant="outline">{service.segment}</Badge>
          </div>
          <h1 className="mt-5 font-display text-h1 text-balance text-primary">
            {service.title}
          </h1>
          <p className="mt-3 text-lg font-medium text-purple-glow">{service.tagline}</p>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-secondary md:text-lg">
            {service.overview ?? service.description}
          </p>
          <div className="mt-9 flex justify-center">
            <ConsultButtons presetService={service.title} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Why it matters"
              title={`What ${service.title} delivers`}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <div key={b.title} className="glass-card p-6">
                  <h3 className="font-display text-xl text-primary">{b.title}</h3>
                  <p className="mt-2 text-secondary">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section className="relative pb-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-display text-h3 text-primary">Common use cases</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.useCases.map((u) => (
                <li
                  key={u}
                  className="flex items-start gap-3 rounded-xl border border-vx-border bg-surface/50 p-4 text-sm text-secondary"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* How we work */}
      <section className="section-pad relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="How we work" title="From idea to intelligence" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="glass-card p-6">
                <span className="font-display text-4xl text-purple-core/40">{step.index}</span>
                <h3 className="mt-3 font-display text-lg text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-h3 text-primary">Explore more services</h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm text-purple-glow hover:text-primary"
            >
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((r) => {
              const RIcon = getServiceIcon(r.icon);
              return (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group glass-card flex flex-col p-6"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-vx-border-bright bg-purple-core/10 text-purple-glow">
                    <RIcon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-primary">{r.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{r.tagline}</p>
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

      <CtaBanner />
    </>
  );
}
