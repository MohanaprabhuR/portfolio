import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/content";

const highlights = [
  "Pixel-accurate design-to-code",
  "Reusable component architectures",
  "Responsive & accessible UI",
  "WordPress builds clients can run",
  "Cross-browser consistency",
  "Code reviews & team mentorship",
];

export default function About() {
  return (
    <section id="about" className="glow-bl relative py-28">
      <div className="shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <SectionHeading eyebrow="About me" title="Design-minded, code-driven." />

        <Reveal delay={0.08}>
          <div className="space-y-6 text-lg leading-8 text-muted">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm font-semibold">
                <CheckCircle2 size={18} className="shrink-0 text-accent" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
