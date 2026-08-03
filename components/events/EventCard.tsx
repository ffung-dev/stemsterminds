import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { MediaCard } from "@/components/ui/MediaCard";
import { RoundedImage } from "@/components/ui/RoundedImage";
import type { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <div data-testid="event-card" data-event-slug={event.slug}>
      <MediaCard
        media={
          <Link href={`/events/${event.slug}`} tabIndex={-1}>
            <RoundedImage
              image={event.headerImage}
              alt={event.title}
              seed={index}
              className="aspect-[4/3] w-full rounded-none"
            />
          </Link>
        }
      >
        <h3 className="font-header text-lg font-bold text-ink">
          <Link href={`/events/${event.slug}`} className="hover:text-coral">
            {event.title}
          </Link>
        </h3>
        <div className="mt-2 space-y-1 text-sm text-ink-soft">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {event.location}
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm text-ink-soft">{event.shortDescription}</p>
        <div className="mt-4">
          {event.moreInfoLink ? (
            <Button href={event.moreInfoLink} className="w-full">
              Learn More
            </Button>
          ) : (
            <Button href={`/events/${event.slug}`} variant="secondary" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </MediaCard>
    </div>
  );
}
