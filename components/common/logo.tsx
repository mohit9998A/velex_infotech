import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  href?: string;
}

/** Velex crystal mark + wordmark. Pure SVG — no external asset needed. */
export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative inline-flex">
        <svg
          width="34"
          height="34"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="drop-shadow-[0_0_12px_rgba(107,33,255,0.6)] transition-transform duration-500 group-hover:rotate-180"
        >
          <defs>
            <linearGradient id="vx-crystal" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="55%" stopColor="#6B21FF" />
              <stop offset="100%" stopColor="#E4C76B" />
            </linearGradient>
          </defs>
          <path
            d="M16 2 L27 11 L16 30 L5 11 Z"
            fill="url(#vx-crystal)"
            stroke="#F0EEFF"
            strokeOpacity="0.25"
            strokeWidth="0.75"
          />
          <path d="M5 11 H27 M16 2 V30 M11 11 L16 30 L21 11" stroke="#04040A" strokeOpacity="0.35" strokeWidth="0.6" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[1.35rem]/[2.1rem] font-bold tracking-tight text-primary">
          VELEX
          <span className="text-purple-glow">.</span>
        </span>
      )}
    </Link>
  );
}
