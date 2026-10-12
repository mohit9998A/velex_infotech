import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import type { MongoBlogPost } from "@/types/blog";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed. Please check MONGODB_URI." },
        { status: 503 }
      );
    }

    const rawPosts = await db
      .collection<MongoBlogPost>("blogs")
      .find({})
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    const posts = rawPosts.map((p) => ({
      ...p,
      _id: p._id ? p._id.toString() : undefined,
    }));

    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch blogs";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      author,
      publishedAt,
      readingMinutes,
      targetKeyword,
      relatedServices,
      coverImage,
      status,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed." },
        { status: 503 }
      );
    }

    // Check slug uniqueness
    const existing = await db.collection("blogs").findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: `A post with slug "${slug}" already exists.` },
        { status: 400 }
      );
    }

    const newPost: MongoBlogPost = {
      title,
      slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-"),
      description: description || "",
      content: content || "",
      author: author || "Mohit Dutta",
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
      readingMinutes: Number(readingMinutes) || 5,
      targetKeyword: targetKeyword || "",
      relatedServices: Array.isArray(relatedServices) ? relatedServices : [],
      coverImage: coverImage || "",
      status: status === "hidden" ? "hidden" : "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { _id: _unusedId, ...postDataToInsert } = newPost;
    const result = await db.collection("blogs").insertOne(postDataToInsert);

    return NextResponse.json(
      { ok: true, post: { ...newPost, _id: result.insertedId.toString() } },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create blog post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
