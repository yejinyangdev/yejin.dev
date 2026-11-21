"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlignRight, X } from "lucide-react";
import { HEADER_TOC_SLOT_ID } from "@/constants/dom";
import { MESSAGES } from "@/constants/messages";
import type { TocItem } from "@/lib/mdx";
import { PostTocLinks } from "./post-toc-links";
import { useTocSheet } from "./use-toc-sheet";

const ICON_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100";

function useHeaderSlot() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(HEADER_TOC_SLOT_ID));
  }, []);

  return slot;
}

interface MobilePostTocProps {
  items: TocItem[];
  activeId: string | null;
}

export function MobilePostToc({ items, activeId }: MobilePostTocProps) {
  const slot = useHeaderSlot();
  const { sheetRef, openSheet, closeSheet, restoreScroll } = useTocSheet();

  return (
    <>
      {slot !== null &&
        createPortal(
          <button
            type="button"
            onClick={openSheet}
            aria-label={MESSAGES.TOC_OPEN}
            className={`${ICON_BUTTON_CLASS} h-9 w-9 xl:hidden`}
          >
            <AlignRight size={18} />
          </button>,
          slot,
        )}
      <dialog
        ref={sheetRef}
        aria-label={MESSAGES.TOC_TITLE}
        onClose={restoreScroll}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSheet();
        }}
        className="toc-sheet mx-auto mb-0 mt-auto w-full max-w-none rounded-t-2xl bg-white p-0 dark:bg-neutral-900"
      >
        <div className="flex max-h-[70vh] flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
            <p className="text-sm font-semibold tracking-tight text-neutral-700 dark:text-neutral-300">
              {MESSAGES.TOC_TITLE}
            </p>
            <button
              type="button"
              onClick={closeSheet}
              aria-label={MESSAGES.TOC_CLOSE}
              className={`${ICON_BUTTON_CLASS} h-8 w-8`}
            >
              <X size={16} />
            </button>
          </div>
          <PostTocLinks
            items={items}
            activeId={activeId}
            onNavigate={closeSheet}
            className="flex flex-col overflow-y-auto px-3 py-3 [&>li>a]:rounded-lg [&>li>a]:px-3 [&>li>a]:py-2.5 [&_a[aria-current]]:bg-neutral-100 dark:[&_a[aria-current]]:bg-neutral-800"
          />
        </div>
      </dialog>
    </>
  );
}
