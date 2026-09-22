# Velex Infotech — Master Design System (`design.md`)

> **Brand**: Velex Infotech  
> **Aesthetic Philosophy**: *"Crystalline Intelligence"*  
> A high-performance, dark-mode-first visual language designed for trust, technical authority, and visual elegance. Combines deep obsidian voids, electric purple accents, vivid violet glows, soft lavender highlights, and crisp editorial typography.

---

## 1. Brand Identity & Design Principles

1. **Crystalline Intelligence**: Clean geometric precision paired with ethereal, luminous lighting. Dark void surfaces layered with translucent glass, subtle bevels, and vibrant purple energy.
2. **Performance as an Aesthetic**: No animation or visual effect may cause jank, lag, or dropped frames. Scrolling must feel weightless, fluid (60–120Hz), and responsive across desktop and mobile.
3. **Traceability & Authenticity (E-E-A-T)**: Every metric, client badge, quote, and schema entry is traceable to real engagements. Design communicates verified authority rather than generic marketing fluff.
4. **Dual-Theme Elegance**: Designed from the ground up to look breathtaking in dark mode (`#04040A`) while remaining crisp, high-contrast, and professional in light mode (`#F8F7FF`).

---

## 2. Color System & Design Tokens

### 2.1 Core Palette
| Token Name | Hex Code | Role / Semantic Usage |
| :--- | :--- | :--- |
| `--vx-deep-violet` | `#32108F` | Deep brand anchor, dark card borders, high-contrast light text |
| `--vx-royal-purple` | `#5424D6` | Primary brand logo, structural identity |
| `--vx-electric-purple` | `#7138FF` | Primary CTA buttons, active states, light-mode accent highlights |
| `--vx-vivid-violet` | `#8B4DFF` | Dark-mode accent highlights, luminous gradients, glow effects |
| `--vx-soft-lavender` | `#B99CFF` | Secondary text in dark mode, subtle borders, card highlights |
| `--vx-light-lavender`| `#DED2FF` | Soft background accents, badge fills, ambient reflections |
| `--vx-crystal-white` | `#F8F7FF` | Light theme background, pure white text in dark mode |
| `--vx-midnight-navy` | `#0D0A24` | Primary text in light mode, deep contrast elements |

### 2.2 Surface & Elevation Tokens
| Token | Dark Mode (`html.dark`) | Light Mode (`html.light`) | Purpose |
| :--- | :--- | :--- | :--- |
| `--vx-void` | `#04040A` | `#F8F7FF` | Base canvas / page background |
| `--vx-surface` | `#0A0818` | `#FFFFFF` | Primary card surfaces, bento tiles |
| `--vx-elevated` | `#100D24` | `#FFFFFF` | Floating popovers, modals, dropdown menus |
| `--vx-glass` | `rgba(4, 4, 10, 0.75)` | `rgba(248, 247, 255, 0.85)` | Glassmorphism surfaces (`backdrop-blur-md`) |
| `--vx-card` | `rgba(255, 255, 255, 0.04)` | `#F8F7FF` | Stat tiles, choice pills |
| `--vx-border` | `rgba(113, 56, 255, 0.22)` | `rgba(113, 56, 255, 0.16)` | Default hairline element borders |
| `--vx-border-bright`| `rgba(139, 77, 255, 0.55)` | `rgba(113, 56, 255, 0.40)` | Active / focused element borders |

### 2.3 Semantic Glow & Shadow Tokens
- `--vx-glow-sm`: `0 0 20px rgba(113, 56, 255, 0.35)`
- `--vx-glow-md`: `0 0 60px rgba(139, 77, 255, 0.45)`
- `--vx-glow-lg`: `0 0 120px rgba(113, 56, 255, 0.55)`
- `--vx-modal-shadow`: `0 40px 120px rgba(113, 56, 255, 0.40)` (Dark) / `0 40px 120px rgba(113, 56, 255, 0.15)` (Light)

---

## 3. Typography System

| Style / Family | CSS Class | Characteristics | Application |
| :--- | :--- | :--- | :--- |
| **Display** | `font-display` | Geometric, bold, tracking `-0.03em`, tight line-height | Key metrics (`40+`), hero statistics, client names |
| **Editorial Serif** | `font-serif` | Playfair/Editorial, medium weight, high elegance | Main section headings, hero headline, italic accents |
| **Interface Sans** | `font-sans` | High legibility, neutral, balanced letter-spacing | Body paragraphs, buttons, navigation, form inputs |
| **Technical Mono** | `font-mono` / `.font-mono-label` | Uppercase, `tracking-[0.18em]`, technical precision | Kicker eyebrows, timeline steps, dates, code snippets |

### 3.1 Fluid Type Sizing
Headlines utilize CSS `clamp()` to scale seamlessly from mobile devices to ultrawide monitors without awkward line breaks:
- **Hero Headline**: `clamp(2.35rem, 5.2vw, 4.25rem)` on desktop; `clamp(2.4rem, 10vw, 3.2rem)` on mobile.
- **Section Headlines**: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`.
- **Lede / Subtitles**: `text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-white/70`.

---

## 4. UI Components & Patterns

### 4.1 Buttons (`components/ui/button.tsx`)
- **`variant="blue"` (Brand Electric Purple)**:
  - Gradient background: `bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] text-white`
  - Hover: `shadow-[0_4px_24px_rgba(113,56,255,0.45)] hover:scale-[1.02]`
- **`variant="outline"`**:
  - Hairline border: `border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04]`
  - Hover: `hover:bg-black/[0.07] dark:hover:bg-white/[0.08]`
- **`variant="crystal"`**:
  - Translucent glass: `backdrop-blur-sm border border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10`

### 4.2 Badges & Eyebrows
- **Aesthetic Kicker**:
  ```tsx
  <div className="flex items-center gap-3">
    <span className="h-[2.5px] w-6 sm:w-7 rounded-full bg-[#7138FF] dark:bg-[#8B4DFF]" />
    <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7138FF] dark:text-[#8B4DFF]">
      KICKER TEXT
    </span>
  </div>
  ```
- **Pill Badge (`.badge-pill`)**:
  ```tsx
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138FF]/[0.07] dark:bg-[#8B4DFF]/15 border border-[#7138FF]/20 dark:border-[#8B4DFF]/30 text-[#7138FF] dark:text-[#B99CFF] font-sans text-xs font-semibold tracking-wide">
    <Sparkles className="size-3.5 text-[#7138FF] dark:text-[#8B4DFF]" />
    Label
  </div>
  ```

### 4.3 Cards & Glass Panels
- **Standard Card**:
  - Light: `bg-white/80 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]`
  - Dark: `bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`
  - Hover: `-translate-y-1.5 border-purple-400/80 dark:border-purple-500/50 shadow-2xl shadow-purple-500/10`

### 4.4 Form Controls & Modals
- **Inputs**: Rounded-xl borders with focus rings in brand purple (`focus-visible:ring-[#7138FF]/40`).
- **Consultation Modal (`LeadFormDialog`)**:
  - Two-column full-bleed layout (`38fr / 62fr`).
  - Left column: Trust proof, assurances (NDA, 1 business day reply, 100% confidential), and verified metrics.
  - Right column: Zod-validated lead form with country phone picker, budget bands, and service selector.
  - Isolated scrolling: `data-lenis-prevent` on scrollable containers to prevent scroll conflicts.

---

## 5. Navigation & Layout Architecture

### 5.1 Desktop Navbar (`components/layout/navbar.tsx`)
- Floating pill header with scroll detection (`useScrolled(20)`).
- When scrolled: `bg-white/80 dark:bg-void/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-sm`.
- Radix Navigation Menu mega-dropdowns (`AI`, `Build`, `Company`) featuring categorized service links with Lucide icons.

### 5.2 Mobile Sidebar Drawer
- Full-height right-side sheet (`w-[92vw] sm:w-[420px] rounded-l-3xl`).
- **Left Silk Ribbon**: Gradient silk band with vertical rotated text (`BUILD WHAT'S NEXT`), spacer rule, and slogan (`SMARTER / FASTER / TOGETHER`).
- **Right Menu Area**:
  - "All Services" hero card with purple gradient fill.
  - Smooth Radix accordions for `AI`, `Build`, and `Company` sections.
  - Prominent "Get Started" consultation button + Theme toggle.

---

## 6. Homepage Section Blueprint (`components/sections/`)

```
┌────────────────────────────────────────────────────────┐
│ 1. HeroSection: 3D Robot / Mobile Robot + Rotating H1 │
├────────────────────────────────────────────────────────┤
│ 2. TrustBar: Infinite Marquee of Verified Clients      │
├────────────────────────────────────────────────────────┤
│ 3. ServicesSection: 10 Core Capabilities Grid         │
├────────────────────────────────────────────────────────┤
│ 4. BentoSection: 4 Technical Pillars & Visual Demos   │
├────────────────────────────────────────────────────────┤
│ 5. ProcessSection: 4-Step Timeline (Desktop & Mobile)  │
├────────────────────────────────────────────────────────┤
│ 6. IntegrationsSection: Dual-Row Marquee Stack        │
├────────────────────────────────────────────────────────┤
│ 7. PortfolioSection: Verified Client Case Studies      │
├────────────────────────────────────────────────────────┤
│ 8. LatestPostsSection: MDX Knowledge Hub Articles      │
├────────────────────────────────────────────────────────┤
│ 9. FaqSection: Search-Indexed Radix Accordion          │
├────────────────────────────────────────────────────────┤
│ 10. CtaBanner: High-Intent Closing Consultation CTA    │
└────────────────────────────────────────────────────────┘
```

---

## 7. Motion & Interaction Standards

### 7.1 Smooth Scrolling (Lenis Engine)
- Implemented in `components/layout/smooth-scroll.tsx`.
- **Desktop**: Native V-Sync `requestAnimationFrame` loop with `duration: 1.2s` and exponential easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- **Mobile Touch**: `syncTouch: true`, `syncTouchLerp: 0.085`, `touchInertiaExponent: 1.75` for buttery momentum on touchscreens.
- **Scroll Isolation**: `data-lenis-prevent` applied to modals, sheets, and dropdowns.

### 7.2 Hardware Acceleration Guidelines
- All infinite horizontal marquees (`.animate-scroll-left`, `.animate-scroll-right`) must use `translate3d(..., 0, 0)` with `will-change: transform`.
- Ambient Gaussian blur blobs (`.glow-blob`, `blur-3xl`, `blur-2xl`) must include `transform: translateZ(0)` to avoid CPU re-rasterization during scrolling.

### 7.3 Offscreen Optimization
- **3D Spline Scene**: Automatically hidden and set to `content-visibility: hidden` via `IntersectionObserver` when scrolled offscreen, saving GPU cycles.
- **Below-the-Fold Sections**: Wrapped with `.defer-paint` (`content-visibility: auto; contain-intrinsic-size: auto 640px;`).

---

## 8. Accessibility & Quality Rules

1. **Contrast Compliance**: Text must meet WCAG 2.1 AA standards (minimum 4.5:1 for body text, 3:1 for large display text).
2. **Reduced Motion**: All animations and transforms must respect `@media (prefers-reduced-motion: reduce)` with instant snapping or disabled loops.
3. **Semantic HTML**: Single `<h1>` per page, hierarchical `<h2>` through `<h4>`, `<main>`, `<section>`, and `<aside>`.
4. **Touch Targets**: All interactive touch targets on mobile must measure at least 44×44px.
