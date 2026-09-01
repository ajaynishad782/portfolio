/**
 * Canonical site URL, used for SEO metadata (canonical, Open Graph, Twitter),
 * robots.txt, and the sitemap.
 *
 * ▶ Set SITE_URL (or NEXT_PUBLIC_SITE_URL) in your environment — Vercel project
 *   settings or .env.local — to your real domain, e.g. https://ajaynishad.dev.
 *   These pages are prerendered, so the value is read at BUILD time. On Vercel,
 *   VERCEL_PROJECT_PRODUCTION_URL is used automatically as a fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  // Local/dev fallback.
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
