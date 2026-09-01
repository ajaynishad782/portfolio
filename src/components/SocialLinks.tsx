import { Mail, Globe } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { portfolio, isSet } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";

interface SocialLinksProps {
  className?: string;
  /** Include a mailto link built from personal.email. */
  includeEmail?: boolean;
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type Entry = { href: string; label: string; icon: IconType };

/**
 * Renders icon links for whichever socials are actually configured in
 * portfolio.social (plus optional email). Skips empty/placeholder values so no
 * dead links are shown once real data is filled in.
 */
export default function SocialLinks({
  className = "",
  includeEmail = false,
}: SocialLinksProps) {
  const { social, personal } = portfolio;

  const entries: Entry[] = [];
  if (isSet(social.github))
    entries.push({ href: social.github, label: "GitHub", icon: GithubIcon });
  if (isSet(social.linkedin))
    entries.push({
      href: social.linkedin,
      label: "LinkedIn",
      icon: LinkedinIcon,
    });
  if (isSet(social.twitter))
    entries.push({ href: social.twitter!, label: "X (Twitter)", icon: XIcon });
  if (isSet(social.website))
    entries.push({ href: social.website!, label: "Website", icon: Globe });
  if (includeEmail && isSet(personal.email))
    entries.push({
      href: `mailto:${personal.email}`,
      label: "Email",
      icon: Mail,
    });

  if (entries.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {entries.map(({ href, label, icon: Icon }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="border-border text-foreground/70 hover:border-accent hover:text-accent inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
