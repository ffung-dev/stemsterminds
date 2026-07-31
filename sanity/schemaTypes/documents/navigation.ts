import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: schemaIcon("menu"),
  fields: [
    defineField({
      name: "items",
      title: "Nav Items",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
