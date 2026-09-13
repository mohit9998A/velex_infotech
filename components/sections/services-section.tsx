"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { getServiceIcon } from "@/lib/icons";
import { serviceImages } from "@/lib/service-images";
import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";

const FEATURED_SLUGS = [
  "ai-automation",
  "agentic-ai",
  "ai-receptionist",
  "whatsapp-bot",
  "web-development",
  "software-development",
];

const allServices = servicesData as ServiceItem[];
const services = FEATURED_SLUGS.map((slug) =>
  allServices.find((s) => s.slug === slug),
).filter(Boolean) as ServiceItem[];

// Cohesive dual-theme palette (crystalline light & dark luxury obsidian)
const CARD_THEMES: Record<
  string,
  {
    darkGradient: string;
    lightGradient: string;
    accent: string;
    accentLight: string;
    glowDark: string;
    glowLight: string;
  }
> = {
  "ai-automation": {
    darkGradient: "linear-gradient(145deg, #090B10 0%, #111522 50%, #07090E 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F1F5FD 50%, #E3EDFE 100%)",
    accent: "#60A5FA",
    accentLight: "#2563EB",
    glowDark: "rgba(96, 165, 250, 0.14)",
    glowLight: "rgba(37, 99, 235, 0.12)",
  },
  "agentic-ai": {
    darkGradient: "linear-gradient(145deg, #0B0A12 0%, #151324 50%, #08070F 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F5F3FF 50%, #ECE7FE 100%)",
    accent: "#A78BFA",
    accentLight: "#7C3AED",
    glowDark: "rgba(167, 139, 250, 0.14)",
    glowLight: "rgba(124, 58, 237, 0.12)",
  },
  "ai-receptionist": {
    darkGradient: "linear-gradient(145deg, #0D0A11 0%, #191222 50%, #09070E 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #FFF1F2 50%, #FFE0E3 100%)",
    accent: "#F472B6",
    accentLight: "#E11D48",
    glowDark: "rgba(244, 114, 182, 0.12)",
    glowLight: "rgba(225, 29, 72, 0.10)",
  },
  "whatsapp-bot": {
    darkGradient: "linear-gradient(145deg, #070E0C 0%, #0F1E1B 50%, #050A08 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 50%, #DCFCE7 100%)",
    accent: "#34D399",
    accentLight: "#059669",
    glowDark: "rgba(52, 211, 153, 0.12)",
    glowLight: "rgba(5, 150, 105, 0.10)",
  },
  "web-development": {
    darkGradient: "linear-gradient(145deg, #070C14 0%, #0F1928 50%, #05080E 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F0F9FF 50%, #DBEAFE 100%)",
    accent: "#38BDF8",
    accentLight: "#0284C7",
    glowDark: "rgba(56, 189, 248, 0.14)",
    glowLight: "rgba(2, 132, 199, 0.12)",
  },
  "web-app-development": {
    darkGradient: "linear-gradient(145deg, #070C14 0%, #0F1928 50%, #05080E 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F0F9FF 50%, #DBEAFE 100%)",
    accent: "#38BDF8",
    accentLight: "#0284C7",
    glowDark: "rgba(56, 189, 248, 0.14)",
    glowLight: "rgba(2, 132, 199, 0.12)",
  },
  "software-development": {
    darkGradient: "linear-gradient(145deg, #070D0E 0%, #0F1B1E 50%, #05090A 100%)",
    lightGradient: "linear-gradient(145deg, #FFFFFF 0%, #F0FDFA 50%, #CCFBF1 100%)",
    accent: "#2DD4BF",
    accentLight: "#0D9488",
    glowDark: "rgba(45, 212, 191, 0.12)",
    glowLight: "rgba(13, 148, 136, 0.10)",
  },
};

export function ServicesSection() {
  const openModal = useLeadModal((s) => s.openModal);

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-28 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-14">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center justify-center gap-3 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="h-[1.5px] w-6 sm:w-10 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
              aria-hidden="true"
            />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#0055FF] dark:text-[#3B82F6]">
              WHAT WE BUILD
            </span>
            <span
              className="h-[1.5px] w-6 sm:w-10 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
              aria-hidden="true"
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>Intelligent systems. </span>
            <span>
              Built to move{" "}
              <span className="italic bg-gradient-to-r from-[#0055FF] via-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent inline-block pr-1">
                business forward.
              </span>
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-5 max-w-2xl mx-auto text-slate-600 dark:text-white/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {services.length} core capabilities, engineered to give ambitious
            businesses an unfair advantage.
          </motion.p>
        </div>

        {/* Sticky Cards Stack (Cards overlap via sticky position, keeping previous titles visible) */}
        <div className="relative flex flex-col gap-0 pb-[40vh] max-w-5xl mx-auto">
          {services.map((service, index) => {
            const theme =
              CARD_THEMES[service.slug] ?? CARD_THEMES["ai-automation"];
            const Icon = getServiceIcon(service.icon);
            const image = serviceImages[service.slug];

            return (
              <motion.article
                key={service.slug}
                id={`service-card-${index}`}
                className="group sticky w-full rounded-[clamp(24px,3.5vw,40px)] overflow-hidden transition-all duration-300 border border-slate-200/90 shadow-[0_-12px_32px_rgba(0,0,0,0.06),0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:border-white/[0.08] dark:shadow-[0_-16px_40px_rgba(0,0,0,0.4),0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]"
                style={{
                  top: `calc(clamp(88px, 10vh, 112px) + ${index} * clamp(78px, 8.8vh, 90px))`,
                  zIndex: index + 1,
                  marginBottom: "8vh",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Inner Card Container */}
                <div className="relative w-full h-full p-6 sm:p-8 md:p-10 pt-5 sm:pt-6 md:pt-6 overflow-hidden">
                  {/* Background Gradient: Light */}
                  <div
                    className="absolute inset-0 dark:hidden"
                    style={{ background: theme.lightGradient }}
                  />
                  {/* Background Gradient: Dark */}
                  <div
                    className="absolute inset-0 hidden dark:block"
                    style={{ background: theme.darkGradient }}
                  />

                  {/* Radial Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, transparent 20%, rgba(0, 0, 0, 0.5) 100%)",
                    }}
                  />

                  {/* Subtle Ambient Glow: Light */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-25 dark:hidden"
                    style={{ backgroundColor: theme.accentLight }}
                  />
                  {/* Subtle Ambient Glow: Dark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-15 hidden dark:block"
                    style={{ backgroundColor: theme.accent }}
                  />

                  {/* Top Right Circular Arrow Button */}
                  <Link
                    href={service.href}
                    onMouseEnter={prefetchLeadForm}
                    aria-label={`Explore ${service.title}`}
                    className="absolute top-5 right-5 sm:top-6 sm:right-7 size-11 sm:size-12 rounded-full bg-black/[0.04] border border-black/[0.08] text-slate-800 hover:bg-slate-900 hover:text-white dark:bg-white/[0.08] dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black z-10 transition-all duration-300 hover:scale-105 hover:rotate-45 shadow-xs dark:shadow-lg backdrop-blur-md flex items-center justify-center"
                  >
                    <ArrowUpRight className="size-5 sm:size-6" />
                  </Link>

                  {/* Card Header */}
                  <div className="relative z-10 pr-16 sm:pr-20 mb-5 sm:mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-sans text-slate-600 dark:text-white/80 text-sm sm:text-base md:text-lg mt-6 sm:mt-8 font-normal">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Card Content: 2-Column Showcase */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Left Column: Details & CTA */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-6">
                      <p className="font-sans text-slate-600 dark:text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      {service.highlights && (
                        <div className="space-y-2">
                          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">
                            Key Deliverables
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {service.highlights.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-black/[0.04] border border-black/[0.07] text-slate-800 dark:bg-white/[0.05] dark:border-white/[0.08] dark:text-white/90 backdrop-blur-xs"
                              >
                                <CheckCircle2
                                  className="size-3.5 shrink-0 dark:hidden"
                                  style={{ color: theme.accentLight }}
                                />
                                <CheckCircle2
                                  className="size-3.5 shrink-0 hidden dark:block"
                                  style={{ color: theme.accent }}
                                />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Benefit Callout Box */}
                      {service.benefits?.[0] && (
                        <div className="rounded-xl p-3.5 sm:p-4 bg-black/[0.03] border border-black/[0.07] dark:bg-white/[0.03] dark:border-white/[0.07] backdrop-blur-xs">
                          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white/95 mb-1">
                            <Sparkles
                              className="size-3.5 dark:hidden"
                              style={{ color: theme.accentLight }}
                            />
                            <Sparkles
                              className="size-3.5 hidden dark:block"
                              style={{ color: theme.accent }}
                            />
                            {service.benefits[0].title}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                            {service.benefits[0].description}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => openModal(service.title)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all shadow-md cursor-pointer hover:scale-102"
                        >
                          Start a project
                          <ArrowUpRight className="size-4" />
                        </button>

                        <Link
                          href={service.href}
                          onMouseEnter={prefetchLeadForm}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-950 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 dark:text-white/75 dark:hover:text-white dark:decoration-white/30 dark:hover:decoration-white transition-colors"
                        >
                          Explore capability
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Visual Artwork Frame & Tiles */}
                    <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                      {image ? (
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-black/[0.04] dark:border-white/15 dark:shadow-2xl dark:bg-black/40 aspect-[16/9] w-full group/img">
                          <Image
                            src={image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 dark:from-black/70 dark:to-black/20" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                              {service.slug}.architecture
                            </span>
                            <span className="text-[11px] font-medium text-white/90">
                              Production Ready
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative rounded-xl sm:rounded-2xl p-6 border border-black/10 shadow-lg bg-black/[0.04] dark:border-white/15 dark:shadow-2xl dark:bg-black/40 aspect-[16/9] w-full flex flex-col justify-between overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-slate-700 dark:text-white/70 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded">
                              ENTERPRISE MODULE
                            </span>
                            <Icon className="size-5 text-slate-700 dark:text-white/80" />
                          </div>
                          <div>
                            <h4 className="font-serif text-xl sm:text-2xl font-medium text-slate-900 dark:text-white mb-1">
                              {service.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 line-clamp-2">
                              {service.overview}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs text-slate-700 dark:text-white/80">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Enterprise SLA &bull; SOC-2 aligned</span>
                          </div>
                        </div>
                      )}

                      {/* Use-Case Preview Tiles */}
                      <div className="grid grid-cols-3 gap-2">
                        {service.useCases?.slice(0, 3).map((uc, i) => (
                          <div
                            key={uc}
                            className="rounded-xl p-2.5 sm:p-3 bg-black/[0.03] border border-black/[0.06] hover:bg-black/[0.06] dark:bg-white/[0.04] dark:border-white/[0.07] dark:hover:bg-white/[0.07] backdrop-blur-xs flex flex-col justify-between min-h-[66px] transition-colors"
                          >
                            <span className="font-mono text-[10px] text-slate-400 dark:text-white/40">
                              0{i + 1}
                            </span>
                            <p className="text-[11px] text-slate-800 dark:text-white/90 font-medium leading-tight line-clamp-2 mt-1">
                              {uc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA Link */}
        <div className="flex justify-center pt-8">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-sans text-sm font-medium pb-1 border-b border-slate-900 text-slate-900 hover:text-slate-700 dark:border-white/40 dark:text-white dark:hover:text-white/80 transition-colors"
          >
            Explore all capabilities in detail
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}