"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";

const SERVICE_VISUALS: Record<string, string> = {
  "ai-automation": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796660/automation.webp",
  "agentic-ai": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796660/agent.webp",
  "ai-receptionist": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796660/receptionist.webp",
  "whatsapp-bot": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796661/whatsapp.webp",
  "web-development": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796661/website.webp",
  "software-development": "https://res.cloudinary.com/d0grbozz/image/upload/v1789796661/software.webp",
};

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
  allServices.find((s) => s.slug === slug)
).filter(Boolean) as ServiceItem[];

// Color palettes for dynamic ambient background glow per service
const SERVICE_THEMES: Record<
  string,
  {
    accent: string;
    accentLight: string;
  }
> = {
  "ai-automation": {
    accent: "#60A5FA",
    accentLight: "#2563EB",
  },
  "agentic-ai": {
    accent: "#A78BFA",
    accentLight: "#7C3AED",
  },
  "ai-receptionist": {
    accent: "#F472B6",
    accentLight: "#E11D48",
  },
  "whatsapp-bot": {
    accent: "#34D399",
    accentLight: "#059669",
  },
  "web-development": {
    accent: "#38BDF8",
    accentLight: "#0284C7",
  },
  "software-development": {
    accent: "#2DD4BF",
    accentLight: "#0D9488",
  },
};

export function ServicesSection() {
  const [activeSlug, setActiveSlug] = useState<string>("ai-automation");
  const openModal = useLeadModal((s) => s.openModal);

  // Track scrolling container to switch active content dynamically on scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Automatically update active slug as user scrolls down through sticky section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 6 services total:
    // We map progress [0..1] so that services 0 to 4 each take 15% of the scroll track (0..0.75),
    // and the 6th service (index 5) takes the remaining 25% (0.75..1.00).
    // This guarantees the last service is 100% visible and fully readable while stationary,
    // and only after scrolling through its full window does the next scroll advance to the next section.
    let index = 0;
    if (latest < 0.15) {
      index = 0;
    } else if (latest < 0.30) {
      index = 1;
    } else if (latest < 0.45) {
      index = 2;
    } else if (latest < 0.60) {
      index = 3;
    } else if (latest < 0.75) {
      index = 4;
    } else {
      index = 5;
    }

    const targetSlug = services[index]?.slug;
    if (targetSlug && targetSlug !== activeSlug) {
      setActiveSlug(targetSlug);
    }
  });

  const activeService =
    services.find((s) => s.slug === activeSlug) ?? services[0];
  const activeIndex = services.findIndex((s) => s.slug === activeSlug);
  const theme = SERVICE_THEMES[activeService.slug] ?? SERVICE_THEMES["ai-automation"];

  const handleSelectService = (slug: string, index: number) => {
    setActiveSlug(slug);
    if (scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.offsetTop;
      const containerHeight = scrollContainerRef.current.offsetHeight;
      const travel = containerHeight - window.innerHeight;
      const progressTarget = index === 5 ? 0.85 : index * 0.15 + 0.05;
      const targetY = containerTop + travel * progressTarget;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Outer Scroll Track: pins heading + showcase in place across all 6 services with dedicated dwell for the last service */}
      <div ref={scrollContainerRef} className="relative h-[420vh] sm:h-[480vh] w-full">
        
        {/* Sticky Viewport Container: Locks heading + showcase to screen below navbar */}
        <div className="sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full flex flex-col justify-between py-6 sm:py-8 overflow-hidden z-10">
          
          {/* Dynamic Ambient Background Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[35rem] rounded-full blur-[140px] opacity-15 dark:opacity-25 transition-all duration-700"
            style={{ backgroundColor: theme.accent }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-10 dark:opacity-15"
            style={{ backgroundColor: theme.accentLight }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col justify-between h-full">
            
            {/* FIXED HEADING */}
            <div className="text-center max-w-3xl mx-auto shrink-0 pt-2 sm:pt-4">
              <motion.h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                Intelligent systems. <br className="hidden sm:inline" />
                <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
                  Built to move business forward.
                </span>
              </motion.h2>

              <motion.p
                className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-2.5 sm:mt-3 max-w-2xl mx-auto text-slate-600 dark:text-white/60 line-clamp-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                We build the high-performance infrastructure for autonomous workflows,
                real-world execution environments, and intelligent agent applications.
              </motion.p>
            </div>

            {/* 2-Column Showcase (Replaces content at exact same place) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-1 sm:py-2">
              
              {/* LEFT COLUMN: Single Active Service (Replaces content at exact same place) */}
              <div className="lg:col-span-6 flex flex-col justify-center min-h-[260px] sm:min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Service Title > */}
                    <div>
                      <Link
                        href={activeService.href}
                        onMouseEnter={prefetchLeadForm}
                        className="group inline-flex items-center gap-2"
                      >
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                          {activeService.title}
                        </h3>
                        <ChevronRight className="size-7 sm:size-8 text-[#7138FF] dark:text-[#8B4DFF] transition-transform group-hover:translate-x-1.5" />
                      </Link>
                    </div>

                    {/* Tagline & Description */}
                    <p className="font-sans text-[15px] sm:text-base md:text-lg text-slate-600 dark:text-white/80 leading-relaxed font-normal">
                      {activeService.description}
                    </p>

                    {/* Core Capabilities 
                    {activeService.highlights && (
                      <div className="space-y-1 pt-0.5">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-white/50 block">
                          Key Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeService.highlights.map((h) => (
                            <span
                              key={h}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white/90 backdrop-blur-md shadow-xs dark:shadow-none"
                            >
                              <CheckCircle2 className="size-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}*/}

                    {/* Action Buttons */}
                    <div className="pt-1.5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openModal(activeService.title)}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-sans text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-all shadow-md dark:shadow-xl hover:scale-102 cursor-pointer"
                      >
                        Start a project
                        <ArrowUpRight className="size-4" />
                      </button>

                      <Link
                        href={activeService.href}
                        onMouseEnter={prefetchLeadForm}
                        className="inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white underline underline-offset-4 decoration-slate-300 hover:decoration-slate-950 dark:decoration-white/30 dark:hover:decoration-white transition-colors"
                      >
                        Explore capability
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT COLUMN: Pinned 3D Visual */}
              <div className="lg:col-span-6 relative flex justify-center items-center py-1 lg:py-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlug}
                    initial={{ opacity: 0, scale: 0.96, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -6 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative w-full max-w-[500px] lg:max-w-[560px] flex items-center justify-center group"
                  >
                    <Image
                      src={SERVICE_VISUALS[activeSlug] ?? SERVICE_VISUALS["ai-automation"]}
                      alt={`${activeService.title} platform visual`}
                      width={1200}
                      height={800}
                      priority
                      className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-103"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom CTA Link */}
            <div className="flex justify-center pt-2 sm:pt-3 shrink-0">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium pb-0.5 border-b border-slate-300 hover:border-[#7138FF] text-slate-700 hover:text-[#7138FF] dark:border-white/40 dark:text-white dark:hover:text-[#8B4DFF] dark:hover:border-[#8B4DFF] transition-colors"
              >
                Explore all capabilities in detail
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
