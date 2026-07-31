import { schemaIcon } from "../schemaIcon";
import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: schemaIcon("calendar"),
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "schedule", title: "Schedule & Speakers" },
    { name: "gallery", title: "Gallery" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "headerImage", title: "Header Image", type: "imageWithAlt", group: "content" }),
    defineField({ name: "date", title: "Date", type: "date", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "time", title: "Time", type: "string", group: "content", description: '24-hour format, e.g. "14:00"' }),
    defineField({ name: "location", title: "Location", type: "string", group: "content" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2, group: "content", validation: (rule) => rule.required().max(200) }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
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
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      group: "schedule",
      of: [
        {
          type: "object",
          name: "scheduleItem",
          fields: [
            defineField({ name: "time", title: "Time", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: "speakers",
      title: "Speakers (optional)",
      type: "array",
      group: "schedule",
      of: [
        {
          type: "object",
          name: "speaker",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 2 }),
            defineField({ name: "photo", title: "Photo", type: "imageWithAlt" }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "gallery",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({ name: "registrationLink", title: "Registration Link", type: "url", group: "content" }),
    defineField({
      name: "registrationStatus",
      title: "Registration Status",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Full", value: "full" },
          { title: "Closed", value: "closed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "open",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Date, New to Old", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "headerImage" },
  },
});
