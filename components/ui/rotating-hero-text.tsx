"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RotatingHeroTextProps {
  words?: string[];
  includeWithPrefix?: boolean;
  interval?: number;
  className?: string;
}

const DEFAULT_WORDS = [
  "forward.",
  "with AI Agents.",
  "with Automation.",
  "with AI Receptionist.",
  "with WhatsApp AI.",
  "with Integrations.",
  "with AI Strategy.",
];

interface ReelState {
  /** Line of the reel in view. `words.length` is the duplicate first word. */
  step: number;
  /** Real rotations so far; its parity re-triggers the blur keyframes. */
  ticks: number;
  /** One frame with transitions off, to jump from the duplicate back to 0. */
  snapping: boolean;
}

/**
 * The rotating word at the end of the hero headline.
 *
 * Built as a "reel": every word sits on its own line of ONE text block, the
 * wrapper clips it to a single line, and a rotation is a compositor-only
 * `transform` (plus a short `filter: blur()` pulse, also compositor-run).
 *
 * Why not one element per word (the previous framer-motion
 * `AnimatePresence` version):
 *  - Each newly mounted word was a brand-new text node, and therefore a new
 *    Largest Contentful Paint candidate. The longer words are bigger than the
 *    hero lede, so desktop LCP was reported at the moment of a rotation
 *    (4.36 s in a lab run) instead of at first paint. Here the reel is painted
 *    once at load with only its first line visible, and moving it never
 *    creates a new candidate.
 *  - It re-rendered through React and motion every 2.8 s forever, including
 *    while the hero was scrolled out of view or the tab was hidden; this one
 *    pauses in both cases.
 *  - `mode="popLayout"` measured layout on every swap, and the wrapper width
 *    changed with every word. The wrapper is now sized once, to the widest
 *    word, by an invisible stack of all of them.
 *
 * Screen readers get the full list once (sr-only); the visual reel is hidden
 * from them so the current word is not announced twice.
 */
export function RotatingHeroText({
  words = DEFAULT_WORDS,
  includeWithPrefix = false,
  interval = 2800,
  className,
}: RotatingHeroTextProps) {
  const displayWords = includeWithPrefix
    ? words.map((w) =>
        w.toLowerCase().startsWith("forward") || w.toLowerCase().startsWith("with ")
          ? w
          : `with ${w}`
      )
    : words;
  const count = displayWords.length;
  // Duplicate of the first word at the end, so the loop always moves upward.
  const reel = [...displayWords, displayWords[0] ?? ""];

  const [{ step, ticks, snapping }, setReel] = useState<ReelState>({
    step: 0,
    ticks: 0,
    snapping: false,
  });
  const rootRef = useRef<HTMLSpanElement>(null);

  // Advance every `interval` ms — but only while the headline is on screen
  // and the tab is visible.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || count < 2) return;

    let timer: number | undefined;
    let onScreen = false;
    const sync = () => {
      const run = onScreen && document.visibilityState === "visible";
      if (run && timer === undefined) {
        timer = window.setInterval(() => {
          setReel((s) => ({ step: s.step + 1, ticks: s.ticks + 1, snapping: false }));
        }, interval);
      } else if (!run && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [count, interval]);

  // After the jump back to line 0 has been painted without a transition,
  // switch transitions back on (two frames: one to commit, one to paint).
  useEffect(() => {
    if (!snapping) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setReel((s) => ({ ...s, snapping: false })));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [snapping]);

  const reelStyle = {
    "--rht-step": step,
    transition: snapping ? "none" : undefined,
    animationName: ticks === 0 ? "none" : ticks % 2 ? "rht-blur-a" : "rht-blur-b",
  } as CSSProperties;

  return (
    <span
      ref={rootRef}
      className={cn(
        "relative inline-grid overflow-hidden py-2.5 -my-1.5 pr-3 align-baseline whitespace-nowrap",
        className,
      )}
    >
      <span className="sr-only">{displayWords.join(", ")}</span>

      {/* Sizer: every word, invisible and stacked in one cell, so the box is
          exactly one line tall and as wide as the widest word. */}
      {displayWords.map((w) => (
        <span
          key={w}
          aria-hidden="true"
          className="invisible [grid-area:1/1] italic font-serif leading-normal"
        >
          {w}
        </span>
      ))}

      {/* The reel: one block, one text run per line. Its box is held to one
          line (`h-[1lh]`); the other lines overflow below and are clipped by
          the wrapper. */}
      <span
        aria-hidden="true"
        className="rht-reel [grid-area:1/1] h-[1lh] italic font-serif leading-normal text-[#7138FF] dark:text-[#8B4DFF]"
        style={reelStyle}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
          if (step >= count) setReel((s) => ({ ...s, step: 0, snapping: true }));
        }}
      >
        {reel.map((w, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {w}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
