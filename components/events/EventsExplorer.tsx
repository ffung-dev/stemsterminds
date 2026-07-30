"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";

import type { EventItem } from "@/lib/types";
import { cx } from "@/lib/utils";

import { EventCard } from "./EventCard";

type TabKey = "upcoming" | "past";

export function EventsExplorer({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  const [tab, setTab] = useState<TabKey>("upcoming");
  const [query, setQuery] = useState("");

  const events = tab === "upcoming" ? upcoming : past;
  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return events;
    return events.filter((event) => event.title.toLowerCase().includes(trimmed));
  }, [events, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-full border border-border-soft bg-surface p-1">
          {(["upcoming", "past"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              data-testid={`events-tab-${key}`}
              className={cx(
                "relative rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors",
                tab === key ? "text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {tab === key && (
                <motion.span
                  layoutId="events-tab-bg"
                  className="absolute inset-0 rounded-full bg-button"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {key} ({key === "upcoming" ? upcoming.length : past.length})
              </span>
            </button>
          ))}
        </div>

        <label className="relative block">
          <span className="sr-only">Search events by title</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events..."
            data-testid="events-search"
            className="w-full rounded-full border border-border-soft bg-surface py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-coral sm:w-64"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-soft" data-testid="events-empty">
          No {tab} events {query ? "match your search." : "yet — check back soon!"}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
