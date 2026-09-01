import { GraduationCap, Award } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Education() {
  const { education, certifications } = portfolio;
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Education" title="Education & credentials" />

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={`edu-${i}`} delay={i * 0.05}>
            <div className="border-border bg-card flex h-full gap-4 rounded-2xl border p-6">
              <span className="bg-accent/15 text-accent inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-muted text-sm">{edu.period}</span>
                </div>
                {edu.institution && (
                  <p className="text-accent mt-1">{edu.institution}</p>
                )}
                {edu.details && (
                  <p className="text-muted mt-2 text-sm">{edu.details}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {certifications.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-6 text-lg font-semibold">Certifications</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => {
              const external = !!cert.url && cert.url.startsWith("http");
              const Wrapper = cert.url ? "a" : "div";
              return (
                <Reveal key={`cert-${i}`} delay={i * 0.05}>
                  <Wrapper
                    {...(cert.url
                      ? {
                          href: cert.url,
                          ...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {}),
                        }
                      : {})}
                    className="border-border bg-card hover:border-accent/50 flex h-full items-start gap-3 rounded-xl border p-4 transition-colors"
                  >
                    <Award
                      className="text-accent mt-0.5 h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-muted text-sm">
                        {cert.issuer}
                        {cert.year && ` · ${cert.year}`}
                      </p>
                    </div>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
