/**
 * Canonical site URL, used for SEO metadata (canonical, Open Graph, Twitter),
 * robots.txt, and the sitemap.
 *
 * ▶ Set SITE_URL (or NEXT_PUBLIC_SITE_URL) in your environment — Vercel project
 *   settings or .env.local — to your real domain, e.g. https://ajaynishad.dev.
 *   These pages are prerendered, so the value is read at BUILD time. On Vercel,
 *   VERCEL_PROJECT_PRODUCTION_URL is used automatically as a fallback.
 */
/** Ensure a URL has a scheme and no trailing slash (e.g. "example.com" -> "https://example.com"). */
function normalize(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return normalize(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  // Local/dev fallback.
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
