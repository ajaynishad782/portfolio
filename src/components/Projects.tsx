import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { portfolio, isSet, type ProjectItem } from "@/data/portfolio";
import { GithubIcon } from "@/components/BrandIcons";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Compact monogram from a project's title (before any dash). */
function monogram(name: string) {
  const main = name.replace(/\[|\]/g, "").split(/[–—-]/)[0];
  return (
    main
      .split(/\s+/)
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 3)
      .join("")
      .toUpperCase() || "•"
  );
}

function ProjectImage({ project }: { project: ProjectItem }) {
  if (isSet(project.image)) {
    return (
      <Image
        src={project.image!}
        alt={`${project.name} screenshot`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  // Styled placeholder (centered monogram) instead of random stock imagery.
  return (
    <div
      aria-hidden="true"
      className="from-accent/15 via-card to-background flex h-full w-full items-center justify-center bg-gradient-to-br"
    >
      <span className="text-accent/40 text-4xl font-bold tracking-tight">
        {monogram(project.name)}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  featured,
}: {
  project: ProjectItem;
  featured: boolean;
}) {
  return (
    <article
      className={`group border-border bg-card hover:border-accent/50 flex flex-col overflow-hidden rounded-2xl border transition-colors ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative aspect-video overflow-hidden ${
          featured ? "md:aspect-auto md:w-1/2" : ""
        }`}
      >
        <ProjectImage project={project} />
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:w-1/2" : ""}`}>
        {featured && (
          <span className="text-accent mb-2 text-xs font-medium tracking-wide uppercase">
            Featured project
          </span>
        )}
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-3 space-y-1">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-foreground/70 text-sm">
                • {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="bg-foreground/5 text-foreground/70 rounded-md px-2.5 py-1 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          {isSet(project.demo) && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              aria-label={`${project.name} — live demo`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </a>
          )}
          {isSet(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-foreground/5 inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              aria-label={`${project.name} — source on GitHub`}
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { projects } = portfolio;
  if (projects.length === 0) return null;

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Projects"
        title="Featured projects"
        description="A selection of work I'm proud of."
      />

      <div className="space-y-6">
        {featured.map((p, i) => (
          <Reveal key={`f-${i}`} delay={i * 0.05}>
            <ProjectCard project={p} featured />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={`r-${i}`} delay={i * 0.05}>
              <ProjectCard project={p} featured={false} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
