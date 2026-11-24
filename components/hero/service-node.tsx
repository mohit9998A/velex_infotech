"use client";

import { memo } from "react";
import type { ServiceShowcaseItem } from "@/config/service-showcase";
import { ServiceIcon } from "@/components/hero/service-icons";
import { cn } from "@/lib/utils";

interface ServiceNodeProps {
  service: ServiceShowcaseItem;
  isActive: boolean;
  isFocused: boolean;
  xPercent: number; // 0-100% position in orbit container
  yPercent: number; // 0-100% position in orbit container
  floatDelaySec: number;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ServiceNode = memo(function ServiceNode({
  service,
  isActive,
  isFocused,
  xPercent,
  yPercent,
  floatDelaySec,
  onHover,
  onLeave,
  onClick,
}: ServiceNodeProps) {
  return (
    <div
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        animationDelay: `${floatDelaySec}s`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-300 pointer-events-auto"
    >
      {/* Gentle floating keyframe container */}
      <div
        className={cn(
          "relative group transition-all duration-300 cursor-pointer select-none",
          "animate-float-subtle"
        )}
        style={{
          animationDelay: `${floatDelaySec}s`,
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`${service.title} - Service ${service.number}`}
        aria-pressed={isActive}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Luminous Signature Ambient Halo behind Node */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-3.5 rounded-[28px] transition-all duration-500",
            isActive
              ? "opacity-100 scale-125 blur-md"
              : "opacity-35 group-hover:opacity-85 scale-95 group-hover:scale-115 blur-sm"
          )}
          style={{
            background: isActive
              ? `radial-gradient(circle, ${service.accentColor}55 0%, ${service.accentColor}20 50%, transparent 75%)`
              : `radial-gradient(circle, ${service.accentColor}30 0%, transparent 70%)`,
          }}
        />

        {/* Pulsing energy ping ring when robot focuses on this node */}
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-[22px] animate-ping opacity-60 pointer-events-none"
            style={{
              border: `1.5px solid ${service.accentColor}`,
            }}
          />
        )}

        {/* Luxury Modern Squircle Satellite Node */}
        <div
          className={cn(
            "relative flex items-center justify-center transition-all duration-300",
            "size-9 sm:size-12 md:size-14 lg:size-[60px]",
            "rounded-[13px] sm:rounded-[18px] md:rounded-[22px]",
            "backdrop-blur-xl",
            isActive
              ? "scale-110 shadow-2xl"
              : "hover:scale-108 shadow-md group-hover:shadow-xl"
          )}
          style={{
            background: isActive
              ? "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.92) 100%)"
              : "linear-gradient(145deg, rgba(255, 255, 255, 0.90) 0%, rgba(241, 245, 249, 0.82) 100%)",
            border: isActive
              ? `2px solid ${service.accentColor}`
              : "1.5px solid rgba(226, 232, 240, 0.85)",
            boxShadow: isActive
              ? `0 0 0 1px ${service.accentColor}40, 0 12px 28px -4px ${service.glowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 5px rgba(0, 0, 0, 0.04)`
              : "0 6px 20px -3px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.02)",
          }}
        >
          {/* Subtle Chamfer Glare Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[13px] sm:rounded-[18px] md:rounded-[22px] bg-gradient-to-tr from-transparent via-white/25 to-white/60 dark:via-white/5 dark:to-white/20"
          />

          {/* High-Definition 3D Vector Icon */}
          <div
            className={cn(
              "relative z-10 transition-transform duration-300 flex items-center justify-center p-0.5 sm:p-1",
              isActive ? "scale-110" : "group-hover:scale-108"
            )}
          >
            <ServiceIcon
              name={service.iconName}
              className="size-5 sm:size-7 md:size-10 lg:size-[40px] drop-shadow-md"
            />
          </div>

          {/* Sleek Monospace Micro-Tag (01..06) */}
          <span
            className={cn(
              "absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 flex items-center justify-center rounded-full text-[7.5px] sm:text-[9.5px] font-bold font-mono px-1 sm:px-1.5 min-w-[14px] sm:min-w-[19px] h-[13px] sm:h-[18px] transition-all duration-300 shadow-sm",
              isActive
                ? "text-white ring-1.5 sm:ring-2 ring-white dark:ring-void scale-105 shadow-md"
                : "bg-white/90 dark:bg-void/90 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-white/15 group-hover:border-purple-400 group-hover:text-purple-600"
            )}
            style={{
              backgroundColor: isActive ? service.accentColor : undefined,
            }}
          >
            {service.number}
          </span>
        </div>

        {/* High-End Glass Title Badge with Smart Orientation (displays above node if near the bottom edge) */}
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 z-30",
            yPercent > 72
              ? "bottom-full mb-1.5 sm:bottom-auto sm:top-full sm:mt-2"
              : "top-full mt-1 sm:mt-2",
            isActive || isFocused
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 hidden sm:block"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-semibold tracking-wide backdrop-blur-xl shadow-lg transition-all",
              isActive
                ? "bg-white dark:bg-[#120B26] text-slate-900 dark:text-white border shadow-[0_4px_16px_rgba(0,0,0,0.12)] scale-105"
                : "bg-white/95 dark:bg-void/90 border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-slate-100"
            )}
            style={{
              borderColor: isActive ? `${service.accentColor}80` : undefined,
            }}
          >
            {/* Luminous Pulsing Beacon Dot */}
            <span
              className="size-1.5 sm:size-2 rounded-full transition-transform duration-300 animate-pulse"
              style={{
                backgroundColor: service.accentColor,
                boxShadow: `0 0 8px ${service.accentColor}`,
              }}
            />
            <span>{service.shortTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
