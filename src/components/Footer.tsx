import { portfolio } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  const name = portfolio.personal.name;

  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-medium">
            © {year} {name}
          </p>
          <p className="text-muted mt-1 text-sm">
            Built with Next.js and deployed on Vercel.
          </p>
        </div>
        <SocialLinks includeEmail />
      </div>
    </footer>
  );
}
