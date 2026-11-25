"use client";

import {
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { preconnect } from "react-dom";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";
import { HERO_SERVICES } from "@/config/service-showcase";
import { cn } from "@/lib/utils";

// Global safe patch for setPointerCapture / releasePointerCapture
// Completely eliminates the DOMException: NotFoundError when synthetic PointerEvents occur
interface PatchedCaptureFn {
  (this: Element, pointerId: number): void;
  __safe_patched?: boolean;
}

if (typeof window !== "undefined") {
  const patchCapture = (proto: unknown) => {
    if (!proto || typeof proto !== "object") return;
    const target = proto as {
      setPointerCapture?: PatchedCaptureFn;
      releasePointerCapture?: PatchedCaptureFn;
    };

    const origSet = target.setPointerCapture;
    if (origSet && !origSet.__safe_patched) {
      target.setPointerCapture = function (this: Element, pointerId: number) {
        try {
          origSet.call(this, pointerId);
        } catch {
          // Safe no-op for non-active or synthetic pointer IDs
        }
      };
      target.setPointerCapture.__safe_patched = true;
    }

    const origRelease = target.releasePointerCapture;
    if (origRelease && !origRelease.__safe_patched) {
      target.releasePointerCapture = function (this: Element, pointerId: number) {
        try {
          origRelease.call(this, pointerId);
        } catch {
          // Safe no-op
        }
      };
      target.releasePointerCapture.__safe_patched = true;
    }
  };

  if (typeof Element !== "undefined") patchCapture(Element.prototype);
  if (typeof HTMLCanvasElement !== "undefined") patchCapture(HTMLCanvasElement.prototype);
}

const SPLINE_ORIGINS = [
  "https://prod.spline.design",
  "https://unpkg.com",
  "https://www.gstatic.com",
];

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

interface SplineLookAtHandler {
  onMouseMove?: (e: { pageX: number; pageY: number; clientX?: number; clientY?: number }) => void;
  updateSingleEvent?: (event: unknown) => void;
  events?: unknown[];
}

interface SplineEventManager {
  handlers?: {
    LookAt?: SplineLookAtHandler;
  };
  eventContext?: {
    domElement?: HTMLElement;
    eventElement?: HTMLElement | Window;
    domRect?: DOMRect;
    _domRect?: DOMRect;
    updateRaycaster?: (e: { pageX: number; pageY: number }) => void;
  };
}

type SplineApp = Application & {
  stop?: () => void;
  play?: () => void;
  _onScroll?: () => void;
  _scene?: unknown;
  _eventManager?: SplineEventManager;
  requestRender?: () => void;
};

interface InteractiveRobotProps {
  scene: string;
  targetScreenPos: { x: number; y: number } | null;
  activeServiceIndex: number | null;
  className?: string;
  onHeadCenterCalculated?: (pos: { x: number; y: number }) => void;
}

export const InteractiveRobot = memo(function InteractiveRobot({
  scene,
  targetScreenPos,
  activeServiceIndex,
  className,
  onHeadCenterCalculated,
}: InteractiveRobotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<SplineApp | null>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

  // Current interpolated Normalized Device Coordinates (-1.5 to +1.5 range)
  // X: -1 is left, +1 is right
  // Y: -1 is down, +1 is up
  const currentNdcRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Eye blinking state for fallback visual
  const [isBlinking, setIsBlinking] = useState(false);

  // Smooth rotation values for CSS 3D fallback / overlay
  const [rotation, setRotation] = useState({ rotX: 0, rotY: 0, eyeX: 0, eyeY: 0 });

  // Natural blinking interval
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const scheduleBlink = () => {
      const nextTime = 3000 + Math.random() * 4000;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 160);
      }, nextTime);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Aggressively remove / hide any Spline watermark DOM element if injected
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const hide = () => {
      const targets = el.querySelectorAll(
        'a[href*="spline"], #spline-watermark, [class*="watermark"], [aria-label*="Spline"]'
      );
      targets.forEach((t) => {
        (t as HTMLElement).style.setProperty("display", "none", "important");
        (t as HTMLElement).style.setProperty("opacity", "0", "important");
        (t as HTMLElement).style.setProperty("visibility", "hidden", "important");
      });
    };
    hide();
    const obs = new MutationObserver(hide);
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // Determine if Spline should load (enabled across mobile, tablet, and desktop)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (const origin of SPLINE_ORIGINS) {
      preconnect(origin, { crossOrigin: "anonymous" });
    }
    setShouldLoadSpline(true);
  }, []);

  // Compute head center in viewport and notify parent for orbit placement
  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Robot's head is roughly at 50% width and 42% height of the container
      const headX = rect.left + rect.width * 0.5;
      const headY = rect.top + rect.height * 0.42;
      onHeadCenterCalculated?.({ x: headX, y: headY });
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, [onHeadCenterCalculated]);

  // Main Spring-Based Animation Loop for Head & Eye Tracking
  // Smoothly drives both Spline's internal LookAt event handler and the 3D CSS fallback
  useEffect(() => {
    let lastTime = performance.now();
    let idleAngle = 0;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      idleAngle += dt * 1.2;

      const container = containerRef.current;
      if (!container) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.42;

      let targetNdcX = 0;
      let targetNdcY = 0;

      if (activeServiceIndex !== null && HERO_SERVICES[activeServiceIndex]) {
        // Mode 1: Focusing directly on one of the 6 orbital services
        // Each service has its exact angleDeg in clockwise orbital order:
        // 01 WhatsApp: 205° (Left, slightly up)
        // 02 AI Employees: 260° (Almost straight up, slightly left)
        // 03 Voice Agents: 320° (Top-right)
        // 04 Mobile Apps: 20° (Right, slightly down)
        // 05 Ecommerce & 3D: 80° (Bottom-right)
        // 06 Sales Intelligence: 140° (Bottom-left)
        const service = HERO_SERVICES[activeServiceIndex];
        const rad = (service.angleDeg * Math.PI) / 180;

        // In WebGL NDC: +X is right (cos), +Y is up (-sin in screen coordinates)
        // Multiplier 1.4 ensures a strong, unmistakable physical neck turn
        const lookMultiplier = 1.45;
        targetNdcX = Math.cos(rad) * lookMultiplier;
        targetNdcY = -Math.sin(rad) * lookMultiplier;
      } else if (targetScreenPos) {
        // Mode 2: Following user cursor (enabled after round 1 completes)
        const rawDx = targetScreenPos.x - centerX;
        const rawDy = targetScreenPos.y - centerY;
        const widthHalf = Math.max(1, rect.width * 0.45);
        const heightHalf = Math.max(1, rect.height * 0.45);
        targetNdcX = Math.max(-1.45, Math.min(1.45, (rawDx / widthHalf) * 1.35));
        targetNdcY = Math.max(-1.3, Math.min(1.3, (-rawDy / heightHalf) * 1.35));
      } else {
        // Mode 3: Subtle natural idle breathing
        targetNdcX = Math.sin(idleAngle * 0.6) * 0.14;
        targetNdcY = Math.cos(idleAngle * 0.4) * 0.09;
      }

      // Smooth spring lerp interpolation (0.085 damping factor = buttery smooth transition)
      currentNdcRef.current.x += (targetNdcX - currentNdcRef.current.x) * 0.085;
      currentNdcRef.current.y += (targetNdcY - currentNdcRef.current.y) * 0.085;

      // 1. Update CSS 3D fallback robot (for mobile/instant display)
      const maxAngleY = 38; // degrees horizontal
      const maxAngleX = 26; // degrees vertical
      const rotY = Math.max(-maxAngleY, Math.min(maxAngleY, currentNdcRef.current.x * maxAngleY));
      const rotX = Math.max(-maxAngleX, Math.min(maxAngleX, -currentNdcRef.current.y * maxAngleX));
      const eyeX = Math.max(-14, Math.min(14, currentNdcRef.current.x * 12));
      const eyeY = Math.max(-10, Math.min(10, -currentNdcRef.current.y * 8.5));
      setRotation({ rotX, rotY, eyeX, eyeY });

      // 2. Update 3D Spline scene directly via internal LookAt handler
      // This completely bypasses synthetic DOM events, eliminating setPointerCapture errors entirely!
      const app = appRef.current;
      if (app) {
        const canvas = canvasRef.current || app.canvas;
        if (canvas) {
          const domRect = canvas.getBoundingClientRect();
          if (domRect.width > 0 && domRect.height > 0) {
            const scrollX = typeof window !== "undefined" ? window.scrollX || 0 : 0;
            const scrollY = typeof window !== "undefined" ? window.scrollY || 0 : 0;

            // Invert Spline's gte() formula to compute exact pageX, pageY that yields currentNdc
            // gte: x = (pageX - (domRect.left + scrollX)) / domRect.width * 2 - 1
            // gte: y = -((pageY - (domRect.top + scrollY)) / domRect.height) * 2 + 1
            const pageX = domRect.left + scrollX + ((currentNdcRef.current.x + 1) / 2) * domRect.width;
            const pageY = domRect.top + scrollY + ((1 - currentNdcRef.current.y) / 2) * domRect.height;
            const clientX = pageX - scrollX;
            const clientY = pageY - scrollY;

            const eventManager = app._eventManager;
            const lookAtHandler = eventManager?.handlers?.LookAt;

            if (lookAtHandler && typeof lookAtHandler.onMouseMove === "function") {
              // Direct internal execution — completely immune to DOM exceptions
              lookAtHandler.onMouseMove({ pageX, pageY, clientX, clientY });
              if (typeof app.requestRender === "function") {
                app.requestRender();
              }
            } else {
              // Fallback: Safe synthetic PointerEvent without pointerId (prevents setPointerCapture crash)
              try {
                const evt = new PointerEvent("pointermove", {
                  clientX,
                  clientY,
                  bubbles: true,
                  cancelable: true,
                  view: window,
                });
                Object.assign(evt, { pageX, pageY });
                canvas.dispatchEvent(evt);
              } catch {
                // Safe no-op
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeServiceIndex, targetScreenPos]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
      style={{ perspective: "1000px" }}
    >
      {/* 3D Spline Interactive Canvas for Desktop & Mobile */}
      {shouldLoadSpline && (
        <div
          className={cn(
            "absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 z-10",
            splineLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Overscan container pushes Spline's bottom-right watermark out of bounds while remaining dead-center */}
          <div className="absolute left-[calc(50%-8px)] sm:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+84px)] h-[calc(100%+84px)] origin-center flex items-center justify-center">
            <Spline
              scene={scene}
              onLoad={(app) => {
                const splineApp = app as SplineApp;
                appRef.current = splineApp;
                canvasRef.current = app.canvas;
                try {
                  const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
                  const isMedium = typeof window !== "undefined" && window.innerWidth < 1024;
                  splineApp.setZoom(isSmall ? 0.68 : isMedium ? 0.78 : 0.85);
                } catch {
                  // Fallback if setZoom is unsupported
                }
                setSplineLoaded(true);
              }}
              className="!w-full !h-full"
            />
          </div>
        </div>
      )}

      {/* Fallback / Instant-rendering 3D Interactive Robot Visual
          (Visible immediately during Spline load and on reduced-motion) */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none scale-[0.62] sm:scale-[0.76] md:scale-[0.88]",
          splineLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{
          transform: `perspective(900px) rotateX(${rotation.rotX}deg) rotateY(${rotation.rotY}deg) scale(0.88)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.05s linear",
        }}
      >
        {/* Ambient Ground Platform / Shadow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-16 w-56 sm:w-72 h-14 rounded-full bg-[radial-gradient(ellipse,rgba(113,56,255,0.45)_0%,rgba(168,85,247,0.18)_40%,transparent_75%)] blur-lg"
        />

        {/* Robot Head */}
        <div
          className="relative size-36 sm:size-44 md:size-48 rounded-[28px] sm:rounded-[36px] p-3 shadow-2xl transition-all"
          style={{
            background:
              "linear-gradient(135deg, #7C3AED 0%, #5B21B6 45%, #3B0764 100%)",
            boxShadow:
              "0 20px 50px rgba(113, 56, 255, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.4), inset 0 -4px 10px rgba(0, 0, 0, 0.6)",
            transform: `translateZ(30px)`,
          }}
        >
          {/* Metallic rim highlights */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[28px] sm:rounded-[36px] border border-purple-300/40 pointer-events-none"
          />

          {/* Side Ears / Antenna cylinders */}
          <div
            aria-hidden="true"
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3 h-8 sm:h-10 rounded-l-md bg-gradient-to-r from-purple-950 to-purple-600 border border-purple-400/40 shadow-md"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3 h-8 sm:h-10 rounded-r-md bg-gradient-to-l from-purple-950 to-purple-600 border border-purple-400/40 shadow-md"
          />

          {/* Dark Glossy Screen Face */}
          <div
            className="relative w-full h-full rounded-[20px] sm:rounded-[26px] bg-[#0F0822] overflow-hidden flex items-center justify-center gap-6 sm:gap-8 border border-purple-500/30"
            style={{
              boxShadow: "inset 0 4px 14px rgba(0, 0, 0, 0.9)",
            }}
          >
            {/* Screen Glass Reflection */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -left-12 w-48 h-32 bg-gradient-to-b from-white/15 to-transparent rotate-12 pointer-events-none"
            />

            {/* Left Eye */}
            <div
              className="relative size-6 sm:size-8 md:size-9 rounded-full bg-white shadow-[0_0_16px_#fff,0_0_30px_rgba(168,85,247,0.8)] transition-all flex items-center justify-center"
              style={{
                transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px) scaleY(${isBlinking ? 0.1 : 1})`,
                transition: isBlinking ? "transform 0.08s ease-in" : "transform 0.04s linear",
              }}
            >
              <div className="size-2 rounded-full bg-purple-200/80" />
            </div>

            {/* Right Eye */}
            <div
              className="relative size-6 sm:size-8 md:size-9 rounded-full bg-white shadow-[0_0_16px_#fff,0_0_30px_rgba(168,85,247,0.8)] transition-all flex items-center justify-center"
              style={{
                transform: `translate(${rotation.eyeX}px, ${rotation.eyeY}px) scaleY(${isBlinking ? 0.1 : 1})`,
                transition: isBlinking ? "transform 0.08s ease-in" : "transform 0.04s linear",
              }}
            >
              <div className="size-2 rounded-full bg-purple-200/80" />
            </div>
          </div>
        </div>

        {/* Neck Joint */}
        <div
          className="relative w-10 sm:w-12 h-5 sm:h-6 -my-1 rounded-sm bg-gradient-to-r from-purple-900 via-slate-400 to-purple-900 shadow-inner z-0"
          style={{ transform: "translateZ(10px)" }}
        />

        {/* Robot Torso / Cube Body */}
        <div
          className="relative w-32 sm:w-40 md:size-44 h-24 sm:h-28 md:h-32 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(145deg, #6D28D9 0%, #4C1D95 60%, #2E1065 100%)",
            boxShadow:
              "0 15px 40px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            transform: "translateZ(0px)",
          }}
        >
          {/* Subtle chest core light */}
          <div
            className={cn(
              "size-4 sm:size-5 rounded-full bg-purple-400/80 shadow-[0_0_14px_rgba(168,85,247,0.9)] transition-all",
              activeServiceIndex !== null ? "animate-pulse scale-125 bg-white" : ""
            )}
          />
        </div>
      </div>
    </div>
  );
});
