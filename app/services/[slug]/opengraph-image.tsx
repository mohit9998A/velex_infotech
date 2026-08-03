import type { ServiceItem } from "@/types";
import servicesData from "@/content/services.json";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

const services = servicesData as ServiceItem[];

export const alt = "Velex Infotech service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender one card per service alongside the page itself.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/**
 * Per-service social card.
 *
 * Next 16 breaking change: `params` is a Promise in image-generating functions
 * (opengraph-image, twitter-image, icon, apple-icon) and must be awaited. It
 * was a plain object through Next 15.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  return renderOgImage({
    eyebrow: service?.segment === "B2C" ? "AI for Business" : "AI Services",
    title: service?.title ?? "AI & Digital Services",
  });
}
