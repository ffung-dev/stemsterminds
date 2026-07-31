import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: schemaIcon("envelope"),
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", initialValue: "Contact Us" }),
    defineField({ name: "introText", title: "Intro Text", type: "text", rows: 2 }),
    defineField({
      name: "faqPreview",
      title: "FAQ Preview",
      description: "A short list of FAQs to preview here, linking through to the Volunteer page.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
