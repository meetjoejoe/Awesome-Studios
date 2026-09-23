import { and, desc, eq, or, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { adminRoles, contentKinds, contentItems, contactMessages, teamMembers, talentSubmissions } from "../drizzle/schema";
import { getDb, listPublishedContent, recordAudit, searchPublishedContent, users } from "./db";
import { sendResendEmail, createCloudinarySignature } from "./integrations";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";

const kindSchema = z.enum(contentKinds);
const statusSchema = z.enum(["draft", "submitted", "in_review", "approved", "rejected", "scheduled", "published", "archived"]);
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!ctx.user || !["admin", "department_admin", "super_admin"].includes(ctx.user.role)) throw new TRPCError({ code: "FORBIDDEN", message: "Administrator access is required." });
  return next({ ctx });
});
const superAdminProcedure = adminProcedure.use(({ ctx, next }) => {
  if (!ctx.user || !["admin", "super_admin"].includes(ctx.user.role)) throw new TRPCError({ code: "FORBIDDEN", message: "Super Admin access is required." });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => { ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 }); return { success: true } as const; }),
  }),
  content: router({
    list: publicProcedure.input(z.object({ kind: kindSchema.optional(), limit: z.number().min(1).max(40).default(12) }).optional()).query(({ input }) => listPublishedContent(input?.kind, input?.limit ?? 12)),
    bySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(async ({ input }) => {
      const db = await getDb(); if (!db) return null;
      const rows = await db.select().from(contentItems).where(and(eq(contentItems.slug, input.slug), eq(contentItems.status, "published"))).limit(1); return rows[0] ?? null;
    }),
    search: publicProcedure.input(z.object({ query: z.string().trim().min(2).max(80) })).query(({ input }) => searchPublishedContent(input.query)),
  }),
  team: router({ list: publicProcedure.query(async () => { const db = await getDb(); if (!db) return []; return db.select().from(teamMembers).where(eq(teamMembers.published, 1)).orderBy(teamMembers.displayOrder); }) }),
  forms: router({
    contact: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(180), email: z.string().email().max(320), subject: z.string().trim().min(2).max(240), message: z.string().trim().min(10).max(5000) })).mutation(async ({ input }) => {
      const db = await getDb(); if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "The contact service is temporarily unavailable." });
      const inserted = await db.insert(contactMessages).values({ ...input, emailStatus: "not_configured" });
      let emailStatus = "not_configured";
      if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.ADMIN_NOTIFICATION_EMAIL) {
        const result = await sendResendEmail({ to: process.env.ADMIN_NOTIFICATION_EMAIL, subject: `Contact: ${input.subject}`, html: `<p><strong>${input.name}</strong> (${input.email}) sent a message.</p><p>${input.message.replaceAll("<", "&lt;")}</p>` });
        emailStatus = result.sent ? "sent" : "provider_error";
        const contactId = Number((inserted as unknown as { insertId?: number }).insertId ?? 0);
        if (contactId) await db.update(contactMessages).set({ emailStatus }).where(eq(contactMessages.id, contactId));
      }
      return { success: true, emailStatus };
    }),
    talent: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(180), email: z.string().email().max(320), specialty: z.string().trim().min(2).max(180), department: z.string().max(120).optional(), portfolio: z.string().url().or(z.literal("")).optional(), socialLinks: z.string().max(1000).optional(), biography: z.string().max(5000).optional(), experience: z.string().max(5000).optional(), message: z.string().max(5000).optional() })).mutation(async ({ input }) => {
      const db = await getDb(); if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "The talent service is temporarily unavailable." });
      await db.insert(talentSubmissions).values(input); return { success: true };
    }),
  }),
  media: router({ cloudinarySignature: adminProcedure.query(() => createCloudinarySignature()) }),
  admin: router({
    dashboard: adminProcedure.query(async ({ ctx }) => {
      const db = await getDb(); if (!db) return { counts: {}, recent: [], user: ctx.user };
      const scope = ctx.user.role === "department_admin" && ctx.user.department ? eq(contentItems.department, ctx.user.department) : undefined;
      const rows = scope ? await db.select().from(contentItems).where(scope).orderBy(desc(contentItems.updatedAt)).limit(8) : await db.select().from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(8);
      const all = scope ? await db.select().from(contentItems).where(scope) : await db.select().from(contentItems);
      return { user: ctx.user, recent: rows, counts: { total: all.length, published: all.filter(x => x.status === "published").length, drafts: all.filter(x => x.status === "draft").length, review: all.filter(x => ["submitted", "in_review"].includes(x.status)).length } };
    }),
    content: adminProcedure.input(z.object({ status: statusSchema.optional(), kind: kindSchema.optional() }).optional()).query(async ({ ctx, input }) => {
      const db = await getDb(); if (!db) return [];
      const conditions = [input?.status ? eq(contentItems.status, input.status) : undefined, input?.kind ? eq(contentItems.kind, input.kind) : undefined, ctx.user.role === "department_admin" && ctx.user.department ? eq(contentItems.department, ctx.user.department) : undefined].filter(Boolean) as never[];
      return db.select().from(contentItems).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(contentItems.updatedAt));
    }),
    inbox: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { contacts: [], talent: [] };
      const [contacts, talent] = await Promise.all([
        db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(100),
        db.select().from(talentSubmissions).orderBy(desc(talentSubmissions.createdAt)).limit(100),
      ]);
      return { contacts, talent };
    }),
    teamMembers: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(teamMembers).orderBy(teamMembers.displayOrder, teamMembers.name);
    }),
    createContent: adminProcedure.input(z.object({ kind: kindSchema, title: z.string().trim().min(2).max(220), slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9-]+$/), eyebrow: z.string().max(120).optional(), description: z.string().max(5000).optional(), body: z.string().max(20000).optional(), department: z.string().max(120).optional(), imageUrl: z.string().url().or(z.literal("")).optional() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role === "department_admin" && input.department && input.department !== ctx.user.department) throw new TRPCError({ code: "FORBIDDEN", message: "You cannot create content outside your department." });
      const db = await getDb(); if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE" });
      const created = await db.insert(contentItems).values({ ...input, authorId: ctx.user.id, status: "draft", featured: 0 });
      const id = Number((created as unknown as { insertId?: number }).insertId ?? 0); await recordAudit(ctx.user.id, "content.created", "content", id, { kind: input.kind }); return { id };
    }),
    transition: adminProcedure.input(z.object({ id: z.number().int().positive(), status: statusSchema })).mutation(async ({ ctx, input }) => {
      const db = await getDb(); if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE" });
      const existing = await db.select().from(contentItems).where(eq(contentItems.id, input.id)).limit(1); const item = existing[0];
      if (!item) throw new TRPCError({ code: "NOT_FOUND", message: "Content not found." });
      if (ctx.user.role === "department_admin" && item.department !== ctx.user.department) throw new TRPCError({ code: "FORBIDDEN", message: "You cannot modify another department." });
      await db.update(contentItems).set({ status: input.status, publishedAt: input.status === "published" ? new Date() : item.publishedAt }).where(eq(contentItems.id, input.id));
      await recordAudit(ctx.user.id, `content.${input.status}`, "content", input.id); return { success: true };
    }),
    team: superAdminProcedure.input(z.object({ name: z.string().trim().min(2).max(180), role: z.string().max(160).optional(), department: z.string().max(120).optional(), specialty: z.string().max(180).optional(), biography: z.string().max(5000).optional(), published: z.boolean().default(false) })).mutation(async ({ ctx, input }) => {
      const db = await getDb(); if (!db) throw new TRPCError({ code: "SERVICE_UNAVAILABLE" });
      const result = await db.insert(teamMembers).values({ ...input, published: input.published ? 1 : 0 }); await recordAudit(ctx.user.id, "team.created", "team_member", Number((result as unknown as { insertId?: number }).insertId ?? 0)); return { success: true };
    }),
    logs: superAdminProcedure.query(async () => { const db = await getDb(); if (!db) return []; return db.select().from((await import("../drizzle/schema")).auditLogs).orderBy(desc((await import("../drizzle/schema")).auditLogs.createdAt)).limit(100); }),
  }),
});

export type AppRouter = typeof appRouter;
