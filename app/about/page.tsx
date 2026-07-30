import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { InfoCardGrid } from "@/components/ui/InfoCardGrid";
import { PageHero } from "@/components/ui/PageHero";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAboutPage } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return buildMetadata(about.seo, {
    title: "About",
    description: "Learn about STEMsterMinds' mission, vision, and values.",
  });
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <PageHero title={about.heroTitle} />

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortableTextRenderer value={about.description} />
          </div>
          <Card className="h-fit bg-teal-soft">
            <h2 className="font-display text-xl font-bold text-ink">{about.visionTitle}</h2>
            <p className="mt-3 text-ink-soft">{about.visionBody}</p>
          </Card>
        </Container>
      </section>

      <section className="bg-surface-soft py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Our Values" title="We Value..." />
          <div className="mt-10">
            <InfoCardGrid items={about.values.map((value) => ({ key: value._key, title: value.title, description: value.description }))} />
          </div>
        </Container>
      </section>
    </>
  );
}
