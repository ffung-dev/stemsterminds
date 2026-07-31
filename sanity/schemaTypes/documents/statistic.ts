import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const statistic = defineType({
  name: "statistic",
  title: "Statistic",
  type: "document",
  icon: schemaIcon("bar-chart"),
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required(), description: 'e.g. "2,500+"' }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
