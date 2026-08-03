import { blogPosts, getPost } from "@/content/blog";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const alt = "Velex Infotech article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

/** Per-post social card. `params` is a Promise in Next 16 — see the note in
 *  app/services/[slug]/opengraph-image.tsx. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    eyebrow: "Insights",
    title: post?.title ?? "The Intelligence Brief",
  });
}
