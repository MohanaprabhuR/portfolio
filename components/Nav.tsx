"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the upper half of the viewport.
  useEffect(() => {
    const sections = nav
      .map(([, href]) => document.querySelector(href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3 sm:p-4">
      <nav
        className={`shell flex h-16 items-center justify-between rounded-full border px-4 transition sm:px-6 ${
          scrolled
            ? "border-line bg-ink-2/80 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="font-display text-lg font-extrabold tracking-tight">
          {profile.short}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === href ? "bg-accent/15 text-accent-2" : "text-muted hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Hire me
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-line p-2.5 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="shell mt-2 rounded-3xl border border-line bg-ink-2/95 p-3 backdrop-blur-xl lg:hidden">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-semibold text-muted hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
