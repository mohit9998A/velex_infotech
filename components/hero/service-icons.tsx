import type { ComponentProps } from "react";

// Ultra-Modern, High-Conversion Realistic SVG Icons
// Tailored to user specifications:
// - 01 WhatsApp: Exact, authentic official WhatsApp icon with luminous emerald background & AI spark
// - 02 AI Employees: Modern Autonomous AI Agent / Robot Employee avatar
// - 03 Voice Agents: Realistic AI Voice Agent Headset with boom mic & active acoustic soundwaves
// - 04 Mobile Apps: Sleek flagship smartphone with real iOS/Android UI (no cartoon jelly)
// - 05 Ecommerce & 3D: 3D Shopping Bag & isometric crystal cube web store
// - 06 Sales Intelligence: Official Power BI ascending bars + AI Agent predictive spark

/**
 * 01. WhatsApp AI Chatbot & Commerce
 * Exact official WhatsApp brand geometry inside a vibrant emerald disc
 * with subtle 3D glass gloss and a micro AI intelligence sparkle badge.
 */
export function WhatsAppModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Authentic WhatsApp Vibrant Green Gradient */}
        <linearGradient id="waCircleGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2CD879" />
          <stop offset="50%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#1EBE5D" />
        </linearGradient>

        {/* Specular 3D Top Reflection */}
        <linearGradient id="waGleamArc" x1="24" y1="4" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="waDrop" x="6" y="6" width="36" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#128C7E" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Main WhatsApp Circular Disc */}
      <circle cx="24" cy="24" r="20" fill="url(#waCircleGrad)" filter="url(#waDrop)" />

      {/* 3D Specular Upper Rim Gleam */}
      <path
        d="M24 5C14.5 5 7 12 6.2 21C11.5 15.5 18 12.5 26.5 12C31.5 11.7 36 13 40.5 16C39 9.5 32 5 24 5Z"
        fill="url(#waGleamArc)"
      />

      {/* Exact Official WhatsApp Speech Bubble + Handset Geometry (Scaled to 48x48) */}
      <g transform="translate(9.5, 9.5) scale(1.2)">
        <path
          fill="#FFFFFF"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
        />
      </g>

      {/* Discrete 3D AI Intelligence Spark (Upper Right) */}
      <g transform="translate(34, 4)">
        <circle cx="5" cy="5" r="4.5" fill="#38BDF8" fillOpacity="0.35" filter="blur(1px)" />
        <path
          d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8L5 0Z"
          fill="#FFFFFF"
        />
        <circle cx="5" cy="5" r="1.2" fill="#0284C7" />
      </g>
    </svg>
  );
}

/**
 * 02. Autonomous AI Employees
 * Modern AI Agent avatar / Intelligent Robot Worker
 * with glowing cyan/violet eyes, cybernetic ears, and AI antenna.
 */
export function AIEmployeesModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Pearlescent Robot Chassis Gradient */}
        <linearGradient id="agentHeadGrad" x1="12" y1="8" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="35%" stopColor="#DDD6FE" />
          <stop offset="75%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Visor Deep Obsidian Screen */}
        <linearGradient id="agentVisorGrad" x1="15" y1="18" x2="33" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>

        {/* Cyan Eye Glow */}
        <filter id="eyeGlow" x="14" y="18" width="20" height="12" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#38BDF8" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Top AI Neural Antenna with Glowing Quantum Node */}
      <line x1="24" y1="4" x2="24" y2="10" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="4" r="3" fill="#38BDF8" />
      <circle cx="24" cy="4" r="1.5" fill="#FFFFFF" />

      {/* Left and Right Audio Comm Earcups */}
      <rect x="7" y="18" width="4.5" height="10" rx="2.2" fill="#6D28D9" stroke="#C4B5FD" strokeWidth="1" />
      <rect x="36.5" y="18" width="4.5" height="10" rx="2.2" fill="#6D28D9" stroke="#C4B5FD" strokeWidth="1" />
      <circle cx="9.2" cy="23" r="1.2" fill="#38BDF8" />
      <circle cx="38.8" cy="23" r="1.2" fill="#38BDF8" />

      {/* Main AI Agent Head Chassis (Friendly Modern Robot) */}
      <rect
        x="10"
        y="10"
        width="28"
        height="24"
        rx="9"
        fill="url(#agentHeadGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.4"
      />

      {/* Top Chamfer Gleam */}
      <path
        d="M13 14C13 12 16 11.2 24 11.2C32 11.2 35 12 35 14"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* Dark Visor Screen */}
      <rect
        x="13.5"
        y="17"
        width="21"
        height="12"
        rx="5.5"
        fill="url(#agentVisorGrad)"
        stroke="#8B5CF6"
        strokeWidth="1"
      />

      {/* Glowing Intelligent Cyan Eyes (Blinking/Engaged Expression) */}
      <g filter="url(#eyeGlow)">
        <ellipse cx="19" cy="23" rx="2.6" ry="3.2" fill="#38BDF8" />
        <ellipse cx="29" cy="23" rx="2.6" ry="3.2" fill="#38BDF8" />
        <circle cx="19.8" cy="22.2" r="1" fill="#FFFFFF" />
        <circle cx="29.8" cy="22.2" r="1" fill="#FFFFFF" />
      </g>

      {/* Subtle Digital Smile / Comm Line */}
      <path
        d="M21.5 26.8C22.2 27.5 25.8 27.5 26.5 26.8"
        stroke="#38BDF8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Professional Robot Employee Neck & Collar / ID Badge */}
      <path
        d="M19 34H29L32 43H16L19 34Z"
        fill="#5B21B6"
        stroke="#A78BFA"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Cyan Quantum Core ID Badge */}
      <circle cx="24" cy="39" r="2" fill="#38BDF8" />
      <circle cx="24" cy="39" r="0.8" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * 03. AI Voice Agents & Calling
 * Instant High-Conversion Voice Agent Icon:
 * Professional customer care AI Headset with curved boom microphone
 * and radiating acoustic voice soundwaves.
 */
export function VoiceAgentsModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Headset Arc Metallic Gradient */}
        <linearGradient id="headbandGrad" x1="12" y1="6" x2="36" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#C084FC" />
          <stop offset="70%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Dynamic Voice Wave Gradient */}
        <linearGradient id="voicePulseGrad" x1="28" y1="28" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        <filter id="voiceGlow" x="22" y="24" width="24" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38BDF8" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Headband Arc */}
      <path
        d="M12 24C12 17.373 17.373 12 24 12C30.627 12 36 17.373 36 24"
        stroke="url(#headbandGrad)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Top Headset Cushion Pad */}
      <path
        d="M18 13.5C19.8 12.6 22 12.2 24 12.2C26 12.2 28.2 12.6 30 13.5"
        stroke="#4C1D95"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Left Acoustic Earcup */}
      <rect x="8" y="20" width="7" height="13" rx="3.5" fill="#6D28D9" stroke="#E9D5FF" strokeWidth="1.2" />
      <rect x="9.5" y="22" width="2" height="9" rx="1" fill="#A78BFA" />

      {/* Right Acoustic Earcup */}
      <rect x="33" y="20" width="7" height="13" rx="3.5" fill="#6D28D9" stroke="#E9D5FF" strokeWidth="1.2" />
      <rect x="36.5" y="22" width="2" height="9" rx="1" fill="#A78BFA" />

      {/* Curved Boom Microphone extending to front-mouth position */}
      <path
        d="M36 28C36 34 32 37.5 25 37.5H23"
        stroke="#E2E8F0"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Capsule Mic Head with Chrome Ring */}
      <rect x="18" y="35.5" width="5.5" height="4" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
      {/* Mic Active Voice LED Beacon */}
      <circle cx="19.5" cy="37.5" r="1.2" fill="#38BDF8" />

      {/* Radiating Acoustic Voice Soundwaves (Speech in Action) */}
      <g filter="url(#voiceGlow)">
        {/* Wave 1 */}
        <path
          d="M14 34.5C12.5 36 12.5 39 14 40.5"
          stroke="url(#voicePulseGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Wave 2 */}
        <path
          d="M10 32C7.5 35 7.5 41 10 44"
          stroke="url(#voicePulseGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * 04. Mobile App Development
 * Modern Flagship Smartphone (iOS & Android).
 * High-end titanium frame, edge-to-edge OLED display,
 * Dynamic Island, clean native app UI (zero cartoon jelly!).
 */
export function MobileAppsModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Titanium Chassis Gradient */}
        <linearGradient id="phoneChassis" x1="12" y1="5" x2="36" y2="43" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="30%" stopColor="#3B82F6" />
          <stop offset="70%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* OLED Midnight Screen Gradient */}
        <linearGradient id="screenGrad" x1="14" y1="7" x2="34" y2="41" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="50%" stopColor="#1C2541" />
          <stop offset="100%" stopColor="#0A1128" />
        </linearGradient>

        {/* Diagonal Screen Glare */}
        <linearGradient id="screenGlare" x1="14" y1="7" x2="34" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="phoneShadowDrop" x="9" y="4" width="30" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#1E3A8A" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Phone Outer Chassis (Curved Titanium Bezel) */}
      <rect
        filter="url(#phoneShadowDrop)"
        x="12"
        y="5"
        width="24"
        height="38"
        rx="6"
        fill="url(#phoneChassis)"
        stroke="#93C5FD"
        strokeWidth="1.2"
      />

      {/* Edge-to-Edge OLED Screen */}
      <rect
        x="13.5"
        y="6.8"
        width="21"
        height="34.4"
        rx="4.8"
        fill="url(#screenGrad)"
      />

      {/* Screen Glare Highlight */}
      <path
        d="M13.5 6.8H34.5L13.5 24V6.8Z"
        fill="url(#screenGlare)"
      />

      {/* Dynamic Island Pill */}
      <rect x="20.5" y="8.2" width="7" height="2" rx="1" fill="#020617" />
      <circle cx="26" cy="9.2" r="0.6" fill="#1E293B" />

      {/* Professional Native App Layout (Clean, Modern, No Cartoon Jelly) */}
      {/* App Header Banner Card */}
      <rect x="16" y="12.5" width="16" height="7" rx="2" fill="#1E293B" stroke="#334155" strokeWidth="0.8" />
      {/* Mini App Balance / Metrics bar */}
      <circle cx="18.5" cy="16" r="1.4" fill="#38BDF8" />
      <line x1="21.5" y1="15" x2="28" y2="15" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21.5" y1="17.2" x2="25.5" y2="17.2" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />

      {/* Interactive App Actions Row */}
      {/* Native App Icon 1 (Blue Action) */}
      <rect x="16" y="21.5" width="4.5" height="4.5" rx="1.4" fill="#2563EB" />
      <circle cx="18.2" cy="23.7" r="1" fill="#FFFFFF" />

      {/* Native App Icon 2 (Violet Action) */}
      <rect x="21.8" y="21.5" width="4.5" height="4.5" rx="1.4" fill="#7C3AED" />
      <line x1="23.2" y1="23.7" x2="25" y2="23.7" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

      {/* Native App Icon 3 (Emerald Action) */}
      <rect x="27.5" y="21.5" width="4.5" height="4.5" rx="1.4" fill="#059669" />
      <polygon points="29.7,22.7 30.7,24.5 28.7,24.5" fill="#FFFFFF" />

      {/* Feed List Item Card */}
      <rect x="16" y="28" width="16" height="4.5" rx="1.6" fill="#1E293B" stroke="#334155" strokeWidth="0.6" />
      <circle cx="18" cy="30.2" r="1.2" fill="#F59E0B" />
      <line x1="20.5" y1="30.2" x2="29" y2="30.2" stroke="#CBD5E1" strokeWidth="0.9" strokeLinecap="round" />

      {/* Feed List Item 2 */}
      <rect x="16" y="34" width="16" height="3" rx="1.5" fill="#1E293B" fillOpacity="0.7" />
      <line x1="20.5" y1="35.5" x2="26" y2="35.5" stroke="#64748B" strokeWidth="0.8" strokeLinecap="round" />

      {/* White Swipe Indicator Bar */}
      <line x1="20" y1="39.2" x2="28" y2="39.2" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 05. Ecommerce & 3D Websites
 * Luxury 3D Shopping Bag + Glowing 3D Crystal Product Cube
 * representing cutting-edge 3D web storefronts and digital commerce.
 */
export function Ecommerce3DModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Luxury Bag Body Gradient */}
        <linearGradient id="ecomBagGrad" x1="10" y1="16" x2="38" y2="43" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="45%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Chrome Handles Gradient */}
        <linearGradient id="ecomHandleGrad" x1="16" y1="6" x2="32" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#DDD6FE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* 3D Isometric Crystal Cube Facets */}
        <linearGradient id="cubeTopFacet" x1="24" y1="20" x2="24" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="cubeLeftFacet" x1="17" y1="24" x2="24" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="cubeRightFacet" x1="24" y1="24" x2="31" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        <filter id="ecomShadow" x="8" y="6" width="32" height="39" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#4C1D95" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Chrome Double Shopping Handles */}
      <path
        d="M18 19V12C18 8.7 20.7 6 24 6C27.3 6 30 8.7 30 12V19"
        stroke="url(#ecomHandleGrad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* 3D Designer Shopping Bag */}
      <path
        filter="url(#ecomShadow)"
        d="M11 16H37L35 41C35 42.1 34.1 43 33 43H15C13.9 43 13 42.1 13 41L11 16Z"
        fill="url(#ecomBagGrad)"
        stroke="#E9D5FF"
        strokeWidth="1.2"
      />

      {/* Bag Top Rim Shadow & Crease */}
      <line x1="11" y1="19" x2="37" y2="19" stroke="#4C1D95" strokeWidth="1.5" />

      {/* Side Gusset 3D Fold Lines */}
      <line x1="15" y1="19" x2="16.5" y2="43" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="33" y1="19" x2="31.5" y2="43" stroke="#4C1D95" strokeWidth="1" strokeOpacity="0.6" />

      {/* Floating Isometric 3D Web Crystal Cube (3D Experience) */}
      <polygon points="24,20 31,24 24,28 17,24" fill="url(#cubeTopFacet)" stroke="#FFFFFF" strokeWidth="0.8" />
      <polygon points="17,24 24,28 24,36 17,32" fill="url(#cubeLeftFacet)" stroke="#FFFFFF" strokeWidth="0.8" />
      <polygon points="24,28 31,24 31,32 24,36" fill="url(#cubeRightFacet)" stroke="#FFFFFF" strokeWidth="0.8" />

      {/* Specular Glint on Top Facet */}
      <polygon points="24,21 28,23.3 24,25.6 20,23.3" fill="#FFFFFF" fillOpacity="0.4" />

      {/* Floating Golden Purchase Sparkle */}
      <circle cx="36" cy="18" r="3" fill="#F59E0B" />
      <polygon points="36,16 37,17.5 38.5,18 37,18.5 36,20 35,18.5 33.5,18 35,17.5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * 06. AI Sales Intelligence & Power BI
 * Exact official Microsoft Power BI ascending 3-bar logo architecture
 * fused with a luminous AI Agent predictive intelligence spark.
 */
export function SalesIntelligenceModernIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Authentic Power BI Yellow/Amber Gradients */}
        {/* Bar 1 (Left - Shortest) */}
        <linearGradient id="pbiBar1" x1="10" y1="24" x2="18" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>

        {/* Bar 2 (Middle - Medium) */}
        <linearGradient id="pbiBar2" x1="19" y1="16" x2="27" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Bar 3 (Right - Tallest) */}
        <linearGradient id="pbiBar3" x1="28" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* AI Agent Surge Ray */}
        <linearGradient id="aiSurgeGrad" x1="8" y1="36" x2="42" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        <filter id="pbiShadow" x="8" y="7" width="34" height="36" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B45309" floodOpacity="0.45" />
        </filter>

        <filter id="aiSparkGlow" x="32" y="4" width="16" height="16" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#EC4899" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Official Power BI Ascending Overlapping Bars */}
      <g filter="url(#pbiShadow)">
        {/* Bar 3 (Tallest - Right) */}
        <rect x="29" y="9" width="8.5" height="31" rx="4.25" fill="url(#pbiBar3)" stroke="#FFFFFF" strokeWidth="0.8" />

        {/* Bar 2 (Medium - Center, overlaps Bar 3) */}
        <rect x="19.5" y="17" width="8.5" height="23" rx="4.25" fill="url(#pbiBar2)" stroke="#FFFFFF" strokeWidth="0.8" />

        {/* Bar 1 (Shortest - Left, overlaps Bar 2) */}
        <rect x="10" y="25" width="8.5" height="15" rx="4.25" fill="url(#pbiBar1)" stroke="#FFFFFF" strokeWidth="0.8" />
      </g>

      {/* Power BI Specular Highlights down the center of each bar */}
      <line x1="33.2" y1="12" x2="33.2" y2="36" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="23.7" y1="20" x2="23.7" y2="36" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="14.2" y1="28" x2="14.2" y2="36" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />

      {/* AI Agent Dynamic Upward Surging Trajectory Line */}
      <path
        d="M8 35C14 33 22 26 38 10"
        stroke="url(#aiSurgeGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* AI Agent Predictive Arrow Tip */}
      <path
        d="M32 9.5H39V16.5"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Luminous AI Agent Diamond Sparkle / Predictive Intelligence Star */}
      <g transform="translate(38, 8)" filter="url(#aiSparkGlow)">
        <circle cx="2" cy="2" r="4.5" fill="#EC4899" fillOpacity="0.5" filter="blur(1px)" />
        <path
          d="M2 -3L3.2 0.8L7 2L3.2 3.2L2 7L0.8 3.2L-3 2L0.8 0.8L2 -3Z"
          fill="#FFFFFF"
        />
        <circle cx="2" cy="2" r="1.4" fill="#FDE047" />
      </g>
    </svg>
  );
}

/**
 * ServiceIcon Router
 * Resolves the service's iconName to its photorealistic modern SVG component.
 */
export function ServiceIcon({
  name,
  className,
}: {
  name: "whatsapp" | "bot" | "mic" | "smartphone" | "cube" | "chart";
  className?: string;
}) {
  switch (name) {
    case "whatsapp":
      return <WhatsAppModernIcon className={className} />;
    case "bot":
      return <AIEmployeesModernIcon className={className} />;
    case "mic":
      return <VoiceAgentsModernIcon className={className} />;
    case "smartphone":
      return <MobileAppsModernIcon className={className} />;
    case "cube":
      return <Ecommerce3DModernIcon className={className} />;
    case "chart":
      return <SalesIntelligenceModernIcon className={className} />;
    default:
      return <AIEmployeesModernIcon className={className} />;
  }
}
