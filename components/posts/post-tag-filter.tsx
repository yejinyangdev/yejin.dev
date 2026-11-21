"use client";

import type { PostTagCount } from "@/application/browse-posts";
import { MESSAGES } from "@/constants/messages";
import { useHorizontalScrollHint } from "@/hooks/use-horizontal-scroll-hint";

interface PostTagFilterProps {
  tags: readonly PostTagCount[];
  totalCount: number;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function PostTagFilter({
  tags,
  totalCount,
  selectedTag,
  onSelectTag,
}: PostTagFilterProps) {
  const { scrollerRef, contentRef, canScrollRight } = useHorizontalScrollHint();
  const filters = [
    { tag: null, label: MESSAGES.POST_FILTER_ALL, count: totalCount },
    ...tags.map(({ tag, count }) => ({ tag, label: tag, count })),
  ];

  return (
    <aside
      aria-label={MESSAGES.POST_FILTER_LABEL}
      className="relative -mr-5 min-w-0 sm:-mr-8 lg:sticky lg:top-28 lg:mr-0 lg:self-start"
    >
      <div
        ref={scrollerRef}
        role="group"
        aria-label={MESSAGES.POST_FILTER_LABEL}
        className="relative overflow-x-auto pb-2 pr-5 sm:pr-8 lg:overflow-visible lg:p-0"
      >
        <div ref={contentRef} className="flex w-max gap-2 lg:w-full lg:flex-col lg:gap-1">
          {filters.map(({ tag, label, count }) => (
            <button
              key={tag === null ? "all" : `tag:${tag}`}
              type="button"
              aria-pressed={selectedTag === tag}
              aria-controls="post-results"
              aria-label={`${label}, ${count}개의 글`}
              onClick={() => onSelectTag(tag)}
              className="
                inline-flex min-h-11 shrink-0 items-center justify-between gap-2 whitespace-nowrap
                rounded-full border border-neutral-200 px-4 py-2 text-sm dark:border-neutral-800
                aria-pressed:bg-foreground aria-pressed:text-background
                focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2
                lg:rounded-md lg:border-0 lg:px-3
                lg:aria-pressed:bg-neutral-100 lg:aria-pressed:text-foreground dark:lg:aria-pressed:bg-neutral-900
              "
            >
              {label}
              <span aria-hidden="true" className="text-xs opacity-70">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {canScrollRight && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent lg:hidden"
        />
      )}
    </aside>
  );
}
