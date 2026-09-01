import { Check } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function About() {
  const { personal, focus } = portfolio;

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <p className="text-muted text-lg leading-relaxed">
            {personal.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-border bg-card rounded-2xl border p-6">
            <h3 className="text-foreground text-sm font-semibold tracking-wide uppercase">
              What I focus on
            </h3>
            <ul className="mt-4 space-y-3">
              {focus.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="bg-accent/15 text-accent mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="text-foreground/80 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
