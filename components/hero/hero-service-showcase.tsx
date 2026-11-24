"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { HERO_SERVICES } from "@/config/service-showcase";
import { InteractiveRobot } from "@/components/hero/interactive-robot";
import { ServiceOrbit } from "@/components/hero/service-orbit";
import { cn } from "@/lib/utils";

const SPLINE_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

// Stable module-level constants to prevent re-creating callbacks and breaking useEffect timers
const CENTER_PERCENT = { x: 50, y: 42 };
const RADIUS_PERCENT = { rx: 39, ry: 36 };

interface HeroServiceShowcaseProps {
  className?: string;
  activeServiceIndex?: number | null;
  onActiveServiceChange?: (index: number | null) => void;
}

export const HeroServiceShowcase = memo(function HeroServiceShowcase({
  className,
  activeServiceIndex: controlledIndex,
  onActiveServiceChange,
}: HeroServiceShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active service index: null = idle / free cursor tracking, 0-5 = active service
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(null);
  const activeServiceIndex = controlledIndex !== undefined ? controlledIndex : internalActiveIndex;

  // Track completion of the first full introductory round of all 6 services
  const hasCompletedFirstRoundRef = useRef(false);

  // Refs for auto-cycle and manual override
  const isManualModeRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onActiveChangeRef = useRef(onActiveServiceChange);
  onActiveChangeRef.current = onActiveServiceChange;

  // Target screen position for robot head to track
  const [targetScreenPos, setTargetScreenPos] = useState<{ x: number; y: number } | null>(null);

  // Mouse cursor tracking inside hero
  const mouseScreenPosRef = useRef<{ x: number; y: number } | null>(null);
  const isHoveringNodeRef = useRef(false);

  // Calculate screen position of a node by index
  const getNodeScreenPos = useCallback((index: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const service = HERO_SERVICES[index];
    if (!service) return null;

    const rad = (service.angleDeg * Math.PI) / 180;
    const scale = service.radiusScale ?? 1.0;
    const xPercent = CENTER_PERCENT.x + Math.cos(rad) * (RADIUS_PERCENT.rx * scale);
    const yPercent = CENTER_PERCENT.y + Math.sin(rad) * (RADIUS_PERCENT.ry * scale);

    const screenX = rect.left + (xPercent / 100) * rect.width;
    const screenY = rect.top + (yPercent / 100) * rect.height;
    return { x: screenX, y: screenY };
  }, []);

  // Switch to a specific service
  const activateService = useCallback(
    (index: number | null, manual = false) => {
      setInternalActiveIndex(index);
      onActiveChangeRef.current?.(index);

      if (index !== null) {
        const nodePos = getNodeScreenPos(index);
        if (nodePos) {
          setTargetScreenPos(nodePos);
        }
      } else {
        if (mouseScreenPosRef.current && hasCompletedFirstRoundRef.current) {
          setTargetScreenPos(mouseScreenPosRef.current);
        } else {
          setTargetScreenPos(null);
        }
      }

      if (manual && hasCompletedFirstRoundRef.current) {
        isManualModeRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

        // Resume auto-discovery sequence after 8 seconds of inactivity
        resumeTimerRef.current = setTimeout(() => {
          isManualModeRef.current = false;
        }, 8000);
      }
    },
    [getNodeScreenPos]
  );

  // React to external active index changes (e.g. from parent tab/dot clicks)
  useEffect(() => {
    if (controlledIndex !== undefined && controlledIndex !== internalActiveIndex) {
      setInternalActiveIndex(controlledIndex);
      if (controlledIndex !== null) {
        const nodePos = getNodeScreenPos(controlledIndex);
        if (nodePos) {
          setTargetScreenPos(nodePos);
        }
      } else {
        setTargetScreenPos(
          hasCompletedFirstRoundRef.current ? (mouseScreenPosRef.current ?? null) : null
        );
      }
    }
  }, [controlledIndex, internalActiveIndex, getNodeScreenPos]);

  // First Round: Clockwise tour of all 6 services (01 -> 02 -> 03 -> 04 -> 05 -> 06)
  // Ignores user cursor movement until round 1 finishes explaining all 6 services
  useEffect(() => {
    let currentIdx = -1;
    let autoTimeout: NodeJS.Timeout | null = null;
    let isCancelled = false;

    const tick = (delayMs: number) => {
      autoTimeout = setTimeout(() => {
        if (isCancelled) return;

        // If user is actively interacting or moving cursor after round 1, keep free cursor tracking
        if (hasCompletedFirstRoundRef.current && (isManualModeRef.current || mouseScreenPosRef.current)) {
          tick(4000);
          return;
        }

        currentIdx += 1;
        if (currentIdx < HERO_SERVICES.length) {
          // Clockwise step: 0 (WhatsApp) -> 1 (AI Employees) -> 2 (Voice Agents) -> 3 (Mobile Apps) -> 4 (Ecommerce & 3D) -> 5 (Sales Intelligence)
          activateService(currentIdx, false);
          tick(3800); // 3.8s per service
        } else {
          // Finished round 1! Mark complete so user cursor movement is now active
          hasCompletedFirstRoundRef.current = true;

          currentIdx = -1;
          activateService(null, false);

          // If the user already has their cursor inside the hero, immediately look at it
          if (mouseScreenPosRef.current) {
            setTargetScreenPos(mouseScreenPosRef.current);
          }

          // Check again in 10s only if user is completely idle
          tick(10000);
        }
      }, delayMs);
    };

    // Initial warm start delay of 800ms
    tick(800);

    return () => {
      isCancelled = true;
      if (autoTimeout) clearTimeout(autoTimeout);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [activateService]);

  // Handle cursor movement inside container
  // Ignored until the first round of all 6 services has completed
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const pos = { x: e.clientX, y: e.clientY };
      mouseScreenPosRef.current = pos;

      // DO NOT use cursor movement until one full round explaining all 6 services is complete
      if (!hasCompletedFirstRoundRef.current) {
        return;
      }

      // Once round 1 is complete, capture cursor movement and move the robot head towards the cursor
      if (!isHoveringNodeRef.current) {
        setTargetScreenPos(pos);
      }
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    mouseScreenPosRef.current = null;
    if (activeServiceIndex === null && hasCompletedFirstRoundRef.current) {
      setTargetScreenPos(null);
    }
  }, [activeServiceIndex]);

  // Service Node Hover Handlers (only enabled after first round completes)
  const handleHoverService = useCallback(
    (index: number) => {
      if (!hasCompletedFirstRoundRef.current) return;
      isHoveringNodeRef.current = true;
      activateService(index, true);
    },
    [activateService]
  );

  const handleLeaveService = useCallback(() => {
    if (!hasCompletedFirstRoundRef.current) return;
    isHoveringNodeRef.current = false;
    if (mouseScreenPosRef.current) {
      setTargetScreenPos(mouseScreenPosRef.current);
    }
  }, []);

  const handleSelectService = useCallback(
    (index: number) => {
      if (!hasCompletedFirstRoundRef.current) return;
      activateService(index, true);
    },
    [activateService]
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      suppressHydrationWarning
      className={cn(
        "relative w-full h-full min-h-[320px] sm:min-h-[400px] md:min-h-[560px] lg:min-h-[620px] flex items-center justify-center",
        className
      )}
    >
      {/* 3D Interactive Robot Component */}
      <InteractiveRobot
        scene={SPLINE_SCENE}
        targetScreenPos={targetScreenPos}
        activeServiceIndex={activeServiceIndex}
        className="w-full h-full"
      />

      {/* Six Interactive Service Orbit Points (Clean, without the connecting line) */}
      <ServiceOrbit
        activeIndex={activeServiceIndex}
        onSelectService={handleSelectService}
        onHoverService={handleHoverService}
        onLeaveService={handleLeaveService}
        centerPercent={CENTER_PERCENT}
        radiusPercent={RADIUS_PERCENT}
      />
    </div>
  );
});
