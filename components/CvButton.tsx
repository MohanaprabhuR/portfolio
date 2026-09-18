"use client";

import { ChevronDown, Download, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { resumes } from "@/lib/content";

/** "Download CV" with a small menu, because there are two tailored versions. */
export default function CvButton() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn-primary"
      >
        Download CV
        <Download size={18} />
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+0.6rem)] z-20 w-72 overflow-hidden rounded-2xl border border-line bg-ink-2/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          {resumes.map((r) => (
            <a
              key={r.href}
              role="menuitem"
              href={r.href}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition hover:bg-accent/15 hover:text-white"
            >
              <FileText size={17} className="shrink-0 text-accent-2" />
              {r.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
