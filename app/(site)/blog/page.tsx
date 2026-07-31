import type { Metadata } from "next";

import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getAllBlogPosts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational articles, STEM opportunities, project ideas, and stories from the STEMsterMinds community.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <PageHero
        title="STEMsterMinds Blog"
        description="At STEMsterMinds, we believe that the future is full of possibilities for young minds exploring Science, Technology, Engineering, and Mathematics. Our blog shares educational articles, STEM opportunities, project ideas, organization updates, and stories from our community."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <BlogExplorer posts={posts} />
        </Container>
      </section>
    </>
  );
}
