import { Footer } from "@/components/footer/Footer";
import { FunFactPanel } from "@/components/fun-fact/FunFactPanel";
import { NavBar } from "@/components/nav/NavBar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getFooter, getNavigation, getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
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
    <>
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
    </>
  );
}
