import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImage } from "sanity";

import { toEmbedUrl } from "@/lib/embed";
import { urlFor } from "@/lib/sanity/image";

import { RoundedImage } from "./RoundedImage";

type ImageBlockValue = SanityImage & { alt?: string };
type VideoBlockValue = { url: string };

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mb-3 mt-8 font-display text-2xl font-bold text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 font-display text-xl font-bold text-ink">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-ink-soft">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-coral pl-4 italic text-ink-soft">{children}</blockquote>
    ),
  },
  types: {
    imageWithAlt: ({ value }: { value: ImageBlockValue }) => (
      <div className="my-6">
        <RoundedImage
          image={{ url: urlFor(value).width(1200).url(), alt: value.alt ?? "", width: 1200, height: 800 }}
          className="aspect-video w-full"
        />
      </div>
    ),
    embeddedVideo: ({ value }: { value: VideoBlockValue }) => (
      <div className="my-6 aspect-video overflow-hidden rounded-2xl">
        <iframe
          src={toEmbedUrl(value.url)}
          className="h-full w-full"
          allowFullScreen
          title="Embedded video"
        />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-coral underline underline-offset-2 hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
