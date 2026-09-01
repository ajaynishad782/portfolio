import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Experience() {
  const { experience } = portfolio;
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <ol className="border-border relative border-l">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${i}`} delay={i * 0.05}>
            <div className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="border-accent bg-background absolute top-1.5 -left-[7px] h-3 w-3 rounded-full border-2"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <span className="text-muted text-sm">{job.period}</span>
              </div>
              <p className="text-accent mt-1">
                {job.company}
                {job.location && (
                  <span className="text-muted"> · {job.location}</span>
                )}
              </p>
              <p className="text-muted mt-3">{job.description}</p>

              {job.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="text-foreground/80 before:bg-accent/60 relative pl-5 text-sm before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {job.technologies.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.technologies.map((t) => (
                    <li
                      key={t}
                      className="bg-foreground/5 text-foreground/70 rounded-md px-2.5 py-1 text-xs"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
