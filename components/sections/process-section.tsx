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
        className="pointer-events-none absolute top-1/4 w-[32rem] h-[22rem] rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-pink-500/15 blur-3xl transition-all duration-700 ease-out opacity-70 dark:opacity-35 -translate-x-1/2"
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
            "radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full flex flex-col justify-between">
        {/* Header */}
        <div className="relative text-center max-w-3xl mx-auto pb-4 sm:pb-6">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center justify-center gap-2.5 mb-1.5 sm:mb-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="h-[1.5px] w-5 sm:w-8 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
              aria-hidden="true"
            />
            <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0055FF] dark:text-[#3B82F6]">
              HOW WE WORK
            </span>
            <span
              className="h-[1.5px] w-5 sm:w-8 rounded-full bg-[#0055FF] dark:bg-[#3B82F6]"
              aria-hidden="true"
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-medium tracking-tight leading-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            From idea to{" "}
            <span className="italic bg-gradient-to-r from-[#0055FF] via-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent">
              intelligence
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-sans text-xs sm:text-sm leading-normal mt-1 sm:mt-1.5 max-w-xl mx-auto text-slate-600 dark:text-white/60"
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
              viewBox="0 0 1200 160"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="journey-base-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="journey-active-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#D946EF" />
                </linearGradient>
              </defs>

              {/* Base timeline path */}
              <path
                d="M 150 95 C 300 115, 300 75, 450 95 C 600 115, 600 75, 750 95 C 900 115, 900 75, 1050 95"
                stroke="url(#journey-base-line)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />

              {/* Illuminated timeline path up to current step */}
              <path
                d="M 150 95 C 300 115, 300 75, 450 95 C 600 115, 600 75, 750 95 C 900 115, 900 75, 1050 95"
                stroke="url(#journey-active-glow)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
                style={{
                  strokeDasharray: "1200",
                  strokeDashoffset: `${1200 - ((currentStep + 1) / 4) * 1200}`,
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
                  {/* Step Pill */}
                  <span
                    className={`mb-1 size-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.6)] scale-110"
                        : isPast
                        ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/40"
                        : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-white/50 border border-slate-300/60 dark:border-white/10"
                    }`}
                  >
                    {step.index}
                  </span>

                  {/* 3D Isometric Visual Model + Integrated Calligraphy */}
                  <div
                    className={`relative mt-1 w-36 sm:w-44 lg:w-48 xl:w-52 h-24 sm:h-28 lg:h-32 flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "scale-105 filter drop-shadow-[0_8px_20px_rgba(147,51,234,0.25)]"
                        : "opacity-85 hover:opacity-100"
                    }`}
                  >
                    {/* Glowing pedestal halo */}
                    <div
                      className={`absolute inset-x-2 bottom-1 h-5 blur-lg rounded-full pointer-events-none transition-all duration-500 ${
                        isActive
                          ? "bg-purple-500/35 dark:bg-purple-500/45 scale-110"
                          : "bg-purple-500/15 dark:bg-purple-500/20"
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

                  {/* Connecting Node on Desktop */}
                  <div className="hidden lg:flex items-center justify-center mt-1.5 h-3">
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="absolute size-3.5 rounded-full bg-purple-500/40 animate-ping" />
                      )}
                      <span
                        className={`size-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "size-2.5 bg-purple-600 dark:bg-purple-400 ring-2 ring-purple-500/25"
                            : isPast
                            ? "bg-purple-500 dark:bg-purple-400"
                            : "bg-slate-300 dark:bg-white/30"
                        }`}
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
                    ? "-translate-y-1.5 bg-white dark:bg-white/[0.06] border-purple-400/80 dark:border-purple-400/50 shadow-[0_12px_32px_rgba(107,33,255,0.1)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(107,33,255,0.25)]"
                    : "bg-white/70 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-purple-300/60"
                } backdrop-blur-md border`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-slate-400 dark:text-white/40"
                      }`}
                    >
                      {step.index}
                    </span>
                    {isActive && (
                      <Sparkles className="size-3 text-purple-600 dark:text-purple-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-xs text-slate-600 dark:text-white/70 leading-snug line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <ul className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                  {meta.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li
                        key={item.label}
                        className={`flex items-center gap-2 text-[11px] font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-white/70"
                        }`}
                      >
                        <div
                          className={`size-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-purple-600 text-white border-purple-600 dark:bg-purple-500 dark:border-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.3)]"
                              : "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/20 text-purple-600 dark:text-purple-400"
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
        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 dark:text-white/50">
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-white/40">
            A SMARTER TOMORROW
          </span>

          {/* Central Pipeline Track */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-slate-600 dark:text-white/60">
            {TIMELINE_STAGES.map((stage, i) => {
              const isHighlighted = i <= currentStep + 1;
              return (
                <div key={stage} className="flex items-center gap-2 sm:gap-3">
                  <span
                    className={`transition-colors duration-300 ${
                      isHighlighted
                        ? "font-semibold text-slate-900 dark:text-white"
                        : "text-slate-400 dark:text-white/40"
                    } ${
                      i === TIMELINE_STAGES.length - 1
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {stage}
                  </span>
                  {i < TIMELINE_STAGES.length - 1 && (
                    <>
                      <span
                        className={`h-[1px] w-4 sm:w-6 transition-colors duration-300 ${
                          i <= currentStep
                            ? "bg-purple-500 dark:bg-purple-400"
                            : "bg-slate-300 dark:bg-white/20"
                        }`}
                      />
                      <span
                        className={`size-1.5 rounded-full transition-colors duration-300 ${
                          i <= currentStep
                            ? "bg-purple-600 dark:bg-purple-400"
                            : "bg-slate-300 dark:bg-white/20"
                        }`}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 dark:text-white/40">
            BUILT FOR WHAT&apos;S NEXT
          </span>
        </div>
      </div>
    </section>
  );
}
