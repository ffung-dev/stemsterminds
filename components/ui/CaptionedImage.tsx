import type { ImageData } from "@/lib/types";

import { RoundedImage } from "./RoundedImage";

export function CaptionedImage({
  image,
  alt,
  className,
  priority,
  seed,
}: {
  image?: ImageData | null;
  alt?: string;
  className?: string;
  priority?: boolean;
  seed?: number;
}) {
  return (
    <figure>
      <RoundedImage image={image} alt={alt ?? image?.alt} className={className} priority={priority} seed={seed} />
      {image?.caption && (
        <figcaption className="mt-2 text-center text-sm italic text-ink-soft">{image.caption}</figcaption>
      )}
    </figure>
  );
}
