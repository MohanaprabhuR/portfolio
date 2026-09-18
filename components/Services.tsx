import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="py-28">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="What I do"
          title="Services"
          sub="From the first Figma frame to a deployed, maintainable product — here's where I usually plug in."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <article className="card group h-full p-8 transition hover:-translate-y-1 hover:border-accent">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent-2 transition group-hover:bg-accent group-hover:text-white">
                    <s.icon size={22} />
                  </div>
                  <span className="font-display text-2xl font-extrabold text-white/10">{s.n}</span>
                </div>
                <h3 className="mt-8 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-7 text-muted">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
