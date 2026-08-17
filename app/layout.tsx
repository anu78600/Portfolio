import type { Metadata, Viewport } from "next";
import { mono, sans, serif } from "./fonts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { real } from "@/lib/content";
import { buildJsonLd, siteDescription, siteName, siteUrl } from "@/lib/seo";
import { initialsFrom } from "@/lib/content";
import { CommandPalette } from "@/components/site/CommandPalette";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ThemeScript } from "@/components/site/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${profile.jobTitle}`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  keywords: [
    "MBA",
    "Business analyst",
    "Generative AI",
    "Agentic AI",
    "Data analytics",
    "Financial analysis",
    "Human resource management",
    "International business",
    "Digital transformation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName,
    title: `${siteName} — ${profile.jobTitle}`,
    description: siteDescription,
    url: siteUrl,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${profile.jobTitle}`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#181511" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildJsonLd();
  const paletteProjects = projects.map(({ slug, title }) => ({ slug, title }));

  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Resolves the theme before first paint — see ThemeScript. */}
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        {/*
          The brand mark shows `profile.name` verbatim — including the
          placeholder — rather than the SEO fallback, so an unfilled name is
          visible on every page instead of quietly reading "Personal site".
          `siteName` (with its fallback) is used only where a bracketed
          placeholder would do harm: <title>, metadata and JSON-LD.
        */}
        <Header
          name={profile.name}
          initials={initialsFrom(profile.name, profile.initials)}
          socials={profile.socials}
          resumePdf={real(profile.resumePdf)}
        />

        {children}

        <Footer />

        {/* No back-to-top button. It shipped the one surviving blurred backdrop
            on the site — banned outright by REDESIGN §4.3 and
            listed as a template signal in §7 — and parked 44x44 of furniture
            permanently over running body copy at every ordinary reading
            position on a phone, to buy a scroll the OS already provides. The
            sticky header's logo returns home. */}
        <CommandPalette
          socials={profile.socials}
          resumePdf={real(profile.resumePdf)}
          projects={paletteProjects}
        />
      </body>
    </html>
  );
}
