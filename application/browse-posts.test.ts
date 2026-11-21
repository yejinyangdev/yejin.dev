import { deepStrictEqual } from "node:assert/strict";
import { test } from "node:test";
import type { PostSummary } from "../domain/post";
import { browsePosts } from "./browse-posts";

const posts: PostSummary[] = [
  {
    slug: "newest",
    title: "Newest",
    date: "2026-11-21",
    tags: ["Workflow", "Architecture", "Workflow"],
  },
  { slug: "older", title: "Older", date: "2026-11-20", tags: ["Architecture"] },
  { slug: "untagged", title: "Untagged", date: "2026-11-19", tags: [] },
  {
    slug: "retrospective",
    title: "Retrospective",
    date: "2026-11-18",
    tags: ["Retrospective", "All"],
  },
];

test("All includes untagged posts and keeps the supplied order", () => {
  deepStrictEqual(
    browsePosts(posts, null).filteredPosts.map((post) => post.slug),
    ["newest", "older", "untagged", "retrospective"],
  );
});

test("tag counts count each post once and include newly introduced tags", () => {
  deepStrictEqual(browsePosts(posts, null).tagCounts, [
    { tag: "Workflow", count: 1 },
    { tag: "Architecture", count: 2 },
    { tag: "Retrospective", count: 1 },
    { tag: "All", count: 1 },
  ]);
});

test("a selected tag filters posts without changing the global tag counts", () => {
  const result = browsePosts(posts, "Architecture");
  deepStrictEqual(result.filteredPosts.map((post) => post.slug), ["newest", "older"]);
  deepStrictEqual(result.tagCounts, browsePosts(posts, null).tagCounts);
});

test("a tag named All is distinct from the unfiltered selection", () => {
  deepStrictEqual(
    browsePosts(posts, "All").filteredPosts.map((post) => post.slug),
    ["retrospective"],
  );
});

test("empty input and unmatched tags return empty results", () => {
  deepStrictEqual(browsePosts([], null), { tagCounts: [], filteredPosts: [] });
  deepStrictEqual(browsePosts(posts, "Missing").filteredPosts, []);
});

test("browsing does not mutate the supplied posts or tags", () => {
  const before = structuredClone(posts);
  browsePosts(posts, "Workflow");
  deepStrictEqual(posts, before);
});
