"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
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
    </motion.div>
  );
}
