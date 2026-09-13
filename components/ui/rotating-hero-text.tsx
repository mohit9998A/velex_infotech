"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  "with Receptionist.",
  "with WhatsApp AI.",
  "with Integrations.",
  "with AI Strategy.",
];

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

  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayWords.length);
    }, interval);

    return () => clearInterval(timer);
  }, [displayWords.length, interval]);

  const currentWord = displayWords[index];

  return (
    <span
      className={cn(
        "relative inline-flex items-baseline overflow-hidden py-2.5 -my-1.5 pr-3 align-baseline whitespace-nowrap transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      <span className="sr-only">
        {displayWords.join(", ")}
      </span>

      {/* Render plain static text before mount so server HTML and first client frame match */}
      {!mounted ? (
        <span className="italic font-serif text-[#7138FF] dark:text-[#8B4DFF] whitespace-nowrap leading-normal">
          {displayWords[0]}
        </span>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentWord}
            initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block italic font-serif text-[#7138FF] dark:text-[#8B4DFF] whitespace-nowrap leading-normal"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
