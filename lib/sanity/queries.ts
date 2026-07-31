import { groq } from "next-sanity";

const imageFragment = /* groq */ `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "alt": alt
}`;

const seoFragment = /* groq */ `{
  seoTitle,
  metaDescription,
  "ogImage": ogImage{
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  canonicalUrl,
  keywords
}`;

const authorFragment = /* groq */ `{
  "_id": _id,
  name,
  "slug": slug.current,
  "photo": photo${imageFragment},
  bio
}`;

const categoryFragment = /* groq */ `{
  "_id": _id,
  title,
  "slug": slug.current
}`;

const blogPostFragment = /* groq */ `{
  "_id": _id,
  title,
  "slug": slug.current,
  "author": author->${authorFragment},
  datePosted,
  "updatedAt": _updatedAt,
  "heroImage": heroImage${imageFragment},
  excerpt,
  body,
  "category": category->${categoryFragment},
  tags,
  featured,
  "seo": seo${seoFragment}
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  organizationName,
  missionStatement,
  footerText,
  contactEmail,
  mailingAddress,
  officeHours,
  applicationLinks,
  socialLinks,
  funFacts,
  "logo": logo${imageFragment}
}`;

export const navigationQuery = groq`*[_type == "navigation"][0].items`;

export const footerQuery = groq`*[_type == "footer"][0]{
  quickLinks,
  copyrightText
}`;

export const homepageQuery = groq`*[_type == "homepage"][0]{
  heroTitle,
  heroSubtitle,
  "team": team[]->{
    "_id": _id,
    name,
    role,
    bio,
    "photo": photo${imageFragment}
  },
  "featuredBlogPosts": featuredBlogPosts[]->${blogPostFragment},
  "quickStats": quickStats[]->{
    "_id": _id,
    label,
    value
  },
  ctaHeading,
  ctaBody,
  ctaButtonText,
  ctaButtonLink,
  "galleryImages": galleryImages[]->{
    "_id": _id,
    "image": image${imageFragment},
    caption
  },
  "seo": seo${seoFragment}
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroTitle,
  description,
  visionTitle,
  visionBody,
  "values": values[]{
    "_key": _key,
    title,
    description
  },
  "seo": seo${seoFragment}
}`;

export const volunteerPageQuery = groq`*[_type == "volunteerPage"][0]{
  heroTitle,
  introText,
  "opportunities": opportunities[]{
    "_key": _key,
    title,
    description
  },
  "whyVolunteer": whyVolunteer[]{
    "_key": _key,
    title,
    description
  },
  applicationCtaHeading,
  applicationCtaText,
  applicationLink,
  "faqs": faqs[]->{
    "_key": _id,
    question,
    answer
  },
  "seo": seo${seoFragment}
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heroTitle,
  introText,
  "seo": seo${seoFragment}
}`;

export const allEventsQuery = groq`*[_type == "event"] | order(date desc){
  "_id": _id,
  title,
  "slug": slug.current,
  "headerImage": headerImage${imageFragment},
  date,
  time,
  location,
  shortDescription,
  fullDescription,
  "schedule": schedule[]{ "_key": _key, time, title, description },
  "speakers": speakers[]{ "_key": _key, name, bio, "photo": photo${imageFragment} },
  "gallery": gallery[]${imageFragment},
  registrationLink,
  registrationStatus,
  "seo": seo${seoFragment}
}`;

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]{
  "_id": _id,
  title,
  "slug": slug.current,
  "headerImage": headerImage${imageFragment},
  date,
  time,
  location,
  shortDescription,
  fullDescription,
  "schedule": schedule[]{ "_key": _key, time, title, description },
  "speakers": speakers[]{ "_key": _key, name, bio, "photo": photo${imageFragment} },
  "gallery": gallery[]${imageFragment},
  registrationLink,
  registrationStatus,
  "seo": seo${seoFragment}
}`;

export const eventSlugsQuery = groq`*[_type == "event" && defined(slug.current)].slug.current`;

export const allBlogPostsQuery = groq`*[_type == "blogPost"] | order(datePosted desc)${blogPostFragment}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]${blogPostFragment}`;

export const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)].slug.current`;

export const allCategoriesQuery = groq`*[_type == "category"] | order(title asc)${categoryFragment}`;

export const allAuthorsQuery = groq`*[_type == "author"] | order(name asc)${authorFragment}`;
