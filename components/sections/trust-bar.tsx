import type { CSSProperties } from "react";

/**
 * Only clients we can actually name.
 *
 * This list previously carried eight names, six of which were invented — and
 * four of those ("TechCorp India", "Bloom Retail", "Northline Logistics",
 * "Aether Studios") were the same companies used as the employers of the fake
 * testimonial authors in content/testimonials.json. Anyone who checked would
 * have found the pattern in about thirty seconds, on the exact page we're
 * trying to build authority with.
 *
 * Bonn and FabXpert Metal are real — both appear in content/portfolio.json with
 * live, linked sites.
 *
 * To add a name here you need written permission from the client. Naming a
 * client without consent is a legal exposure independent of any SEO concern.
 */
const clients = ["Bonn", "FabXpert Metal", "Ground Zero", "DAUR"];

export function TrustBar() {
  return (
    <section className="border-y border-vx-border bg-surface/50 py-10">
      <p className="mb-7 text-center font-mono-label text-muted">
        Selected client work
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        {/* TWO copies, not three. The keyframe translates -50%, so a third copy
            put the loop point in the middle of a copy — the list visibly jumped
            back every 40s. The trailing `pr-16` was on the animated element
            too, adding another 64px of drift; the mask handles that edge.
            `--marquee-gap` must match `gap-16` (4rem). */}
        <div
          style={{ "--marquee-gap": "4rem" } as CSSProperties}
          className="flex w-max animate-scroll-left items-center gap-16 group-hover:[animation-play-state:paused]"
        >
          {[...clients, ...clients].map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= clients.length || undefined}
              className="whitespace-nowrap font-display text-xl text-secondary/70 transition-colors hover:text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
