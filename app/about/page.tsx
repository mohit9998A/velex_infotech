import { Gem, Target, ShieldCheck, Rocket, MapPin } from "lucide-react";

import type { StatItem } from "@/types";
import statsData from "@/content/stats.json";
import { siteConfig } from "@/config/site";
import { marketsShortLine, officesLine, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, personSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { SectionHeader } from "@/components/common/section-header";
import { StatCard } from "@/components/common/stat-card";
import { ConsultButtons } from "@/components/common/consult-buttons";
import { CtaBanner } from "@/components/sections/cta-banner";

const stats = statsData as StatItem[];

// Title omits the brand — the root layout's `%s | Velex Infotech` template
// appends it. Including it here produced "... | Velex Infotech | Velex Infotech".
export const metadata = pageMetadata({
  path: "/about",
  title: "About Velex Infotech — AI Engineering from India",
  description: `Velex Infotech builds AI agents, automation and custom software for businesses in the ${marketsShortLine}. Founded by Mohit Dutta, with engineering hubs in ${officesLine}.`,
});

const values = [
  { icon: Gem, title: "Crystalline quality", description: "Every build is faceted with precision. We ship work we're proud to sign." },
  { icon: Target, title: "Outcome-obsessed", description: "We define measurable success up front and engineer toward it relentlessly." },
  { icon: ShieldCheck, title: "Enterprise trust", description: "Secure, compliant and reliable — the standard our clients depend on." },
  { icon: Rocket, title: "Built to scale", description: "From MVP to production, we architect for the growth that follows." },
];

export default function AboutPage() {
  // One value feeds both the visible trail and the schema, so they cannot drift.
  const trail = [{ name: "About", path: "/about" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // The full Person node is emitted here and only here — every other
          // reference (Organization.founder, BlogPosting.author) points at its
          // @id. The `#mohit-dutta` fragment resolves to the founder card below.
          __html: jsonLd(personSchema(), breadcrumbSchema(trail)),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[40rem] -translate-x-1/2 glow-blob" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs trail={trail} />
          <div className="mt-6 text-center">
            <span className="font-mono-label text-purple-glow">About Us</span>
            <h1 className="mt-4 font-display text-h1 text-balance text-primary">
              We engineer <span className="text-gradient">intelligence</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-secondary md:text-lg">
              {siteConfig.name} builds AI agents, automation and custom software
              for businesses in the {marketsShortLine}. We are headquartered in
              India, with engineering in {officesLine} — which is how we deliver
              senior-level work at a rate onshore teams struggle to match.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader align="left" eyebrow="Our Story" title="Founded to make AI useful" />
            <div className="mt-6 flex flex-col gap-4 text-secondary">
              <p>
                Velex Infotech was founded by{" "}
                <strong className="text-primary">Mohit Dutta</strong>, a technology
                entrepreneur who specialises in AI automation and applied AI
                systems for growing businesses.
              </p>
              <p>
                We started with a simple belief: most companies don&apos;t need more
                software — they need intelligence woven into the way they already
                work. So we build AI agents, automation, voice assistants,
                WhatsApp bots, analytics and custom software that move the numbers
                that matter.
              </p>
              <p>
                India is our home and our engineering base. Our HQ is in Ludhiana,
                with a second engineering team in Noida — and our clients are in
                the United States, United Kingdom, Canada and India.
              </p>
            </div>

            {/* What an offshore buyer actually needs to know before enquiring.
                None of this was answered anywhere on the site before. */}
            <dl className="mt-8 flex flex-col gap-4 border-t border-vx-border pt-6">
              {[
                {
                  q: "Who does the work?",
                  a: "Our own salaried engineers in Ludhiana and Noida. We don't subcontract your project to a third party.",
                },
                {
                  q: "How do we overlap with your timezone?",
                  a: "We work 09:00–19:00 IST. That is full overlap with UK hours, a four-hour live window with US Eastern, and a two-hour window with US Pacific — with an async handover every morning.",
                },
                {
                  q: "Where does your data live?",
                  a: "In the region you choose. We deploy to your cloud account where you have one, and we'll sign a DPA before any production data moves.",
                },
              ].map((item) => (
                <div key={item.q} className="flex flex-col gap-1">
                  <dt className="text-primary">{item.q}</dt>
                  <dd className="text-sm text-secondary">{item.a}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-secondary">
              <MapPin className="size-4 text-purple-glow" /> {officesLine}
            </p>
          </div>

          {/* Founder card. The id backs the Person node's @id fragment above —
              an @id pointing at nothing on the page is a smell. */}
          <div id="mohit-dutta" className="glass-card flex flex-col items-start p-8">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-core to-purple-deep font-display text-2xl font-bold text-white">
              MD
            </span>
            <h3 className="mt-5 font-display text-2xl text-primary">Mohit Dutta</h3>
            <p className="text-sm text-purple-glow">Founder &amp; CEO</p>
            <p className="mt-4 text-secondary">
              &ldquo;We don&apos;t just build software. We engineer intelligence — and back it with proof.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader eyebrow="What we stand for" title="Our principles" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-6">
                <v.icon className="size-6 text-gold" />
                <h3 className="mt-4 font-display text-lg text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-secondary">{v.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <ConsultButtons />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
