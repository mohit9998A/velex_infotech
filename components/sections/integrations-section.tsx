import type { CSSProperties } from "react";

import type { IntegrationItem } from "@/types";
import integrationsData from "@/content/integrations.json";
import { SectionHeader } from "@/components/common/section-header";

const integrations = integrationsData as IntegrationItem[];

/**
 * Logos are self-hosted SVGs under public/images/integrations.
 *
 * They previously loaded from cdn.simpleicons.org and icon.horse — 14 logos
 * rendered twice for the marquee loop meant 28 uncontrolled third-party
 * requests on the homepage, from two origins that were neither preconnected
 * nor in next.config remotePatterns, with no dimensions (layout shift) and a
 * hard availability dependency on a favicon-scraping service.
 *
 * Rendered with a plain <img> rather than next/image on purpose: optimising
 * SVG through /_next/image would require `dangerouslyAllowSVG`, and these are
 * ~600-byte static files that need no optimisation. `currentColor` fills let
 * them inherit the theme instead of shipping near-black brand hexes onto a
 * near-black background.
 */
/**
 * No `backdrop-blur-sm`.
 *
 * A backdrop-filter inside a continuously-transforming ancestor can never
 * cache its blur — the sampled region moves every frame, so the compositor
 * re-reads and re-blurs the backdrop for all 28 tiles at 60fps, forever,
 * whether or not the section is on screen. It was the largest sustained GPU
 * cost on the homepage.
 *
 * What sits behind these tiles is `grid-bg` at 40% opacity over a flat
 * `--vx-void`, so blurring it produced almost nothing visible. `bg-surface/80`
 * (up from /60) covers the small difference in opacity.
 */
function Tile({ item, ariaHidden }: { item: IntegrationItem; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex w-max items-center gap-3 rounded-xl border border-vx-border bg-surface/80 px-5 py-3"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-white/5 font-mono text-sm font-semibold text-purple-glow">
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- local SVG; see note above
          <img
            src={item.logo}
            alt=""
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            className="size-5 text-secondary"
          />
        ) : (
          item.abbr
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-secondary">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: IntegrationItem[];
  reverse?: boolean;
}) {
  return (
    <div className="group overflow-hidden">
      {/* `--marquee-gap` must equal the `gap-4` below (1rem). The keyframe
          subtracts half of it, because a gapped flex track's true loop period
          is N*w + N*g, not the -50% that a gapless one would use. */}
      <div
        style={{ "--marquee-gap": "1rem" } as CSSProperties}
        className={`flex w-max gap-4 ${reverse ? "animate-scroll-right" : "animate-scroll-left-slow"} group-hover:[animation-play-state:paused]`}
      >
        {/* Both passes are flat siblings of the same track. The duplicate used
            to be wrapped in its own flex container, which added one extra gap
            before it and made the two halves unequal — so -50% never landed on
            a copy boundary. `aria-hidden` per tile keeps the duplicate out of
            the accessibility tree and out of the crawlable text, which would
            otherwise show all 14 brand names twice. */}
        {items.map((item) => (
          <Tile key={item.name} item={item} />
        ))}
        {items.map((item) => (
          <Tile key={`${item.name}-dup`} item={item} ariaHidden />
        ))}
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const mid = Math.ceil(integrations.length / 2);
  const rowA = integrations.slice(0, mid);
  const rowB = integrations.slice(mid);

  return (
    <section className="defer-paint section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Connected"
          title="Plugs into your entire stack"
          subtitle="We integrate with the tools you already rely on — and the AI platforms defining what's next."
        />

        <div className="mt-14 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
