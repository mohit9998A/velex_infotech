import type { Metadata } from "next";
import Script from "next/script";

import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
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
  openGraph: {
    title: "Velex Infotech — Intelligent AI Solutions for Modern Business",
    description:
      "Premium AI-powered digital services. AI Automation, Voice Agents, WhatsApp Bots, Luxury Web Development.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: siteConfig.name }],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velex Infotech | AI Automation & Web Development",
    description: "Premium AI solutions for Indian businesses.",
    images: ["/og-default.jpg"],
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
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description:
    "Premium AI automation and digital services agency. Intelligent Solutions. Premium Results.",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo/velex-logo.svg`,
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: "Founder & CEO",
    telephone: siteConfig.phone,
    email: siteConfig.email,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Punjabi"],
    areaServed: "IN",
  },
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Digital Services",
    itemListElement: [
      "AI Automation",
      "Agentic AI Development",
      "Voice AI Agent",
      "WhatsApp AI Chatbot",
      "Website Development",
      "App Development",
      "AI Integration",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
      </head>
      <body className="min-h-dvh bg-void font-sans text-primary antialiased">
        <Script
          id="velex-organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
