import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import statsData from "@/content/stats.json";
import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, itemListSchema, jsonLd } from "@/lib/schema";
import { getServiceIcon } from "@/lib/icons";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { serviceCardImages } from "@/lib/service-images";

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
  const trail = [{ name: "Services", path: "/services" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(serviceListSchema, breadcrumbSchema(trail)),
        }}
      />
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
        {/* Background glow and subtle grid using design.md tokens */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 dark:opacity-20" />
        <div className="pointer-events-none absolute -top-36 left-1/2 size-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#7138FF]/15 via-[#8B4DFF]/10 to-transparent blur-3xl [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/4 -left-24 size-80 rounded-full bg-[#7138FF]/10 blur-3xl [transform:translateZ(0)]" />
        <div className="pointer-events-none absolute top-1/4 -right-24 size-80 rounded-full bg-[#8B4DFF]/10 blur-3xl [transform:translateZ(0)]" />

        {/* Ambient trajectory curves matching design */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full opacity-45 dark:opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-80,240 C220,170 270,450 560,410 C860,370 1160,530 1560,400"
            stroke="url(#hero-curve-grad)"
            strokeWidth="1.5"
          />
          <path
            d="M60,90 C340,170 440,30 760,110 C1060,190 1220,50 1560,160"
            stroke="url(#hero-curve-grad)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          <defs>
            <linearGradient id="hero-curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7138FF" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#8B4DFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7138FF" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="relative z-10 mb-4 sm:mb-6">
            <Breadcrumbs trail={trail} className="mb-0" />
          </div>

          <div className="relative flex items-center justify-center">
            {/* Left Image: 3D stacked glass tiles with "Smarter Faster Together" */}
            <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 hidden w-[290px] select-none lg:block xl:-left-6 xl:w-[380px] 2xl:-left-12 2xl:w-[440px]">
              <Image
                src="https://res.cloudinary.com/d0grbozz/image/upload/v1789985397/services_left.png"
                alt="AI & Software Capabilities - Smarter Faster Together"
                width={520}
                height={520}
                priority
                className="size-full object-contain animate-float drop-shadow-[0_20px_45px_rgba(113,56,255,0.18)]"
              />
            </div>

            {/* Center Content */}
            <div className="relative z-10 mx-auto max-w-2xl lg:max-w-[700px] text-center">
              {/* Pill Badge from design.md section 4.2 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
                <Sparkles className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
                Our Services
              </div>

              {/* Main Heading with Playfair Display editorial typography (design.md section 3) */}
              <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight text-[#0D0A24] dark:text-[#F8F7FF] text-balance">
                AI, data &amp;
                <br />
                <span className="font-serif italic font-normal text-[#7138FF] dark:text-[#8B4DFF] block mt-1">
                  software services
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-[#B99CFF]/80">
                {services.length} capabilities, from autonomous AI agents to the
                data layer that makes them useful — built for businesses in the{" "}
                {marketsShortLine}.
              </p>

              {/* CTAs using design.md button variants (section 4.1) */}
              <div className="mt-8 flex justify-center">
                <ConsultButtons
                  primaryIcon={<ArrowRight className="size-4 ml-1" />}
                  primaryClassName="h-12 sm:h-13 rounded-full bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-[#F8F7FF] px-7 text-sm sm:text-base font-semibold shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all"
                  secondary={
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 sm:h-13 rounded-full border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.07] dark:hover:bg-white/[0.08] text-[#0D0A24] dark:text-[#F8F7FF] px-6 text-sm sm:text-base font-medium shadow-xs transition-all hover:-translate-y-0.5"
                      asChild
                    >
                      <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4 mr-1 text-[#25D366]" /> WhatsApp Us
                      </a>
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Right Image: 3D purple digital globe with "Real Business Impact" */}
            <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 hidden w-[310px] select-none lg:block xl:-right-6 xl:w-[400px] 2xl:-right-12 2xl:w-[460px]">
              <Image
                src="https://res.cloudinary.com/d0grbozz/image/upload/v1789985397/services_right.png"
                alt="Global Market Footprint - Real Business Impact"
                width={520}
                height={520}
                priority
                className="size-full object-contain animate-float [animation-delay:2.5s] drop-shadow-[0_20px_45px_rgba(113,56,255,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Eyebrow Kicker from design.md section 4.2 */}
          <div className="reveal-on-scroll flex flex-col items-center text-center mx-auto max-w-2xl gap-3">
            <div className="flex items-center justify-center gap-3">
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
                What We Build
              </span>
              <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0D0A24] dark:text-[#F8F7FF] text-balance">
              Explore every capability
            </h2>

            <p className="text-base text-slate-600 dark:text-[#B99CFF]/80 md:text-lg text-pretty">
              Engineered AI and software systems built for autonomous execution, enterprise reliability, and verified ROI.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = getServiceIcon(service.icon);
              const cardImage =
                serviceCardImages[service.slug] ??
                serviceCardImages["ai-automation"];

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#7138FF]/15 dark:border-white/[0.08] bg-white/95 dark:bg-[#0A0818] p-3.5 sm:p-4 shadow-[0_4px_25px_rgba(113,56,255,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#7138FF]/15 hover:border-[#7138FF]/40 dark:hover:border-[#8B4DFF]/50 cursor-pointer min-h-[360px] sm:min-h-[380px]"
                >
                  {/* =========================================================
                      1. DEFAULT STATE: Clean Image + Title & Badge
                      ========================================================= */}
                  <div className="flex flex-col h-full justify-between transition-opacity duration-300 group-hover:opacity-0">
                    {/* Top Image Container */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#F8F7FF] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                      <Image
                        src={cardImage}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent dark:from-black/40" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-[#04040A]/60 px-2.5 py-1 text-[11px] font-medium text-[#0D0A24] dark:text-[#F8F7FF] backdrop-blur-md border border-[#7138FF]/20 dark:border-white/20 shadow-xs">
                          <Icon className="size-3 text-[#7138FF] dark:text-[#B99CFF]" />
                          {service.segment ?? "B2B"}
                        </span>
                      </div>
                      {service.badge && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-[#04040A]/60 px-2.5 py-1 text-[11px] font-semibold text-[#0D0A24] dark:text-[#F8F7FF] backdrop-blur-md border border-[#7138FF]/20 dark:border-white/20 shadow-xs">
                            {service.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom: Title, Tagline & Status Badge */}
                    <div className="pt-4 pb-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-sans text-lg sm:text-[1.2rem] font-bold tracking-tight text-[#0D0A24] dark:text-[#F8F7FF]">
                          {service.title}
                        </h3>
                        <span className="shrink-0 rounded-full border border-[#7138FF]/25 dark:border-[#8B4DFF]/30 bg-[#7138FF]/[0.06] dark:bg-[#8B4DFF]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#7138FF] dark:text-[#B99CFF]">
                          {service.badge ?? "Verified"}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] font-semibold text-[#5424D6] dark:text-[#B99CFF] uppercase tracking-[0.18em]">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* =========================================================
                      2. HOVER STATE: Light card in light theme, dark card in dark theme
                      (Only text info is displayed — design.md tokens)
                      ========================================================= */}
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100">
                    {/* Full-bleed background image with blur overlay */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                      <Image
                        src={cardImage}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover scale-105 opacity-20 dark:opacity-90 transition-opacity"
                      />
                      {/* Frosted blur & light/dark theme gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/98 via-white/94 to-white/82 dark:from-[#04040A]/98 dark:via-[#0A0818]/92 dark:to-[#0A0818]/70 backdrop-blur-md" />
                    </div>

                    {/* Top: Category & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#7138FF] dark:text-[#B99CFF]">
                        {service.segment ?? "Service"} · {service.title}
                      </span>
                      {service.badge && (
                        <span className="rounded-full border border-[#7138FF]/25 dark:border-[#8B4DFF]/40 bg-[#7138FF]/10 dark:bg-[#8B4DFF]/20 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#7138FF] dark:text-[#F8F7FF] backdrop-blur-xs">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Center & Bottom: Pure Text Information */}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#0D0A24] dark:text-[#F8F7FF] tracking-tight">
                        {service.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-[13px] font-semibold text-[#5424D6] dark:text-[#DED2FF] leading-snug">
                        {service.tagline}
                      </p>

                      <p className="font-sans text-xs sm:text-[12.5px] text-slate-600 dark:text-[#B99CFF]/90 leading-relaxed mt-1 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Key highlights / bullet points */}
                      {service.highlights && service.highlights.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-1 border-t border-[#7138FF]/15 dark:border-white/15 pt-2.5">
                          {service.highlights.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-xs text-slate-700 dark:text-[#F8F7FF]/90 font-medium"
                            >
                              <span className="size-1.5 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Clean text link indicator */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#7138FF] dark:text-[#B99CFF] group-hover:underline">
                        <span>Explore capability</span>
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
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
