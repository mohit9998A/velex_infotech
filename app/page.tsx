import ReactDOM from "react-dom";

import { marketsShortLine, pageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestPostsSection } from "@/components/sections/latest-posts";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesSection } from "@/components/sections/services-section";
import { BentoSection } from "@/components/sections/bento-section";
import { ProcessSection } from "@/components/sections/process-section";
import { IntegrationsSection } from "@/components/sections/integrations-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";

// The homepage previously exported no metadata at all, so its canonical and
// og:url came from the root layout defaults. `title.absolute` bypasses the
// `%s | Velex Infotech` template, which would otherwise append the brand to a
// title that already leads with it.
export const metadata = {
  ...pageMetadata({
    path: "/",
    title: "AI Agent Development & Automation Company",
    description: `Velex Infotech builds AI agents, automation, AI receptionists and WhatsApp chatbots for businesses in the ${marketsShortLine}. Headquartered in India.`,
  }),
  // 45 characters. The previous absolute title was 71 and truncated in the
  // SERP — and the part that got cut was never the useful part.
  title: {
    absolute: "AI Agent Development Company | Velex Infotech",
  },
};

export default function HomePage() {
  // Scoped here rather than in the root layout, where it fired on every route
  // including /privacy-policy. React 19 hoists resource hints from Server
  // Components into <head>. It matters more now than it did before: the Spline
  // fetch is deliberately deferred to idle, so the connection wants warming.
  ReactDOM.preconnect("https://prod.spline.design");

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <BentoSection />
      <ProcessSection />
      <IntegrationsSection />
      <PortfolioSection />
      {/* TestimonialsSection is deliberately not rendered. Every entry in
          content/testimonials.json is `placeholder: true`, so the component
          returns null — but its `return null` sits after useEmblaCarousel and
          two effects, so embla shipped in this page's bundle and a 5s interval
          ran forever for zero pixels. Restore this line once real testimonials
          exist; the component's own docblock documents what that needs. */}
      {/* The blog previously had no link from the homepage at all — it was
          reachable only through the nav. A homepage link is the strongest
          internal signal a new post can get. */}
      <LatestPostsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
