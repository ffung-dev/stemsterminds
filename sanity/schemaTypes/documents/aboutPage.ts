import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: schemaIcon("info-outline"),
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", initialValue: "About STEMsterMinds" }),
    defineField({ name: "description", title: "Organization Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "visionTitle", title: "Vision Title", type: "string", initialValue: "Our Vision" }),
    defineField({ name: "visionBody", title: "Vision Body", type: "text", rows: 3 }),
    defineField({
      name: "values",
      title: "We Value...",
      type: "array",
      of: [
        {
          type: "object",
          name: "valueItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
