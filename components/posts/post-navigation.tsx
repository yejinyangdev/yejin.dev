import Link from "next/link";
import type { PostSummary } from "@/domain/post";
import { getPostPath } from "@/constants/paths";

type NavigationPost = Pick<PostSummary, "slug" | "title">;

interface PostNavigationProps {
  prev: NavigationPost | null;
  next: NavigationPost | null;
}

function PostNavigationItem({
  post,
  direction,
}: {
  post: NavigationPost | null;
  direction: "prev" | "next";
}) {
  const isPrevious = direction === "prev";
  const label = isPrevious ? "← 이전 글" : "다음 글 →";
  const emptyMessage = isPrevious ? "이전 글이 없습니다" : "다음 글이 없습니다";
  const alignment = isPrevious ? "text-left" : "ml-auto text-right";
  const content = (
    <>
      <span className="text-xs text-neutral-400 dark:text-neutral-500">{label}</span>
      <span
        className={`line-clamp-2 text-sm font-medium ${
          post
            ? "text-neutral-700 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100"
            : "text-neutral-400 dark:text-neutral-600"
        }`}
      >
        {post?.title ?? emptyMessage}
      </span>
    </>
  );

  return post ? (
    <Link
      href={getPostPath(post.slug)}
      className={`group flex flex-col gap-1 ${alignment}`}
    >
      {content}
    </Link>
  ) : (
    <div className={`flex select-none flex-col gap-1 opacity-30 ${alignment}`}>
      {content}
    </div>
  );
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav
      aria-label="이전·다음 글"
      className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800"
    >
      <PostNavigationItem post={prev} direction="prev" />
      <PostNavigationItem post={next} direction="next" />
    </nav>
  );
}
