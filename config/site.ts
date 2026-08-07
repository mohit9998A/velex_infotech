export const siteConfig = {
  name: "Velex Infotech",
  shortName: "Velex",
  tagline: "Intelligent Solutions. Premium Results.",
  // The canonical origin. Every canonical tag, og:url, sitemap entry, robots
  // directive and JSON-LD @id is derived from this — no other file should hold
  // the domain as a literal. Must match the live domain exactly (no trailing
  // slash, no `www.`, which 301s to the apex via next.config.ts).
  url: "https://velexinfotech.com",
  description:
    "AI agents, AI automation, voice and WhatsApp assistants, and custom software for businesses in the United States, United Kingdom, Canada and India. Engineered from Ludhiana and Noida.",
  founder: "Mohit Dutta",
  /**
   * The single published contact address, on the verified domain. Everything
   * visitor-facing reads this one field — schema, /contact, both legal pages,
   * llms.txt, the footer, /locations/ludhiana and the newsletter mailto — so
   * there is exactly one address to keep true. The site previously led with
   * this in the footer while every other surface still published a gmail.
   */
  email: "team@velexinfotech.com",
  /**
   * Where lead-form submissions are delivered. Deliberately NOT `email`: the
   * Resend sender is still the sandbox `onboarding@resend.dev`, which can only
   * deliver to the account owner's own verified address. Point this at the
   * domain before that changes and every enquiry fails — see the comment in
   * app/api/contact/route.ts.
   *
   * TODO(velex): move to leads@velexinfotech.com in the same change that
   * switches `from:` to the domain, once SPF+DKIM are verified in Resend.
   */
  leadInbox: "velexinfotech@gmail.com",
  phoneDisplay: "+91 89689 35766",
  phone: "+918968935766",
  whatsapp: "https://wa.me/918968935766",
  /**
   * Plain `en`, not `en-IN`.
   *
   * `lang` is a user-agent/assistive-tech hint, not a Google geo-targeting
   * signal. Its real effect is on screen-reader pronunciation and on what an
   * LLM infers about the audience when it reads the raw HTML — and `en-IN`
   * announces "Indian English" to every US, UK and Canadian visitor. India
   * signals come from the Ludhiana NAP and the Organization address, not here.
   */
  htmlLang: "en",
  /** Open Graph requires xx_XX. `en_US` is the neutral platform default. */
  ogLocale: "en_US",
  ogLocaleAlternate: ["en_GB", "en_CA", "en_IN"],
  /**
   * Search Console / Bing Webmaster tokens. Public strings with no secret
   * value, so they live here rather than in env vars — env indirection is
   * exactly how they silently vanish on a new deploy. Empty strings render no
   * meta tag at all (see app/layout.tsx).
   *
   * TODO(velex): paste the tokens from Search Console and Bing Webmaster Tools.
   * Until one of these is set, there is no index coverage data and the
   * indexing problem cannot be diagnosed — only guessed at.
   */
  verification: {
    google: "",
    bing: "",
  },
  /**
   * GA4 measurement ID. Public by definition — it ships in the page source of
   * every site that uses it — so it lives here with the rest of the site
   * identity rather than in an env var that silently vanishes on a new deploy.
   *
   * Rendered via <GoogleAnalytics> from @next/third-parties in app/layout.tsx,
   * not the raw gtag snippet. The component emits the same two tags, but routes
   * them through next/script so they load `afterInteractive` and survive client
   * navigation without re-executing.
   *
   * Note: neither the component nor the raw snippet fires a page_view on an App
   * Router client-side navigation. That is GA4's job — Admin > Data Streams >
   * Enhanced measurement > "Page changes based on browser history events" must
   * stay enabled, or every visitor reads N pages and counts as one.
   *
   * Empty string renders nothing at all (see app/layout.tsx).
   */
  gaMeasurementId: "G-DW9TRM6Z6Q",
  /**
   * Only profiles that actually resolve.
   *
   * A `sameAs` entry pointing at a 404 is worse than omitting the profile: it
   * breaks the entity resolution that both Google's Knowledge Graph and every
   * LLM depend on. The LinkedIn, X and YouTube URLs previously listed here all
   * returned 404, and the footer rendered a visible dead link to LinkedIn.
   *
   * TODO(velex): create the LinkedIn company page first — it is the highest-
   * value missing profile — then add it back here and to the footer.
   */
  social: {
    instagram: "https://instagram.com/velexinfotech.ai",
  },
  stats: {
    // TODO(velex): replace with real, defensible counts. A specific small
    // number ("14 projects, 9 clients") reads as more credible than a round
    // large one and survives a prospect asking about it. The previous values
    // (200+ projects, 50+ enterprise clients) were unsourced for a company
    // founded in 2024 with four published projects.
    projects: "40+",
    clients: "20+",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Physical presence. Distinct from `markets` below: an office is somewhere
 * people sit, a market is somewhere clients are.
 *
 * Only an office with `hasAddress: true` may emit a LocalBusiness /
 * PostalAddress node. Publishing an address for a place that does not exist is
 * how Google Business Profiles get suspended, and suspensions cascade across
 * an account.
 */
export interface OfficeConfig {
  id: string;
  role: "hq" | "engineering";
  city: string;
  region: string;
  country: string;
  countryCode: string;
  /** False for a distributed team — suppresses address/geo/LocalBusiness. */
  hasAddress: boolean;
  streetAddress?: string;
  postalCode?: string;
  geo?: { latitude: number; longitude: number };
  timezone: string;
  /** Stable JSON-LD @id fragment. Only meaningful when hasAddress is true. */
  schemaId?: string;
  path: string;
}

export const offices: OfficeConfig[] = [
  {
    id: "ludhiana",
    role: "hq",
    city: "Ludhiana",
    region: "Punjab",
    country: "India",
    countryCode: "IN",
    hasAddress: true,
    // TODO(velex): this must be a street, not the city repeated. `streetAddress`
    // and `addressLocality` currently say the same thing, which is a
    // placeholder wearing a schema's clothes.
    streetAddress: "Ludhiana",
    postalCode: "141001",
    geo: { latitude: 30.9009, longitude: 75.8573 },
    timezone: "Asia/Kolkata",
    schemaId: "/#business-ludhiana",
    path: "/locations/ludhiana",
  },
  {
    id: "noida",
    role: "engineering",
    city: "Noida",
    region: "Uttar Pradesh",
    country: "India",
    countryCode: "IN",
    // Distributed engineering team, not a staffed office. No address, no geo,
    // no LocalBusiness node — copy says "engineering team in Noida", never
    // "our Noida office at …".
    hasAddress: false,
    timezone: "Asia/Kolkata",
    path: "/locations/noida",
  },
];

/** The office to use wherever a single canonical address is required. */
export const headquarters = offices.find((o) => o.role === "hq")!;

/**
 * Markets served. These are `areaServed` values and future location pages —
 * they are NOT places with an address, and they are NOT hreflang alternates of
 * each other. Anyone wiring hreflang between them has misunderstood the tag:
 * there is one URL set, so a self-referential alternate conveys nothing.
 */
export interface MarketConfig {
  id: "us" | "uk" | "ca" | "in";
  countryCode: "US" | "GB" | "CA" | "IN";
  countryName: string;
  shortName: string;
  currency: "USD" | "GBP" | "CAD" | "INR";
  path: string;
}

export const markets: MarketConfig[] = [
  { id: "us", countryCode: "US", countryName: "United States", shortName: "US", currency: "USD", path: "/locations/usa" },
  { id: "uk", countryCode: "GB", countryName: "United Kingdom", shortName: "UK", currency: "GBP", path: "/locations/uk" },
  { id: "ca", countryCode: "CA", countryName: "Canada", shortName: "Canada", currency: "CAD", path: "/locations/canada" },
  { id: "in", countryCode: "IN", countryName: "India", shortName: "India", currency: "INR", path: "/locations/india" },
];
