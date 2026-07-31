import Image from "next/image";
import { Atom, Beaker, Lightbulb, Rocket, Sparkles, type LucideIcon } from "lucide-react";

import type { ImageData } from "@/lib/types";
import { cx } from "@/lib/utils";

const PLACEHOLDER_ICONS: LucideIcon[] = [Rocket, Lightbulb, Atom, Beaker, Sparkles];

const PLACEHOLDER_GRADIENTS = [
  "from-decoration via-cream to-teal-soft",
  "from-teal-soft via-cream to-decoration",
  "from-cream via-decoration to-teal-soft",
];

interface RoundedImageProps {
  image?: ImageData | null;
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Varies the placeholder gradient/icon when no image is set yet. */
  seed?: number;
}

export function RoundedImage({
  image,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority,
  seed = 0,
}: RoundedImageProps) {
  if (image?.url) {
    return (
      <div className={cx("relative overflow-hidden rounded-2xl", className)}>
        <Image
          src={image.url}
          alt={alt ?? image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cx("object-cover", imgClassName)}
        />
      </div>
    );
  }

  const Icon = PLACEHOLDER_ICONS[Math.abs(seed) % PLACEHOLDER_ICONS.length];
  const gradient = PLACEHOLDER_GRADIENTS[Math.abs(seed) % PLACEHOLDER_GRADIENTS.length];

  return (
    <div
      role="img"
      aria-label={alt ?? "Photo coming soon"}
      className={cx(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <Icon className="h-1/4 w-1/4 min-h-8 min-w-8 text-ink/25" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
