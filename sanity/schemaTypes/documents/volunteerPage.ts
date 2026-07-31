import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const volunteerPage = defineType({
  name: "volunteerPage",
  title: "Volunteer Page",
  type: "document",
  icon: schemaIcon("users"),
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", initialValue: "Volunteer With STEMsterMinds" }),
    defineField({ name: "introText", title: "Introduction", type: "text", rows: 3 }),
    defineField({
      name: "opportunities",
      title: "Volunteer Opportunities",
      type: "array",
      of: [
        {
          type: "object",
          name: "opportunityItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "whyVolunteer",
      title: "Why Volunteer (Benefits)",
      type: "array",
      of: [
        {
          type: "object",
          name: "benefitItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: "applicationCtaHeading", title: "Application CTA Heading", type: "string", initialValue: "Ready to Join Us?" }),
    defineField({ name: "applicationCtaText", title: "Application CTA Text", type: "text", rows: 2 }),
    defineField({ name: "applicationLink", title: "Application Form Link", type: "url" }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Volunteer Page" };
    },
  },
});
