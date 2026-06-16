import type { IntegrationItem } from "@/types";
import integrationsData from "@/content/integrations.json";
import { SectionHeader } from "@/components/common/section-header";

const integrations = integrationsData as IntegrationItem[];

function Tile({ item }: { item: IntegrationItem }) {
  return (
    <div className="flex w-max items-center gap-3 rounded-xl border border-vx-border bg-surface/60 px-5 py-3 backdrop-blur-sm">
      <span className="flex size-9 items-center justify-center rounded-lg bg-purple-core/15 font-mono text-sm font-semibold text-purple-glow">
        {item.abbr}
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
        {[...items, ...items].map((item, i) => (
          <Tile key={`${item.name}-${i}`} item={item} />
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
