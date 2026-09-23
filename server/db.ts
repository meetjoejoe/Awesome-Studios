import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { ENV } from "./_core/env";
import { auditLogs, contentItems, contactMessages, InsertUser, talentSubmissions, teamMembers, users } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to connect:", error); }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  for (const field of ["name", "email", "loginMethod", "department"] as const) {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "super_admin"; updateSet.role = "super_admin"; }
  values.lastSignedIn ??= new Date();
  if (!Object.keys(updateSet).length) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return rows[0];
}

export async function listPublishedContent(kind?: string, limit = 12) {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  const visibility = and(eq(contentItems.status, "published"), or(sql`${contentItems.publishedAt} IS NULL`, sql`${contentItems.publishedAt} <= ${now}`));
  const where = kind ? and(visibility, eq(contentItems.kind, kind as never)) : visibility;
  return db.select().from(contentItems).where(where).orderBy(desc(contentItems.featured), desc(contentItems.releaseDate), desc(contentItems.createdAt)).limit(limit);
}

export async function searchPublishedContent(query: string, limit = 30) {
  const db = await getDb();
  if (!db) return [];
  const pattern = `%${query}%`;
  return db.select().from(contentItems).where(and(eq(contentItems.status, "published"), or(like(contentItems.title, pattern), like(contentItems.description, pattern), like(contentItems.body, pattern)))).orderBy(desc(contentItems.createdAt)).limit(limit);
}

export async function recordAudit(actorId: number | undefined, action: string, targetType?: string, targetId?: number, metadata?: unknown, success = true) {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values({ actorId, action, targetType, targetId, metadata: metadata ? JSON.stringify(metadata) : undefined, success: success ? 1 : 0 });
}

export { auditLogs, contentItems, contactMessages, talentSubmissions, teamMembers, users };
