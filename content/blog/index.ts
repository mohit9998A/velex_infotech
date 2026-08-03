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
    relatedServices: ["voice-agent", "ai-automation"],
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
  "what-is-agentic-ai": () => import("./what-is-agentic-ai.mdx"),
  "ai-automation-roi": () => import("./ai-automation-roi.mdx"),
  "voice-ai-agents-call-centers": () => import("./voice-ai-agents-call-centers.mdx"),
  "whatsapp-business-api-ai-integration": () =>
    import("./whatsapp-business-api-ai-integration.mdx"),
  "ai-automation-vs-agentic-ai": () => import("./ai-automation-vs-agentic-ai.mdx"),
  "how-to-choose-ai-agency-india": () => import("./how-to-choose-ai-agency-india.mdx"),
};

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
