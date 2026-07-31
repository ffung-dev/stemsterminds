import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: schemaIcon("star"),
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "imageWithAlt" }),
    defineField({ name: "url", title: "Website URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
