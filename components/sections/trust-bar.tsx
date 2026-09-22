import type { CSSProperties } from "react";

import { permittedClients as clients } from "@/lib/clients";

export function TrustBar() {
  // Repeat clients array 4 times per pass (16 items) so each pass spans >2800px,
  // preventing empty space on wide screens when translating by -50%.
  const singlePass = [...clients, ...clients, ...clients, ...clients];
  const items = [...singlePass, ...singlePass];

  return (
    <section className="border-y border-vx-border bg-surface/50 py-10">
      <p className="mb-7 text-center font-mono-label text-[#7138FF] dark:text-[#8B4DFF]">
        Selected client work
      </p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div
          style={{ "--marquee-gap": "4rem" } as CSSProperties}
          className="flex w-max animate-scroll-left items-center gap-16 group-hover:[animation-play-state:paused]"
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= singlePass.length || undefined}
              className="whitespace-nowrap font-display text-xl text-[#7138FF]/80 dark:text-[#8B4DFF]/80 transition-colors hover:text-[#7138FF] dark:hover:text-white"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
