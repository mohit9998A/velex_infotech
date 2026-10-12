import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 503 });
    }

    let query: Record<string, unknown> = { slug: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const post = await db.collection("blogs").findOne(query);
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      post: {
        ...post,
        _id: post._id ? post._id.toString() : post.slug,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 503 });
    }

    let filter: Record<string, unknown> = { slug: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const updateDoc = {
      $set: {
        title: body.title,
        slug: body.slug?.toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-"),
        description: body.description,
        content: body.content,
        author: body.author,
        publishedAt: body.publishedAt,
        readingMinutes: Number(body.readingMinutes),
        targetKeyword: body.targetKeyword,
        relatedServices: Array.isArray(body.relatedServices) ? body.relatedServices : [],
        coverImage: body.coverImage,
        status: body.status === "hidden" ? "hidden" : "published",
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await db.collection("blogs").updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Blog updated successfully" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (!body.status || !["published", "hidden"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 503 });
    }

    let filter: Record<string, unknown> = { slug: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const result = await db.collection("blogs").updateOne(filter, {
      $set: { status: body.status, updatedAt: new Date().toISOString() },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, status: body.status });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update status";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "Database connection failed." }, { status: 503 });
    }

    let filter: Record<string, unknown> = { slug: id };
    if (ObjectId.isValid(id)) {
      filter = { $or: [{ _id: new ObjectId(id) }, { slug: id }] };
    }

    const result = await db.collection("blogs").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, message: "Blog deleted successfully" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete post";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
