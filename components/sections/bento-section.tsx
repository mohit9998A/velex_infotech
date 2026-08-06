import { ShieldCheck, Clock, Gem, MessageSquareReply } from "lucide-react";

import type { StatItem } from "@/types";
import statsData from "@/content/stats.json";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";

const stats = statsData as StatItem[];

export function BentoSection() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Edge"
          title="Why Velex Infotech"
          subtitle="Not all agencies are created equal. We engineer intelligence — and back it with proof."
        />

        <div className="mt-14 grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Featured quote */}
          <div className="glass-card col-span-2 row-span-2 flex flex-col justify-between p-7 lg:p-9">
            <Gem className="size-8 text-gold" />
            <blockquote className="mt-6">
              <p className="font-display text-2xl leading-snug text-primary md:text-3xl">
                &ldquo;We don&apos;t just build software. We{" "}
                <span className="text-gradient">engineer intelligence</span>.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-secondary">
                — The Velex Infotech philosophy
              </footer>
            </blockquote>
          </div>

          <StatCard value={stats[0].value} suffix={stats[0].suffix} label={stats[0].label} />
          <StatCard value={stats[1].value} suffix={stats[1].suffix} label={stats[1].label} />

          {/* Crystal quality */}
          <div className="glass-card glass-gold flex flex-col justify-center p-6">
            <Gem className="size-6 text-gold" />
            <p className="mt-3 font-display text-lg text-primary">Crystal Quality</p>
            <p className="mt-1 text-xs text-secondary">Guaranteed on every build.</p>
          </div>

          {/* Timezone coverage.
              Was "24/7 Support / We're here whenever you scale" — which now
              directly contradicts the 09:00–19:00 IST working hours published
              on /contact. Two pages making incompatible availability claims is
              the kind of thing a buyer notices and a rater penalises. */}
          <div className="glass-card flex flex-col justify-center p-6">
            <Clock className="size-6 text-purple-glow" />
            <p className="mt-3 font-display text-lg text-primary">
              UK &amp; US overlap
            </p>
            <p className="mt-1 text-xs text-secondary">
              Live hours with London, New York and Toronto.
            </p>
          </div>

          <StatCard value={stats[2].value} suffix={stats[2].suffix} label={stats[2].label} />
          <StatCard value={stats[3].value} suffix={stats[3].suffix} label={stats[3].label} />

          {/* SLA / security */}
          <div className="glass-card flex flex-col justify-center p-6">
            <ShieldCheck className="size-6 text-success" />
            <p className="mt-3 font-display text-lg text-primary">Enterprise-grade</p>
            <p className="mt-1 text-xs text-secondary">Secure, compliant, reliable.</p>
          </div>

          {/* Response commitment.
              This tile previously read "5.0 Average / Across 47 client reviews"
              — a claim with nothing behind it, on a site whose own
              lib/schema.ts deliberately refuses to emit aggregateRating for
              exactly that reason. The machine-readable layer was honest while
              the human-visible one wasn't, which is the worse way round: a
              reviewer who checked the structured data would have caught the
              contradiction. Replaced with something verifiable. */}
          <div className="glass-card flex flex-col justify-center p-6">
            <MessageSquareReply className="size-6 text-gold" />
            <p className="mt-3 font-display text-2xl text-primary">
              1 business day
            </p>
            <p className="mt-1 text-xs text-secondary">
              Every enquiry answered by a person.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
