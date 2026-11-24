"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  FileText,
  Lightbulb,
  BarChart3,
  Layers,
  Cpu,
  Flag,
  Code2,
  ShieldCheck,
  Eye,
  Rocket,
  Activity,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { ProcessStep } from "@/types";
import processData from "@/content/process.json";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { RevealGroup } from "@/components/common/reveal-group";

const steps = processData as ProcessStep[];

interface StepMeta {
  handwritten: string;
  image: string;
  items: { label: string; icon: LucideIcon }[];
}

const DEFAULT_STEP_META: StepMeta = {
  handwritten: "Understand Deeply",
  image: "https://res.cloudinary.com/d0grbozz/image/upload/v1789797249/step1.webp",
  items: [
    { label: "Workflow audit", icon: FileText },
    { label: "Opportunity map", icon: Lightbulb },
    { label: "Success metrics", icon: BarChart3 },
  ],
};

const STEP_DETAILS: Record<string, StepMeta> = {
  discovery: DEFAULT_STEP_META,
  strategy: {
    handwritten: "Design the Right Path",
    image: "https://res.cloudinary.com/d0grbozz/image/upload/v1789797249/step2.webp",
    items: [
      { label: "Solution blueprint", icon: Layers },
      { label: "Tech architecture", icon: Cpu },
      { label: "Milestone plan", icon: Flag },
    ],
  },
  execution: {
    handwritten: "Build · Iterate · Improve",
    image: "https://res.cloudinary.com/d0grbozz/image/upload/v1789797251/step3.webp",
    items: [
      { label: "Weekly builds", icon: Code2 },
      { label: "QA & testing", icon: ShieldCheck },
      { label: "Live previews", icon: Eye },
    ],
  },
  launch: {
    handwritten: "Launch & Scale",
    image: "https://res.cloudinary.com/d0grbozz/image/upload/v1789797251/step4.webp",
    items: [
      { label: "Production launch", icon: Rocket },
      { label: "Monitoring & optimisation", icon: Activity },
      { label: "Scale & iterate", icon: TrendingUp },
    ],
  },
};

const TIMELINE_STAGES = ["IDEA", "PLAN", "BUILD", "LAUNCH", "IMPACT"];

// Generate smooth organic wavy path connecting the mobile timeline nodes
function generateCurvyPath(coords: { x: number; y: number }[]) {
  if (coords.length < 2) return "";

  const c0 = coords[0];
  if (!c0) return "";
  let path = `M ${c0.x} ${c0.y} `;

  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];
    if (!curr || !next) continue;
    const dy = next.y - curr.y;
    const yMid = curr.y + dy / 2;
    // Sweep leftwards into the space between the 3D icons
    const xLeft = Math.max(18, Math.min(curr.x, next.x) - 52);

    // First half: from current node curving leftwards to the trough (xLeft, yMid)
    path += `C ${curr.x} ${curr.y + dy * 0.28}, ${xLeft} ${yMid - dy * 0.28}, ${xLeft} ${yMid} `;
    // Second half: from the trough curving rightwards into the next node
    path += `C ${xLeft} ${yMid + dy * 0.28}, ${next.x} ${next.y - dy * 0.28}, ${next.x} ${next.y} `;
  }

  return path;
}

function stepForProgress(progress: number) {
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

/** Per-card entrance, consumed by `[data-reveal]` in globals.css. */
function revealStyle(delayMs: number, axis: "x" | "y"): CSSProperties {
  return {
    "--reveal-delay": `${delayMs}ms`,
    "--reveal-duration": "400ms",
    "--reveal-x": axis === "x" ? "20px" : "0px",
    "--reveal-y": axis === "y" ? "20px" : "0px",
  } as CSSProperties;
}

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nodeCoords, setNodeCoords] = useState<{ x: number; y: number }[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const activeStepRef = useRef(0);

  const currentStep = hoveredStep !== null ? hoveredStep : activeStep;

  // Scroll-driven progressive activation from 01 -> 02 -> 03 -> 04.
  // Same window as the old motion `useScroll({ offset: ["start 75%", "end 25%"] })`;
  // state only changes when the step does, and not while a card is hovered.
  useScrollProgress(containerRef, 0.75, 0.25, (progress) => {
    if (hoveredStep !== null) return;
    const next = stepForProgress(progress);
    if (next === activeStepRef.current) return;
    activeStepRef.current = next;
    setActiveStep(next);
  });

  const selectStep = (idx: number) => {
    activeStepRef.current = idx;
    setActiveStep(idx);
  };

  // Synchronize mobile node positions for precise SVG curve alignment
  useEffect(() => {
    const updatePositions = () => {
      if (!mobileContainerRef.current) return;
      const containerRect = mobileContainerRef.current.getBoundingClientRect();
      const coords = nodeRefs.current.map((node) => {
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      if (
        coords.length === 4 &&
        coords.every((c): c is { x: number; y: number } => c !== null && c.y > 0)
      ) {
        setNodeCoords(coords);
      }
    };

    updatePositions();

    // The ResizeObserver already covers viewport resizes (the container's
    // width follows the viewport), so no separate window listener.
    const ro = new ResizeObserver(() => {
      updatePositions();
    });

    if (mobileContainerRef.current) {
      ro.observe(mobileContainerRef.current);
    }
    nodeRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    return () => {
      ro.disconnect();
    };
  }, []);

  const defaultCoords = [
    { x: 88, y: 75 },
    { x: 88, y: 235 },
    { x: 88, y: 395 },
    { x: 88, y: 555 },
  ];
  const activeCoords = nodeCoords.length === 4 ? nodeCoords : defaultCoords;
  const curvyPathD = generateCurvyPath(activeCoords);
  const progress = currentStep / 3;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-12 lg:py-6 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-[#FAF9FD] dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic ambient background glow following active card.
          Moves with a compositor `transform` on a full-width rail (25% of the
          rail = one column) instead of transitioning `left`, which re-ran
          layout and re-rasterised a blur-3xl layer on every frame for 700ms.
          The blur filter itself is now a gradient + soft mask (.glow-soft). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[22rem] transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${currentStep * 25}%)` }}
      >
        <div className="glow-soft absolute left-[12.5%] top-0 w-[32rem] h-[22rem] -translate-x-1/2 bg-gradient-to-r from-[#5424D6]/20 via-[#7138FF]/25 to-[#8B4DFF]/20 opacity-70 dark:opacity-35" />
      </div>

      {/* Subtle orbital background lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(113, 56, 255, 0.1) 0%, transparent 60%)",
        }}
      />

      <RevealGroup className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full flex flex-col justify-between">
        {/* Header */}
        <div className="reveal-on-scroll relative text-center max-w-3xl mx-auto pb-6 sm:pb-10">

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
            From idea to{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              intelligence
            </span>
          </h2>

          {/* Subheading */}
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60">
            A precise, four-step path that turns ambition into deployed, compounding results.
          </p>
        </div>

        {/* DESKTOP LAYOUT (Horizontal) */}
        <div className="hidden lg:block">
          {/* Top 3D Isometric Process Flow */}
          <div className="relative mb-6">
            {/* Continuous Journey Connecting Wave on Desktop */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 160"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="journey-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B99CFF" />
                    <stop offset="35%" stopColor="#7138FF" />
                    <stop offset="65%" stopColor="#5424D6" />
                    <stop offset="100%" stopColor="#8B4DFF" />
                  </linearGradient>
                  <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Base timeline path */}
                <path
                  d="M 125 130 C 200 152, 300 152, 375 130 C 450 70, 550 70, 625 130 C 700 152, 800 152, 875 130"
                  stroke="url(#journey-wave-gradient)"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />

                {/* Active illuminated timeline path */}
                <path
                  d="M 125 130 C 200 152, 300 152, 375 130 C 450 70, 550 70, 625 130 C 700 152, 800 152, 875 130"
                  stroke="url(#journey-wave-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#wave-glow)"
                  className="transition-[stroke-dashoffset] duration-700 ease-out"
                  style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: `${1000 - progress * 1000}`,
                  }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-4 items-end">
              {steps.map((step, idx) => {
                const meta = STEP_DETAILS[step.id] ?? DEFAULT_STEP_META;
                const isActive = currentStep === idx;

                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="relative flex flex-col items-center text-center cursor-pointer group"
                  >
                    {/* 3D Isometric Visual Model */}
                    <div
                      className={`relative mt-1 w-48 xl:w-52 h-32 flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "scale-105 filter drop-shadow-[0_8px_20px_rgba(113,56,255,0.3)]"
                          : "opacity-85 hover:opacity-100"
                      }`}
                    >
                      {/* Glowing pedestal halo */}
                      <div
                        className={`absolute inset-x-2 bottom-1 h-5 blur-lg rounded-full pointer-events-none transition-all duration-500 ${
                          isActive
                            ? "bg-[#7138FF]/35 dark:bg-[#7138FF]/45 scale-110"
                            : "bg-[#7138FF]/15 dark:bg-[#7138FF]/20"
                        }`}
                      />

                      <div className="relative size-full overflow-hidden">
                        {/* Far below the fold: lazy (the old `priority` here
                            preloaded four images in <head> on every visit,
                            competing with the LCP on mobile). */}
                        <Image
                          src={meta.image}
                          alt={`${step.title} visual`}
                          fill
                          sizes="200px"
                          className="object-contain transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The 4 Process Step Cards (Desktop) */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const meta = STEP_DETAILS[step.id] ?? DEFAULT_STEP_META;
              const isActive = currentStep === idx;

              return (
                <div
                  key={step.id}
                  data-reveal
                  style={revealStyle(idx * 80, "y")}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`group relative p-5 rounded-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "-translate-y-1.5 bg-white dark:bg-white/[0.06] border-[#7138FF]/80 dark:border-[#8B4DFF]/50 shadow-[0_12px_32px_rgba(113,56,255,0.15)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(113,56,255,0.3)]"
                      : "bg-white/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-[#7138FF]/60"
                  } border`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-sans text-xs font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-[#7138FF] dark:text-[#8B4DFF]"
                            : "text-slate-500 dark:text-white/40"
                        }`}
                      >
                        {step.index}
                      </span>
                      {isActive && (
                        <Sparkles className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF] animate-pulse" />
                      )}
                    </div>
                    <h3 className="mt-1.5 font-heading text-2xl font-semibold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm text-slate-600 dark:text-white/70 leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  <ul className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap gap-2">
                    {meta.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li
                          key={item.label}
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium transition-colors duration-300 ${
                            isActive
                              ? "bg-[#7138FF]/10 text-[#7138FF] dark:text-white border border-[#7138FF]/20"
                              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/10"
                          }`}
                        >
                          <ItemIcon className={`size-3 ${isActive ? "text-[#7138FF]" : "text-slate-500"}`} />
                          <span>{item.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE LAYOUT (Creative Vertical Wavy Timeline) */}
        <div
          ref={mobileContainerRef}
          className="flex flex-col lg:hidden relative gap-6 sm:gap-8 w-full mt-2"
        >
          {/* Creative Curvy Dotted Path (Mobile) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="mobile-curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="30%" stopColor="#8B4DFF" />
                <stop offset="70%" stopColor="#7138FF" />
                <stop offset="100%" stopColor="#5424D6" />
              </linearGradient>
              <filter id="mobile-curve-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Progressive path reveal: a normalised (pathLength=1) stroke
                  whose dash offset transitions in CSS — same 0.7s ease-out
                  the motion.path pathLength animation used. */}
              <mask id="mobile-curve-progress-mask">
                <path
                  d={curvyPathD}
                  pathLength={1}
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  className="transition-[stroke-dashoffset] duration-700 ease-out"
                  style={{
                    strokeDasharray: "1 1",
                    strokeDashoffset: 1 - progress,
                  }}
                />
              </mask>
            </defs>

            {/* Base track: subtle, non-moving dotted line */}
            <path
              d={curvyPathD}
              stroke="#7138FF"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeLinecap="round"
              fill="none"
              className="opacity-25 dark:opacity-30"
            />

            {/* Active illuminated track: revealed with same animation as web UI */}
            <path
              d={curvyPathD}
              stroke="url(#mobile-curve-gradient)"
              strokeWidth="2.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              fill="none"
              filter="url(#mobile-curve-glow)"
              mask="url(#mobile-curve-progress-mask)"
              className="opacity-95"
            />
          </svg>

          {steps.map((step, idx) => {
            const meta = STEP_DETAILS[step.id] ?? DEFAULT_STEP_META;
            const isActive = currentStep === idx;
            return (
              <button
                type="button"
                key={step.id}
                className="relative flex items-center gap-3 sm:gap-6 w-full z-10 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7138FF] rounded-2xl"
                onClick={() => selectStep(idx)}
                aria-pressed={isActive}
              >
                {/* Left: Image */}
                <div className="w-[5.5rem] sm:w-[7.5rem] shrink-0 relative flex justify-center items-center">
                  <div className={`relative w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center transition-all duration-500 ${isActive ? "scale-105 drop-shadow-[0_8px_20px_rgba(113,56,255,0.3)]" : "opacity-85"}`}>
                    {/* Glowing pedestal halo */}
                    <div
                      className={`absolute inset-x-2 bottom-1 h-5 blur-lg rounded-full pointer-events-none transition-all duration-500 ${
                        isActive
                          ? "bg-[#7138FF]/35 dark:bg-[#7138FF]/45 scale-110"
                          : "bg-[#7138FF]/15 dark:bg-[#7138FF]/20"
                      }`}
                    />
                    <Image
                      src={meta.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 640px) 80px, 112px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Center Node on the wavy path */}
                <div
                  ref={(el) => { nodeRefs.current[idx] = el; }}
                  className={`absolute left-[5.5rem] sm:left-[7.5rem] -translate-x-1/2 rounded-full transition-all duration-700 ease-out z-20 flex items-center justify-center ${
                    isActive
                      ? "w-3.5 h-3.5 bg-[#7138FF] shadow-[0_0_12px_rgba(113,56,255,0.95)] ring-4 ring-[#7138FF]/30 scale-110"
                      : idx < currentStep
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#7138FF] ring-2 ring-[#7138FF]/40"
                      : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-300 dark:bg-white/20 ring-2 ring-slate-200 dark:ring-white/10"
                  }`}
                />

                {/* Right: Card */}
                <div
                  data-reveal
                  style={revealStyle(idx * 100, "x")}
                  className={`flex-1 group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-white/[0.06] border-[#7138FF]/80 dark:border-[#8B4DFF]/50 shadow-[0_12px_32px_rgba(113,56,255,0.15)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(113,56,255,0.3)]"
                      : "bg-white/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                  } border`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-sans text-[10px] sm:text-xs font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-[#7138FF] dark:text-[#8B4DFF]"
                            : "text-slate-500 dark:text-white/40"
                        }`}
                      >
                        {step.index}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-2xl font-semibold text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[11px] sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  <ul className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap gap-1.5">
                    {meta.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li
                          key={item.label}
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium transition-colors duration-300 ${
                            isActive
                              ? "bg-[#7138FF]/10 text-[#7138FF] dark:text-white border border-[#7138FF]/20"
                              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/10"
                          }`}
                        >
                          <ItemIcon className={`size-2.5 ${isActive ? "text-[#7138FF]" : "text-slate-500"}`} />
                          <span>{item.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom Timeline Indicator Bar */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-3 w-full">
          {/* Main Horizontal Timeline Track spanning from Card 1 center (12.5%) to Card 4 center (87.5%) on desktop */}
          <div className="w-full lg:px-[12.5%] flex flex-col gap-2">
            {/* Continuous Line Track with End Dots */}
            <div className="relative w-full flex items-center">
              {/* Start Dot */}
              <span className="size-2 rounded-full bg-[#B99CFF] dark:bg-[#8B4DFF] shadow-[0_0_8px_rgba(185,156,255,0.8)] shrink-0 z-10" />

              {/* Track Base + Active Progress Fill (scaleX, not width: no
                  layout per frame while it animates) */}
              <div className="relative flex-1 h-[1.5px] bg-slate-200/90 dark:bg-white/15 overflow-hidden mx-0.5">
                <div
                  className="h-full w-full origin-left bg-gradient-to-r from-[#B99CFF] via-[#7138FF] to-[#5424D6] transition-transform duration-700 ease-out"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>

              {/* End Dot */}
              <span className="size-2 rounded-full bg-[#5424D6] dark:bg-[#7138FF] shadow-[0_0_8px_rgba(84,36,214,0.9)] shrink-0 z-10" />
            </div>

            {/* Stage Labels beneath the line */}
            <div className="flex items-center justify-between font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-slate-500 dark:text-white/50">
              {TIMELINE_STAGES.map((stage, i) => {
                const isHighlighted = (i / (TIMELINE_STAGES.length - 1)) <= progress;
                return (
                  <span
                    key={stage}
                    className={`transition-colors duration-300 ${
                      isHighlighted
                        ? "font-semibold text-slate-900 dark:text-white"
                        : "text-slate-500 dark:text-white/40"
                    }`}
                  >
                    {stage}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
