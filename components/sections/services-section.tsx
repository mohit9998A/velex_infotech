"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Activity,
  Cpu,
  Zap,
  BarChart3,
  Database,
  ShieldCheck,
  Bot,
  Layers,
  Workflow,
  BrainCircuit,
  AudioLines,
  MessagesSquare,
  Globe,
  Code2,
  Flame,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

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
  allServices.find((s) => s.slug === slug)
).filter(Boolean) as ServiceItem[];

// Color palettes for micro1-style visual customization
const SERVICE_THEMES: Record<
  string,
  {
    accent: string;
    accentLight: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    metrics: { label: string; value: string; height: string; color: string }[];
  }
> = {
  "ai-automation": {
    accent: "#60A5FA",
    accentLight: "#2563EB",
    glow: "rgba(96, 165, 250, 0.25)",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    badgeText: "AI AUTOMATION PLATFORM",
    metrics: [
      { label: "Accuracy", value: "99.8%", height: "85%", color: "from-blue-400 to-indigo-600" },
      { label: "Speedup", value: "12x", height: "92%", color: "from-amber-400 to-orange-500" },
      { label: "Success", value: "99.4%", height: "80%", color: "from-emerald-400 to-teal-500" },
      { label: "Uptime", value: "99.9%", height: "95%", color: "from-sky-400 to-blue-600" },
    ],
  },
  "agentic-ai": {
    accent: "#A78BFA",
    accentLight: "#7C3AED",
    glow: "rgba(167, 139, 250, 0.25)",
    badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    badgeText: "AUTONOMOUS AGENT ENGINE",
    metrics: [
      { label: "Reasoning", value: "99.2%", height: "88%", color: "from-purple-400 to-violet-600" },
      { label: "Guardrail", value: "100%", height: "98%", color: "from-emerald-400 to-teal-500" },
      { label: "Task Pass", value: "98.7%", height: "78%", color: "from-blue-400 to-indigo-500" },
      { label: "Autonomy", value: "99.6%", height: "92%", color: "from-fuchsia-400 to-purple-600" },
    ],
  },
  "ai-receptionist": {
    accent: "#F472B6",
    accentLight: "#E11D48",
    glow: "rgba(244, 114, 182, 0.25)",
    badgeBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    badgeText: "VOICE AGENT & RECEPTION",
    metrics: [
      { label: "Latency", value: "320ms", height: "94%", color: "from-pink-400 to-rose-600" },
      { label: "Clarity", value: "99.5%", height: "90%", color: "from-purple-400 to-indigo-500" },
      { label: "Booking", value: "97.8%", height: "82%", color: "from-amber-400 to-orange-500" },
      { label: "24/7 Cover", value: "100%", height: "100%", color: "from-emerald-400 to-teal-600" },
    ],
  },
  "whatsapp-bot": {
    accent: "#34D399",
    accentLight: "#059669",
    glow: "rgba(52, 211, 153, 0.25)",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    badgeText: "WHATSAPP OFFICIAL API",
    metrics: [
      { label: "Open Rate", value: "98.4%", height: "96%", color: "from-emerald-400 to-green-600" },
      { label: "Instant Res", value: "92.1%", height: "84%", color: "from-teal-400 to-emerald-500" },
      { label: "Lead Sync", value: "100%", height: "100%", color: "from-cyan-400 to-blue-600" },
      { label: "Conversion", value: "4.2x", height: "88%", color: "from-amber-400 to-emerald-600" },
    ],
  },
  "web-development": {
    accent: "#38BDF8",
    accentLight: "#0284C7",
    glow: "rgba(56, 189, 248, 0.25)",
    badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    badgeText: "LUXURY MOTION WEB",
    metrics: [
      { label: "Lighthouse", value: "100", height: "100%", color: "from-emerald-400 to-teal-500" },
      { label: "LCP Speed", value: "0.6s", height: "95%", color: "from-sky-400 to-blue-600" },
      { label: "SEO Rating", value: "100%", height: "98%", color: "from-indigo-400 to-purple-500" },
      { label: "Conversion", value: "+45%", height: "86%", color: "from-purple-400 to-pink-500" },
    ],
  },
  "software-development": {
    accent: "#2DD4BF",
    accentLight: "#0D9488",
    glow: "rgba(45, 212, 191, 0.25)",
    badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    badgeText: "ENTERPRISE SOFTWARE ENGINE",
    metrics: [
      { label: "SLA Uptime", value: "99.99%", height: "99%", color: "from-teal-400 to-emerald-600" },
      { label: "API Speed", value: "14ms", height: "92%", color: "from-cyan-400 to-blue-600" },
      { label: "Zero-Bug", value: "99.1%", height: "85%", color: "from-indigo-400 to-violet-600" },
      { label: "Scale Cap", value: "100k/s", height: "96%", color: "from-emerald-400 to-teal-600" },
    ],
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
        <div className="sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full flex flex-col justify-between py-2 sm:py-4 overflow-hidden z-10">
          
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
            <div className="text-center max-w-3xl mx-auto shrink-0 pt-0.5 sm:pt-1">
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
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#7138FF] dark:group-hover:text-[#8B4DFF] transition-colors">
                          {activeService.title}
                        </h3>
                        <ChevronRight className="size-6 text-[#7138FF] dark:text-[#8B4DFF] transition-transform group-hover:translate-x-1.5" />
                      </Link>
                    </div>

                    {/* Tagline & Description */}
                    <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 dark:text-white/80 leading-relaxed font-normal">
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
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-sans text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 transition-all shadow-md dark:shadow-xl hover:scale-102 cursor-pointer"
                      >
                        Start a project
                        <ArrowUpRight className="size-4" />
                      </button>

                      <Link
                        href={activeService.href}
                        onMouseEnter={prefetchLeadForm}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 dark:text-white/80 dark:hover:text-white underline underline-offset-4 decoration-slate-300 hover:decoration-slate-950 dark:decoration-white/30 dark:hover:decoration-white transition-colors"
                      >
                        Explore capability
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT COLUMN: Pinned 3D Visual Replacing in Place (Reduced Compact Size) */}
              <div className="lg:col-span-6 relative flex justify-center items-center py-1 lg:py-0">
                <div className="w-full max-w-[450px] lg:max-w-[480px] [perspective:1200px]">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlug}
                      initial={{ opacity: 0, rotateX: 12, rotateY: -7, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, rotateX: 6, rotateY: -4, y: 0, scale: 1 }}
                      exit={{ opacity: 0, rotateX: 3, rotateY: -1, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative rounded-2xl p-4 sm:p-5 bg-white/90 dark:bg-[#090C15]/90 border border-slate-200/90 dark:border-white/15 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.8)_inset] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] transform-gpu transition-all hover:[transform:rotateX(3deg)_rotateY(-2deg)]"
                    >
                      {/* Visual Header */}
                      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200/80 dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="relative flex size-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                          </span>
                          <span className="font-mono text-[11px] text-slate-500 dark:text-white/80 tracking-wide uppercase">
                            Node: <span className="text-slate-900 dark:text-white font-semibold">{activeService.slug}.velex.ai</span>
                          </span>
                        </div>

                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded-md border font-semibold ${theme.badgeBg}`}>
                          {theme.badgeText}
                        </span>
                      </div>

                      {/* UPPER 3D METRICS CHART */}
                      <div className="my-2.5 sm:my-3 p-2.5 sm:p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-xs dark:shadow-lg relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-800 dark:text-white/90">
                            <BarChart3 className="size-3 text-purple-600 dark:text-purple-400" />
                            <span>Accuracy & Completion Metrics</span>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Real-time SLA
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 items-end h-16 sm:h-18 pt-1 pb-0.5 px-1 border-b border-slate-200/80 dark:border-white/10">
                          {theme.metrics.map((m, idx) => (
                            <div key={m.label} className="flex flex-col items-center h-full justify-end group/bar">
                              <span className="font-mono text-[10px] font-bold text-slate-800 dark:text-white mb-0.5 opacity-90 group-hover/bar:scale-110 transition-transform">
                                {m.value}
                              </span>
                              <div className="w-full bg-slate-200/60 dark:bg-white/5 rounded-t-md h-11 sm:h-12 relative overflow-hidden flex items-end">
                                <motion.div
                                  initial={{ height: "0%" }}
                                  animate={{ height: m.height }}
                                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                                  className={`w-full bg-gradient-to-t ${m.color} rounded-t-sm shadow-[0_0_10px_rgba(147,51,234,0.3)]`}
                                />
                              </div>
                              <span className="font-mono text-[8.5px] text-slate-500 dark:text-white/50 uppercase tracking-tighter mt-1 truncate max-w-full">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* LOWER MAIN BOARD RENDER */}
                      <div className="rounded-xl p-2.5 sm:p-3 bg-slate-100/70 dark:bg-black/50 border border-slate-200/80 dark:border-white/10 relative overflow-hidden">
                        <div className="relative min-h-[125px] sm:min-h-[135px] flex flex-col justify-between">
                          
                          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-white/70 font-mono pb-1.5 sm:pb-2 border-b border-slate-200/80 dark:border-white/10">
                            <div className="flex items-center gap-1.5">
                              <Activity className="size-3 text-purple-600 dark:text-purple-400 animate-pulse" />
                              <span>Execution Engine</span>
                            </div>
                            <span className="text-slate-400 dark:text-white/50 text-[10px]">Production Ready</span>
                          </div>

                          <div className="py-2">
                            {activeSlug === "ai-automation" && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-1.5">
                                  <div className="p-1.5 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-center shadow-xs dark:shadow-none">
                                    <span className="text-[9px] text-slate-500 dark:text-white/50 font-mono block">Inbound</span>
                                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">Webhook</span>
                                  </div>
                                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-center">
                                    <span className="text-[9px] text-blue-600 dark:text-blue-300 font-mono block">Reasoning</span>
                                    <span className="text-[11px] font-mono font-bold text-slate-900 dark:text-white">LLM Extract</span>
                                  </div>
                                  <div className="p-1.5 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-center shadow-xs dark:shadow-none">
                                    <span className="text-[9px] text-slate-500 dark:text-white/50 font-mono block">Action</span>
                                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">CRM Sync</span>
                                  </div>
                                </div>
                                <div className="p-1.5 bg-white/80 dark:bg-white/[0.03] rounded-lg border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-700 dark:text-white/80">
                                  <span>Throughput: <strong className="text-slate-900 dark:text-white">1,480 ops/min</strong></span>
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Error: 0.00%</span>
                                </div>
                              </div>
                            )}

                            {activeSlug === "agentic-ai" && (
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1">
                                      <BrainCircuit className="size-3.5" /> Multi-Agent Swarm
                                    </span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">Active</span>
                                  </div>
                                  <div className="w-full bg-slate-200/80 dark:bg-black/60 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-400 to-indigo-500 h-full w-[94%]" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                                  <div className="p-1.5 bg-white dark:bg-white/[0.03] rounded-lg border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-none">
                                    <span className="text-slate-500 dark:text-white/50 block text-[9px]">Decision</span>
                                    <span className="text-slate-900 dark:text-white font-semibold">Autonomous API</span>
                                  </div>
                                  <div className="p-1.5 bg-white dark:bg-white/[0.03] rounded-lg border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-none">
                                    <span className="text-slate-500 dark:text-white/50 block text-[9px]">Verification</span>
                                    <span className="text-purple-700 dark:text-purple-300 font-semibold">Traceable Audit</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeSlug === "ai-receptionist" && (
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <AudioLines className="size-4 text-pink-600 dark:text-pink-400 animate-pulse" />
                                    <div>
                                      <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Voice Agent</span>
                                      <span className="text-[9px] text-pink-700 dark:text-pink-300 font-mono">English + Hindi</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-white dark:bg-black/40 border border-slate-200/60 dark:border-transparent px-1.5 py-0.5 rounded">320ms</span>
                                </div>
                                <div className="flex items-center gap-0.5 h-6 px-2 bg-white/80 dark:bg-white/[0.03] rounded-lg border border-slate-200/80 dark:border-white/10">
                                  {[40, 85, 30, 95, 60, 100, 75, 45, 90, 50, 80, 65, 95, 40, 70].map((h, i) => (
                                    <div
                                      key={i}
                                      className="flex-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full"
                                      style={{ height: `${h}%` }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {activeSlug === "whatsapp-bot" && (
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <MessagesSquare className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    <div>
                                      <span className="text-[11px] font-bold text-slate-900 dark:text-white block">WhatsApp Business API</span>
                                      <span className="text-[9px] text-emerald-700 dark:text-emerald-300 font-mono">Meta Verified</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-transparent">Active</span>
                                </div>
                                <div className="p-1.5 bg-white/80 dark:bg-white/[0.03] rounded-lg border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[10px] font-mono">
                                  <span className="text-slate-600 dark:text-white/70">Resolution: <strong className="text-emerald-600 dark:text-emerald-400">92%</strong></span>
                                  <span className="text-slate-600 dark:text-white/70">CRM Sync: <strong className="text-sky-600 dark:text-sky-400">Instant</strong></span>
                                </div>
                              </div>
                            )}

                            {activeSlug === "web-development" && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-1.5">
                                  <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-center">
                                    <span className="text-[9px] text-sky-700 dark:text-sky-300 font-mono block">Performance</span>
                                    <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">100</span>
                                  </div>
                                  <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-center">
                                    <span className="text-[9px] text-purple-700 dark:text-purple-300 font-mono block">Accessibility</span>
                                    <span className="text-sm font-mono font-bold text-purple-700 dark:text-purple-300">100</span>
                                  </div>
                                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-center">
                                    <span className="text-[9px] text-indigo-700 dark:text-indigo-300 font-mono block">SEO Score</span>
                                    <span className="text-sm font-mono font-bold text-sky-600 dark:text-sky-400">100</span>
                                  </div>
                                </div>
                                <div className="p-1.5 bg-white/80 dark:bg-white/[0.03] rounded-lg border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-700 dark:text-white/80">
                                  <span>LCP: <strong className="text-emerald-600 dark:text-emerald-400">0.6s</strong></span>
                                  <span>FID: <strong className="text-emerald-600 dark:text-emerald-400">&lt;10ms</strong></span>
                                  <span>CLS: <strong className="text-emerald-600 dark:text-emerald-400">0.00</strong></span>
                                </div>
                              </div>
                            )}

                            {activeSlug === "software-development" && (
                              <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Code2 className="size-4 text-teal-600 dark:text-teal-400" />
                                    <div>
                                      <span className="text-[11px] font-bold text-slate-900 dark:text-white block">Enterprise Architecture</span>
                                      <span className="text-[9px] text-teal-700 dark:text-teal-300 font-mono">SOC-2 Aligned</span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-[10px] text-teal-700 dark:text-teal-300 font-bold bg-teal-100 dark:bg-teal-500/20 px-1.5 py-0.5 rounded border border-teal-200 dark:border-transparent">99.99% SLA</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                                  <div className="p-1.5 bg-white dark:bg-white/[0.03] rounded-lg border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-none">
                                    <span className="text-slate-500 dark:text-white/50 block text-[9px]">API Latency</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">14ms Avg</span>
                                  </div>
                                  <div className="p-1.5 bg-white dark:bg-white/[0.03] rounded-lg border border-slate-200/90 dark:border-white/10 shadow-xs dark:shadow-none">
                                    <span className="text-slate-500 dark:text-white/50 block text-[9px]">Deployments</span>
                                    <span className="text-teal-700 dark:text-teal-300 font-semibold">Zero Downtime</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-white/50">
                            <span>Model agreement: <strong className="text-slate-800 dark:text-white/90">99.9%</strong></span>
                            <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                              <ShieldCheck className="size-3 text-purple-600 dark:text-purple-400" /> Enterprise Guardrails
                            </span>
                          </div>

                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>

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
