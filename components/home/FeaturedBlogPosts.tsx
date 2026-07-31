import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaCard } from "@/components/ui/MediaCard";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPost } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

export function FeaturedBlogPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-surface-soft py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="From the Blog" title="Featured Posts" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <MediaCard
              key={post._id}
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
              <p className="text-xs font-semibold uppercase tracking-wide text-coral">
                {formatDateShort(post.datePosted)}
              </p>
              <h3 className="mt-2 font-header text-lg font-bold text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-coral">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 text-sm font-semibold text-coral hover:underline">
                Read More →
              </Link>
            </MediaCard>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/blog" variant="secondary">
            Visit the Blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
