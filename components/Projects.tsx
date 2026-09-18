"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { filters, projects } from "@/lib/content";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const shown =
    filter === "all"
      ? projects
      : projects.filter((p) => (p.tags as string[]).includes(filter));

  return (
    <section id="projects" className="glow-bl relative py-28">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Selected work"
          title="Projects"
          sub="Product platforms, CRM workspaces and content sites — a slice of what I've shipped."
        />

        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  filter === f.id
                    ? "bg-gradient-to-r from-accent to-violet-900 text-white"
                    : "border border-line bg-white/[0.03] text-muted hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card group relative flex min-h-[320px] flex-col p-7 transition hover:border-accent sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm font-extrabold text-white/25">{p.n}</span>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="grid size-10 place-items-center rounded-full border border-line text-muted transition group-hover:bg-accent group-hover:text-white"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <span
                      title="Internal project — no public link"
                      className="grid size-10 place-items-center rounded-full border border-line text-white/30"
                    >
                      <Lock size={16} />
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-2">
                    {p.cat}
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold">{p.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{p.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-white/45">Role · {p.role}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
