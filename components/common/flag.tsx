import { cn } from "@/lib/utils";

/**
 * Inline SVG flags for the four markets in config/site.ts.
 *
 * Not Unicode regional-indicator emoji. Windows ships no colour flag glyphs, so
 * every browser on it renders the two-letter code instead — which, next to a
 * label, came out as "US / US" and "GB / UK". Not broken exactly, but it reads
 * as a rendering fault on the highest-intent surface on the site.
 *
 * Not a flag sprite or icon package either: four markets is four small paths,
 * and this ships in the lazily-loaded modal chunk at roughly 1 KB total with no
 * network request and no dependency.
 *
 * Simplified at this size on purpose — the US canton has no stars and the Union
 * Jack's diagonals are not offset, because neither survives 24x16 px anyway.
 * Anything outside these four falls back to `null`; callers pair the flag with
 * a visible country label, so nothing is lost when it is absent.
 */
const flags: Record<string, React.ReactNode> = {
  US: (
    <>
      <rect width="24" height="16" fill="#fff" />
      <g fill="#b22234">
        <rect width="24" height="1.23" />
        <rect y="2.46" width="24" height="1.23" />
        <rect y="4.92" width="24" height="1.23" />
        <rect y="7.38" width="24" height="1.23" />
        <rect y="9.85" width="24" height="1.23" />
        <rect y="12.31" width="24" height="1.23" />
        <rect y="14.77" width="24" height="1.23" />
      </g>
      <rect width="10" height="8.61" fill="#3c3b6e" />
    </>
  ),
  GB: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.9" />
      <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0V16M0 8H24" stroke="#c8102e" strokeWidth="3.2" />
    </>
  ),
  CA: (
    <>
      <rect width="24" height="16" fill="#fff" />
      <rect width="6" height="16" fill="#d80621" />
      <rect x="18" width="6" height="16" fill="#d80621" />
      <path
        fill="#d80621"
        d="M12 3.2l.9 1.9 1.9-.5-.7 1.8 1.5 1.1-1.5.8.4 1.7-1.9-.4-.1 2h-1l-.1-2-1.9.4.4-1.7-1.5-.8 1.5-1.1-.7-1.8 1.9.5z"
      />
    </>
  ),
  IN: (
    <>
      <rect width="24" height="5.33" fill="#f93" />
      <rect y="5.33" width="24" height="5.34" fill="#fff" />
      <rect y="10.67" width="24" height="5.33" fill="#128807" />
      <circle cx="12" cy="8" r="2" fill="none" stroke="#008" strokeWidth="0.45" />
      <circle cx="12" cy="8" r="0.5" fill="#008" />
    </>
  ),
};

export function Flag({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) {
  const paths = flags[countryCode.toUpperCase()];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 16"
      // Decorative: every call site renders the country name alongside.
      aria-hidden="true"
      className={cn("h-4 w-6 shrink-0 rounded-[2px]", className)}
    >
      {paths}
    </svg>
  );
}
