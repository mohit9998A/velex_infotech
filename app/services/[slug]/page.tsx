import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";

import type { ProcessStep, ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import processData from "@/content/process.json";
import { blogPosts } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { serviceImages } from "@/lib/service-images";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";

const services = servicesData as ServiceItem[];
const steps = processData as ProcessStep[];

export const dynamicParams = false;

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
  return pageMetadata({
    path: `/services/${service.slug}`,
    // metaTitle no longer carries the brand — the root layout template appends
    // it, and having both produced "... | Velex Infotech | Velex Infotech".
    title: service.metaTitle ?? service.title,
    description: service.metaDescription ?? service.description,
  });
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
  // Reverse link from the money page back into the blog, so posts aren't
  // dead-ends off the service pages.
  const relatedReading = blogPosts.filter((p) =>
    p.relatedServices.includes(service.slug),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              slug: service.slug,
              title: service.title,
              description: service.metaDescription ?? service.description,
            }),
            breadcrumbSchema([
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-left">
            <Breadcrumbs
              trail={[
                { name: "Services", path: "/services" },
                { name: service.title, path: `/services/${service.slug}` },
              ]}
            />
          </div>
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

          {serviceImages[service.slug] && (
            <div className="mt-16 relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-vx-border bg-surface/50 p-2 shadow-2xl backdrop-blur-sm sm:p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none rounded-2xl" />
              {/* This is the LCP element on every service page. It was a raw
                  <img> serving a 680-880 KB PNG unoptimized. next/image
                  re-encodes to AVIF/WebP and emits a responsive srcset.

                  `loading="eager"` overrides the lazy default (this is above
                  the fold) and `fetchPriority="high"` raises its queue
                  priority. Note: the `priority` prop is deprecated in Next 16
                  in favour of `preload`, and the docs recommend these two over
                  `preload` in most cases — they are mutually exclusive with it. */}
              <Image
                src={serviceImages[service.slug]}
                alt={`${service.title} — illustration of the service in use`}
                // 864px, not 896px: the container is `max-w-4xl` (896) minus `p-4` on
      // each side at sm+. That is a whole srcset step of wasted bytes.
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 864px"
                placeholder="blur"
                loading="eager"
                fetchPriority="high"
                className="w-full aspect-[16/9] object-cover rounded-xl border border-vx-border-bright/50"
              />
            </div>
          )}
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

      {/* Service FAQ. Sits with the primary content, ahead of the navigation
          blocks below it. FaqSection emits its own FAQPage node, which is why
          faqSchema() is deliberately absent from this page's @graph above. */}
      {service.faqs && service.faqs.length > 0 && (
        <FaqSection
          faqs={service.faqs}
          title={`${service.title} — common questions`}
        />
      )}

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

      {/* Related reading — distributes link equity between the blog and the
          money pages in both directions. */}
      {relatedReading.length > 0 && (
        <section className="relative pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-h3 text-primary">Related reading</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {relatedReading.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group glass-card flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="font-mono-label text-muted">
                      {post.readingMinutes} min read
                    </span>
                    <h3 className="mt-2 font-display text-lg text-balance text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary">{post.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read the guide
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
