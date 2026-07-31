import type { Metadata } from "next";
import { Elsie, Faculty_Glyphic, Geist } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { getSiteSettings } from "@/lib/sanity/fetch";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const elsie = Elsie({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteSettings.organizationName} — ${siteSettings.missionStatement}`,
      template: `%s | ${siteSettings.organizationName}`,
    },
    description: siteSettings.missionStatement,
    openGraph: {
      title: siteSettings.organizationName,
      description: siteSettings.missionStatement,
      siteName: siteSettings.organizationName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.organizationName,
      description: siteSettings.missionStatement,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${elsie.variable} ${facultyGlyphic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Default to light on first visit regardless of OS preference; the
            toggle can still switch to dark, which next-themes persists. */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
