import Image from "next/image";
import Link from "next/link";
import { Brain } from "lucide-react";

import type { ImageData } from "@/lib/types";

export function Logo({ organizationName, logo }: { organizationName: string; logo?: ImageData }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-full py-1 pr-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
    >
      {logo?.url ? (
        <span className="relative h-10 w-10 shrink-0">
          <Image src={logo.url} alt={logo.alt || organizationName} fill className="object-contain" />
        </span>
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-button">
          <Brain className="h-5 w-5 text-button-ink" aria-hidden="true" strokeWidth={2} />
        </span>
      )}
      <span className="font-header text-lg font-bold text-ink">{organizationName}</span>
    </Link>
  );
}
