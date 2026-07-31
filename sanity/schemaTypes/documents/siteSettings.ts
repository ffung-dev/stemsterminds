import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: schemaIcon("cog"),
  fields: [
    defineField({ name: "organizationName", title: "Organization Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "missionStatement", title: "Mission Statement", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "footerText", title: "Footer Text", type: "text", rows: 3 }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string", validation: (rule) => rule.required().email() }),
    defineField({ name: "mailingAddress", title: "Mailing Address (optional)", type: "string" }),
    defineField({ name: "officeHours", title: "Office Hours (optional)", type: "string" }),
    defineField({
      name: "applicationLinks",
      title: "Application Links",
      type: "array",
      of: [{ type: "applicationLink" }],
      description: "Shown as buttons on the homepage. Add as many as you like — they'll re-flow automatically.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "funFacts",
      title: "Fun Facts",
      type: "array",
      of: [{ type: "string" }],
      description: "STEM fun facts shown in the rotating side panel.",
    }),
    defineField({ name: "logo", title: "Logo", type: "imageWithAlt" }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
