"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Linkedin, Mail } from "lucide-react";
import Counter from "./Counter";
import CvButton from "./CvButton";
import Reveal from "./Reveal";
import { profile, stats } from "@/lib/content";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="glow-tr relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />

      <div className="shell relative grid gap-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm font-semibold text-accent-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              Available for new work
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 font-display text-lg font-semibold text-muted">Hi, I&apos;m</p>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-2 text-[clamp(2.4rem,10vw,4.5rem)] font-extrabold leading-[0.95]">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 bg-gradient-to-r from-accent-2 via-accent to-fuchsia-400 bg-clip-text font-display text-[clamp(1.6rem,7vw,3rem)] font-extrabold uppercase tracking-tight text-transparent">
              {profile.role} <span className="text-accent">+</span>
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CvButton />
              <a href="#projects" className="btn-ghost">
                See my work <ArrowDownRight size={18} />
              </a>
              <div className="ml-1 flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition hover:border-accent hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Portrait frame. Drop a photo at public/portrait.jpg and swap the inner
            block for <img src="/portrait.jpg" ... /> to use it instead. */}
        <Reveal delay={0.28} className="lg:justify-self-end">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[42px] bg-accent/20 blur-3xl sm:-inset-6" aria-hidden />
            <div className="card relative aspect-[4/5] overflow-hidden !rounded-[36px] p-8">
              <div className="flex h-full flex-col justify-between">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-accent to-violet-900 font-display text-2xl font-extrabold">
                  {profile.initials}
                </div>
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none">9+</p>
                  <p className="mt-2 text-muted">years building for the web</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["React.js", "Next.js", "Svelte", "Tailwind CSS", "WordPress", "Figma"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              aria-hidden
              className="absolute left-0 top-1/3 rounded-2xl border border-line bg-ink-2/90 px-4 py-3 font-display text-sm font-bold backdrop-blur sm:-left-5"
              animate={reduced ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              &lt;/&gt; React
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute right-0 top-2/3 rounded-2xl border border-line bg-ink-2/90 px-4 py-3 font-display text-sm font-bold backdrop-blur sm:-right-4"
              animate={reduced ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              Next.js
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="shell relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-ink-2 px-6 py-8">
            <Reveal delay={i * 0.06}>
              <p className="font-display text-4xl font-extrabold text-accent-2 sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">{s.label}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
