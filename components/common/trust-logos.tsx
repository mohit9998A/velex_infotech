import React from "react";
import { cn } from "@/lib/utils";

interface TrustLogosProps {
  className?: string;
}

export function TrustLogos({ className }: TrustLogosProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-[2px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
        <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
          Trusted by forward-thinking businesses
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-500/90 dark:text-[#B99CFF]/70">
        {/* Stripe */}
        <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-5 w-auto"
            aria-label="Stripe"
          >
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">stripe</span>
        </div>

        {/* Slack */}
        <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-4 w-auto"
            aria-label="Slack"
          >
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">slack</span>
        </div>

        {/* HubSpot */}
        <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-4 w-auto"
            aria-label="HubSpot"
          >
            <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">HubSpot</span>
        </div>

        {/* Notion */}
        <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-4 w-auto"
            aria-label="Notion"
          >
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">Notion</span>
        </div>

        {/* Google Cloud */}
        <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-4 w-auto"
            aria-label="Google Cloud"
          >
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight">Google Cloud</span>
        </div>

        {/* AWS */}
        <div className="flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white">
          <span className="font-display text-lg font-extrabold tracking-tight">aws</span>
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="h-3 w-auto opacity-90"
            aria-hidden="true"
          >
            <path d="M21.7 13.9c-.2.1-.5.1-.7 0-1.7-1.1-3.7-1.7-5.8-1.7-2.8 0-5.5 1-7.8 2.8-.2.2-.5.2-.7 0-.2-.2-.2-.5 0-.7 2.4-2 5.3-3.1 8.5-3.1 2.3 0 4.5.6 6.4 1.8.3.3.3.7.1.9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
