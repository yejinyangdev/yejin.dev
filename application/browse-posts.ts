import type { PostSummary } from "../domain/post";

export interface PostTagCount {
  tag: string;
  count: number;
}

export interface PostBrowserResult {
  tagCounts: PostTagCount[];
  filteredPosts: readonly PostSummary[];
}

export function browsePosts(
  posts: readonly PostSummary[],
  selectedTag: string | null,
): PostBrowserResult {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of new Set(post.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return {
    tagCounts: Array.from(counts, ([tag, count]) => ({ tag, count })),
    filteredPosts:
      selectedTag === null
        ? posts
        : posts.filter((post) => post.tags.includes(selectedTag)),
  };
}
