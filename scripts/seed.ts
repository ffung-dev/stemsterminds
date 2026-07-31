/**
 * One-time content seed: pushes realistic starter content into the Sanity
 * dataset so the live site has something to show immediately. Safe to
 * re-run — every document uses createOrReplace with a fixed _id.
 *
 * Usage: npm run seed
 * Requires SANITY_API_WRITE_TOKEN (Editor permission) in .env.local.
 */
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { paragraphs } from "../lib/utils";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local — aborting.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function refKeyed(id: string, key: string) {
  return { _type: "reference" as const, _ref: id, _key: key };
}

/** Loosely-typed document shape — this script pushes hand-authored content, not app code. */
type SeedDoc = { _id: string; _type: string } & Record<string, unknown>;

async function main() {
  console.log(`Seeding project "${projectId}" / dataset "${dataset}"...`);

  // --- Leaf documents -------------------------------------------------
  const authors = [
    { _id: "author-priya-nair", name: "Priya Nair", slug: "priya-nair", bio: "Founder & President of STEMsterMinds." },
    { _id: "author-ava-chen", name: "Ava Chen", slug: "ava-chen", bio: "Director of Curriculum at STEMsterMinds." },
    { _id: "author-marcus-lee", name: "Marcus Lee", slug: "marcus-lee", bio: "Volunteer writer and VP of Operations." },
  ].map((a) => ({ _id: a._id, _type: "author", name: a.name, slug: { _type: "slug", current: a.slug }, bio: a.bio }));

  const categories = [
    { _id: "category-stem-tips", title: "STEM Tips", slug: "stem-tips" },
    { _id: "category-org-updates", title: "Organization Updates", slug: "organization-updates" },
    { _id: "category-student-stories", title: "Student Stories", slug: "student-stories" },
    { _id: "category-opportunities", title: "Opportunities", slug: "opportunities" },
  ].map((c) => ({ _id: c._id, _type: "category", title: c.title, slug: { _type: "slug", current: c.slug } }));

  const teamMembers = [
    { _id: "team-priya-nair", name: "Priya Nair", role: "Founder & President", bio: "Priya founded STEMsterMinds to make hands-on STEM education accessible to every young person, everywhere.", order: 1 },
    { _id: "team-marcus-lee", name: "Marcus Lee", role: "VP of Operations", bio: "Marcus keeps the organization running smoothly, from volunteer onboarding to event logistics.", order: 2 },
    { _id: "team-ava-chen", name: "Ava Chen", role: "Director of Curriculum", bio: "Ava designs workshop curricula that turn complex STEM topics into approachable, hands-on lessons.", order: 3 },
    { _id: "team-jonah-diaz", name: "Jonah Diaz", role: "Director of Outreach", bio: "Jonah builds partnerships with schools and community organizations to bring STEMsterMinds to new communities.", order: 4 },
  ].map((t) => ({ ...t, _type: "teamMember" }));

  const statistics = [
    { _id: "stat-students", label: "Students Reached", value: "2,500+", order: 1 },
    { _id: "stat-countries", label: "Countries", value: "6", order: 2 },
    { _id: "stat-volunteers", label: "Volunteers", value: "80+", order: 3 },
    { _id: "stat-resources", label: "Educational Resources Distributed", value: "1,200+", order: 4 },
  ].map((s) => ({ ...s, _type: "statistic" }));

  const faqs = [
    { _id: "faq-time", question: "How much time do I need to commit?", answer: "Most roles require 2–4 hours per week, but we work with your schedule and academic commitments.", order: 1 },
    { _id: "faq-remote", question: "Can I volunteer remotely?", answer: "Yes! Many of our roles, including content creation, research, and social media, are fully remote.", order: 2 },
    { _id: "faq-age", question: "Is there a minimum age to volunteer?", answer: "Volunteers must be at least 13 years old. Some leadership roles require additional experience.", order: 3 },
    { _id: "faq-training", question: "Will I receive training?", answer: "Yes, every volunteer completes a short onboarding and receives ongoing support from a team lead.", order: 4 },
    { _id: "faq-apply", question: "How do I apply?", answer: "Click the application button below, fill out the short form, and our team will reach out within a week.", order: 5 },
  ].map((f) => ({ ...f, _type: "faq", category: "volunteer" }));

  console.log("Creating authors, categories, team members, statistics, FAQs...");
  const leafDocs: SeedDoc[] = [...authors, ...categories, ...teamMembers, ...statistics, ...faqs];
  await Promise.all(leafDocs.map((doc) => client.createOrReplace(doc)));

  // --- Singletons ---------------------------------------------------------
  console.log("Creating site settings, homepage, about/volunteer/contact pages, navigation, footer...");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    organizationName: "STEMsterMinds",
    missionStatement:
      "Empowering youth to develop their knowledge about Science, Technology, Engineering, and Math!",
    footerText:
      "STEMsterMinds is a youth-led nonprofit inspiring the next generation of STEM innovators across Canada and the United States.",
    contactEmail: "stemsterminds@gmail.com",
    applicationLinks: [
      { _key: "app-1", label: "Volunteer Application", url: "https://forms.gle/stemsterminds-volunteer" },
      { _key: "app-2", label: "Leadership Application", url: "https://forms.gle/stemsterminds-leadership" },
      { _key: "app-3", label: "Summer Internship Application", url: "https://forms.gle/stemsterminds-internship" },
    ],
    socialLinks: [
      { _key: "soc-1", platform: "instagram", label: "Instagram", url: "https://instagram.com/stemsterminds" },
      { _key: "soc-2", platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/company/stemsterminds" },
      { _key: "soc-3", platform: "youtube", label: "YouTube", url: "https://youtube.com/@stemsterminds" },
      { _key: "soc-4", platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@stemsterminds" },
      { _key: "soc-5", platform: "email", label: "Email", url: "mailto:stemsterminds@gmail.com" },
    ],
    funFacts: [
      "Honeybees can recognize individual human faces using the same process computers use for facial recognition.",
      "The first computer programmer, Ada Lovelace, wrote the first algorithm in the 1840s — before computers even existed.",
      "A single bolt of lightning is about five times hotter than the surface of the sun.",
      "Octopuses have three hearts and blue, copper-based blood.",
      "The Fibonacci sequence shows up in sunflower seeds, pinecones, and even galaxies.",
      "NASA's Voyager 1 is the farthest human-made object from Earth, launched in 1977 and still transmitting.",
      "A group of flamingos turns pink because of the shrimp and algae they eat.",
    ],
  });

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroTitle: "STEMsterMinds",
    heroSubtitle: "Empowering youth to develop their knowledge about Science, Technology, Engineering, and Math!",
    team: teamMembers.map((t, i) => refKeyed(t._id, `team-${i}`)),
    featuredBlogPosts: [],
    quickStats: statistics.map((s, i) => refKeyed(s._id, `stat-${i}`)),
    ctaHeading: "Ready to Make an Impact?",
    ctaBody: "Join our team of passionate volunteers and help spark curiosity in the next generation of STEM leaders.",
    ctaButtonText: "Become a Volunteer",
    ctaButtonLink: "/volunteer",
    galleryImages: [],
  });

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "About STEMsterMinds",
    description: paragraphs(
      "STEMsterMinds is a youth-led nonprofit organization based in Canada and the United States, committed to promoting STEM education among young individuals.",
      "Our mission is to provide the necessary resources and support to nurture curiosity and innovation in science, technology, engineering, and mathematics.",
      "Through workshops, mentorship, and educational resources, we strive to create an engaging environment where young people can discover their interests, develop confidence, and pursue careers in STEM."
    ),
    visionTitle: "Our Vision",
    visionBody:
      "A world where every young person, regardless of background or location, has the opportunity to explore and fall in love with STEM.",
    values: [
      { _key: "value-accessibility", title: "Accessibility", description: "We remove barriers so every student can participate, regardless of background or resources." },
      { _key: "value-curiosity", title: "Curiosity", description: "We encourage big questions and hands-on exploration over rote memorization." },
      { _key: "value-innovation", title: "Innovation", description: "We embrace creative problem-solving and new ways of teaching STEM." },
      { _key: "value-collaboration", title: "Collaboration", description: "We believe the best ideas come from working together across schools, cultures, and disciplines." },
      { _key: "value-inclusion", title: "Inclusion", description: "We build spaces where every student feels welcome to explore STEM." },
    ],
  });

  await client.createOrReplace({
    _id: "volunteerPage",
    _type: "volunteerPage",
    heroTitle: "Volunteer With STEMsterMinds",
    introText:
      "We're always looking for new volunteers. Whether your strengths are in teaching, filming, researching, writing, organizing events, social media, or leading projects, we'd love to have you on our team.",
    opportunities: [
      { _key: "opp-teaching", title: "Teaching", description: "Lead hands-on STEM lessons for students of all ages." },
      { _key: "opp-workshop", title: "Workshop Assistant", description: "Support lead instructors during in-person and virtual workshops." },
      { _key: "opp-research", title: "Research", description: "Help develop accurate, engaging content for our curriculum and blog." },
      { _key: "opp-content", title: "Content Creation", description: "Write articles, scripts, and social posts that showcase our work." },
      { _key: "opp-design", title: "Graphic Design", description: "Design graphics, presentations, and branded materials." },
      { _key: "opp-video", title: "Video Editing", description: "Edit workshop recordings and social media videos." },
      { _key: "opp-social", title: "Social Media", description: "Grow our online community across Instagram, TikTok, and YouTube." },
      { _key: "opp-leadership", title: "Leadership", description: "Take on a leadership role coordinating a team or program." },
      { _key: "opp-curriculum", title: "Curriculum Development", description: "Build new lesson plans and activities for our workshops." },
    ],
    whyVolunteer: [
      { _key: "why-community", title: "Community Service", description: "Earn verified volunteer hours while giving back." },
      { _key: "why-leadership", title: "Leadership Experience", description: "Take ownership of real projects and grow your leadership skills." },
      { _key: "why-impact", title: "Real Impact", description: "Directly shape how young people experience STEM." },
      { _key: "why-skills", title: "Professional Skills", description: "Build transferable skills in teaching, design, writing, and project management." },
      { _key: "why-networking", title: "Networking", description: "Connect with a growing community of students and STEM professionals." },
    ],
    applicationCtaHeading: "Ready to Join Us?",
    applicationCtaText: "Fill out our quick application and a team member will follow up within a week.",
    applicationLink: "https://forms.gle/stemsterminds-volunteer",
    faqs: faqs.map((f, i) => refKeyed(f._id, `faq-${i}`)),
  });

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Contact Us",
    introText: "Have a question, idea, or want to get involved? We'd love to hear from you.",
  });

  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    items: [
      { _key: "nav-home", label: "Home", href: "/" },
      { _key: "nav-about", label: "About", href: "/about" },
      { _key: "nav-volunteer", label: "Volunteer", href: "/volunteer" },
      { _key: "nav-events", label: "Events", href: "/events" },
      { _key: "nav-blog", label: "Blog", href: "/blog" },
      { _key: "nav-contact", label: "Contact", href: "/contact" },
    ],
  });

  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    quickLinks: [
      { _key: "nav-home", label: "Home", href: "/" },
      { _key: "nav-about", label: "About", href: "/about" },
      { _key: "nav-volunteer", label: "Volunteer", href: "/volunteer" },
      { _key: "nav-events", label: "Events", href: "/events" },
      { _key: "nav-blog", label: "Blog", href: "/blog" },
      { _key: "nav-contact", label: "Contact", href: "/contact" },
    ],
    copyrightText: "STEMsterMinds. All rights reserved.",
  });

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
