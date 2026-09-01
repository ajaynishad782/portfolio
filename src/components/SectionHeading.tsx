import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/**
 * Consistent section header with an eyebrow label, an <h2> title and optional
 * supporting text. Used by every content section for a unified visual rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="text-accent mb-2 text-sm font-medium tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-muted mt-4 text-base leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
