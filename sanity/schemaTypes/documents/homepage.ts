import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: schemaIcon("home"),
  groups: [
    { name: "hero", title: "Hero" },
    { name: "team", title: "Team" },
    { name: "stats", title: "Quick Stats" },
    { name: "cta", title: "Call to Action" },
    { name: "gallery", title: "Gallery" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero", initialValue: "STEMsterMinds" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 2, group: "hero" }),
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
      group: "team",
    }),
    defineField({
      name: "featuredBlogPosts",
      title: "Featured Blog Posts",
      description: "Choose posts to feature. Leave empty to hide this section.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),
    defineField({
      name: "quickStats",
      title: "Quick Stats",
      type: "array",
      of: [{ type: "reference", to: [{ type: "statistic" }] }],
      group: "stats",
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string", group: "cta", initialValue: "Ready to Make an Impact?" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaButtonText", title: "CTA Button Text", type: "string", group: "cta", initialValue: "Become a Volunteer" }),
    defineField({ name: "ctaButtonLink", title: "CTA Button Link", type: "string", group: "cta", initialValue: "/volunteer" }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "reference", to: [{ type: "galleryImage" }] }],
      group: "gallery",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
