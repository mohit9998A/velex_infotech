"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useLeadModal } from "@/lib/store/lead-modal";
import { prefetchLeadForm } from "@/components/forms/lead-form-modal";

const DEFAULT_SERVICE_VISUAL =
  "https://res.cloudinary.com/d0grbozz/image/upload/v1789796660/automation.webp";

const SERVICE_VISUALS: Record<string, string> = {
  "ai-automation": DEFAULT_SERVICE_VISUAL,
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

const DEFAULT_THEME = {
  accent: "#60A5FA",
  accentLight: "#2563EB",
};

/**
 * A soft colour glow as a plain radial gradient, standing in for a solid
 * `rounded-full` box under `filter: blur()`.
 *
 * The element carrying this must be the OLD box grown by 2σ on every side
 * (a Gaussian blur spreads that far), and the stops trace the blurred
 * profile: ~95% at the core, 50% at the old edge, ~16% one σ outside it,
 * gone at 2σ. Painted once, no filter pass, no layer of its own.
 */
function glowGradient(hex: string) {
  return `radial-gradient(closest-side, ${hex}f2 0%, ${hex}f2 25%, ${hex}80 55%, ${hex}29 78%, transparent 100%)`;
}

// 6 services: services 0-4 each own 15% of the scroll track (0..0.75) and the
// 6th owns the last 25%, so the final service stays fully readable while
// stationary before the page moves on to the next section.
function indexForProgress(progress: number) {
  if (progress < 0.15) return 0;
  if (progress < 0.3) return 1;
  if (progress < 0.45) return 2;
  if (progress < 0.6) return 3;
  if (progress < 0.75) return 4;
  return 5;
}

/**
 * Pinned "one service at a time" showcase.
 *
 * Performance notes — this section sits inside a 420–480vh scroll track, so
 * everything here happens while the visitor is actively scrolling:
 *
 *  - All six services are rendered once and stacked in the same grid cell;
 *    switching only flips classes, and the cross-fade is an opacity/translate
 *    CSS transition on the compositor. It used to be `AnimatePresence` that
 *    unmounted and remounted the copy AND the next/image on every switch, so
 *    each image was fetched and decoded mid-scroll, on the main thread, at
 *    exactly the moment it was needed.
 *  - The ambient glow was two 880px/480px boxes under `blur(140px)` /
 *    `blur(120px)` with `transition-all duration-700` on background-color:
 *    every service change re-rasterised a ~1700x1400px Gaussian blur on every
 *    frame for 700ms, inside a position:sticky container. It is now one
 *    radial-gradient layer per service, cross-faded with opacity.
 *  - Progress comes from `useScrollProgress` (one rect read per scroll event,
 *    only while the track is near the viewport) instead of motion's
 *    `useScroll`, and state only changes when the index changes.
 */
export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const openModal = useLeadModal((s) => s.openModal);

  // Keyboard focus: if focus is inside the copy column when the service
  // changes, carry it to the same control in the newly active service rather
  // than letting it fall back to <body> when the old block becomes inert.
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const hadFocusRef = useRef(false);
  const activeRef = useRef(0);

  // Which visuals have been mounted: the active one and its neighbours, and
  // never unmounted once fetched. Mounting all six up front added ~250 KB of
  // images to every first load on phones; one step of look-ahead is enough
  // for each visual to be fetched and decoded before its cross-fade.
  const [imageWindow, setImageWindow] = useState({ lo: 0, hi: 1 });

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  useScrollProgress(scrollTrackRef, 0, 1, (progress) => {
    const next = indexForProgress(progress);
    if (next === activeRef.current) return;
    activeRef.current = next;
    hadFocusRef.current = Boolean(
      leftColumnRef.current?.contains(document.activeElement),
    );
    setImageWindow((w) =>
      next - 1 >= w.lo && next + 1 <= w.hi
        ? w
        : { lo: Math.min(w.lo, next - 1), hi: Math.max(w.hi, next + 1) },
    );
    setActiveIndex(next);
  });

  useEffect(() => {
    if (!hadFocusRef.current) return;
    hadFocusRef.current = false;
    leftColumnRef.current
      ?.querySelector<HTMLElement>("[data-active] a[href], [data-active] button")
      ?.focus({ preventScroll: true });
  }, [activeIndex]);

  const activeService = services[activeIndex] ?? services[0] ?? allServices[0]!;
  const theme = SERVICE_THEMES[activeService.slug] ?? DEFAULT_THEME;

  return (
    <section
      id="services"
      className="relative w-full bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Outer Scroll Track: pins heading + showcase in place across all 6 services with dedicated dwell for the last service */}
      <div ref={scrollTrackRef} className="relative h-[420vh] sm:h-[480vh] w-full">

        {/* Sticky Viewport Container: Locks heading + showcase to screen below navbar.
            `svh`, not `vh`: on phones `100vh` is the LARGE viewport, so with
            the URL bar showing, the bottom of the panel (the "Explore all
            capabilities" link) sat underneath the browser chrome. */}
        <div className="sticky top-14 sm:top-16 h-[calc(100svh-3.5rem)] sm:h-[calc(100svh-4rem)] w-full flex flex-col justify-between py-6 sm:py-8 overflow-hidden z-10">

          {/* Dynamic Ambient Background Glow — one gradient layer per service,
              cross-faded (see the component comment). Box = the old
              55rem x 35rem blob grown by 2σ (σ = 140px) on each side. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-15 dark:opacity-25"
          >
            {services.map((s, i) => (
              <div
                key={s.slug}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90rem] h-[70rem] transition-opacity duration-700",
                  i === activeIndex ? "opacity-100" : "opacity-0",
                )}
                style={{
                  backgroundImage: glowGradient(
                    (SERVICE_THEMES[s.slug] ?? DEFAULT_THEME).accent,
                  ),
                }}
              />
            ))}
          </div>
          {/* Secondary glow: the old 30rem blob at bottom-10/right-10 under
              blur(120px), grown by 2σ (240px) per side about the same centre. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[12.5rem] -right-[12.5rem] w-[60rem] h-[60rem] opacity-10 dark:opacity-15"
            style={{ backgroundImage: glowGradient(theme.accentLight) }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col justify-between h-full">

            {/* FIXED HEADING */}
            <div className="reveal-on-scroll text-center max-w-3xl mx-auto shrink-0 pt-2 sm:pt-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white">
                Intelligent systems. <br className="hidden sm:inline" />
                <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
                  Built to move business forward.
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-2.5 sm:mt-3 max-w-2xl mx-auto text-slate-600 dark:text-white/60 line-clamp-2">
                We build the high-performance infrastructure for autonomous workflows,
                real-world execution environments, and intelligent agent applications.
              </p>
            </div>

            {/* 2-Column Showcase (Replaces content at exact same place) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-1 sm:py-2">

              {/* LEFT COLUMN: all six services stacked in one grid cell; only
                  the active one is visible, interactive and exposed to AT. */}
              <div
                ref={leftColumnRef}
                className="lg:col-span-6 grid items-center min-h-[260px] sm:min-h-[300px]"
              >
                {services.map((service, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={service.slug}
                      data-active={isActive || undefined}
                      aria-hidden={!isActive || undefined}
                      inert={!isActive}
                      className={cn(
                        "[grid-area:1/1] space-y-3 sm:space-y-4 transition-[opacity,translate] duration-300 ease-in-out",
                        isActive
                          ? "opacity-100 translate-y-0 delay-150"
                          : i < activeIndex
                            ? "opacity-0 -translate-y-3 pointer-events-none"
                            : "opacity-0 translate-y-3 pointer-events-none",
                      )}
                    >
                      {/* Service Title > */}
                      <div>
                        <Link
                          href={service.href}
                          onMouseEnter={prefetchLeadForm}
                          className="group inline-flex items-center gap-2"
                        >
                          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                            {service.title}
                          </h3>
                          <ChevronRight className="size-7 sm:size-8 text-[#7138FF] dark:text-[#8B4DFF] transition-transform group-hover:translate-x-1.5" />
                        </Link>
                      </div>

                      {/* Tagline & Description */}
                      <p className="font-sans text-[15px] sm:text-base md:text-lg text-slate-600 dark:text-white/80 leading-relaxed font-normal">
                        {service.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-1.5 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openModal(service.title)}
                          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-sans text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-all shadow-md dark:shadow-xl hover:scale-102 cursor-pointer"
                        >
                          Start a project
                          <ArrowUpRight className="size-4" />
                        </button>

                        <Link
                          href={service.href}
                          onMouseEnter={prefetchLeadForm}
                          className="inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white underline underline-offset-4 decoration-slate-300 hover:decoration-slate-950 dark:decoration-white/30 dark:hover:decoration-white transition-colors"
                        >
                          Explore capability
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT COLUMN: Pinned 3D Visual — all six images stacked and
                  decoded ahead of time; a switch is a compositor cross-fade. */}
              <div className="lg:col-span-6 relative flex justify-center items-center py-1 lg:py-0">
                <div className="grid w-full max-w-[500px] lg:max-w-[560px] items-center justify-items-center">
                  {services.map((service, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={service.slug}
                        aria-hidden={!isActive || undefined}
                        className={cn(
                          "[grid-area:1/1] relative w-full flex items-center justify-center group transition-[opacity,scale,translate] duration-350 ease-in-out",
                          isActive
                            ? "opacity-100 scale-100 translate-y-0"
                            : cn(
                                "opacity-0 scale-[0.96] pointer-events-none",
                                i < activeIndex ? "-translate-y-1.5" : "translate-y-1.5",
                              ),
                        )}
                      >
                        {i >= imageWindow.lo && i <= imageWindow.hi && (
                          <Image
                            src={SERVICE_VISUALS[service.slug] ?? DEFAULT_SERVICE_VISUAL}
                            alt={isActive ? `${service.title} platform visual` : ""}
                            width={1200}
                            height={800}
                            sizes="(max-width: 1024px) 100vw, 560px"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-103"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
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
