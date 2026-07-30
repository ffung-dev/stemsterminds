import Link from "next/link";
import { Brain } from "lucide-react";

export function Logo({ organizationName }: { organizationName: string }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-full py-1 pr-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-button">
        <Brain className="h-5 w-5 text-ink" aria-hidden="true" strokeWidth={2} />
      </span>
      <span className="font-display text-lg font-bold text-ink">{organizationName}</span>
    </Link>
  );
}
