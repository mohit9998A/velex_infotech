/**
 * The 2px reading-progress bar. A SERVER component with zero JavaScript.
 *
 * This was 19 lines of framer-motion (`useScroll` + `useSpring` + `motion.div`)
 * — and because it is rendered in the root layout, those 19 lines were the sole
 * reason all of framer-motion sat in the shared chunk of every route on the
 * site, including /blog, /privacy-policy and /terms-of-service, which use no
 * animation library at all.
 *
 * It is now a CSS scroll-driven animation. See `.scroll-progress` in
 * globals.css.
 *
 * The `@supports` gate there follows the same discipline as
 * `.reveal-on-scroll`, but note the failure mode is inverted and safe: an
 * unsupported browser simply gets no progress bar, whereas stranding *content*
 * at opacity 0 would be fatal. That asymmetry is why the two gates exist for
 * different reasons.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[110] h-0.5 bg-gradient-to-r from-purple-glow via-purple-core to-gold"
    />
  );
}
