"use client";

import { MESSAGES } from "@/constants/messages";
import type { PostSummary } from "@/domain/post";
import { PostList } from "@/components/posts/post-list";
import { PostTagFilter } from "@/components/posts/post-tag-filter";
import { usePostBrowser } from "@/components/posts/use-post-browser";

export function PostBrowser({ posts }: { posts: readonly PostSummary[] }) {
  const { selectedTag, selectTag, tagCounts, filteredPosts } = usePostBrowser(posts);

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-y-7 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-12">
      {tagCounts.length > 0 && (
        <PostTagFilter
          tags={tagCounts}
          totalCount={posts.length}
          selectedTag={selectedTag}
          onSelectTag={selectTag}
        />
      )}
      <section aria-labelledby="posts-heading" className="min-w-0 lg:col-start-2">
        <div className="mb-7 flex items-baseline justify-between gap-4 sm:mb-9">
          <h2
            id="posts-heading"
            className="min-w-0 break-words text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            {selectedTag ?? MESSAGES.POSTS_TITLE}
          </h2>
          <p
            role="status"
            className="shrink-0 text-sm tabular-nums text-neutral-500 dark:text-neutral-400"
          >
            <span className="sr-only">
              {selectedTag ?? MESSAGES.POST_FILTER_ALL}:{" "}
            </span>
            {filteredPosts.length} posts
          </p>
        </div>
        <div id="post-results">
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} />
          ) : (
            <p className="text-neutral-500 dark:text-neutral-400">
              {posts.length === 0
                ? MESSAGES.EMPTY_POSTS
                : MESSAGES.EMPTY_FILTERED_POSTS}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
