import type { Metadata } from "next";
import { Fredoka, Geist } from "next/font/google";

import { Footer } from "@/components/footer/Footer";
import { FunFactPanel } from "@/components/fun-fact/FunFactPanel";
import { NavBar } from "@/components/nav/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getFooter, getNavigation, getSiteSettings } from "@/lib/sanity/fetch";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navigation, footer] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getFooter(),
  ]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fredoka.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-button focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
          >
            Skip to content
          </a>
          <NavBar items={navigation} organizationName={siteSettings.organizationName} />
          <FunFactPanel facts={siteSettings.funFacts} socialLinks={siteSettings.socialLinks} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer footer={footer} siteSettings={siteSettings} />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
