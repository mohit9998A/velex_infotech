import type { BlogPost } from "@/types";

/**
 * The blog index.
 *
 * Ordered newest-first; `app/blog/page.tsx`, `app/sitemap.ts` and
 * `generateStaticParams` all read this array, so adding a post means adding one
 * entry here plus the matching `<slug>.mdx` in this folder.
 *
 * `loaders` is an explicit static map rather than a template-literal dynamic
 * import (`import(\`./${slug}.mdx\`)`) because Turbopack resolves a static map
 * deterministically at build time.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "custom-healthcare-software-development",
    title: "Custom Healthcare Software Development: What Actually Drives the Cost",
    description:
      "Healthcare software quotes are wrong in one direction: too low. What really drives cost — integration surface, identity reconciliation and audit depth — and how to read a quote critically.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "custom healthcare software development",
    readingMinutes: 11,
    relatedServices: ["software-development", "ai-integration"],
  },
  {
    slug: "it-consulting-vs-managed-services",
    title: "IT Consulting vs Managed IT Services: Which Do You Actually Need?",
    description:
      "Consulting buys a decision and ends; managed services buys an ongoing outcome. How to tell which problem you have, and the three questions that surface most of the risk.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "it consulting services",
    readingMinutes: 9,
    relatedServices: ["ai-consulting", "software-development"],
  },
  {
    slug: "choosing-custom-software-development-company",
    title: "How to Choose a Custom Software Development Company",
    description:
      "The things you can easily compare barely predict success. The three questions that do — who writes the code, what happens if you leave, and how change requests are priced.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "custom software development company",
    readingMinutes: 11,
    relatedServices: ["software-development", "app-development"],
  },
  {
    slug: "ai-consulting-services-explained",
    title: "AI Consulting Services: What You Should Actually Get for the Money",
    description:
      "Most people assessing whether you need AI are the people who would build it. What a real assessment produces, how to spot a pre-sales exercise, and when you need neither.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "ai consulting services",
    readingMinutes: 10,
    relatedServices: ["ai-consulting", "ai-automation"],
  },
  {
    slug: "ai-customer-service-guide",
    title: "AI Customer Service: What It Handles, Where It Breaks, What It Costs",
    description:
      "AI customer service fails six weeks after launch, not at launch. Which conversations it genuinely handles, which need a human, and how to measure whether it is working.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "ai customer service",
    readingMinutes: 12,
    relatedServices: ["ai-receptionist", "whatsapp-bot"],
  },
  {
    slug: "ai-agency-vs-in-house-team",
    title: "AI Agency vs In-House Team: A Framework That Gives a Real Answer",
    description:
      "The agency-versus-hire question is almost never about cost. Decide on durability of the work instead — and consider the sequence that beats choosing either one.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "ai agency",
    readingMinutes: 10,
    relatedServices: ["ai-consulting", "agentic-ai"],
  },
  {
    slug: "hire-ai-developers",
    title: "Hire AI Developers: In-House, Agency or Freelance, Compared",
    description:
      "The businesses that most need AI developers are least equipped to interview them. How to pick a hiring model, and what to test when you cannot assess the code yourself.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "hire ai developers",
    readingMinutes: 10,
    relatedServices: ["agentic-ai", "ai-consulting"],
  },
  {
    slug: "digital-transformation-consulting",
    title: "Digital Transformation Consulting: Why Programmes Fail and How to Buy One",
    description:
      "Transformation fails on adoption, not technology — processes get documented from the top and performed differently at the bottom. How to buy one that survives your organisation.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "digital transformation consulting",
    readingMinutes: 10,
    relatedServices: ["ai-consulting", "ai-automation"],
  },
  {
    slug: "saas-development-company-guide",
    title: "SaaS Development: What Separates a Product From a Web App",
    description:
      "Multi-tenancy, billing and per-customer configuration are the half customers never see and the half that decides whether the business is operable. What teams underestimate.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "saas development company",
    readingMinutes: 10,
    relatedServices: ["software-development", "app-development"],
  },
  {
    slug: "free-ai-chatbot-compared",
    title: "Free AI Chatbot: When Free Is Enough and When It Costs You",
    description:
      "Free chatbots handle questions answerable from static content and stop at your systems boundary. Where that line falls, and why most businesses should buy a paid tier instead.",
    publishedAt: "2026-08-07",
    author: "Mohit Dutta",
    targetKeyword: "free ai chatbot",
    readingMinutes: 9,
    relatedServices: ["whatsapp-bot", "ai-receptionist"],
  },
  {
    slug: "what-is-agentic-ai",
    title: "What is Agentic AI? A Complete Guide for Indian Business Owners",
    description:
      "Agentic AI systems decide and act on their own, not just answer questions. A plain-English guide to what that means, where it pays off, and when it doesn't.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "agentic ai",
    readingMinutes: 9,
    relatedServices: ["agentic-ai", "ai-automation"],
  },
  {
    slug: "ai-automation-roi",
    title: "AI Automation ROI: How to Measure Real Results",
    description:
      "Most AI automation ROI claims are unfalsifiable. Here is the arithmetic that actually holds up, the baseline you need before you start, and the costs vendors leave out.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "ai automation services",
    readingMinutes: 10,
    relatedServices: ["ai-automation", "ai-integration"],
  },
  {
    slug: "voice-ai-agents-call-centers",
    title: "Voice AI Agents: How Businesses Replace Call Centres with AI",
    description:
      "What a voice AI agent can and cannot do on a real phone line — latency budgets, Hindi and English handling, escalation design, and honest failure modes.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "ai voice agent",
    readingMinutes: 9,
    relatedServices: ["ai-receptionist", "ai-automation"],
  },
  {
    slug: "whatsapp-business-api-ai-integration",
    title: "WhatsApp Business API + AI: The Complete Integration Guide",
    description:
      "How the WhatsApp Business API actually works in India — BSPs, template approval, the 24-hour window, conversation pricing, and where AI fits without breaking policy.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "whatsapp chatbot",
    readingMinutes: 11,
    relatedServices: ["whatsapp-bot", "ai-integration"],
  },
  {
    slug: "ai-automation-vs-agentic-ai",
    title: "AI Automation vs Agentic AI: Which Does Your Business Need?",
    description:
      "Automation follows a path you define. Agentic AI chooses the path. The distinction decides your cost, your risk, and whether the project succeeds — here's how to pick.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "ai automation",
    readingMinutes: 8,
    relatedServices: ["ai-automation", "agentic-ai"],
  },
  {
    slug: "how-to-choose-ai-agency-india",
    title: "How to Choose an AI Agency in India: A 2026 Guide",
    description:
      "What to ask before signing with an AI agency in India — pricing models, who owns the IP, what happens after handover, and the answers that should end the conversation.",
    publishedAt: "2026-08-03",
    author: "Mohit Dutta",
    targetKeyword: "ai automation agency",
    readingMinutes: 10,
    relatedServices: ["ai-automation", "agentic-ai"],
  },
];

/** slug -> MDX module loader. Keys must match `blogPosts[].slug`. */
export const postLoaders: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  "custom-healthcare-software-development": () =>
    import("./custom-healthcare-software-development.mdx"),
  "it-consulting-vs-managed-services": () =>
    import("./it-consulting-vs-managed-services.mdx"),
  "choosing-custom-software-development-company": () =>
    import("./choosing-custom-software-development-company.mdx"),
  "ai-consulting-services-explained": () =>
    import("./ai-consulting-services-explained.mdx"),
  "ai-customer-service-guide": () => import("./ai-customer-service-guide.mdx"),
  "ai-agency-vs-in-house-team": () => import("./ai-agency-vs-in-house-team.mdx"),
  "hire-ai-developers": () => import("./hire-ai-developers.mdx"),
  "digital-transformation-consulting": () =>
    import("./digital-transformation-consulting.mdx"),
  "saas-development-company-guide": () => import("./saas-development-company-guide.mdx"),
  "free-ai-chatbot-compared": () => import("./free-ai-chatbot-compared.mdx"),
  "what-is-agentic-ai": () => import("./what-is-agentic-ai.mdx"),
  "ai-automation-roi": () => import("./ai-automation-roi.mdx"),
  "voice-ai-agents-call-centers": () => import("./voice-ai-agents-call-centers.mdx"),
  "whatsapp-business-api-ai-integration": () =>
    import("./whatsapp-business-api-ai-integration.mdx"),
  "ai-automation-vs-agentic-ai": () => import("./ai-automation-vs-agentic-ai.mdx"),
  "how-to-choose-ai-agency-india": () => import("./how-to-choose-ai-agency-india.mdx"),
};

/**
 * Build-time invariant.
 *
 * `postLoaders` is hand-maintained alongside `blogPosts`, and the failure mode
 * when they disagree is silent and expensive: a post missing from the loader
 * map still appears in `generateStaticParams` and still gets a `<url>` entry in
 * app/sitemap.ts, but the page itself calls `notFound()`. You end up
 * advertising a URL to Google that 404s — precisely the thing a site with an
 * indexing problem cannot afford.
 *
 * This runs during `next build` page-data collection, turning a shipped 404
 * into a failed build.
 */
{
  const slugs = blogPosts.map((p) => p.slug);
  const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (duplicates.length > 0) {
    throw new Error(`content/blog: duplicate slug(s): ${duplicates.join(", ")}`);
  }

  const missingLoader = slugs.filter((s) => !(s in postLoaders));
  if (missingLoader.length > 0) {
    throw new Error(
      `content/blog: these posts have no entry in postLoaders and would 404 ` +
        `while still appearing in the sitemap: ${missingLoader.join(", ")}`,
    );
  }

  const orphanLoader = Object.keys(postLoaders).filter((s) => !slugs.includes(s));
  if (orphanLoader.length > 0) {
    throw new Error(
      `content/blog: postLoaders has entries with no matching post: ${orphanLoader.join(", ")}`,
    );
  }
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
