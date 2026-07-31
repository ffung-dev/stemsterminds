import Link from "next/link";

import { RoundedImage } from "@/components/ui/RoundedImage";
import type { BlogPost } from "@/lib/types";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border-soft pt-10">
      <h2 className="font-header text-xl font-bold text-ink">Related Posts</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {posts.map((post, index) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="group">
            <RoundedImage image={post.heroImage} alt={post.title} seed={index} className="aspect-[4/3] w-full" />
            <h3 className="mt-3 font-semibold text-ink transition-colors group-hover:text-coral">{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
