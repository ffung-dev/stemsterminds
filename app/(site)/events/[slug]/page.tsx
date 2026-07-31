import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { getEventBySlug, getEventSlugs } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";
import { formatDate, formatTime } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return buildMetadata(event.seo, { title: event.title, description: event.shortDescription });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: `${event.date}T${event.time || "00:00"}`,
    location: { "@type": "Place", name: event.location },
    description: event.shortDescription,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      event.registrationStatus === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    url: `${siteUrl}/events/${event.slug}`,
  };

  return (
    <article className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-4xl">
        <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: event.title }]} />

        <RoundedImage image={event.headerImage} alt={event.title} className="aspect-[16/9] w-full" priority />

        <h1 className="mt-8 font-title text-3xl font-bold text-ink sm:text-4xl">{event.title}</h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {formatTime(event.time)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {event.location}
          </span>
        </div>

        <div className="mt-8">
          <PortableTextRenderer value={event.fullDescription} />
        </div>

        {event.schedule.length > 0 && (
          <section className="mt-10">
            <h2 className="font-header text-xl font-bold text-ink">Schedule</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-decoration pl-5">
              {event.schedule.map((item) => (
                <li key={item._key}>
                  <p className="text-sm font-semibold text-coral">{item.time}</p>
                  <p className="font-semibold text-ink">{item.title}</p>
                  {item.description && <p className="text-sm text-ink-soft">{item.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {event.speakers.length > 0 && (
          <section className="mt-10">
            <h2 className="font-header text-xl font-bold text-ink">Speakers</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {event.speakers.map((speaker, index) => (
                <div
                  key={speaker._key}
                  className="flex items-center gap-4 rounded-2xl border border-border-soft bg-surface p-4"
                >
                  <RoundedImage image={speaker.photo} alt={speaker.name} seed={index} className="h-16 w-16 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">{speaker.name}</p>
                    {speaker.bio && <p className="text-sm text-ink-soft">{speaker.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {event.gallery.length > 0 && (
          <section className="mt-10">
            <h2 className="font-header text-xl font-bold text-ink">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {event.gallery.map((image, index) => (
                <RoundedImage key={index} image={image} alt={image.alt} seed={index} className="aspect-square w-full" />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {event.registrationLink && event.registrationStatus === "open" && (
            <Button href={event.registrationLink} size="lg">
              Register Now
            </Button>
          )}
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-coral">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </Container>
    </article>
  );
}
