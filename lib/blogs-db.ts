import { getDb } from "./mongodb";
import { blogPosts as staticBlogPosts } from "@/content/blog";
import type { MongoBlogPost } from "@/types/blog";

export async function getPublishedBlogs(): Promise<MongoBlogPost[]> {
  try {
    const db = await getDb();
    if (db) {
      const posts = await db
        .collection<MongoBlogPost>("blogs")
        .find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .toArray();

      if (posts && posts.length > 0) {
        return posts.map((p) => ({
          ...p,
          _id: p._id?.toString(),
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to fetch published blogs from MongoDB, falling back to static posts:", err);
  }

  // Fallback to static blog posts if MongoDB has no posts or is not connected
  return staticBlogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    content: "",
    author: p.author,
    publishedAt: p.publishedAt,
    readingMinutes: p.readingMinutes,
    targetKeyword: p.targetKeyword,
    relatedServices: p.relatedServices,
    status: "published" as const,
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<MongoBlogPost | null> {
  try {
    const db = await getDb();
    if (db) {
      const post = await db
        .collection<MongoBlogPost>("blogs")
        .findOne({ slug, status: "published" });

      if (post) {
        return {
          ...post,
          _id: post._id?.toString(),
        };
      }
    }
  } catch (err) {
    console.warn("Failed to fetch blog post from MongoDB, checking static posts:", err);
  }

  // Fallback to static blog posts
  const staticPost = staticBlogPosts.find((p) => p.slug === slug);
  if (staticPost) {
    return {
      slug: staticPost.slug,
      title: staticPost.title,
      description: staticPost.description,
      content: "",
      author: staticPost.author,
      publishedAt: staticPost.publishedAt,
      readingMinutes: staticPost.readingMinutes,
      targetKeyword: staticPost.targetKeyword,
      relatedServices: staticPost.relatedServices,
      status: "published",
    };
  }

  return null;
}
