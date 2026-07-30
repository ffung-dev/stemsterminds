import type { MetadataRoute } from "next";

import { getBlogSlugs, getEventSlugs } from "@/lib/sanity/fetch";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, eventSlugs] = await Promise.all([getBlogSlugs(), getEventSlugs()]);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/volunteer", "/events", "/blog", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${siteUrl}/events/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...eventRoutes];
}
