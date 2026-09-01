import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Skills() {
  const categories = portfolio.skills.filter((c) => c.items.length > 0);
  if (categories.length === 0) return null;

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I work with"
        description="The tools and technologies I use to design, build, and ship software."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.id} delay={i * 0.05}>
              <div className="border-border bg-card hover:border-accent/50 h-full rounded-2xl border p-6 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="bg-accent/15 text-accent inline-flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">{cat.label}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="border-border text-foreground/80 rounded-md border px-2.5 py-1 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
