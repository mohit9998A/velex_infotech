import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  ArrowUpRight,
  ArrowRight,
  Zap,
  BarChart3,
  Clock,
  ShieldCheck,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { blogPosts } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import {
  serviceHeroImages,
  serviceHeroMetrics,
  type ServiceHeroMetric,
} from "@/lib/service-images";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { TrustLogos } from "@/components/common/trust-logos";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq-section";
import { HowWeWorkSchematic } from "@/components/sections/how-we-work-schematic";

const services = servicesData as ServiceItem[];

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

function renderMetricIcon(icon: ServiceHeroMetric["icon"]) {
  switch (icon) {
    case "zap":
      return <Zap className="size-5" />;
    case "chart":
      return <BarChart3 className="size-5" />;
    case "clock":
      return <Clock className="size-5" />;
    case "shield":
      return <ShieldCheck className="size-5" />;
    case "sparkles":
      return <Sparkles className="size-5" />;
    default:
      return <Zap className="size-5" />;
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const heroImageUrl =
    serviceHeroImages[service.slug] ??
    serviceHeroImages["ai-automation"];
  const metrics = serviceHeroMetrics[service.slug];

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
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Soft background ambient layers */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-32 left-1/4 size-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/4 right-0 size-[36rem] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] [transform:translateZ(0)]" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Left Column (Content & CTAs & Metrics & Trust) */}
            <div className="flex flex-col lg:col-span-6">
              {/* Breadcrumbs */}
              <Breadcrumbs
                trail={[
                  { name: "Services", path: "/services" },
                  { name: service.title, path: `/services/${service.slug}` },
                ]}
                className="mb-6"
              />

              {/* Title & Tagline (design.md 3.1 & 2.1) */}
              <h1 className="font-serif text-[clamp(2.35rem,5vw,4.25rem)] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#5424D6] via-[#7138FF] to-[#8B4DFF] dark:from-[#A87FFF] dark:via-[#B99CFF] dark:to-white leading-[1.08]">
                {service.title}
              </h1>
              <p className="mt-3 text-2xl sm:text-3xl font-display font-semibold tracking-[-0.02em] text-[#0D0A24] dark:text-white">
                {service.tagline}
              </p>

              {/* Overview Description (design.md 3.1) */}
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-white/70 max-w-xl font-sans">
                {service.overview ?? service.description}
              </p>

              {/* Action Buttons (design.md 4.1) */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ConsultButtons
                  presetService={service.title}
                  primaryLabel="Get Free Consultation"
                  primaryIcon={<ArrowRight className="size-4" />}
                  primaryClassName="rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] px-7 py-3.5 text-base font-semibold transition-all"
                  secondary={
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] text-[#0D0A24] dark:text-white hover:bg-black/[0.07] dark:hover:bg-white/[0.08] shadow-sm font-semibold transition-all"
                      asChild
                    >
                      <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4 text-emerald-500 dark:text-emerald-400" /> WhatsApp Us
                      </a>
                    </Button>
                  }
                />
              </div>

              {/* 3 Grounded Highlight Metrics (design.md 2.2 & 4.3) */}
              {metrics && metrics.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-3 pt-6">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] p-3.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 hover:border-[#7138FF]/40"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF]">
                        {renderMetricIcon(m.icon)}
                      </div>
                      <div>
                        <div className="font-display text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-[#0D0A24] dark:text-white">
                          {m.value}
                        </div>
                        <div className="font-sans text-xs font-medium text-slate-600 dark:text-[#B99CFF]/80 leading-snug">
                          {m.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trusted Logos Row */}
              <div className="mt-10 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                <TrustLogos />
              </div>
            </div>

            {/* Right Column (Hero 3D Illustration - shifted a little above) */}
            <div className="relative flex items-center justify-center lg:col-span-6 lg:-mt-12 xl:-mt-16 lg:-translate-y-4 xl:-translate-y-6">
              {/* Ambient Glow (design.md 7.2 Hardware Accelerated) */}
              <div className="pointer-events-none absolute -inset-8 sm:-inset-12 rounded-full bg-gradient-to-tr from-[#7138FF]/25 via-[#8B4DFF]/20 to-transparent blur-3xl [transform:translateZ(0)]" />

              {/* 3D Hero Illustration */}
              <div className="relative w-full flex items-center justify-center">
                <Image
                  src={heroImageUrl}
                  alt={`${service.title} — workflow and platform architecture illustration`}
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 700px"
                  className="w-full h-auto max-h-[640px] lg:max-h-[720px] xl:max-h-[780px] object-contain drop-shadow-[0_30px_60px_rgba(107,33,255,0.22)] transition-transform duration-700 hover:scale-[1.02] animate-float lg:scale-105 xl:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits (design.md 4.3 Standard Card) */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="section-pad relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Why it matters"
              title={`What ${service.title} delivers`}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <h3 className="font-serif text-xl font-semibold text-[#0D0A24] dark:text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section className="relative pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Common use cases
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.useCases.map((u) => (
                <li
                  key={u}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-4 text-sm text-slate-700 dark:text-white/80 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all hover:border-[#7138FF]/40"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-[#7138FF] dark:text-[#8B4DFF]" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* How we work (Interactive Blueprint Architecture) */}
      <HowWeWorkSchematic />

      {/* Service FAQ */}
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Explore more services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF] hover:underline"
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
                  className="group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 text-[#7138FF] dark:text-[#8B4DFF]">
                    <RIcon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#0D0A24] dark:text-white">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70 font-sans">
                    {r.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF]">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related reading */}
      {relatedReading.length > 0 && (
        <section className="relative pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0A24] dark:text-white">
              Related reading
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {relatedReading.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md flex h-full flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
                  >
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7138FF] dark:text-[#8B4DFF]">
                      {post.readingMinutes} min read
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold text-balance text-[#0D0A24] dark:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-white/70 leading-relaxed font-sans">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#7138FF] dark:text-[#B99CFF]">
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
