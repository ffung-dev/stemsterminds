import Link from "next/link";

import { MediaCard } from "@/components/ui/MediaCard";
import { RoundedImage } from "@/components/ui/RoundedImage";
import type { BlogPost } from "@/lib/types";
import { estimateReadingTime, formatDateShort } from "@/lib/utils";

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <MediaCard
      media={
        <Link href={`/blog/${post.slug}`} tabIndex={-1}>
          <RoundedImage
            image={post.heroImage}
            alt={post.title}
            seed={index}
            className="aspect-[4/3] w-full rounded-none"
          />
        </Link>
      }
    >
      {post.category && (
        <span className="w-fit rounded-full bg-decoration px-3 py-1 text-xs font-semibold text-ink">
          {post.category.title}
        </span>
      )}
      <h3 className="mt-3 font-display text-lg font-bold text-ink">
        <Link href={`/blog/${post.slug}`} className="hover:text-coral">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
        <span>
          {post.author.name} · {formatDateShort(post.datePosted)}
        </span>
        <span>{estimateReadingTime(post.body)} min read</span>
      </div>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-teal-soft px-2.5 py-0.5 text-[11px] font-medium text-ink">
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link href={`/blog/${post.slug}`} className="mt-4 text-sm font-semibold text-coral hover:underline">
        Read More →
      </Link>
    </MediaCard>
  );
}
