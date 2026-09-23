import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const contentKinds = ["comic", "game", "video", "animation", "music", "project", "character", "universe", "artwork", "release", "update"] as const;
export const workflowStatuses = ["draft", "submitted", "in_review", "approved", "rejected", "scheduled", "published", "archived"] as const;
export const adminRoles = ["user", "admin", "department_admin", "super_admin"] as const;

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", adminRoles).default("user").notNull(),
  department: varchar("department", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const contentItems = mysqlTable("content_items", {
  id: int("id").autoincrement().primaryKey(),
  kind: mysqlEnum("kind", contentKinds).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  eyebrow: varchar("eyebrow", { length: 120 }),
  description: text("description"),
  body: text("body"),
  imageUrl: text("imageUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  metadata: text("metadata"),
  department: varchar("department", { length: 120 }),
  status: mysqlEnum("status", workflowStatuses).default("draft").notNull(),
  featured: int("featured").default(0).notNull(),
  authorId: int("authorId"),
  publishedAt: timestamp("publishedAt"),
  releaseDate: timestamp("releaseDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const contentRelations = mysqlTable("content_relations", {
  id: int("id").autoincrement().primaryKey(),
  fromContentId: int("fromContentId").notNull(),
  toContentId: int("toContentId").notNull(),
  relationType: varchar("relationType", { length: 80 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const teamMembers = mysqlTable("team_members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  photoUrl: text("photoUrl"),
  role: varchar("role", { length: 160 }),
  department: varchar("department", { length: 120 }),
  specialty: varchar("specialty", { length: 180 }),
  biography: text("biography"),
  socialLinks: text("socialLinks"),
  portfolioUrl: text("portfolioUrl"),
  displayOrder: int("displayOrder").default(0).notNull(),
  published: int("published").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 240 }).notNull(),
  message: text("message").notNull(),
  emailStatus: varchar("emailStatus", { length: 40 }).default("not_configured").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const talentSubmissions = mysqlTable("talent_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  specialty: varchar("specialty", { length: 180 }).notNull(),
  department: varchar("department", { length: 120 }),
  portfolio: text("portfolio"),
  socialLinks: text("socialLinks"),
  biography: text("biography"),
  experience: text("experience"),
  message: text("message"),
  status: varchar("status", { length: 40 }).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  actorId: int("actorId"),
  action: varchar("action", { length: 120 }).notNull(),
  targetType: varchar("targetType", { length: 80 }),
  targetId: int("targetId"),
  metadata: text("metadata"),
  success: int("success").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ContentItem = typeof contentItems.$inferSelect;
