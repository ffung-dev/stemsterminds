import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: schemaIcon("document-text"),
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], group: "meta", validation: (rule) => rule.required() }),
    defineField({ name: "datePosted", title: "Date Posted", type: "date", group: "meta", validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", title: "Hero Image", type: "imageWithAlt", group: "content" }),
    defineField({ name: "excerpt", title: "One-Sentence Description", type: "text", rows: 2, group: "content", validation: (rule) => rule.required().max(200) }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        { type: "imageWithAlt" },
        {
          type: "object",
          name: "embeddedVideo",
          title: "Embedded Video",
          fields: [{ name: "url", title: "Video URL", type: "url" }],
        },
      ],
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], group: "meta" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "meta",
    }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false, group: "meta" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Date Posted, New to Old", name: "datePostedDesc", by: [{ field: "datePosted", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "heroImage" },
  },
});
