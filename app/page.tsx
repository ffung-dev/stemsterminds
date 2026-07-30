import type { Metadata } from "next";

import { FeaturedBlogPosts } from "@/components/home/FeaturedBlogPosts";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { QuickStats } from "@/components/home/QuickStats";
import { TeamGrid } from "@/components/home/TeamGrid";
import { VolunteerCTA } from "@/components/home/VolunteerCTA";
import { getHomepage, getSiteSettings } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, siteSettings] = await Promise.all([getHomepage(), getSiteSettings()]);
  return buildMetadata(homepage.seo, { title: siteSettings.organizationName, description: siteSettings.missionStatement });
}

export default async function HomePage() {
  const [homepage, siteSettings] = await Promise.all([getHomepage(), getSiteSettings()]);

  return (
    <>
      <Hero
        title={homepage.heroTitle}
        subtitle={homepage.heroSubtitle}
        applicationLinks={siteSettings.applicationLinks}
      />
      <TeamGrid team={homepage.team} />
      <Gallery images={homepage.galleryImages} />
      <FeaturedBlogPosts posts={homepage.featuredBlogPosts} />
      <QuickStats stats={homepage.quickStats} />
      <VolunteerCTA
        heading={homepage.ctaHeading}
        body={homepage.ctaBody}
        buttonText={homepage.ctaButtonText}
        buttonLink={homepage.ctaButtonLink}
      />
    </>
  );
}
