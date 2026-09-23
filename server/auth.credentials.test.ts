import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext() {
  let cookie: { name: string; value: string; options: Record<string, unknown> } | undefined;
  const ctx: TrpcContext = {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { cookie: (name: string, value: string, options: Record<string, unknown>) => { cookie = { name, value, options }; } } as TrpcContext["res"],
  };
  return { ctx, getCookie: () => cookie };
}

describe("auth.loginWithCredentials", () => {
  it("accepts the configured admin secret and creates a session cookie", async () => {
    const { ctx, getCookie } = createContext();
    const result = await appRouter.createCaller(ctx).auth.loginWithCredentials({ username: process.env.ADMIN_LOGIN_USERNAME ?? "", password: process.env.ADMIN_LOGIN_PASSWORD ?? "" });
    expect(result).toEqual({ success: true });
    expect(getCookie()?.name).toBe("app_session_id");
    expect(getCookie()?.value.length).toBeGreaterThan(20);
  });

  it("rejects an incorrect password", async () => {
    const { ctx } = createContext();
    await expect(appRouter.createCaller(ctx).auth.loginWithCredentials({ username: process.env.ADMIN_LOGIN_USERNAME ?? "", password: "definitely-wrong" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
