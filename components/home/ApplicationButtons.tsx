import { Button } from "@/components/ui/Button";
import type { ApplicationLink } from "@/lib/types";

export function ApplicationButtons({ links }: { links: ApplicationLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {links.map((link, index) => (
        <Button key={link.url} href={link.url} variant={index === 0 ? "primary" : "secondary"} size="lg">
          {link.label}
        </Button>
      ))}
    </div>
  );
}
