import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { Citations } from "@/components/blog/Citations";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaptionedImage } from "@/components/ui/CaptionedImage";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { getAllBlogPosts, getBlogPostBySlug, getBlogSlugs } from "@/lib/sanity/fetch";
import { buildMetadata } from "@/lib/seo";
import { estimateReadingTime, formatDate } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    ...buildMetadata(post.seo, { title: post.title, description: post.excerpt }),
    authors: [{ name: post.author.name }],
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getAllBlogPosts()]);
  if (!post) notFound();

  const sorted = [...allPosts].sort((a, b) => (a.datePosted < b.datePosted ? 1 : -1));
  const currentIndex = sorted.findIndex((item) => item._id === post._id);
  const previousPost = currentIndex >= 0 ? sorted[currentIndex + 1] : undefined;
  const nextPost = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;

  const related = sorted
    .filter((item) => item._id !== post._id)
    .filter((item) => item.category?._id === post.category?._id || item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const readingTime = estimateReadingTime(post.body);
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const wasEdited = new Date(post.updatedAt).toDateString() !== new Date(post.datePosted).toDateString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePosted,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author.name },
    url: postUrl,
  };

  return (
    <article className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

        <CaptionedImage image={post.heroImage} alt={post.title} className="aspect-[16/9] w-full" priority />

        <h1 className="mt-8 font-title text-3xl font-bold text-ink sm:text-4xl">{post.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
          <span>By {post.author.name}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.datePosted)}</span>
          {wasEdited && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingTime} min read
          </span>
        </div>

        <div className="mt-6">
          <ShareButtons title={post.title} url={postUrl} />
        </div>

        <div className="mt-8">
          <PortableTextRenderer value={post.body} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-teal-soft px-3 py-1 text-xs font-medium text-ink">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Citations citations={post.citations} />

        <RelatedPosts posts={related} />

        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-border-soft pt-8 sm:grid-cols-2">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="group flex flex-col rounded-2xl border border-border-soft bg-surface p-4 transition-colors hover:border-coral"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="mt-1 font-semibold text-ink group-hover:text-coral">{previousPost.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col items-end rounded-2xl border border-border-soft bg-surface p-4 text-right transition-colors hover:border-coral sm:col-start-2"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1 font-semibold text-ink group-hover:text-coral">{nextPost.title}</span>
            </Link>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-coral">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </Container>
    </article>
  );
}
