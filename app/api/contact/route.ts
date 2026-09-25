import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * When RESEND_API_KEY is set, mail is sent via Resend (best deliverability).
 * Otherwise the client falls back to FormSubmit in the browser — FormSubmit
 * often fails when called from a server-side route, which is why messages
 * were not arriving.
 *
 * Env:
 *   RESEND_API_KEY  – optional, from https://resend.com/api-keys
 *   CONTACT_TO      – inbox that receives enquiries (defaults below)
 *   CONTACT_FROM    – verified Resend sender
 */

const TO = process.env.CONTACT_TO ?? "prabhudhivya0721@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot — real people never see it
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bots fill every field they find. Accept silently so they don't retry.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const subject = (body.subject ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address looks invalid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No Resend key — tell the browser to deliver via FormSubmit instead.
  if (!apiKey) {
    return NextResponse.json({ fallback: "formsubmit", to: TO });
  }

  const html = `
    <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
    <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
    <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
  `;

  const line = subject || `Portfolio enquiry from ${name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: line,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend rejected the message:", res.status, detail);
      // Fall back so the visitor can still reach you.
      return NextResponse.json({ fallback: "formsubmit", to: TO });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return NextResponse.json({ fallback: "formsubmit", to: TO });
  }
}
