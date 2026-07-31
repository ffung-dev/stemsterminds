import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Nav Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
