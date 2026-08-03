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
function Tile({ item }: { item: IntegrationItem }) {
  return (
    <div className="flex w-max items-center gap-3 rounded-xl border border-vx-border bg-surface/60 px-5 py-3 backdrop-blur-sm">
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
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-scroll-right" : "animate-scroll-left-slow"} group-hover:[animation-play-state:paused]`}
      >
        {items.map((item) => (
          <Tile key={item.name} item={item} />
        ))}
        {/* Second pass exists only so the translateX(-50%) loop is seamless.
            Hidden from assistive tech and from the crawlable text, which would
            otherwise see all 14 brand names twice on the homepage. */}
        <div className="flex w-max gap-4" aria-hidden="true">
          {items.map((item) => (
            <Tile key={`${item.name}-dup`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const mid = Math.ceil(integrations.length / 2);
  const rowA = integrations.slice(0, mid);
  const rowB = integrations.slice(mid);

  return (
    <section className="section-pad relative overflow-hidden">
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
