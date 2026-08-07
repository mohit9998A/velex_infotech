import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { SectionHeader } from "@/components/common/section-header";
import { ServiceCard } from "@/components/common/service-card";

const services = servicesData as ServiceItem[];

export function ServicesSection() {
  return (
    <section id="services" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="What We Build"
          title="Premium AI services for the bold"
          // Derived, not literalled: this read "Seven core capabilities" while
          // services.json held ten. A number a visitor can falsify by counting
          // the cards directly beneath it.
          subtitle={`${services.length} core capabilities, engineered to give ambitious businesses an unfair advantage.`}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              className={i === 0 ? "lg:row-span-1" : ""}
            />
          ))}
          {/* CTA tile fills the 8th cell on xl */}
          <div className="hidden items-center justify-center rounded-2xl border border-dashed border-vx-border-bright bg-purple-core/[0.04] p-6 text-center xl:flex">
            <p className="font-display text-lg text-secondary">
              Need something <span className="text-gradient">bespoke</span>?
              <br />
              Let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
