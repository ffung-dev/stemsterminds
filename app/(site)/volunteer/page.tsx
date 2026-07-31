import type { Metadata } from "next";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InfoCardGrid } from "@/components/ui/InfoCardGrid";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVolunteerPage } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const volunteer = await getVolunteerPage();
  return buildMetadata(volunteer.seo, {
    title: "Volunteer",
    description: "Join STEMsterMinds as a volunteer and help empower the next generation of STEM leaders.",
  });
}

export default async function VolunteerPage() {
  const volunteer = await getVolunteerPage();

  return (
    <>
      <PageHero title={volunteer.heroTitle} description={volunteer.introText} />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Get Involved" title="Volunteer Opportunities" />
          <div className="mt-10">
            <InfoCardGrid
              items={volunteer.opportunities.map((item) => ({
                key: item._key,
                title: item.title,
                description: item.description,
              }))}
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why Volunteer" title="What You'll Gain" />
          <div className="mt-10">
            <InfoCardGrid
              columns={2}
              items={volunteer.whyVolunteer.map((item) => ({
                key: item._key,
                title: item.title,
                description: item.description,
              }))}
            />
          </div>
        </Container>
      </section>

      <section className="brand-gradient py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="font-header text-3xl font-bold text-ink sm:text-4xl">{volunteer.applicationCtaHeading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">{volunteer.applicationCtaText}</p>
          <div className="mt-8">
            <Button href={volunteer.applicationLink} size="lg">
              Apply Now
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mt-10">
            <Accordion
              items={volunteer.faqs.map((faq) => ({ key: faq._key, question: faq.question, answer: faq.answer }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
