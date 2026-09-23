import { describe, expect, it } from "vitest";

describe("provider secrets", () => {
  it("authenticates the configured Resend sending key without dispatching mail", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be configured").toBeTruthy();
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({}) });
    const payload = await response.text();
    expect(response.status, `Resend returned HTTP ${response.status}: ${payload.slice(0, 500)}`).not.toBe(401);
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.status).toBeLessThan(500);
  }, 15000);
});
