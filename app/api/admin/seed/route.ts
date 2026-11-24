import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { blogPosts } from "@/content/blog";
import type { MongoBlogPost } from "@/types/blog";

export async function POST() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database connection failed. Check MONGODB_URI." }, { status: 503 });
    }

    const collection = db.collection<Omit<MongoBlogPost, "_id">>("blogs");

    let insertedCount = 0;
    let updatedCount = 0;

    for (const post of blogPosts) {
      let fullContent = "";
      try {
        const filePath = path.join(process.cwd(), "content", "blog", `${post.slug}.mdx`);
        if (fs.existsSync(filePath)) {
          fullContent = fs.readFileSync(filePath, "utf-8");
        }
      } catch (err) {
        console.warn(`Could not read MDX for ${post.slug}:`, err);
      }

      if (!fullContent) {
        fullContent = `## ${post.title}\n\n${post.description}`;
      }

      const existing = await collection.findOne({ slug: post.slug });

      const postDoc = {
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: fullContent,
        author: post.author,
        publishedAt: post.publishedAt,
        readingMinutes: post.readingMinutes,
        targetKeyword: post.targetKeyword || "",
        relatedServices: post.relatedServices || [],
        status: "published" as const,
        updatedAt: new Date().toISOString(),
      };

      if (!existing) {
        await collection.insertOne({
          ...postDoc,
          createdAt: new Date().toISOString(),
        });
        insertedCount++;
      } else {
        await collection.updateOne(
          { slug: post.slug },
          { $set: postDoc }
        );
        updatedCount++;
      }
    }

    return NextResponse.json({
      ok: true,
      message: `Seeding completed! ${insertedCount} new posts inserted, ${updatedCount} posts updated with full MDX content in MongoDB.`,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Seeding failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
