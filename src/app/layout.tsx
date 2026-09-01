import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { name, title, summary } = portfolio.personal;
const cleanName = name.replace(/\[|\]/g, "");
const description = `${cleanName} — ${title.replace(/\[|\]/g, "")}. ${summary.replace(/\[|\]/g, "")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${cleanName} · ${title.replace(/\[|\]/g, "")}`,
    template: `%s · ${cleanName}`,
  },
  description,
  keywords: [
    cleanName,
    "software engineer",
    "developer",
    "portfolio",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: cleanName, url: siteUrl }],
  creator: cleanName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${cleanName} · ${title.replace(/\[|\]/g, "")}`,
    description,
    siteName: cleanName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${cleanName} · ${title.replace(/\[|\]/g, "")}`,
    description,
  },
};

// Runs before paint to set the theme from a saved choice, else the OS setting
// (prefers-color-scheme). No flash. Falls back to dark if matchMedia is absent.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
