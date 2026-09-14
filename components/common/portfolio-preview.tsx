"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/types";
import {
  useHasFinePointer,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";

/**
 * Logical viewport the iframe renders at before being scaled to fit the card.
 * Framing at a real desktop width is the whole point — at the card's true width
 * (~400px) the embedded site would switch to its mobile breakpoint, which looks
 * wrong inside a desktop browser mock. Matches the poster capture viewport in
 * scripts/capture-portfolio-posters.mjs.
 */
const DEFAULT_FRAME_WIDTH = 1440;
/** 16:10 — the cover aspect, the frame aspect, and the capture aspect. */
const FRAME_RATIO = 0.625;
/**
 * How long to keep the poster up after the frame's load event.
 *
 * Every one of these sites runs an intro sequence that finishes long after
 * `load` fires, so swapping on `load` alone shows a blank white frame or a
 * splash screen. Measured in a real embed: DAUR was still on its loading
 * screen at 4s and settled around 8s; FabXpert was mid-logo-intro at 8s;
 * Ground Zero painted nothing until roughly 10-15s. Per-site values live in
 * `preview.settleMs` in content/portfolio.json.
 *
 * A visitor who moves on before this elapses simply keeps the screenshot,
 * which is the intended graceful outcome — they never see a half-built page.
 */
const DEFAULT_SETTLE_MS = 4000;

function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/**
 * The "browser window" at the top of a portfolio card: chrome bar plus the
 * cover viewport.
 *
 * Items with a `preview` show a committed screenshot, and — when `isLive` and
 * the visitor is on a mouse-driven device — swap in the real site in an iframe.
 * Items without one keep the original gradient cover.
 */
export function PortfolioPreview({
  item,
  isLive,
}: {
  item: PortfolioItem;
  isLive: boolean;
}) {
  const { preview } = item;
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [settled, setSettled] = useState(false);
  // Reveal embed as soon as iframe loads or settle timer finishes
  const frameReady = frameLoaded || settled;

  const frameWidth = preview?.frameWidth ?? DEFAULT_FRAME_WIDTH;
  const frameUrl = preview?.url ?? item.href;
  const canGoLive = Boolean(
    preview?.mode === "live" && frameUrl && !reducedMotion,
  );
  const showFrame = canGoLive && isLive;

  // The frame is a fixed 1440px wide; scale it to whatever the card measures.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !canGoLive) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / frameWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [canGoLive, frameWidth]);

  // Start the settle clock when the embed mounts, and reset both flags when it
  // goes away so re-hovering cross-fades again rather than snapping.
  useEffect(() => {
    if (!showFrame) {
      setFrameLoaded(false);
      setSettled(false);
      return;
    }
    const timer = setTimeout(
      () => setSettled(true),
      preview?.settleMs ?? DEFAULT_SETTLE_MS,
    );
    return () => clearTimeout(timer);
  }, [showFrame, preview?.settleMs]);

  const label =
    item.external && item.href ? domainOf(item.href) : "case-study · confidential";

  return (
    <div className="border-b border-vx-border">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 bg-void/40 px-3 py-2.5">
        <span className="size-2 shrink-0 rounded-full bg-error/70" />
        <span className="size-2 shrink-0 rounded-full bg-warning/70" />
        <span className="size-2 shrink-0 rounded-full bg-success/70" />
        <span className="ml-2 truncate font-mono text-xs text-secondary">
          {label}
        </span>
        {frameReady && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-success">
            <span className="size-1.5 rounded-full bg-success" />
            LIVE
          </span>
        )}
      </div>

      {/* Viewport */}
      <div
        ref={viewportRef}
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          preview ? "bg-elevated" : cn("bg-gradient-to-br", item.accent),
        )}
      >
        {/* Hover Overlay Badge */}
        {item.external && item.href && (
          <div className="pointer-events-none absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] opacity-0 group-hover/media:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
            <div className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-950/90 text-white dark:bg-white dark:text-slate-950 border border-white/20 dark:border-slate-800 font-mono text-xs font-semibold shadow-2xl transition-transform duration-300 scale-90 group-hover/media:scale-100">
              <span>Click to open project</span>
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        )}
        {preview ? (
          <>
            <Image
              src={preview.poster}
              alt={`${item.client} website homepage`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover object-top transition-opacity duration-500",
                frameReady ? "opacity-0" : "opacity-100",
              )}
            />
            {showFrame && scale > 0 && (
              <iframe
                src={frameUrl!}
                title={`Live preview of ${item.client}`}
                loading="lazy"
                tabIndex={-1}
                aria-hidden
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setFrameLoaded(true)}
                style={{
                  width: frameWidth,
                  height: Math.round(frameWidth * FRAME_RATIO),
                  transform: `scale(${scale})`,
                }}
                // pointer-events-none keeps the card clickable and stops the
                // embed from swallowing wheel events away from Lenis.
                className={cn(
                  "pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500",
                  frameReady ? "opacity-100" : "opacity-0",
                )}
              />
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-x-0 bottom-0 flex items-end p-4">
              <span className="font-display text-2xl text-white/90 drop-shadow">
                {item.client}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
