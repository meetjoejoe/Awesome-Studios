import crypto from "node:crypto";

export async function sendResendEmail(input: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return { sent: false, reason: "not_configured" as const };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [input.to], subject: input.subject, html: input.html }),
  });
  if (!response.ok) return { sent: false, reason: "provider_error" as const, status: response.status };
  return { sent: true as const };
}

export function createCloudinarySignature(folder = "awesome-studios") {
  const timestamp = Math.floor(Date.now() / 1000);
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return { configured: false as const };
  const signature = crypto.createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  return { configured: true as const, cloudName, apiKey, timestamp, folder, signature };
}
