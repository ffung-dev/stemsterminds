import { heading, paragraphs } from "./utils";
import type {
  AboutPage,
  Author,
  BlogPost,
  Category,
  ContactPage,
  EventItem,
  FooterData,
  Homepage,
  NavItem,
  SiteSettings,
  VolunteerPage,
} from "./types";

export const mockNavigation: NavItem[] = [
  { _key: "nav-home", label: "Home", href: "/" },
  { _key: "nav-about", label: "About", href: "/about" },
  { _key: "nav-volunteer", label: "Volunteer", href: "/volunteer" },
  { _key: "nav-events", label: "Events", href: "/events" },
  { _key: "nav-blog", label: "Research", href: "/blog" },
  { _key: "nav-contact", label: "Contact", href: "/contact" },
];

export const mockFooter: FooterData = {
  quickLinks: mockNavigation,
  copyrightText: "STEMsterMinds. All rights reserved.",
};

export const mockSiteSettings: SiteSettings = {
  organizationName: "STEMsterMinds",
  missionStatement:
    "Empowering youth to develop their knowledge about Science, Technology, Engineering, and Math!",
  footerText:
    "STEMsterMinds is a youth-led nonprofit inspiring the next generation of STEM innovators across Canada and the United States.",
  contactEmail: "stemsterminds@gmail.com",
  mailingAddress: undefined,
  officeHours: undefined,
  applicationLinks: [
    { label: "Volunteer Application", url: "https://forms.gle/stemsterminds-volunteer" },
    { label: "Leadership Application", url: "https://forms.gle/stemsterminds-leadership" },
    { label: "Summer Internship Application", url: "https://forms.gle/stemsterminds-internship" },
  ],
  socialLinks: [
    { platform: "instagram", label: "Instagram", url: "https://instagram.com/stemsterminds" },
    { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/company/stemsterminds" },
    { platform: "youtube", label: "YouTube", url: "https://youtube.com/@stemsterminds" },
    { platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@stemsterminds" },
    { platform: "email", label: "Email", url: "mailto:stemsterminds@gmail.com" },
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
  logo: undefined,
};

const teamPhotoless = undefined;

export const mockHomepage: Homepage = {
  heroTitle: "STEMsterMinds",
  heroSubtitle:
    "Empowering youth to develop their knowledge about Science, Technology, Engineering, and Math!",
  team: [
    {
      _id: "team-priya-nair",
      name: "Priya Nair",
      role: "Founder & President",
      bio: "Priya founded STEMsterMinds to make hands-on STEM education accessible to every young person, everywhere.",
      photo: teamPhotoless,
    },
    {
      _id: "team-marcus-lee",
      name: "Marcus Lee",
      role: "VP of Operations",
      bio: "Marcus keeps the organization running smoothly, from volunteer onboarding to event logistics.",
      photo: teamPhotoless,
    },
    {
      _id: "team-ava-chen",
      name: "Ava Chen",
      role: "Director of Curriculum",
      bio: "Ava designs workshop curricula that turn complex STEM topics into approachable, hands-on lessons.",
      photo: teamPhotoless,
    },
    {
      _id: "team-jonah-diaz",
      name: "Jonah Diaz",
      role: "Director of Outreach",
      bio: "Jonah builds partnerships with schools and community organizations to bring STEMsterMinds to new communities.",
      photo: teamPhotoless,
    },
  ],
  featuredBlogPosts: [],
  quickStats: [
    { _id: "stat-students", label: "Students Reached", value: "2,500+" },
    { _id: "stat-countries", label: "Countries", value: "6" },
    { _id: "stat-volunteers", label: "Volunteers", value: "80+" },
    { _id: "stat-resources", label: "Educational Resources Distributed", value: "1,200+" },
  ],
  ctaHeading: "Ready to Make an Impact?",
  ctaBody:
    "Join our team of passionate volunteers and help spark curiosity in the next generation of STEM leaders.",
  ctaButtonText: "Become a Volunteer",
  ctaButtonLink: "/volunteer",
  seo: {
    seoTitle: "STEMsterMinds — Empowering Youth in STEM",
    metaDescription:
      "STEMsterMinds is a youth-led nonprofit providing STEM workshops, mentorship, and resources to young people across Canada and the United States.",
    keywords: ["STEM education", "youth nonprofit", "STEM workshops", "volunteer"],
  },
  galleryImages: [
    { _id: "gallery-1", image: { url: "", alt: "Students building a robotics kit", width: 800, height: 600 }, caption: "Robotics workshop, Toronto" },
    { _id: "gallery-2", image: { url: "", alt: "Volunteers leading a coding class", width: 800, height: 600 }, caption: "Coding club, Austin" },
    { _id: "gallery-3", image: { url: "", alt: "Students presenting a science fair project", width: 800, height: 600 }, caption: "Science Fair Bootcamp" },
    { _id: "gallery-4", image: { url: "", alt: "Group photo of STEMsterMinds volunteers", width: 800, height: 600 }, caption: "Volunteer summit 2026" },
  ],
};

export const mockAboutPage: AboutPage = {
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
};

export const mockVolunteerPage: VolunteerPage = {
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
  faqs: [
    { _key: "faq-time", question: "How much time do I need to commit?", answer: "Most roles require 2–4 hours per week, but we work with your schedule and academic commitments." },
    { _key: "faq-remote", question: "Can I volunteer remotely?", answer: "Yes! Many of our roles, including content creation, research, and social media, are fully remote." },
    { _key: "faq-age", question: "Is there a minimum age to volunteer?", answer: "Volunteers must be at least 13 years old. Some leadership roles require additional experience." },
    { _key: "faq-training", question: "Will I receive training?", answer: "Yes, every volunteer completes a short onboarding and receives ongoing support from a team lead." },
    { _key: "faq-apply", question: "How do I apply?", answer: "Click the application button below, fill out the short form, and our team will reach out within a week." },
  ],
};

export const mockContactPage: ContactPage = {
  heroTitle: "Contact Us",
  introText: "Have a question, idea, or want to get involved? We'd love to hear from you.",
};

export const mockAuthors: Author[] = [
  { _id: "author-priya-nair", name: "Priya Nair", slug: "priya-nair", bio: "Founder & President of STEMsterMinds." },
  { _id: "author-ava-chen", name: "Ava Chen", slug: "ava-chen", bio: "Director of Curriculum at STEMsterMinds." },
  { _id: "author-marcus-lee", name: "Marcus Lee", slug: "marcus-lee", bio: "Volunteer writer and VP of Operations." },
];

export const mockCategories: Category[] = [
  { _id: "category-stem-tips", title: "STEM Tips", slug: "stem-tips" },
  { _id: "category-org-updates", title: "Organization Updates", slug: "organization-updates" },
  { _id: "category-student-stories", title: "Student Stories", slug: "student-stories" },
  { _id: "category-opportunities", title: "Opportunities", slug: "opportunities" },
];

function findAuthor(slug: string): Author {
  const author = mockAuthors.find((a) => a.slug === slug);
  if (!author) throw new Error(`Unknown mock author: ${slug}`);
  return author;
}

function findCategory(slug: string): Category {
  const category = mockCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown mock category: ${slug}`);
  return category;
}

export const mockBlogPosts: BlogPost[] = [
  {
    _id: "post-at-home-experiments",
    title: "5 Fun At-Home Science Experiments for Curious Kids",
    slug: "5-fun-at-home-science-experiments",
    author: findAuthor("ava-chen"),
    datePosted: "2026-06-02",
    updatedAt: "2026-06-02T10:00:00Z",
    excerpt: "Five simple experiments that turn any kitchen table into a science lab.",
    category: findCategory("stem-tips"),
    tags: ["science", "at-home", "elementary"],
    featured: true,
    citations: [
      "National Science Teaching Association. (2024). Elementary science investigations: A guide for out-of-school learning.",
      "Chen, A. (2025). \"Kitchen chemistry: Low-cost experiments for young learners.\" Journal of Informal STEM Education, 12(3), 45–58.",
    ],
    heroImage: { url: "", alt: "A child mixing a baking soda volcano experiment", width: 1200, height: 675, caption: "A STEMsterMinds workshop participant testing the baking soda volcano." },
    body: [
      ...paragraphs(
        "You don't need a laboratory to spark a love of science — just a few household items and some curiosity. Here are five experiments our volunteers love running with elementary students."
      ),
      heading("1. Baking Soda Volcanoes"),
      ...paragraphs("A classic for a reason. Mix baking soda and vinegar to demonstrate an acid-base reaction, and talk about what's happening at the molecular level."),
      heading("2. Walking Water"),
      ...paragraphs("Use paper towels and food coloring to show students how capillary action moves water between cups, creating a rainbow effect."),
      heading("3. Homemade Lava Lamps"),
      ...paragraphs("Oil, water, and an effervescent tablet demonstrate density and polarity in a mesmerizing, bubbly display."),
    ],
  },
  {
    _id: "post-summer-interns",
    title: "Meet Our 2026 Summer Interns",
    slug: "meet-our-2026-summer-interns",
    author: findAuthor("marcus-lee"),
    datePosted: "2026-05-20",
    updatedAt: "2026-05-22T14:30:00Z",
    excerpt: "Say hello to the six students joining our summer internship cohort.",
    category: findCategory("organization-updates"),
    tags: ["team", "internship"],
    featured: true,
    citations: [],
    body: [
      ...paragraphs(
        "Every summer, STEMsterMinds welcomes a new cohort of student interns who help build curriculum, run workshops, and grow our online community. This year's cohort is our biggest yet."
      ),
      ...paragraphs(
        "Over the next ten weeks, our interns will shadow workshop leads, contribute to our blog, and help plan our fall event calendar. We can't wait to see what they build."
      ),
    ],
  },
  {
    _id: "post-representation-matters",
    title: "Why Representation Matters in STEM Education",
    slug: "why-representation-matters-in-stem-education",
    author: findAuthor("priya-nair"),
    datePosted: "2026-04-11",
    updatedAt: "2026-04-11T09:00:00Z",
    excerpt: "Seeing yourself reflected in science and technology changes what feels possible.",
    category: findCategory("student-stories"),
    tags: ["equity", "inspiration"],
    featured: true,
    citations: [],
    body: [
      ...paragraphs(
        "When students don't see people who look like them in science and technology, it can quietly shape what they believe is possible for their own future. Representation isn't just a nice-to-have — it's foundational."
      ),
      ...paragraphs(
        "That's why every STEMsterMinds workshop features guest speakers and mentors from a wide range of backgrounds, and why our curriculum highlights lesser-known scientists and engineers alongside the household names."
      ),
    ],
    seo: {
      seoTitle: "Why Representation Matters in STEM Education | STEMsterMinds Blog",
      metaDescription: "Seeing yourself reflected in science and technology changes what feels possible for young people.",
      keywords: ["STEM representation", "equity in STEM", "student stories"],
    },
  },
  {
    _id: "post-scholarships",
    title: "Top 10 Scholarships for Aspiring Engineers",
    slug: "top-10-scholarships-for-aspiring-engineers",
    author: findAuthor("ava-chen"),
    datePosted: "2026-03-08",
    updatedAt: "2026-03-08T09:00:00Z",
    excerpt: "A curated list of scholarships to help you fund your engineering education.",
    category: findCategory("opportunities"),
    tags: ["scholarships", "engineering"],
    featured: false,
    citations: [],
    body: paragraphs(
      "Paying for an engineering degree can feel overwhelming, but there are more scholarship opportunities out there than most students realize. We rounded up ten of our favorites, ranging from need-based awards to competitions that reward hands-on projects.",
      "Bookmark this list, set reminders for application deadlines, and don't be afraid to apply to more than a few — many students are surprised how much funding is available for the effort of a well-written essay."
    ),
  },
  {
    _id: "post-robotics-workshop-planning",
    title: "Behind the Scenes: Planning Our Robotics Workshop",
    slug: "behind-the-scenes-planning-our-robotics-workshop",
    author: findAuthor("marcus-lee"),
    datePosted: "2026-02-01",
    updatedAt: "2026-02-01T09:00:00Z",
    excerpt: "What it actually takes to plan a hands-on robotics workshop for 50 students.",
    category: findCategory("organization-updates"),
    tags: ["events", "robotics"],
    featured: false,
    citations: [],
    body: paragraphs(
      "From sourcing robotics kits to training volunteer facilitators, planning a workshop for 50 students takes months of preparation. Here's a peek behind the curtain at how our team pulls it off.",
      "The biggest lesson we've learned: always have a backup activity ready in case the technology doesn't cooperate."
    ),
  },
  {
    _id: "post-coding-club",
    title: "How to Start a Coding Club at Your School",
    slug: "how-to-start-a-coding-club-at-your-school",
    author: findAuthor("priya-nair"),
    datePosted: "2026-01-15",
    updatedAt: "2026-01-15T09:00:00Z",
    excerpt: "A step-by-step guide for students who want to bring coding to their school.",
    category: findCategory("stem-tips"),
    tags: ["coding", "leadership"],
    featured: false,
    citations: [],
    body: paragraphs(
      "Starting a coding club is one of the highest-impact things a student can do for their school community. Here's how to find a faculty advisor, recruit members, and plan your first few meetings.",
      "Don't worry about being an expert coder yourself — the best clubs are led by curious organizers who are willing to learn alongside their members."
    ),
  },
];

mockHomepage.featuredBlogPosts = mockBlogPosts.filter((post) => post.featured);

export const mockEvents: EventItem[] = [
  {
    _id: "event-robotics-workshop",
    title: "Intro to Robotics Workshop",
    slug: "intro-to-robotics-workshop",
    date: "2026-02-14",
    time: "14:00",
    location: "Toronto Public Library, Ontario",
    shortDescription: "A hands-on introduction to building and programming simple robots.",
    fullDescription: paragraphs(
      "Students teamed up to build and program simple robots using beginner-friendly kits, learning the basics of circuits, sensors, and logic along the way.",
      "No prior experience was required — just curiosity and a willingness to get hands-on."
    ),
    schedule: [
      { _key: "sched-1", time: "2:00 PM", title: "Welcome & Intro to Robotics" },
      { _key: "sched-2", time: "2:30 PM", title: "Build Your Robot" },
      { _key: "sched-3", time: "3:30 PM", title: "Programming Challenge" },
      { _key: "sched-4", time: "4:15 PM", title: "Showcase & Wrap-Up" },
    ],
    speakers: [],
    gallery: [
      { url: "", alt: "Students assembling robotics kits", width: 800, height: 600 },
      { url: "", alt: "A finished robot navigating an obstacle course", width: 800, height: 600 },
    ],
    registrationLink: undefined,
    registrationStatus: "closed",
  },
  {
    _id: "event-girls-in-stem",
    title: "Girls in STEM Summit",
    slug: "girls-in-stem-summit",
    date: "2026-04-18",
    time: "10:00",
    location: "Austin Community Center, Texas",
    shortDescription: "A full-day summit celebrating and empowering girls in STEM fields.",
    fullDescription: paragraphs(
      "Our annual Girls in STEM Summit brought together over 100 students for a day of workshops, panels, and mentorship with women working in science and technology."
    ),
    schedule: [
      { _key: "sched-1", time: "10:00 AM", title: "Opening Keynote" },
      { _key: "sched-2", time: "11:00 AM", title: "Breakout Workshops" },
      { _key: "sched-3", time: "1:00 PM", title: "Lunch & Mentor Roundtables" },
      { _key: "sched-4", time: "2:30 PM", title: "Closing Panel" },
    ],
    speakers: [
      { _key: "spk-1", name: "Dr. Renee Osei", bio: "Aerospace engineer and STEM advocate." },
      { _key: "spk-2", name: "Layla Fenn", bio: "Software engineer and open-source contributor." },
    ],
    gallery: [{ url: "", alt: "Students at the Girls in STEM Summit", width: 800, height: 600 }],
    registrationLink: undefined,
    registrationStatus: "closed",
  },
  {
    _id: "event-science-fair-bootcamp",
    title: "Science Fair Bootcamp",
    slug: "science-fair-bootcamp",
    date: "2026-06-05",
    time: "13:00",
    location: "Virtual (Zoom)",
    shortDescription: "A prep session to help students plan and present winning science fair projects.",
    fullDescription: paragraphs(
      "This event was cancelled due to a scheduling conflict and will be rescheduled for later in the year. Thank you for your understanding."
    ),
    schedule: [],
    speakers: [],
    gallery: [],
    registrationLink: undefined,
    registrationStatus: "cancelled",
  },
  {
    _id: "event-python-workshop",
    title: "Coding for Beginners: Python Workshop",
    slug: "coding-for-beginners-python-workshop",
    date: "2026-08-22",
    time: "15:00",
    location: "Virtual (Zoom)",
    shortDescription: "Learn the basics of Python in this beginner-friendly, hands-on workshop.",
    fullDescription: paragraphs(
      "No experience necessary! We'll cover variables, loops, and functions, then put it all together by building a simple guessing game.",
      "Bring a laptop with Python installed, or join a few minutes early and our volunteers will help you get set up."
    ),
    schedule: [
      { _key: "sched-1", time: "3:00 PM", title: "Setup & Welcome" },
      { _key: "sched-2", time: "3:15 PM", title: "Python Basics" },
      { _key: "sched-3", time: "4:00 PM", title: "Build a Guessing Game" },
      { _key: "sched-4", time: "4:45 PM", title: "Q&A" },
    ],
    speakers: [{ _key: "spk-1", name: "Ava Chen", bio: "Director of Curriculum, STEMsterMinds." }],
    gallery: [],
    registrationLink: "https://forms.gle/stemsterminds-python-workshop",
    registrationStatus: "open",
  },
  {
    _id: "event-career-panel",
    title: "STEM Career Panel",
    slug: "stem-career-panel",
    date: "2026-09-30",
    time: "18:00",
    location: "Virtual (Zoom)",
    shortDescription: "Hear from professionals across engineering, data science, and medicine.",
    fullDescription: paragraphs(
      "Join us for a candid conversation with STEM professionals about their career paths, the classes that mattered most, and advice for students exploring their options."
    ),
    schedule: [
      { _key: "sched-1", time: "6:00 PM", title: "Panelist Introductions" },
      { _key: "sched-2", time: "6:20 PM", title: "Moderated Q&A" },
      { _key: "sched-3", time: "7:00 PM", title: "Open Audience Questions" },
    ],
    speakers: [
      { _key: "spk-1", name: "Dr. Renee Osei", bio: "Aerospace engineer." },
      { _key: "spk-2", name: "Sam Whitfield", bio: "Data scientist." },
      { _key: "spk-3", name: "Dr. Malia Fonoti", bio: "Pediatrician and STEM mentor." },
    ],
    gallery: [],
    registrationLink: "https://forms.gle/stemsterminds-career-panel",
    registrationStatus: "full",
  },
  {
    _id: "event-annual-conference",
    title: "Annual STEMsterMinds Conference",
    slug: "annual-stemsterminds-conference",
    date: "2026-11-14",
    time: "09:00",
    location: "Vancouver Convention Centre, British Columbia",
    shortDescription: "Our biggest event of the year — a full day of workshops, speakers, and celebration.",
    fullDescription: paragraphs(
      "Our flagship annual conference brings together students, volunteers, and partner organizations for a full day of hands-on workshops, guest speakers, and a student showcase."
    ),
    schedule: [
      { _key: "sched-1", time: "9:00 AM", title: "Doors Open & Registration" },
      { _key: "sched-2", time: "9:30 AM", title: "Opening Keynote" },
      { _key: "sched-3", time: "10:30 AM", title: "Workshop Block 1" },
      { _key: "sched-4", time: "1:00 PM", title: "Lunch & Student Showcase" },
      { _key: "sched-5", time: "2:30 PM", title: "Workshop Block 2" },
      { _key: "sched-6", time: "4:30 PM", title: "Closing Ceremony" },
    ],
    speakers: [{ _key: "spk-1", name: "Priya Nair", bio: "Founder & President, STEMsterMinds." }],
    gallery: [],
    registrationLink: "https://forms.gle/stemsterminds-annual-conference",
    registrationStatus: "open",
  },
];
