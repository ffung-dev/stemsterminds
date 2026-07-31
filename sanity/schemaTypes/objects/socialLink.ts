import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Twitter / X", value: "twitter" },
          { title: "Facebook", value: "facebook" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Shown as accessible text, e.g. "Instagram" or a custom platform name.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
