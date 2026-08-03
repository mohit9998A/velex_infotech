import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LeadFormModal } from "@/components/forms/lead-form-modal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Velex Infotech | AI Automation & Premium Web Development | Ludhiana, India",
    template: "%s | Velex Infotech",
  },
  description: siteConfig.description,
  keywords: [
    "AI automation India",
    "agentic AI company",
    "WhatsApp chatbot development",
    "web development Ludhiana",
    "AI agency Punjab",
    "voice AI agent India",
    "premium website development India",
    "AI integration services",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  // Defaults only — each page overrides url/title/description via
  // `pageMetadata()` in lib/seo.ts. No `images` key here: the og:image comes
  // from the `opengraph-image` file convention, which takes priority over the
  // metadata object and can't 404 the way the old /og-default.jpg reference did.
  openGraph: {
    title: "Velex Infotech — Intelligent AI Solutions for Modern Business",
    description:
      "Premium AI-powered digital services. AI Automation, Voice Agents, WhatsApp Bots, Luxury Web Development.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velex Infotech | AI Automation & Web Development",
    description: "Premium AI solutions for Indian businesses.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/favicon.ico" },
    shortcut: "/favicon.ico",
  },
  alternates: { canonical: siteConfig.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // TODO(velex): paste the tokens from Google Search Console and Bing Webmaster
  // Tools, then uncomment. Until then the site must be verified by DNS or file
  // upload instead. See the plan's "Manual follow-ups" section.
  // verification: {
  //   google: "REPLACE_WITH_GOOGLE_SITE_VERIFICATION_TOKEN",
  //   other: { "msvalidate.01": "REPLACE_WITH_BING_TOKEN" },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fontVariables} dark`} suppressHydrationWarning>
      <head>
        {/* Favicon links come from the `icons` metadata above — declaring them
            here too emitted every tag twice. Only the Spline preconnect, which
            metadata can't express, stays. */}
        <link rel="preconnect" href="https://prod.spline.design" />
        {/* Site-wide structured data. Rendered as a plain script in the server
            HTML — this previously used next/script with strategy
            "afterInteractive", so it only existed after JS ran and crawlers
            that don't execute scripts never saw it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationSchema(), websiteSchema()),
          }}
        />
      </head>
      <body className="min-h-dvh bg-void font-sans text-primary antialiased">
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <LeadFormModal />
        </Providers>
      </body>
    </html>
  );
}
