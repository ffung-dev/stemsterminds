import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { MediaCard } from "@/components/ui/MediaCard";
import { RoundedImage } from "@/components/ui/RoundedImage";
import type { EventItem, RegistrationStatus } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";

const STATUS_STYLES: Record<RegistrationStatus, string> = {
  open: "bg-teal-soft text-ink",
  full: "bg-decoration text-ink",
  closed: "bg-ink/10 text-ink-soft",
  cancelled: "bg-coral/15 text-coral",
};

const STATUS_LABELS: Record<RegistrationStatus, string> = {
  open: "Registration Open",
  full: "Full",
  closed: "Registration Closed",
  cancelled: "Cancelled",
};

export function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
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
      <span
        className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[event.registrationStatus]}`}
        data-testid="event-status"
      >
        {STATUS_LABELS[event.registrationStatus]}
      </span>
      <h3 className="mt-3 font-display text-lg font-bold text-ink">
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
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formatTime(event.time)}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {event.location}
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm text-ink-soft">{event.shortDescription}</p>
      <div className="mt-4">
        {event.registrationLink && event.registrationStatus === "open" ? (
          <Button href={event.registrationLink} className="w-full">
            Register
          </Button>
        ) : (
          <Button href={`/events/${event.slug}`} variant="secondary" className="w-full">
            View Details
          </Button>
        )}
      </div>
    </MediaCard>
  );
}
