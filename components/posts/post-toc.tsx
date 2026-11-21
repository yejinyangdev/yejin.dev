"use client";

import { useActiveHeadingId } from "@/components/posts/use-active-heading-id";
import { MESSAGES } from "@/constants/messages";
import type { TocItem } from "@/lib/mdx";
import { MobilePostToc } from "./mobile-post-toc";
import { PostTocLinks } from "./post-toc-links";

export function PostToc({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeadingId(items);
  if (items.length === 0) return null;

  return (
    <>
      <MobilePostToc items={items} activeId={activeId} />
      <div className="absolute bottom-0 top-16 -left-[15.5rem] hidden w-52 xl:block">
        <nav
          aria-label={MESSAGES.TOC_TITLE}
          className="sticky top-32 max-h-[calc(100vh-16rem)] overflow-y-auto"
        >
          <p className="mb-3 text-xs font-semibold tracking-wide text-neutral-400 dark:text-neutral-500">
            {MESSAGES.TOC_TITLE}
          </p>
          <PostTocLinks
            items={items}
            activeId={activeId}
            rail
            className="flex flex-col [&>li>a]:py-1.5 [&>li>a]:pl-4"
          />
        </nav>
      </div>
    </>
  );
}
