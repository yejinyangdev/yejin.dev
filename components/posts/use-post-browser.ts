"use client";

import { useState } from "react";
import { browsePosts } from "@/application/browse-posts";
import type { PostSummary } from "@/domain/post";

export function usePostBrowser(posts: readonly PostSummary[]) {
  const [selectedTag, selectTag] = useState<string | null>(null);
  const { tagCounts, filteredPosts } = browsePosts(posts, selectedTag);

  return { selectedTag, selectTag, tagCounts, filteredPosts };
}
