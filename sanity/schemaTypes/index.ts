import { seo } from "./objects/seo";
import { socialLink } from "./objects/socialLink";
import { applicationLink } from "./objects/applicationLink";
import { navItem } from "./objects/navItem";
import { imageWithAlt } from "./objects/imageWithAlt";

import { siteSettings } from "./documents/siteSettings";
import { homepage } from "./documents/homepage";
import { aboutPage } from "./documents/aboutPage";
import { volunteerPage } from "./documents/volunteerPage";
import { contactPage } from "./documents/contactPage";
import { navigation } from "./documents/navigation";
import { footer } from "./documents/footer";
import { event } from "./documents/event";
import { blogPost } from "./documents/blogPost";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { teamMember } from "./documents/teamMember";
import { partner } from "./documents/partner";
import { statistic } from "./documents/statistic";
import { galleryImage } from "./documents/galleryImage";
import { faq } from "./documents/faq";

export const schemaTypes = [
  // Objects
  seo,
  socialLink,
  applicationLink,
  navItem,
  imageWithAlt,
  // Singletons
  siteSettings,
  homepage,
  aboutPage,
  volunteerPage,
  contactPage,
  navigation,
  footer,
  // Collections
  event,
  blogPost,
  author,
  category,
  teamMember,
  partner,
  statistic,
  galleryImage,
  faq,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homepage",
  "aboutPage",
  "volunteerPage",
  "contactPage",
  "navigation",
  "footer",
]);
