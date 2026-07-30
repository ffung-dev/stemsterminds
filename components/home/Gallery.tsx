import { Container } from "@/components/ui/Container";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryImage } from "@/lib/types";

export function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <section className="bg-surface-soft py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="In Action" title="Moments from STEMsterMinds" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {images.map((item, index) => (
            <figure key={item._id} className="group">
              <RoundedImage
                image={item.image}
                alt={item.image.alt}
                seed={index}
                className="aspect-square w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {item.caption && <figcaption className="mt-2 text-xs text-ink-soft">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
