import { describe, expect, it, vi } from "vitest";
import { sendResendEmail } from "./integrations";

describe("provider secrets", () => {
  it("authenticates the configured Resend sending key without dispatching mail", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be configured").toBeTruthy();
    expect(process.env.ADMIN_NOTIFICATION_EMAIL).toBe("calebabugh7@gmail.com");
    expect(process.env.RESEND_FROM_EMAIL).toContain("Awesome Studios");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const payload = await response.text();
    expect(response.status, `Resend returned HTTP ${response.status}: ${payload.slice(0, 500)}`).not.toBe(401);
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.status).toBeLessThan(500);
  }, 15000);

  it("sends the expected notification payload through the helper", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "test-email-id" }), { status: 200, headers: { "content-type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await sendResendEmail({ to: "calebabugh7@gmail.com", subject: "Talent application: Test Artist", html: "<p>Test</p>" });
    expect(result).toEqual({ sent: true });
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({ method: "POST" }));
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({ to: ["calebabugh7@gmail.com"], subject: "Talent application: Test Artist" });
    vi.unstubAllGlobals();
  });
});
