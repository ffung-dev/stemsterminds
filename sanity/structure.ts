import type { StructureResolver } from "sanity/structure";

const SINGLETONS: Array<{ id: string; title: string }> = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homepage", title: "Homepage" },
  { id: "aboutPage", title: "About Page" },
  { id: "volunteerPage", title: "Volunteer Page" },
  { id: "contactPage", title: "Contact Page" },
  { id: "navigation", title: "Navigation" },
  { id: "footer", title: "Footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      S.listItem().title("Events").schemaType("event").child(S.documentTypeList("event").title("Events")),
      S.listItem().title("Blog Posts").schemaType("blogPost").child(S.documentTypeList("blogPost").title("Blog Posts")),
      S.listItem().title("Authors").schemaType("author").child(S.documentTypeList("author").title("Authors")),
      S.listItem().title("Categories").schemaType("category").child(S.documentTypeList("category").title("Categories")),
      S.listItem().title("Team Members").schemaType("teamMember").child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem().title("Partners").schemaType("partner").child(S.documentTypeList("partner").title("Partners")),
      S.listItem().title("Statistics").schemaType("statistic").child(S.documentTypeList("statistic").title("Statistics")),
      S.listItem().title("Gallery Images").schemaType("galleryImage").child(S.documentTypeList("galleryImage").title("Gallery Images")),
      S.listItem().title("FAQs").schemaType("faq").child(S.documentTypeList("faq").title("FAQs")),
    ]);
