import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL || "";

  if (!uri) {
    console.warn("MONGODB_URI environment variable is not defined.");
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    try {
      return await global._mongoClientPromise;
    } catch (err) {
      global._mongoClientPromise = undefined;
      throw err;
    }
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  try {
    return await clientPromise;
  } catch (err) {
    clientPromise = null;
    throw err;
  }
}

export async function getDb(): Promise<Db | null> {
  const dbName = process.env.MONGODB_DB || "velex_infotech";
  const client = await getMongoClient();
  if (!client) return null;
  return client.db(dbName);
}
