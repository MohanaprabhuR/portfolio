import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Two delivery paths, tried in order:
 *
 *  1. Resend  – used when RESEND_API_KEY is set. Best deliverability, and the
 *               only option that can send from your own domain.
 *  2. FormSubmit – zero-signup fallback so the form works out of the box. The
 *               very first message triggers a one-time confirmation email to
 *               CONTACT_TO; click the link in it and every later message lands
 *               in that inbox automatically.
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

  const html = `
    <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
    <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
    <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
  `;

  const line = subject || `Portfolio enquiry from ${name}`;
  const apiKey = process.env.RESEND_API_KEY;

  try {
    if (apiKey) {
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
        return NextResponse.json(
          { error: "Couldn't send the message. Please email me directly." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    // No Resend key — fall back to FormSubmit, which needs no account.
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        _subject: line,
        message,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("FormSubmit rejected the message:", res.status, detail);
      return NextResponse.json(
        { error: "Couldn't send the message. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, provider: "formsubmit" });
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return NextResponse.json(
      { error: "Couldn't send the message. Please email me directly." },
      { status: 502 },
    );
  }
}
