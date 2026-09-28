# Velex Infotech — Section Design System & Component Architecture (`components/sections`)

> **Aesthetic Philosophy**: *"Crystalline Intelligence"*  
> A high-performance, dark-mode-first aesthetic engineered for trust, technical authority, and visual elegance. Combines deep obsidian voids (`#04040A`), electric purple accents (`#7138FF`), vivid violet glows (`#8B4DFF`), soft lavender highlights (`#B99CFF`), and crisp typography.

---

## 1. Global Visual Tokens & Foundations

### 1.1 Color Palette
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--vx-void` | `#04040A` | Primary dark background / page surface |
| `--vx-surface` | `#0A0818` | Elevated card surfaces and panels |
| `--vx-elevated` | `#100D24` | Floating popovers, modals, and dropdowns |
| `--vx-royal-purple`| `#5424D6` | Brand logo mark, primary brand identity |
| `--vx-electric-purple` | `#7138FF` | Primary action buttons, active states, light theme highlights |
| `--vx-vivid-violet` | `#8B4DFF` | Dark theme highlights, text gradients, glowing accents |
| `--vx-soft-lavender` | `#B99CFF` | Secondary text in dark mode, subtle borders |
| `--vx-crystal-white` | `#F8F7FF` | Light theme background, pure white text in dark mode |
| `--vx-midnight-navy` | `#0D0A24` | Primary text in light mode |

### 1.2 Typography Hierarchy
- **Display (`font-display`)**: Bold geometric headlines with tightened tracking (`-0.03em`) for high-impact numbers and brand statements.
- **Editorial Serif (`font-serif`)**: Elegant editorial headings (`Technology that moves your business`, `Plugs into your entire stack`). Italicized spans highlight core keywords in brand purple (`text-[#7138FF] dark:text-[#8B4DFF]`).
- **Body & Interface (`font-sans`)**: Crisp, readable sans-serif with high contrast for body copy, buttons, inputs, and card labels.
- **Technical Monospace (`font-mono` / `.font-mono-label`)**: Uppercase kicker eyebrows, timeline stages, dates, and technical metrics with `tracking-[0.18em]`.

### 1.3 Depth, Elevation & Glassmorphism
- **Hairline Borders**: `border border-slate-200/90 dark:border-white/10` with hover transitions to `hover:border-purple-400/60 dark:hover:border-purple-500/40`.
- **Translucent Glass Surfaces**: `bg-white/80 dark:bg-white/[0.03] backdrop-blur-md` with subtle inner bevels (`dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`).
- **Hardware-Accelerated Glows**: Ambient radial background gradients (`.glow-blob`, `blur-3xl`) promoted to GPU layers (`transform: translateZ(0)`).

---

## 2. Component Specifications

### 2.1 Hero Section (`hero-section.tsx`)
The entry point of the application, balancing high-conversion clarity with cutting-edge 3D aesthetics.

- **Responsive Split Architecture**:
  - **Desktop (`>= md`)**: Full-height interactive 3D Spline robot canvas (`InteractiveRobotSpline`). Loaded lazily on idle, automatically paused with `IntersectionObserver` when scrolled offscreen to conserve GPU.
  - **Mobile (`< md`)**: High-fidelity 3D robot image (`ROBOT_MOBILE_IMG`) with soft radial ambient glow and floating perspective alignment.
- **Dynamic Headline**:
  - Editorial serif with fluid clamp sizing (`clamp(2.35rem, 5.2vw, 4.25rem)`).
  - Integrated `RotatingHeroText` cycling through: `"AI Agents."`, `"Automation."`, `"Integrations."`, `"AI Strategy."` in `text-[#7138FF] dark:text-[#8B4DFF]`.
- **Interactive Eyebrow**:
  - Sleek horizontal accent bar (`h-[2.5px] w-6 bg-[#7138FF]`) paired with uppercase monospace kicker (`AI × SOFTWARE × REAL IMPACT`).
- **Action Group**:
  - Primary button: *"Get Started"* with gradient glow and hover arrow translation.
  - Secondary button: *"Book a Call"* with WhatsApp direct integration.
- **Metrics Bar**:
  - 3-column stats summary (`40+ Projects Delivered`, `20+ Clients Served`, `4 Markets Served`) with subtle dividers.

---

### 2.2 Trust Bar (`trust-bar.tsx`)
Seamless, infinite horizontal marquee displaying verified client engagements.

- **Animation**: Continuous marquee (`animate-scroll-left`) utilizing 3D transform (`translate3d(..., 0, 0)`) and `will-change: transform` for zero-jank 60/120Hz compositing.
- **Seam Math**: Seamless loop calculation `translateX(calc(-50% - var(--marquee-gap) / 2))` preventing stutter on cycle restart.
- **Theme Styling**:
  - Eyebrow: `.font-mono-label` in theme purple (`text-[#7138FF] dark:text-[#8B4DFF]`).
  - Client Names: `font-display text-xl text-[#7138FF]/80 dark:text-[#8B4DFF]/80 hover:text-[#7138FF] dark:hover:text-white`.
- **Edge Masking**: CSS mask gradient `[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]` creating soft edge dissipation.

---

### 2.3 Services Section (`services-section.tsx`)
Grid showcasing Velex's 10 core service offerings.

- **Card Architecture**:
  - Structured cards with Lucide icons mapped through `lib/icons.ts`.
  - Service titles, taglines, and concise overview bullet points.
  - Interactive hover state: `-translate-y-1.5`, border glow, and shadow bloom.
- **Routing Integration**:
  - Each card links directly to its dedicated landing page (`/services/[slug]`).
  - Strict byte-match alignment with `lib/validations/lead.ts` `SERVICE_OPTIONS`.

---

### 2.4 Bento Grid Section (`bento-section.tsx`)
Asymmetric multi-column bento grid illustrating four core technical pillars.

1. **Autonomous AI Agents**: Multi-agent orchestration, tool usage, decision loops, and persistent memory.
2. **Enterprise Automation**: End-to-end webhook pipelines, CRM sync, and automated data extraction.
3. **AI Receptionist & Voice Agents**: 24/7 call answering, sub-second latency, human-like voice synthesis.
4. **Custom AI Integrations**: Bespoke LLM fine-tuning, RAG vector search, and ERP/database connectors.
- **Visual Features**: Micro-animations, interactive toggle mockups, status indicators, and live pipeline diagrams.

---

### 2.5 Process Section (`process-section.tsx`)
Four-phase execution model: **01 Discovery** → **02 Strategy** → **03 Execution** → **04 Launch**.

- **Desktop Experience**:
  - Horizontal card track with ambient glow follower tracking the active card (`left: ${12.5 + currentStep * 25}%`).
  - Scroll-driven progressive step activation from 01 to 04 via `motion/react`'s `useScroll`.
  - Hover overrides allowing users to inspect any phase independently.
- **Mobile Experience**:
  - Vertical timeline with organic S-curve wavy SVG connection path.
  - Dynamically calculated node coordinates (`generateCurvyPath`) aligning with 3D step badges.
  - Progressive SVG path stroke fill animating smoothly as user scrolls through stages.

---

### 2.6 Integrations Section (`integrations-section.tsx`)
Interactive display of 14+ supported platforms (OpenAI, Anthropic, n8n, Make, Zapier, WhatsApp, HubSpot, Notion, Stripe, Google Workspace, etc.).

- **Dual-Row Marquee**:
  - Row A scrolls left (`animate-scroll-left-slow`), Row B scrolls right (`animate-scroll-right`).
  - Pause-on-hover interaction allowing visitors to inspect specific integration tiles.
- **Dark Mode Logo Inversion**:
  - Monochrome SVG logos utilize `dark:brightness-0 dark:invert` to ensure crisp white rendering against dark tiles while preserving dark appearance in light mode.
- **Fallback Badge**: Abbreviations (`AI`, `Tw`, `Sl`) styled with `font-mono text-purple-600 dark:text-purple-400`.

---

### 2.7 Portfolio Section (`portfolio-section.tsx`)
Case study showcase displaying verified production builds.

- **Verified Engagements**: Only published client projects (`placeholder: false` per `AGENTS.md`).
- **Dynamic Category Filter**: Filter pills (`All`, `AI Agents`, `Automation`, `Web & Mobile`).
- **Interactive Card Layout**:
  - Index & Category kicker (`01 / 04 · Ground Zero`).
  - Launch URL with external link arrow (`Launch site ↗`).
  - Tech stack tag pills with subtle borders.
  - Fixed 16:8.5 media aspect ratio on mobile to prevent image clipping.

---

### 2.8 Testimonials Section (`testimonials-section.tsx`)
Social proof module with carousel controls.

- **Integrity Rule**: Renders only real, traceable client reviews. All entries flagged `placeholder: true` are filtered out.
- **Carousel Controls**: Embla carousel with smooth snap transitions, touch swipe support, and pagination dots.

---

### 2.9 Latest Posts Section (`latest-posts.tsx`)
Dynamic blog preview pulling from `content/blog/index.ts`.

- **Card Layout**: Post category badge, reading time estimate, published date, and title.
- **SEO Value**: Strongest internal link signal on the homepage, boosting crawl authority for newly published articles.

---

### 2.10 FAQ Section (`faq-section.tsx`)
Structured accordion addressing commercial, technical, and engagement questions.

- **Accessibility**: Built with Radix UI Accordion (`@radix-ui/react-accordion`) with full keyboard navigation and ARIA attributes.
- **Schema Parity**: Visible accordion content matches `FAQPage` JSON-LD schema byte-for-byte (`AGENTS.md` Rule 2).

---

### 2.11 CTA Banner (`cta-banner.tsx`)
High-intent closing section positioned above the site footer.

- **Zero-JS Server Component**: Pure CSS scroll reveal (`.reveal-on-scroll`) avoiding animation library overhead.
- **Visual Framing**: Radial gradient glow (`w-[52rem] h-[30rem] bg-gradient-to-r from-blue-600/15 via-purple-600/25 to-pink-600/15 blur-3xl`).
- **Action Triggers**: Opens the consultation modal (`ConsultButtons`) or launches WhatsApp directly.

---

### 2.12 Location Shell (`location-shell.tsx`)
Reusable template layout for programmatic geo-landing pages (`/locations/ludhiana`, `/locations/india`, `/locations/usa`, etc.).

- **GEO & E-E-A-T Architecture**:
  - Hand-crafted content per city/country (no dynamic doorway routes).
  - Localized schema markup (`LocalBusiness` only when `hasAddress: true`).
  - Local office hours, currency hints, and regional case studies.

---

## 3. Motion & Interaction Standards

### 3.1 Smooth Scroll Engine
- Powered by **Lenis** (`components/layout/smooth-scroll.tsx`).
- Configured with `duration: 1.2`, cubic bezier easing `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- `syncTouch: true`, `syncTouchLerp: 0.085`, and `touchInertiaExponent: 1.75` for buttery momentum on mobile touchscreens.
- `[data-lenis-prevent]` applied to modals and sheets to isolate internal scrolling.

### 3.2 Performance Optimizations
- **`.defer-paint`**: `content-visibility: auto; contain-intrinsic-size: auto 640px;` on below-the-fold sections to skip offscreen layout passes.
- **State Throttling**: Scroll event listeners (`useScrolled`, `WhatsAppButton`) only trigger React state updates when crossing thresholds (`prev !== next`).
- **GPU Compositing**: All infinite animations use `translate3d` and `will-change: transform`.
