import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Was a `"use client"` component wrapping a framer-motion `whileInView` fade.
 *
 * Because four *server* sections import it (bento, integrations, services,
 * faq), that single directive pulled framer-motion (~185 KiB raw) into the
 * client bundle of essentially every page, purely for a fade-up. The reveal is
 * now CSS scroll-driven (`.reveal-on-scroll` in globals.css), so this is a
 * plain server component with no JS cost.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "reveal-on-scroll flex flex-col gap-4",
        align === "center"
          ? "items-center text-center mx-auto max-w-2xl"
          : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-mono-label text-purple-glow">{eyebrow}</span>
      )}
      <h2 className="font-display text-h2 text-balance text-primary">{title}</h2>
      {subtitle && (
        <p className="text-base text-secondary md:text-lg text-pretty">{subtitle}</p>
      )}
    </div>
  );
}
