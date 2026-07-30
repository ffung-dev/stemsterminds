"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import type { BlogPost } from "@/lib/types";

import { BlogCard } from "./BlogCard";

const ALL = "all";

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [author, setAuthor] = useState(ALL);
  const [tag, setTag] = useState(ALL);
  const [year, setYear] = useState(ALL);

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category?.title).filter((title): title is string => Boolean(title)))),
    [posts]
  );
  const authors = useMemo(() => Array.from(new Set(posts.map((post) => post.author.name))), [posts]);
  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);
  const years = useMemo(
    () =>
      Array.from(new Set(posts.map((post) => new Date(post.datePosted).getFullYear().toString()))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    [posts]
  );

  const filtered = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (trimmedQuery && !post.title.toLowerCase().includes(trimmedQuery)) return false;
      if (category !== ALL && post.category?.title !== category) return false;
      if (author !== ALL && post.author.name !== author) return false;
      if (tag !== ALL && !post.tags.includes(tag)) return false;
      if (year !== ALL && new Date(post.datePosted).getFullYear().toString() !== year) return false;
      return true;
    });
  }, [posts, query, category, author, tag, year]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label className="relative block max-w-md">
          <span className="sr-only">Search articles by title</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            data-testid="blog-search"
            className="w-full rounded-full border border-border-soft bg-surface py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-coral"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} testId="blog-filter-category" />
          <FilterSelect label="Author" value={author} onChange={setAuthor} options={authors} testId="blog-filter-author" />
          <FilterSelect label="Tag" value={tag} onChange={setTag} options={tags} testId="blog-filter-tag" />
          <FilterSelect label="Year" value={year} onChange={setYear} options={years} testId="blog-filter-year" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-soft" data-testid="blog-empty">
          No articles match your filters.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <BlogCard key={post._id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  testId: string;
}) {
  return (
    <label className="text-sm">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        data-testid={testId}
        className="rounded-full border border-border-soft bg-surface px-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-coral"
      >
        <option value={ALL}>{label}: All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
