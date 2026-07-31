import { defineField, defineType } from "sanity";

export const applicationLink = defineType({
  name: "applicationLink",
  title: "Application Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
