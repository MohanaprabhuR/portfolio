import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">{title}</h2>
      {sub ? <p className="mt-5 leading-8 text-muted">{sub}</p> : null}
    </Reveal>
  );
}
