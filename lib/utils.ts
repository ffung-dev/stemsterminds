import type { PortableTextBlock } from "@portabletext/types";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Sanity's "date" type returns a bare "YYYY-MM-DD" string with no time zone.
// Passing that straight to `new Date()` parses it as UTC midnight, which
// rolls back a day in any timezone behind UTC. Parsing the parts into a
// local Date avoids that shift; real timestamps (containing "T") still
// parse as-is.
function toLocalDate(dateString: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(dateString);
}

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  return toLocalDate(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatDateShort(dateString: string) {
  return toLocalDate(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isEventUpcoming(dateString: string) {
  const eventDate = toLocalDate(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return eventDate.getTime() >= now.getTime();
}

function extractPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => ("text" in child ? (child as { text: string }).text : ""))
        .join("");
    })
    .join(" ");
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(blocks: PortableTextBlock[]): number {
  const text = extractPlainText(blocks);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

let blockKeyCounter = 0;
function nextKey() {
  blockKeyCounter += 1;
  return `mock-block-${blockKeyCounter}`;
}

/** Builds simple paragraph Portable Text blocks for mock/fixture content. */
export function paragraphs(...texts: string[]): PortableTextBlock[] {
  return texts.map((text) => ({
    _type: "block",
    _key: nextKey(),
    style: "normal",
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
    markDefs: [],
  }));
}

export function heading(text: string, style: "h2" | "h3" = "h2"): PortableTextBlock {
  return {
    _type: "block",
    _key: nextKey(),
    style,
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
    markDefs: [],
  };
}
