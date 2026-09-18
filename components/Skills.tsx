"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skillGroups, skills } from "@/lib/content";

const R = 42;
const CIRCUMFERENCE = 2 * Math.PI * R;

function Dial({ name, level, delay }: { name: string; level: number; delay: number }) {
  const reduced = useReducedMotion();
  const target = CIRCUMFERENCE * (1 - level / 100);
  return (
    <Reveal delay={delay} className="flex flex-col items-center gap-4">
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-line)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={reduced ? false : { strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: target }}
            transition={
              reduced ? { duration: 0 } : { duration: 1.2, delay: 0.2 + delay, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-lg font-extrabold">
          {level}%
        </span>
      </div>
      <p className="text-center text-sm font-semibold text-muted">{name}</p>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="glow-tr relative py-28">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Toolkit"
          title="My skills"
          sub="The stack I reach for most — plus the supporting tools that keep projects shippable."
        />

        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {skills.map((s, i) => (
            <Dial key={s.name} name={s.name} level={s.level} delay={i * 0.06} />
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04}>
              <div className="card h-full p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent-2">
                  {g.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
