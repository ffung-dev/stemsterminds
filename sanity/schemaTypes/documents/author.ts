import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: schemaIcon("user"),
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }),
    defineField({ name: "photo", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
