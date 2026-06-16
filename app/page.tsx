import { HeroSection } from "@/components/sections/hero-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesSection } from "@/components/sections/services-section";
import { BentoSection } from "@/components/sections/bento-section";
import { ProcessSection } from "@/components/sections/process-section";
import { IntegrationsSection } from "@/components/sections/integrations-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <BentoSection />
      <ProcessSection />
      <IntegrationsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
