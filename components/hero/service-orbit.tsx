"use client";

import { memo, useMemo } from "react";
import { HERO_SERVICES } from "@/config/service-showcase";
import { ServiceNode } from "@/components/hero/service-node";

interface ServiceOrbitProps {
  activeIndex: number | null;
  onSelectService: (index: number) => void;
  onHoverService: (index: number) => void;
  onLeaveService: () => void;
  /** Center of robot head within the container in percent (default 50%, 42%) */
  centerPercent?: { x: number; y: number };
  /** Radius of orbit in percent */
  radiusPercent?: { rx: number; ry: number };
  className?: string;
}

export const ServiceOrbit = memo(function ServiceOrbit({
  activeIndex,
  onSelectService,
  onHoverService,
  onLeaveService,
  centerPercent = { x: 50, y: 42 },
  radiusPercent = { rx: 39, ry: 36 },
  className,
}: ServiceOrbitProps) {
  // Calculate position coordinates for all 6 nodes
  const nodePositions = useMemo(() => {
    return HERO_SERVICES.map((item, idx) => {
      const rad = (item.angleDeg * Math.PI) / 180;
      const scale = item.radiusScale ?? 1.0;
      const x = centerPercent.x + Math.cos(rad) * (radiusPercent.rx * scale);
      const y = centerPercent.y + Math.sin(rad) * (radiusPercent.ry * scale);
      return {
        item,
        x,
        y,
        floatDelaySec: (idx * 0.4) % 2.4,
      };
    });
  }, [centerPercent.x, centerPercent.y, radiusPercent.rx, radiusPercent.ry]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className ?? ""}`}
      aria-hidden="false"
    >
      {/* SVG Orbital Track */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gradient for orbit ring */}
          <linearGradient id="orbitRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7138FF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Orbit Ring */}
        <ellipse
          cx={`${centerPercent.x}%`}
          cy={`${centerPercent.y}%`}
          rx={`${radiusPercent.rx}%`}
          ry={`${radiusPercent.ry}%`}
          fill="none"
          stroke="url(#orbitRingGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="opacity-70 dark:opacity-60"
        />

        {/* Secondary faint outer decorative ring */}
        <ellipse
          cx={`${centerPercent.x}%`}
          cy={`${centerPercent.y}%`}
          rx={`${radiusPercent.rx * 1.08}%`}
          ry={`${radiusPercent.ry * 1.08}%`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 12"
          className="text-purple-400/20 dark:text-purple-300/15"
        />
      </svg>

      {/* Render the 6 Service Nodes */}
      {nodePositions.map((pos, idx) => (
        <ServiceNode
          key={pos.item.id}
          service={pos.item}
          isActive={activeIndex === idx}
          isFocused={activeIndex === idx}
          xPercent={pos.x}
          yPercent={pos.y}
          floatDelaySec={pos.floatDelaySec}
          onHover={() => onHoverService(idx)}
          onLeave={onLeaveService}
          onClick={() => onSelectService(idx)}
        />
      ))}
    </div>
  );
});
