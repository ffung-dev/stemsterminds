import type { PortableTextBlock } from "@portabletext/types";

export interface ImageData {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SeoData {
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: { url: string; width: number; height: number };
  canonicalUrl?: string;
  keywords?: string[];
}

export type SocialPlatform =
  | "email"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "twitter"
  | "facebook"
  | "other";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface ApplicationLink {
  label: string;
  url: string;
}

export interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: ImageData;
}

export interface Statistic {
  _id: string;
  label: string;
  value: string;
}

export interface GalleryImage {
  _id: string;
  image: ImageData;
  caption?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  photo?: ImageData;
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  datePosted: string;
  updatedAt: string;
  heroImage?: ImageData;
  excerpt: string;
  body: PortableTextBlock[];
  category?: Category;
  tags: string[];
  featured?: boolean;
  seo?: SeoData;
}

export interface ScheduleItem {
  _key: string;
  time: string;
  title: string;
  description?: string;
}

export interface Speaker {
  _key: string;
  name: string;
  bio?: string;
  photo?: ImageData;
}

export type RegistrationStatus = "open" | "closed" | "full" | "cancelled";

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  headerImage?: ImageData;
  date: string;
  time: string;
  location: string;
  shortDescription: string;
  fullDescription: PortableTextBlock[];
  schedule: ScheduleItem[];
  speakers: Speaker[];
  gallery: ImageData[];
  registrationLink?: string;
  registrationStatus: RegistrationStatus;
  seo?: SeoData;
}

export interface SiteSettings {
  organizationName: string;
  missionStatement: string;
  footerText: string;
  contactEmail: string;
  mailingAddress?: string;
  officeHours?: string;
  applicationLinks: ApplicationLink[];
  socialLinks: SocialLink[];
  funFacts: string[];
  logo?: ImageData;
}

export interface Homepage {
  heroTitle: string;
  heroSubtitle: string;
  team: TeamMember[];
  featuredBlogPosts: BlogPost[];
  quickStats: Statistic[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  galleryImages: GalleryImage[];
  seo?: SeoData;
}

export interface ValueItem {
  _key: string;
  title: string;
  description: string;
}

export interface AboutPage {
  heroTitle: string;
  description: PortableTextBlock[];
  visionTitle: string;
  visionBody: string;
  values: ValueItem[];
  seo?: SeoData;
}

export interface OpportunityItem {
  _key: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  _key: string;
  title: string;
  description: string;
}

export interface VolunteerPage {
  heroTitle: string;
  introText: string;
  opportunities: OpportunityItem[];
  whyVolunteer: BenefitItem[];
  applicationCtaHeading: string;
  applicationCtaText: string;
  applicationLink: string;
  faqs: FaqItem[];
  seo?: SeoData;
}

export interface ContactPage {
  heroTitle: string;
  introText?: string;
  seo?: SeoData;
}

export interface NavItem {
  _key: string;
  label: string;
  href: string;
}

export interface FooterData {
  quickLinks: NavItem[];
  copyrightText: string;
}
