import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { marketsShortLine } from "@/lib/seo";
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
    // No city here. This is the most-seen title on the site, and "Ludhiana,
    // India" in it caps the whole domain to one market. Geography now lives on
    // /about and the location pages, where it reads as credibility rather than
    // as a limit.
    default:
      "Velex Infotech | AI Agent Development & AI Automation Company",
    template: "%s | Velex Infotech",
  },
  description: siteConfig.description,
  // `keywords` has had zero ranking value at Google and Bing for years. Kept
  // only as human-readable documentation of what each page is meant to target —
  // deleting it outright tends to invite someone to re-add it worse.
  keywords: [
    "AI agent development services",
    "agentic AI development services",
    "AI automation services for small business",
    "AI receptionist for small business",
    "WhatsApp AI chatbot development company",
    "data analytics consulting services",
    "custom software development services",
    "AI integration services",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  // Defaults only — each page overrides url/title/description via
  // `pageMetadata()` in lib/seo.ts. No `images` key here: the og:image comes
  // from the `opengraph-image` file convention, which takes priority over the
  // metadata object and can't 404 the way the old /og-default.jpg reference did.
  openGraph: {
    title: "Velex Infotech — AI Agents & Automation for Growing Businesses",
    description: `AI agents, automation, voice and WhatsApp assistants, and custom software for businesses in the ${marketsShortLine}.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    // OG alternates describe rendering hints, not alternate URLs — this is the
    // one place a locale array is correct. It is NOT hreflang, and must not be
    // mistaken for it: there is a single URL set.
    alternateLocale: [...siteConfig.ogLocaleAlternate],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velex Infotech | AI Agents, Automation & Custom Software",
    description: `AI agents and automation built for businesses in the ${marketsShortLine}.`,
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
  // Sourced from siteConfig so the tokens live with the rest of the site
  // identity. Each key is omitted entirely when its token is empty — an empty
  // <meta content=""> is worse than no tag. Paste the tokens into
  // config/site.ts; DNS verification is the better option and covers www too.
  ...(siteConfig.verification.google || siteConfig.verification.bing
    ? {
        verification: {
          ...(siteConfig.verification.google
            ? { google: siteConfig.verification.google }
            : {}),
          ...(siteConfig.verification.bing
            ? { other: { "msvalidate.01": siteConfig.verification.bing } }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.htmlLang}
      className={`${fontVariables} light`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon links come from the `icons` metadata above — declaring them
            here too emitted every tag twice.

            The Spline preconnect used to live here, which meant it fired on
            /privacy-policy and every other route that will never load a 3D
            scene. It now lives in app/page.tsx, the only page that uses it. */}
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
      {/* `suppressHydrationWarning` is NOT inherited from <html> — React reads it
          per element — so <body> needs its own. Extensions write attributes here
          before React hydrates (Bitdefender's `bis_register` and
          `__processed_<uuid>__` are the ones seen in practice), and every one of
          them produced a mismatch warning that buried real ones. This suppresses
          attribute noise on <body> only; children still report normally. */}
      <body
        className="min-h-dvh bg-void font-sans text-primary antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <LeadFormModal />
        </Providers>
      </body>
      {/* Sibling of <body>, per the Next 16 guide — the component renders two
          next/script tags, which React hoists. Guarded so a missing ID renders
          nothing rather than `gtag('config', '')`, which would silently collect
          into no property at all. */}
      {siteConfig.gaMeasurementId ? (
        <GoogleAnalytics gaId={siteConfig.gaMeasurementId} />
      ) : null}
    </html>
  );
}
