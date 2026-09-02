import { NextResponse } from "next/server";
import { Resend } from "resend";
import { portfolio } from "@/data/portfolio";

// The contact form posts here. The Resend API key is read server-side only and
// is never exposed to the browser. Configure it via RESEND_API_KEY (see README).
//
// Env:
//   RESEND_API_KEY  — required to actually send (get one at https://resend.com)
//   CONTACT_FROM    — verified sender, e.g. "Portfolio <hello@your-domain.com>".
//                     Falls back to Resend's shared onboarding@resend.dev sandbox.
//   CONTACT_TO      — recipient inbox. Falls back to portfolio.personal.email.

const MAX = { name: 100, email: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimal in-memory rate limiter: N submissions per IP per window. This resets
// on redeploy and isn't shared across serverless instances, so it's a cheap
// first line of defense — not a substitute for a durable store at high volume.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot: real users never fill the hidden "company" field. Pretend success
  // so bots don't learn they were caught.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation (client validation is bypassable).
  const errors: Record<string, string> = {};
  const nameStr = typeof name === "string" ? name.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";

  if (!nameStr) errors.name = "Name is required.";
  else if (nameStr.length > MAX.name) errors.name = "Name is too long.";
  if (!emailStr) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(emailStr) || emailStr.length > MAX.email)
    errors.email = "A valid email is required.";
  if (!messageStr) errors.message = "Message is required.";
  else if (messageStr.length > MAX.message)
    errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot deliver contact email.");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO || portfolio.personal.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: emailStr,
      subject: `New portfolio message from ${nameStr}`,
      text: `Name: ${nameStr}\nEmail: ${emailStr}\n\n${messageStr}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
