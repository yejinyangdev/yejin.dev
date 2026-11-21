"use client";

import type { TocItem } from "@/lib/mdx";

interface PostTocLinksProps {
  items: TocItem[];
  activeId: string | null;
  rail?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function PostTocLinks({
  items,
  activeId,
  rail = false,
  onNavigate,
  className,
}: PostTocLinksProps) {
  return (
    <ol className={className}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        const railClassName = `border-l-2 ${
          isActive
            ? "border-neutral-900 dark:border-neutral-100"
            : "border-neutral-200 dark:border-neutral-800"
        }`;
        const linkClassName = `block text-sm leading-relaxed transition-colors ${
          isActive
            ? "text-neutral-900 dark:text-neutral-100"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        }`;

        return (
          <li
            key={item.id}
            className={rail ? railClassName : undefined}
          >
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={linkClassName}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
