import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PastEventListItem({ event }: { event: EventItem }) {
  return (
    <motion.div
      data-testid="event-card"
      data-event-slug={event.slug}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition-colors hover:border-coral sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 className="font-header text-lg font-bold text-ink">
          <Link href={`/events/${event.slug}`} className="hover:text-coral">
            {event.title}
          </Link>
        </h3>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">{event.shortDescription}</p>
      </div>
      <div className="shrink-0">
        {event.moreInfoLink ? (
          <Button href={event.moreInfoLink} variant="secondary">
            Learn More
          </Button>
        ) : (
          <Button href={`/events/${event.slug}`} variant="secondary">
            View Details
          </Button>
        )}
      </div>
    </motion.div>
  );
}
