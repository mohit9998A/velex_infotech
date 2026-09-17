"use client";

import { useEffect, useRef, useState } from "react";
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
import { motion, useScroll } from "motion/react";

import type { ProcessStep } from "@/types";
import processData from "@/content/process.json";

const steps = processData as ProcessStep[];

interface StepMeta {
  handwritten: string;
  image: string;
  items: { label: string; icon: LucideIcon }[];
}

const STEP_DETAILS: Record<string, StepMeta> = {
  discovery: {
    handwritten: "Understand Deeply",
    image: "/images/process/step1.webp",
    items: [
      { label: "Workflow audit", icon: FileText },
      { label: "Opportunity map", icon: Lightbulb },
      { label: "Success metrics", icon: BarChart3 },
    ],
  },
  strategy: {
    handwritten: "Design the Right Path",
    image: "/images/process/step2.webp",
    items: [
      { label: "Solution blueprint", icon: Layers },
      { label: "Tech architecture", icon: Cpu },
      { label: "Milestone plan", icon: Flag },
    ],
  },
  execution: {
    handwritten: "Build · Iterate · Improve",
    image: "/images/process/step3.webp",
    items: [
      { label: "Weekly builds", icon: Code2 },
      { label: "QA & testing", icon: ShieldCheck },
      { label: "Live previews", icon: Eye },
    ],
  },
  launch: {
    handwritten: "Launch & Scale",
    image: "/images/process/step4.webp",
    items: [
      { label: "Production launch", icon: Rocket },
      { label: "Monitoring & optimisation", icon: Activity },
      { label: "Scale & iterate", icon: TrendingUp },
    ],
  },
};

const TIMELINE_STAGES = ["IDEA", "PLAN", "BUILD", "LAUNCH", "IMPACT"];

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const currentStep = hoveredStep !== null ? hoveredStep : activeStep;

  // Scroll-driven progressive activation from 01 -> 02 -> 03 -> 04
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (hoveredStep !== null) return;
      if (latest < 0.25) setActiveStep(0);
      else if (latest < 0.5) setActiveStep(1);
      else if (latest < 0.75) setActiveStep(2);
      else setActiveStep(3);
    });
  }, [scrollYProgress, hoveredStep]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-12 lg:py-6 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-[#FAF9FD] dark:bg-[#04040A] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic ambient background glow following active card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 w-[32rem] h-[22rem] rounded-full bg-gradient-to-r from-[#5424D6]/20 via-[#7138FF]/25 to-[#8B4DFF]/20 blur-3xl transition-all duration-700 ease-out opacity-70 dark:opacity-35 -translate-x-1/2"
        style={{
          left: `${12.5 + currentStep * 25}%`,
        }}
      />

      {/* Subtle orbital background lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(113, 56, 255, 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full flex flex-col justify-between">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-6 sm:pb-10">

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            From idea to{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              intelligence
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto text-slate-600 dark:text-white/60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            A precise, four-step path that turns ambition into deployed, compounding results.
          </motion.p>
        </div>

        {/* Top 3D Isometric Process Flow */}
        <div className="relative mb-4 sm:mb-6">
          {/* Continuous Journey Connecting Wave on Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
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

              {/* Base timeline path: Dip between 1 & 2, Crest between 2 & 3, Dip between 3 & 4 */}
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
                className="transition-all duration-700 ease-out"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: `${1000 - (currentStep / 3) * 1000}`,
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 items-end">
            {steps.map((step, idx) => {
              const meta = STEP_DETAILS[step.id] ?? STEP_DETAILS.discovery;
              const isActive = currentStep === idx;
              const isPast = currentStep > idx;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="relative flex flex-col items-center text-center cursor-pointer group"
                >
                  {/* 3D Isometric Visual Model + Integrated Calligraphy */}
                  <div
                    className={`relative mt-1 w-36 sm:w-44 lg:w-48 xl:w-52 h-24 sm:h-28 lg:h-32 flex items-center justify-center transition-all duration-500 ${
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
                      <Image
                        src={meta.image}
                        alt={`${step.title} visual`}
                        fill
                        sizes="(max-width: 768px) 160px, 200px"
                        className="object-contain transition-transform duration-500"
                        priority={idx < 2}
                      />
                    </div>
                  </div>

              
                </div>
              );
            })}
          </div>
        </div>

        {/* The 4 Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 lg:gap-4">
          {steps.map((step, idx) => {
            const meta = STEP_DETAILS[step.id] ?? STEP_DETAILS.discovery;
            const isActive = currentStep === idx;
            
            return (
              <motion.div
                key={step.id}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "-translate-y-1.5 bg-white dark:bg-white/[0.06] border-[#7138FF]/80 dark:border-[#8B4DFF]/50 shadow-[0_12px_32px_rgba(113,56,255,0.15)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(113,56,255,0.3)]"
                    : "bg-white/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-[#7138FF]/60"
                } backdrop-blur-md border`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] sm:text-xs font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-[#7138FF] dark:text-[#8B4DFF]"
                          : "text-slate-400 dark:text-white/40"
                      }`}
                    >
                      {step.index}
                    </span>
                    {isActive && (
                      <Sparkles className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF] animate-pulse" />
                    )}
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <ul className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                  {meta.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li
                        key={item.label}
                        className={`flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-white/70"
                        }`}
                      >
                        <div
                          className={`size-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-[#7138FF] text-white border-[#7138FF] dark:bg-[#7138FF] dark:border-[#7138FF] shadow-[0_0_8px_rgba(113,56,255,0.35)]"
                              : "bg-[#7138FF]/10 dark:bg-[#7138FF]/20 border-[#7138FF]/20 text-[#7138FF] dark:text-[#8B4DFF]"
                          }`}
                        >
                          <ItemIcon className="size-3" />
                        </div>
                        <span>{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
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

              {/* Track Base + Active Progress Fill */}
              <div className="relative flex-1 h-[1.5px] bg-slate-200/90 dark:bg-white/15 overflow-hidden mx-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#B99CFF] via-[#7138FF] to-[#5424D6] transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>

              {/* End Dot */}
              <span className="size-2 rounded-full bg-[#5424D6] dark:bg-[#7138FF] shadow-[0_0_8px_rgba(84,36,214,0.9)] shrink-0 z-10" />
            </div>

            {/* Stage Labels beneath the line */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-slate-500 dark:text-white/50">
              {TIMELINE_STAGES.map((stage, i) => {
                const isHighlighted = (i / (TIMELINE_STAGES.length - 1)) <= (currentStep / 3);
                return (
                  <span
                    key={stage}
                    className={`transition-colors duration-300 ${
                      isHighlighted
                        ? "font-semibold text-slate-900 dark:text-white"
                        : "text-slate-400 dark:text-white/40"
                    }`}
                  >
                    {stage}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
