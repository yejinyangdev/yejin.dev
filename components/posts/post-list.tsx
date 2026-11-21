"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDateShort } from "@/lib/utils";
import { getPostPath } from "@/constants/paths";
import { DEFAULT_CATEGORY } from "@/constants/site";
import type { PostSummary } from "@/domain/post";

interface PostListProps {
  posts: readonly PostSummary[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <ul className="grid w-full min-w-0 grid-cols-1 gap-y-7 sm:gap-y-9 lg:gap-y-10">
      {posts.map((post) => (
        <li key={post.slug} className="min-w-0">
          <Link
            href={getPostPath(post.slug)}
            className="group flex h-full w-full min-w-0 flex-col items-start overflow-hidden rounded-2xl border border-neutral-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center sm:gap-6 sm:overflow-visible sm:rounded-md sm:border-0 sm:bg-transparent dark:sm:bg-transparent"
          >
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900 sm:w-56 sm:rounded-md">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 639px) calc(100vw - 42px), 224px"
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              )}
            </div>
            <div className="flex w-full min-w-0 flex-1 flex-col gap-3 p-4 tracking-tight sm:w-auto sm:p-0">
              <h3 className="break-words text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-500 dark:text-neutral-100 dark:group-hover:text-neutral-400 sm:text-xl">
                {post.title}
              </h3>
              {post.description && (
                <p className="line-clamp-2 break-words text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {post.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                <span className="text-neutral-700 dark:text-neutral-300">
                  {post.tags.length > 0
                    ? post.tags.join(" · ")
                    : post.category ?? DEFAULT_CATEGORY}
                </span>
                <time dateTime={post.date} className="whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                  {formatDateShort(post.date)}
                </time>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
