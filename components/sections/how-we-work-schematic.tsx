"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  layerIndex: number;
  side: "left" | "right";
}

const STEPS: StepItem[] = [
  {
    id: "collect",
    stepNumber: "01",
    title: "COLLECT",
    description: "Import tasks, assets, feedback, and project data into a unified workspace.",
    layerIndex: 0,
    side: "left",
  },
  {
    id: "structure",
    stepNumber: "02",
    title: "STRUCTURE",
    description: "Organize workflows with smart layers, connected systems, and modular components.",
    layerIndex: 1,
    side: "right",
  },
  {
    id: "collaborate",
    stepNumber: "03",
    title: "COLLABORATE",
    description: "Work in real time with comments, approvals, shared boards, and live updates.",
    layerIndex: 2,
    side: "left",
  },
  {
    id: "automate",
    stepNumber: "04",
    title: "AUTOMATE",
    description: "Reduce repetitive work using AI-powered suggestions, automations, and synced actions.",
    layerIndex: 3,
    side: "right",
  },
  {
    id: "deploy",
    stepNumber: "05",
    title: "DEPLOY",
    description: "Turn finalized workflows into production-ready systems and ship faster with confidence.",
    layerIndex: 4,
    side: "left",
  },
];

// Isometric helper functions (standard 2:1 isometric projection)
function isoDiamond(cx: number, cy: number, rx: number, ry: number = rx * 0.5) {
  return `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
}

function isoExtrusion(cx: number, cy: number, rx: number, ry: number, height: number) {
  const leftFace = `${cx - rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + height} ${cx - rx},${cy + height}`;
  const rightFace = `${cx},${cy + ry} ${cx + rx},${cy} ${cx + rx},${cy + height} ${cx},${cy + ry + height}`;
  return { leftFace, rightFace };
}

export function HowWeWorkSchematic() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  // Isometric stack geometry constants
  const width = 500;
  const height = 700;
  const cx = 250;
  const layerYs = [105, 215, 325, 435, 545];
  const rx = 135;
  const ry = 68;
  const thickness = 14;

  const connectors = [
    { side: "left", y: 105, idx: 0 },
    { side: "right", y: 215, idx: 1 },
    { side: "left", y: 325, idx: 2 },
    { side: "right", y: 435, idx: 3 },
    { side: "left", y: 545, idx: 4 },
  ];

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7138FF]/10 dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF] animate-pulse" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
            From idea to{" "}
            <span className="italic text-[#7138FF] dark:text-[#8B4DFF]">
              intelligence
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-white/70 font-sans leading-relaxed">
            Our end-to-end engineering methodology — structured, modular, and built for mission-critical reliability.
          </p>
        </div>

        {/* Blueprint Schematic Container (Theme Adaptable) */}
        <div className="relative rounded-3xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0C0C14] text-slate-900 dark:text-white shadow-[0_20px_60px_rgba(113,56,255,0.06)] dark:shadow-2xl dark:shadow-purple-950/25 overflow-hidden transition-colors duration-500">
          {/* Subtle Ambient Violet Glow behind Central Architecture Stack */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[520px] bg-gradient-to-b from-[#7138FF]/10 dark:from-[#7138FF]/20 via-[#8B4DFF]/10 to-transparent blur-3xl rounded-full opacity-60 dark:opacity-75"
          />

          {/* Desktop & Tablet 3-Column Schematic (md:) */}
          <div className="hidden md:grid md:grid-cols-12 relative z-10 items-stretch min-h-[640px] lg:min-h-[680px]">
            {/* Left Column (3 Steps: COLLECT, COLLABORATE, DEPLOY) */}
            <div className="md:col-span-4 flex flex-col justify-between border-r border-slate-200/90 dark:border-white/[0.08]">
              {/* COLLECT (Step 01) */}
              <div
                onMouseEnter={() => setActiveLayer(0)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cn(
                  "flex-1 p-6 lg:p-8 flex flex-col justify-center border-b border-slate-200/90 dark:border-white/[0.08] transition-all duration-300 cursor-pointer group",
                  activeLayer === 0
                    ? "bg-purple-500/[0.06] dark:bg-white/[0.04]"
                    : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                      activeLayer === 0
                        ? "text-[#7138FF] dark:text-[#B99CFF]"
                        : "text-slate-800 dark:text-white/90 group-hover:text-[#7138FF] dark:group-hover:text-white"
                    )}
                  >
                    COLLECT
                  </span>
                </div>
                <p className="font-sans text-xs lg:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  Import tasks, assets, feedback, and project data into a unified workspace.
                </p>
              </div>

              {/* COLLABORATE (Step 03) */}
              <div
                onMouseEnter={() => setActiveLayer(2)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cn(
                  "flex-1 p-6 lg:p-8 flex flex-col justify-center border-b border-slate-200/90 dark:border-white/[0.08] transition-all duration-300 cursor-pointer group",
                  activeLayer === 2
                    ? "bg-purple-500/[0.06] dark:bg-white/[0.04]"
                    : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                      activeLayer === 2
                        ? "text-[#7138FF] dark:text-[#B99CFF]"
                        : "text-slate-800 dark:text-white/90 group-hover:text-[#7138FF] dark:group-hover:text-white"
                    )}
                  >
                    COLLABORATE
                  </span>
                </div>
                <p className="font-sans text-xs lg:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  Work in real time with comments, approvals, shared boards, and live updates.
                </p>
              </div>

              {/* DEPLOY (Step 05) */}
              <div
                onMouseEnter={() => setActiveLayer(4)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cn(
                  "flex-1 p-6 lg:p-8 flex flex-col justify-center transition-all duration-300 cursor-pointer group",
                  activeLayer === 4
                    ? "bg-purple-500/[0.06] dark:bg-white/[0.04]"
                    : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                      activeLayer === 4
                        ? "text-[#7138FF] dark:text-[#B99CFF]"
                        : "text-slate-800 dark:text-white/90 group-hover:text-[#7138FF] dark:group-hover:text-white"
                    )}
                  >
                    DEPLOY
                  </span>
                </div>
                <p className="font-sans text-xs lg:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  Turn finalized workflows into production-ready systems and ship faster with confidence.
                </p>
              </div>
            </div>

            {/* Center Column: Exploded Isometric Architectural Stack */}
            <div className="md:col-span-4 relative flex items-center justify-center p-2 lg:p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto max-h-[640px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] select-none"
              >
                {/* Embedded dynamic styles supporting both light and dark mode */}
                <style>{`
                  /* Light theme defaults */
                  .iso-plate-top { fill: #FFFFFF; stroke: #D8D2EE; transition: all 0.3s ease; }
                  .iso-plate-left { fill: #F1EDFA; stroke: #D8D2EE; transition: all 0.3s ease; }
                  .iso-plate-right { fill: #E5E0F2; stroke: #C2BACF; transition: all 0.3s ease; }
                  .iso-block-top { fill: #FBF9FF; stroke: #C2BACF; transition: all 0.3s ease; }
                  .iso-block-left { fill: #ECE6F7; stroke: #C2BACF; transition: all 0.3s ease; }
                  .iso-block-right { fill: #DDD6EC; stroke: #B5ABCB; transition: all 0.3s ease; }

                  .iso-conn-line { stroke: #D8D2EE; transition: all 0.3s ease; }
                  .iso-conn-dot { fill: #B5ABCB; transition: all 0.3s ease; }

                  /* Active Layer in Light Theme */
                  .iso-active .iso-plate-top { fill: #F3E8FF; stroke: #7138FF; stroke-width: 2px; }
                  .iso-active .iso-plate-left { fill: #E9D5FF; stroke: #8B4DFF; stroke-width: 2px; }
                  .iso-active .iso-plate-right { fill: #D8B4FE; stroke: #7138FF; stroke-width: 2px; }
                  .iso-active .iso-block-top { fill: #E0C8FF; stroke: #7138FF; stroke-width: 1.6px; }
                  .iso-active .iso-block-left { fill: #C8A2FF; stroke: #8B4DFF; stroke-width: 1.6px; }
                  .iso-active .iso-block-right { fill: #B580FF; stroke: #7138FF; stroke-width: 1.6px; }

                  .iso-active-line { stroke: #7138FF !important; stroke-width: 2px !important; }
                  .iso-active-dot { fill: #7138FF !important; }

                  /* Dark theme overrides */
                  :is(.dark, html.dark *) .iso-plate-top { fill: #191923; stroke: #343444; }
                  :is(.dark, html.dark *) .iso-plate-left { fill: #12121A; stroke: #262633; }
                  :is(.dark, html.dark *) .iso-plate-right { fill: #0D0D13; stroke: #1E1E28; }
                  :is(.dark, html.dark *) .iso-block-top { fill: #232330; stroke: #3B3B4D; }
                  :is(.dark, html.dark *) .iso-block-left { fill: #181822; stroke: #262633; }
                  :is(.dark, html.dark *) .iso-block-right { fill: #101016; stroke: #1E1E28; }

                  :is(.dark, html.dark *) .iso-conn-line { stroke: #2E2E3E; }
                  :is(.dark, html.dark *) .iso-conn-dot { fill: #4A4A5E; }

                  /* Active Layer in Dark Theme */
                  :is(.dark, html.dark *) .iso-active .iso-plate-top { fill: #2A174E; stroke: #B366FF; stroke-width: 2px; }
                  :is(.dark, html.dark *) .iso-active .iso-plate-left { fill: #1E103A; stroke: #8B4DFF; stroke-width: 2px; }
                  :is(.dark, html.dark *) .iso-active .iso-plate-right { fill: #140A28; stroke: #7138FF; stroke-width: 2px; }
                  :is(.dark, html.dark *) .iso-active .iso-block-top { fill: #3B206E; stroke: #B366FF; stroke-width: 1.6px; }
                  :is(.dark, html.dark *) .iso-active .iso-block-left { fill: #26134A; stroke: #8B4DFF; stroke-width: 1.6px; }
                  :is(.dark, html.dark *) .iso-active .iso-block-right { fill: #190B34; stroke: #7138FF; stroke-width: 1.6px; }

                  :is(.dark, html.dark *) .iso-active-line { stroke: #8B4DFF !important; stroke-width: 2px !important; }
                  :is(.dark, html.dark *) .iso-active-dot { fill: #B99CFF !important; }
                `}</style>

                {/* Connector Lines & Indicator Dots */}
                {connectors.map(({ side, y, idx }) => {
                  const isActive = activeLayer === idx;

                  if (side === "left") {
                    return (
                      <g key={`conn-${idx}`}>
                        <line
                          x1="0"
                          y1={y}
                          x2="90"
                          y2={y}
                          className={isActive ? "iso-active-line" : "iso-conn-line"}
                          strokeWidth={isActive ? 2 : 1.2}
                        />
                        <circle
                          cx="90"
                          cy={y}
                          r={isActive ? 4.5 : 3}
                          className={isActive ? "iso-active-dot" : "iso-conn-dot"}
                        />
                      </g>
                    );
                  }
                  return (
                    <g key={`conn-${idx}`}>
                      <line
                        x1="500"
                        y1={y}
                        x2="410"
                        y2={y}
                        className={isActive ? "iso-active-line" : "iso-conn-line"}
                        strokeWidth={isActive ? 2 : 1.2}
                      />
                      <circle
                        cx="410"
                        cy={y}
                        r={isActive ? 4.5 : 3}
                        className={isActive ? "iso-active-dot" : "iso-conn-dot"}
                      />
                    </g>
                  );
                })}

                {/* 5 Stacked Isometric Layers (Bottom to Top) */}
                {[4, 3, 2, 1, 0].map((idx) => {
                  const cy = layerYs[idx];
                  const { leftFace, rightFace } = isoExtrusion(cx, cy, rx, ry, thickness);
                  const isHovered = activeLayer === idx;

                  return (
                    <g
                      key={`layer-${idx}`}
                      onMouseEnter={() => setActiveLayer(idx)}
                      onMouseLeave={() => setActiveLayer(null)}
                      className={cn(
                        "cursor-pointer transition-transform duration-300",
                        isHovered && "iso-active"
                      )}
                      style={{
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                      }}
                    >
                      {/* Base plate left & right faces */}
                      <polygon
                        points={leftFace}
                        className="iso-plate-left"
                        strokeWidth={1.2}
                      />
                      <polygon
                        points={rightFace}
                        className="iso-plate-right"
                        strokeWidth={1.2}
                      />

                      {/* Base plate top face */}
                      <polygon
                        points={isoDiamond(cx, cy, rx, ry)}
                        className="iso-plate-top"
                        strokeWidth={1.4}
                      />

                      {/* Layer Specific Modules */}
                      {idx === 0 && (
                        /* Layer 1: COLLECT (Beveled inner well + central block) */
                        <g>
                          <polygon
                            points={isoDiamond(cx, cy, 75, 37.5)}
                            fill="none"
                            className="iso-plate-top"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                            opacity={0.6}
                          />
                          <polygon
                            points={isoDiamond(cx, cy + 2, 67, 33.5)}
                            className="iso-block-left"
                            strokeWidth="1"
                          />
                          {(() => {
                            const core = isoExtrusion(cx, cy - 6, 38, 19, 10);
                            return (
                              <>
                                <polygon
                                  points={core.leftFace}
                                  className="iso-block-left"
                                  strokeWidth="1"
                                />
                                <polygon
                                  points={core.rightFace}
                                  className="iso-block-right"
                                  strokeWidth="1"
                                />
                                <polygon
                                  points={isoDiamond(cx, cy - 6, 38, 19)}
                                  className="iso-block-top"
                                  strokeWidth={1.4}
                                />
                              </>
                            );
                          })()}
                        </g>
                      )}

                      {idx === 1 && (
                        /* Layer 2: STRUCTURE (4 raised square modules in 2x2 grid) */
                        <g>
                          {[
                            { dx: 0, dy: -24 },
                            { dx: 46, dy: 0 },
                            { dx: 0, dy: 24 },
                            { dx: -46, dy: 0 },
                          ].map((pos, pIdx) => {
                            const bcx = cx + pos.dx;
                            const bcy = cy + pos.dy - 6;
                            const ext = isoExtrusion(bcx, bcy, 30, 15, 10);
                            return (
                              <g key={`b2-${pIdx}`}>
                                <polygon
                                  points={ext.leftFace}
                                  className="iso-block-left"
                                  strokeWidth="1"
                                />
                                <polygon
                                  points={ext.rightFace}
                                  className="iso-block-right"
                                  strokeWidth="1"
                                />
                                <polygon
                                  points={isoDiamond(bcx, bcy, 30, 15)}
                                  className="iso-block-top"
                                  strokeWidth={1.2}
                                />
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {idx === 2 && (
                        /* Layer 3: COLLABORATE (3x3 grid of 9 micro-chips) */
                        <g>
                          {[-1, 0, 1].map((row) =>
                            [-1, 0, 1].map((col) => {
                              const mcx = cx + (col - row) * (35 * 0.7);
                              const mcy = cy + (col + row) * (17.5 * 0.7) - 4;
                              const ext = isoExtrusion(mcx, mcy, 18, 9, 7);
                              return (
                                <g key={`m3-${row}-${col}`}>
                                  <polygon
                                    points={ext.leftFace}
                                    className="iso-block-left"
                                    strokeWidth="0.8"
                                  />
                                  <polygon
                                    points={ext.rightFace}
                                    className="iso-block-right"
                                    strokeWidth="0.8"
                                  />
                                  <polygon
                                    points={isoDiamond(mcx, mcy, 18, 9)}
                                    className="iso-block-top"
                                    strokeWidth="1"
                                  />
                                </g>
                              );
                            })
                          )}
                        </g>
                      )}

                      {idx === 3 && (
                        /* Layer 4: AUTOMATE (4 accelerator blocks with beveled inner cores) */
                        <g>
                          {[
                            { dx: 0, dy: -26 },
                            { dx: 52, dy: 0 },
                            { dx: 0, dy: 26 },
                            { dx: -52, dy: 0 },
                          ].map((pos, pIdx) => {
                            const bcx = cx + pos.dx;
                            const bcy = cy + pos.dy - 6;
                            const ext = isoExtrusion(bcx, bcy, 34, 17, 12);
                            return (
                              <g key={`b4-${pIdx}`}>
                                <polygon
                                  points={ext.leftFace}
                                  className="iso-block-left"
                                  strokeWidth="1.2"
                                />
                                <polygon
                                  points={ext.rightFace}
                                  className="iso-block-right"
                                  strokeWidth="1.2"
                                />
                                <polygon
                                  points={isoDiamond(bcx, bcy, 34, 17)}
                                  className="iso-block-top"
                                  strokeWidth={1.4}
                                />
                                <polygon
                                  points={isoDiamond(bcx, bcy, 17, 8.5)}
                                  fill="none"
                                  className="iso-plate-top"
                                  strokeWidth="0.8"
                                />
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {idx === 4 && (
                        /* Layer 5: DEPLOY (Foundation base pedestal) */
                        <g>
                          {(() => {
                            const sub = isoExtrusion(cx, cy - 8, 110, 55, 12);
                            return (
                              <>
                                <polygon
                                  points={sub.leftFace}
                                  className="iso-block-left"
                                  strokeWidth="1.2"
                                />
                                <polygon
                                  points={sub.rightFace}
                                  className="iso-block-right"
                                  strokeWidth="1.2"
                                />
                                <polygon
                                  points={isoDiamond(cx, cy - 8, 110, 55)}
                                  className="iso-block-top"
                                  strokeWidth={1.4}
                                />
                                <polygon
                                  points={isoDiamond(cx, cy - 8, 60, 30)}
                                  className="iso-plate-left"
                                  strokeWidth="1"
                                />
                              </>
                            );
                          })()}
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Column (2 Steps: STRUCTURE, AUTOMATE with staggered vertical layout) */}
            <div className="md:col-span-4 flex flex-col justify-between border-l border-slate-200/90 dark:border-white/[0.08]">
              {/* Top Spacer Cell (aligned with Collect) */}
              <div className="h-[18%] border-b border-slate-200/90 dark:border-white/[0.08] flex items-center px-6 lg:px-8">
                <span className="font-mono text-[11px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
                  SCHEMATIC // SPEC-02
                </span>
              </div>

              {/* STRUCTURE (Step 02) */}
              <div
                onMouseEnter={() => setActiveLayer(1)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cn(
                  "flex-1 p-6 lg:p-8 flex flex-col justify-center border-b border-slate-200/90 dark:border-white/[0.08] transition-all duration-300 cursor-pointer group",
                  activeLayer === 1
                    ? "bg-purple-500/[0.06] dark:bg-white/[0.04]"
                    : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                      activeLayer === 1
                        ? "text-[#7138FF] dark:text-[#B99CFF]"
                        : "text-slate-800 dark:text-white/90 group-hover:text-[#7138FF] dark:group-hover:text-white"
                    )}
                  >
                    STRUCTURE
                  </span>
                </div>
                <p className="font-sans text-xs lg:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  Organize workflows with smart layers, connected systems, and modular components.
                </p>
              </div>

              {/* AUTOMATE (Step 04) */}
              <div
                onMouseEnter={() => setActiveLayer(3)}
                onMouseLeave={() => setActiveLayer(null)}
                className={cn(
                  "flex-1 p-6 lg:p-8 flex flex-col justify-center border-b border-slate-200/90 dark:border-white/[0.08] transition-all duration-300 cursor-pointer group",
                  activeLayer === 3
                    ? "bg-purple-500/[0.06] dark:bg-white/[0.04]"
                    : "hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300",
                      activeLayer === 3
                        ? "text-[#7138FF] dark:text-[#B99CFF]"
                        : "text-slate-800 dark:text-white/90 group-hover:text-[#7138FF] dark:group-hover:text-white"
                    )}
                  >
                    AUTOMATE
                  </span>
                </div>
                <p className="font-sans text-xs lg:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
                  Reduce repetitive work using AI-powered suggestions, automations, and synced actions.
                </p>
              </div>

              {/* Bottom Spacer Cell (aligned with Deploy) */}
              <div className="h-[18%] flex items-center px-6 lg:px-8">
                <span className="font-mono text-[11px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em]">
                  PRODUCTION READY
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Responsive Layout (md:hidden) */}
          <div className="md:hidden flex flex-col divide-y divide-slate-200/90 dark:divide-white/[0.08] p-4 sm:p-6">
            {/* Miniature Isometric Stack Preview */}
            <div className="py-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height}`}
                className="w-full max-w-[280px] h-auto drop-shadow-lg"
              >
                {[4, 3, 2, 1, 0].map((idx) => {
                  const cy = layerYs[idx];
                  const { leftFace, rightFace } = isoExtrusion(cx, cy, rx, ry, thickness);
                  const isHovered = activeLayer === idx;

                  return (
                    <g
                      key={`mob-layer-${idx}`}
                      onClick={() => setActiveLayer(idx === activeLayer ? null : idx)}
                      className={cn(isHovered && "iso-active")}
                    >
                      <polygon points={leftFace} className="iso-plate-left" strokeWidth={1} />
                      <polygon points={rightFace} className="iso-plate-right" strokeWidth={1} />
                      <polygon points={isoDiamond(cx, cy, rx, ry)} className="iso-plate-top" strokeWidth={1.2} />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 5 Sequential Steps */}
            {STEPS.map((step) => {
              const isActive = activeLayer === step.layerIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveLayer(isActive ? null : step.layerIndex)}
                  className={cn(
                    "py-4.5 px-3 transition-colors rounded-xl cursor-pointer",
                    isActive
                      ? "bg-purple-500/[0.08] dark:bg-white/[0.04]"
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "size-2 rounded-full transition-colors",
                          isActive
                            ? "bg-[#7138FF] dark:bg-[#8B4DFF]"
                            : "bg-slate-300 dark:bg-slate-600"
                        )}
                      />
                      <span
                        className={cn(
                          "font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors",
                          isActive
                            ? "text-[#7138FF] dark:text-[#B99CFF]"
                            : "text-slate-800 dark:text-white"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#7138FF] dark:text-[#8B4DFF]/70">
                      PHASE {step.stepNumber}
                    </span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400 pl-4.5">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
