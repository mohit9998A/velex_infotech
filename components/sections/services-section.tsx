"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { cn } from "@/lib/utils";
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

/** How long each service stays on screen before the next one fades in. */
const SLIDE_MS = 5000;

/**
 * "One service at a time" showcase that changes on its own every 5 seconds.
 *
 * It used to pin itself for a 420-480vh scroll track and change service as the
 * visitor scrolled, so getting past it took several screens of scrolling. It is
 * now an ordinary section: the page scrolls straight through to the next one,
 * and the services rotate on a timer instead.
 *
 * The timer runs whenever the section is on screen and the tab is visible —
 * hovering does NOT pause it. It only holds while a KEYBOARD user is tabbing
 * through a slide (focus-visible inside), so their focused link cannot vanish
 * under them. The dots jump straight to a service and restart the 5 s count.
 *
 * Rendering: all six services are stacked in one grid cell and cross-fade with
 * opacity/translate CSS transitions (compositor-only). Visuals mount one step
 * ahead of the active slide and stay mounted, so each is fetched and decoded
 * before it fades in, without loading all six on first view.
 */
/** Per-character delay of the title typing effect, and its start delay. */
const TYPE_MS = 55;
const TYPE_START_MS = 250;

/**
 * Typewriter title for the active slide.
 *
 * - An invisible copy of the full title sizes the box, so the heading (and the
 *   chevron after it) never shifts while the letters appear.
 * - The letters are written straight into a text node (no React re-render per
 *   character), and only for the active slide while the section is on screen.
 * - The server HTML has the full title, and the real heading text for crawlers
 *   and screen readers is the sr-only copy the caller renders next to this.
 * - Reduced motion: the full title, no typing, no caret blink.
 */
function TypedTitle({ text, active, inView }: { text: string; active: boolean; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }
    // Active but not yet seen: hold it empty so it types when it arrives.
    el.textContent = "";
    if (!inView) return;

    let i = 0;
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        el.textContent = text.slice(0, i);
        if (i >= text.length) window.clearInterval(interval);
      }, TYPE_MS);
    }, TYPE_START_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, active, inView]);

  return (
    <span aria-hidden="true" className="relative inline-grid">
      {/* Sizer: full title + room for the caret (0.06em bar + 0.06em gap). */}
      <span className="invisible [grid-area:1/1]">
        {text}
        <span className="inline-block w-[0.12em]" />
      </span>
      <span className="[grid-area:1/1]">
        <span ref={ref}>{text}</span>
        {active && <span className="typing-caret" />}
      </span>
    </span>
  );
}

export function ServicesSection() {
  const [{ activeIndex, prevIndex }, setSlide] = useState({ activeIndex: 0, prevIndex: -1 });
  const [imageWindow, setImageWindow] = useState({ lo: 0, hi: 1 });
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const openModal = useLeadModal((s) => s.openModal);
  const sectionRef = useRef<HTMLElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = (next: number) => {
    setSlide((cur) =>
      cur.activeIndex === next ? cur : { activeIndex: next, prevIndex: cur.activeIndex },
    );
    const ahead = (next + 1) % services.length;
    setImageWindow((w) => {
      const lo = Math.min(w.lo, next, ahead);
      const hi = Math.max(w.hi, next, ahead);
      return lo === w.lo && hi === w.hi ? w : { lo, hi };
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = inView && tabVisible && !focusedWithin;

  // One timeout per slide: any change of slide (auto or a dot click) or of
  // `running` restarts the full 5 s.
  const advance = useEffectEvent(() => goTo((activeIndex + 1) % services.length));
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(advance, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [activeIndex, running]);

  /** Active slide visible; the one just left exits upward; the rest wait below. */
  const slideState = (i: number) =>
    i === activeIndex ? "active" : i === prevIndex ? "exited" : "waiting";

  const activeService = services[activeIndex] ?? services[0] ?? allServices[0]!;
  const theme = SERVICE_THEMES[activeService.slug] ?? DEFAULT_THEME;

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Our services"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-300"
    >

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

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col">

            {/* FIXED HEADING */}
            <div className="reveal-on-scroll text-center max-w-3xl mx-auto shrink-0 pt-2 sm:pt-4">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
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
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mt-10 sm:mt-12"
              // Swipeable on touch: a mostly-horizontal swipe of 50px+ goes to
              // the next/previous service. Passive listeners, no
              // preventDefault, so vertical page scrolling is untouched.
              onTouchStart={(e) => {
                const t = e.touches[0];
                if (t) swipeStart.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={(e) => {
                const start = swipeStart.current;
                const t = e.changedTouches[0];
                swipeStart.current = null;
                if (!start || !t) return;
                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
                const n = services.length;
                goTo(dx < 0 ? (activeIndex + 1) % n : (activeIndex - 1 + n) % n);
              }}
              onFocusCapture={(e) => {
                // Keyboard focus only: a mouse click on a button also focuses
                // it, and that must not freeze the rotation.
                if ((e.target as HTMLElement).matches(":focus-visible")) setFocusedWithin(true);
              }}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusedWithin(false);
              }}
            >

              {/* LEFT COLUMN: all six services stacked in one grid cell; only
                  the active one is visible, interactive and exposed to AT. */}
              <div className="lg:col-span-6 grid items-center min-h-[260px] sm:min-h-[300px]">
                {services.map((service, i) => {
                  const isActive = i === activeIndex;
                  const state = slideState(i);
                  return (
                    <div
                      key={service.slug}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${services.length}: ${service.title}`}
                      data-active={isActive || undefined}
                      aria-hidden={!isActive || undefined}
                      inert={!isActive}
                      className={cn(
                        "[grid-area:1/1] space-y-3 sm:space-y-4 transition-[opacity,translate] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        state === "active"
                          ? "opacity-100 translate-y-0 delay-200"
                          : state === "exited"
                            ? "opacity-0 -translate-y-8 pointer-events-none"
                            : "opacity-0 translate-y-8 pointer-events-none",
                      )}
                    >
                      {/* Service Title > */}
                      <div>
                        <Link
                          href={service.href}
                          onMouseEnter={prefetchLeadForm}
                          className="group inline-flex items-center gap-2"
                        >
                          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                            <span className="sr-only">{service.title}</span>
                            <TypedTitle text={service.title} active={isActive} inView={inView} />
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

              {/* RIGHT COLUMN: 3D Visual — all six images stacked and
                  decoded ahead of time; a switch is a compositor cross-fade. */}
              <div className="lg:col-span-6 relative flex justify-center items-center py-1 lg:py-0">
                <div className="grid w-full max-w-[500px] lg:max-w-[560px] items-center justify-items-center">
                  {services.map((service, i) => {
                    const isActive = i === activeIndex;
                    const state = slideState(i);
                    return (
                      <div
                        key={service.slug}
                        aria-hidden={!isActive || undefined}
                        className={cn(
                          "[grid-area:1/1] relative w-full flex items-center justify-center group transition-[opacity,scale,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive
                            ? "opacity-100 scale-100 translate-x-0 delay-100"
                            : cn(
                                "opacity-0 scale-[0.92] pointer-events-none",
                                state === "exited" ? "-translate-x-16" : "translate-x-16",
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

            {/* Slide picker: one dot per service; the active one fills over the
                5 s it is on screen (and freezes whenever the rotation pauses). */}
            <div className="mt-8 flex items-center justify-center gap-2" role="group" aria-label="Choose a service">
              {services.map((service, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${service.title}`}
                    aria-current={isActive || undefined}
                    className={cn(
                      "relative h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138FF] focus-visible:ring-offset-2",
                      isActive
                        ? "w-10 bg-[#7138FF]/20 dark:bg-[#8B4DFF]/25"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/35",
                    )}
                  >
                    {isActive && (
                      <span
                        key={activeIndex}
                        aria-hidden="true"
                        className="svc-progress absolute inset-0 origin-left rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]"
                        style={{ animationPlayState: running ? "running" : "paused" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom CTA Link */}
            <div className="flex justify-center pt-6 sm:pt-8 shrink-0">
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
    </section>
  );
}
