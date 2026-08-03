import { pageMetadata } from "@/lib/seo";
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

// The homepage previously exported no metadata at all, so its canonical and
// og:url came from the root layout defaults. `title.absolute` bypasses the
// `%s | Velex Infotech` template, which would otherwise append the brand to a
// title that already leads with it.
export const metadata = {
  ...pageMetadata({
    path: "/",
    title: "AI Automation & Agentic AI Company in India",
    description:
      "Velex Infotech builds AI automation, agentic AI, voice agents and WhatsApp chatbots for businesses across India. Based in Ludhiana, Punjab.",
  }),
  title: {
    absolute:
      "Velex Infotech | AI Automation & Agentic AI Company in India | Ludhiana",
  },
};

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
