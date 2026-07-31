import type { Metadata } from "next";

import type { SeoData } from "./types";

export function buildMetadata(seo: SeoData | undefined, fallback: { title: string; description?: string }): Metadata {
  const title = seo?.seoTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;

  const metadata: Metadata = { title, description };

  if (seo?.canonicalUrl) {
    metadata.alternates = { canonical: seo.canonicalUrl };
  }

  if (seo?.keywords?.length) {
    metadata.keywords = seo.keywords;
  }

  metadata.openGraph = {
    title,
    description,
    images: seo?.ogImage?.url ? [{ url: seo.ogImage.url, width: seo.ogImage.width, height: seo.ogImage.height }] : undefined,
  };

  return metadata;
}
