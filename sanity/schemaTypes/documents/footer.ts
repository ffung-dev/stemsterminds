import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: schemaIcon("list"),
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: 'e.g. "STEMsterMinds. All rights reserved." — the year is added automatically.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
