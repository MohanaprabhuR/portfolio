import { Briefcase, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import CvButton from "./CvButton";
import { education, experience } from "@/lib/content";

type Row = { period: string; title: string; place: string };

function Timeline({
  heading,
  icon: Icon,
  rows,
}: {
  heading: string;
  icon: typeof GraduationCap;
  rows: Row[];
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent-2">
            <Icon size={20} />
          </div>
          <h3 className="text-2xl font-extrabold">{heading}</h3>
        </div>
      </Reveal>

      <ol className="mt-8 space-y-4 border-l border-line pl-8">
        {rows.map((r, i) => (
          <Reveal key={r.period + r.title} delay={i * 0.07}>
            <li className="relative card p-6">
              <span className="absolute -left-[41px] top-8 size-3.5 rounded-full border-2 border-ink bg-accent" />
              <p className="text-sm font-bold text-accent-2">{r.period}</p>
              <p className="mt-2 font-display text-lg font-bold">{r.title}</p>
              <p className="mt-1 text-sm text-muted">{r.place}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-28">
      <div className="shell">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Background</p>
              <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">Resume</h2>
            </div>
            <CvButton />
          </div>
        </Reveal>
      </div>

      <div className="shell grid gap-16 lg:grid-cols-2">
        <Timeline heading="Education" icon={GraduationCap} rows={education} />
        <Timeline heading="Experience" icon={Briefcase} rows={experience} />
      </div>
    </section>
  );
}
