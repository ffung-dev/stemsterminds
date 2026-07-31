import { cache } from "react";

import { isSanityConfigured } from "@/sanity/env";
import {
  mockAboutPage,
  mockContactPage,
  mockEvents,
  mockBlogPosts,
  mockFooter,
  mockHomepage,
  mockNavigation,
  mockSiteSettings,
  mockVolunteerPage,
} from "@/lib/mock-data";
import type {
  AboutPage,
  BlogPost,
  ContactPage,
  EventItem,
  FooterData,
  Homepage,
  NavItem,
  SiteSettings,
  VolunteerPage,
} from "@/lib/types";

import { client } from "./client";
import {
  aboutPageQuery,
  allBlogPostsQuery,
  allEventsQuery,
  blogPostBySlugQuery,
  blogSlugsQuery,
  contactPageQuery,
  eventBySlugQuery,
  eventSlugsQuery,
  footerQuery,
  homepageQuery,
  navigationQuery,
  siteSettingsQuery,
  volunteerPageQuery,
} from "./queries";

/**
 * Until a live Sanity project is configured (NEXT_PUBLIC_SANITY_PROJECT_ID),
 * these functions serve fixtures from lib/mock-data.ts that mirror the exact
 * shape the GROQ queries above return. The moment real credentials are added,
 * every call site below starts hitting the live dataset with no changes needed.
 *
 * Each is wrapped in React's `cache()` so calling it from both a page's
 * generateMetadata and its component body (a common pattern here) only
 * fetches once per request.
 */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured) return mockSiteSettings;
  return client.fetch(siteSettingsQuery);
});

export const getNavigation = cache(async (): Promise<NavItem[]> => {
  if (!isSanityConfigured) return mockNavigation;
  return client.fetch(navigationQuery);
});

export const getFooter = cache(async (): Promise<FooterData> => {
  if (!isSanityConfigured) return mockFooter;
  return client.fetch(footerQuery);
});

export const getHomepage = cache(async (): Promise<Homepage> => {
  if (!isSanityConfigured) return mockHomepage;
  return client.fetch(homepageQuery);
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  if (!isSanityConfigured) return mockAboutPage;
  return client.fetch(aboutPageQuery);
});

export const getVolunteerPage = cache(async (): Promise<VolunteerPage> => {
  if (!isSanityConfigured) return mockVolunteerPage;
  return client.fetch(volunteerPageQuery);
});

export const getContactPage = cache(async (): Promise<ContactPage> => {
  if (!isSanityConfigured) return mockContactPage;
  return client.fetch(contactPageQuery);
});

export const getAllEvents = cache(async (): Promise<EventItem[]> => {
  if (!isSanityConfigured) return mockEvents;
  return client.fetch(allEventsQuery);
});

export const getEventBySlug = cache(async (slug: string): Promise<EventItem | null> => {
  if (!isSanityConfigured) return mockEvents.find((event) => event.slug === slug) ?? null;
  return client.fetch(eventBySlugQuery, { slug });
});

export const getEventSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return mockEvents.map((event) => event.slug);
  return client.fetch(eventSlugsQuery);
});

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!isSanityConfigured) {
    return [...mockBlogPosts].sort((a, b) => (a.datePosted < b.datePosted ? 1 : -1));
  }
  return client.fetch(allBlogPostsQuery);
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!isSanityConfigured) return mockBlogPosts.find((post) => post.slug === slug) ?? null;
  return client.fetch(blogPostBySlugQuery, { slug });
});

export const getBlogSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return mockBlogPosts.map((post) => post.slug);
  return client.fetch(blogSlugsQuery);
});
