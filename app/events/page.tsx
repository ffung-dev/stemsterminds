import type { Metadata } from "next";

import { EventsExplorer } from "@/components/events/EventsExplorer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getAllEvents } from "@/lib/sanity/fetch";
import { isEventUpcoming } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past STEMsterMinds workshops, summits, and community events.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  const upcoming = events
    .filter((event) => isEventUpcoming(event.date))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const past = events
    .filter((event) => !isEventUpcoming(event.date))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <>
      <PageHero
        title="Events"
        description="Join us for workshops, summits, and community events across STEM."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <EventsExplorer upcoming={upcoming} past={past} />
        </Container>
      </section>
    </>
  );
}
