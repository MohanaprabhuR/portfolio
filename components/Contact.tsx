"use client";

import {
  AlertCircle,
  CheckCircle2,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/content";

const details = [
  { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: MapPin, label: "Location", value: profile.location },
  { Icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: profile.linkedin },
];

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  /* Tries Resend via /api/contact; falls back to FormSubmit in the browser. */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      company: form.company,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (data.fallback === "formsubmit") {
        const to = typeof data.to === "string" ? data.to : profile.email;
        const line = payload.subject || `Portfolio enquiry from ${payload.name}`;
        const fs = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            _subject: line,
            message: payload.message,
            _replyto: payload.email,
            _template: "table",
            _captcha: "false",
          }),
        });

        if (!fs.ok) {
          const err = await fs.json().catch(() => ({}));
          setStatus({
            state: "error",
            message: err.message ?? "Couldn't send the message.",
          });
          return;
        }
      } else if (!res.ok) {
        setStatus({ state: "error", message: data.error ?? "Something went wrong." });
        return;
      }

      setForm(EMPTY);
      setStatus({
        state: "sent",
        message: "Thanks — your message is on its way. I'll reply soon.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again or email me directly.",
      });
    }
  };

  const field =
    "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-accent";

  return (
    <section id="contact" className="glow-tr relative py-28">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Contact"
          title="Let's work together"
          sub="Got a product to build, a design to implement or a site to rescue? Tell me about it."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {details.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent-2">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                        {label}
                      </p>
                      <p className="mt-1 truncate font-semibold">{value}</p>
                    </div>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="card flex items-center gap-4 p-5 transition hover:border-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="card flex items-center gap-4 p-5">
                    {inner}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={submit} className="card relative grid gap-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                    Name
                  </span>
                  <input
                    required
                    className={field}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    className={field}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Subject
                </span>
                <input
                  className={field}
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  className={`${field} resize-y`}
                  placeholder="Tell me about the project…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>

              {/* Honeypot: hidden from people, catnip for bots. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] size-0 opacity-0"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="btn-primary w-fit disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status.state === "sending" ? (
                    <>
                      Sending <Loader2 size={17} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message <Send size={17} />
                    </>
                  )}
                </button>

                {status.state === "sent" ? (
                  <p
                    role="status"
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-400"
                  >
                    <CheckCircle2 size={16} /> {status.message}
                  </p>
                ) : null}

                {status.state === "error" ? (
                  <p
                    role="alert"
                    className="flex flex-wrap items-center gap-2 text-sm font-semibold text-rose-400"
                  >
                    <AlertCircle size={16} /> {status.message}{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      Email directly
                    </a>
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
