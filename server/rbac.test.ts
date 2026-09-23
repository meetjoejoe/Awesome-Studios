import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("server-side administrator authorization", () => {
  it("rejects a signed-in regular user before reaching admin data", async () => {
    const now = new Date();
    const ctx: TrpcContext = {
      user: {
        id: 91,
        openId: "regular-user",
        name: "Regular User",
        email: "regular@example.com",
        loginMethod: "manus",
        role: "user",
        department: null,
        createdAt: now,
        updatedAt: now,
        lastSignedIn: now,
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.dashboard()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.media.cloudinarySignature()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
