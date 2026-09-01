# Portfolio
# https://portfolio-hazel-kappa-53.vercel.app

A production-ready personal developer portfolio built with Next.js. Modern,
responsive, accessible, SEO-friendly, and ready to deploy on Vercel.

## Tech stack

- **Next.js** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animations (respects `prefers-reduced-motion`)
- **Lucide React** — icons
- **ESLint**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Project structure

```text
src/
├── app/
│   ├── layout.tsx     # SEO metadata + no-flash theme script + fonts
│   ├── page.tsx       # composes all sections
│   └── globals.css    # Tailwind + design tokens + dark mode + a11y
├── components/        # Navbar, Hero, About, Skills, Experience,
│   └── ...            # Projects, Education, Contact, Footer, ThemeToggle,
│                      # SectionHeading, Reveal, SocialLinks
└── data/
    └── portfolio.ts   # ← ALL your personal content lives here
public/
├── profile.jpg        # your photo (add this file)
├── resume.pdf         # your resume (add this file)
└── projects/          # project screenshots
```

## Update your information

Everything personal lives in **`src/data/portfolio.ts`**. No personal data is
hardcoded in the UI — components read exclusively from this file. Replace every
`[YOUR ...]` placeholder and the sample entries.

- **Personal / social:** edit `portfolio.personal` and `portfolio.social`.
  Placeholder social values (starting with `[`) are automatically hidden, so no
  dead links appear until you add a real URL.
- **Skills:** edit the `portfolio.skills` array. Only listed technologies show.
  An empty category is hidden.
- **Experience:** edit `portfolio.experience`. An empty array hides the section.
- **Education / certifications:** edit `portfolio.education` /
  `portfolio.certifications`. Empty → section hidden.
- **SEO:** update `siteUrl` in `src/app/layout.tsx` once you have a domain.

### Add or edit projects

Add objects to `portfolio.projects`:

```ts
{
  name: "My App",
  description: "What it does and why it matters.",
  technologies: ["Next.js", "TypeScript"],
  image: "/projects/my-app.png", // optional; omit/"" for a styled placeholder
  github: "https://github.com/you/my-app",
  demo: "https://my-app.vercel.app",
  featured: true, // featured projects get a larger, side-by-side layout
}
```

Put screenshots in `public/projects/` and reference them as `/projects/<file>`.

### Profile image

Add `public/profile.jpg`. Until then the hero shows your initials as a
placeholder. Change the path via `portfolio.personal.avatar`.

### Resume

Add `public/resume.pdf`. The "Download Resume" button links to
`portfolio.personal.resume`.

## Contact form

The form has full client-side validation but **does not send email yet** — it
confirms locally. To deliver messages, wire the submit handler in
`src/components/Contact.tsx` to a provider:

- **Resend:** add `RESEND_API_KEY` (see `.env.example`), create a route handler
  at `src/app/api/contact/route.ts`, and `fetch("/api/contact", …)` from the
  form.
- **Formspree / Getform:** point the form `action` at your endpoint.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed. Only required
if you connect the contact form to an email provider. Never commit secrets.

## Deploy to Vercel

### Git + dashboard

```bash
git add .
git commit -m "Build professional portfolio"
git push origin main
```

Import the repo at [vercel.com/new](https://vercel.com/new). Framework preset
auto-detects Next.js. Add any environment variables in the project settings.

### Vercel CLI

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```
