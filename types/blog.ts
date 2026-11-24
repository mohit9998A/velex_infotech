export interface MongoBlogPost {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string; // YYYY-MM-DD
  readingMinutes: number;
  targetKeyword?: string;
  relatedServices?: string[];
  coverImage?: string;
  status: "published" | "hidden";
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  _id?: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
