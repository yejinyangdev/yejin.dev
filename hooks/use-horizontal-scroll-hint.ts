"use client";

import { useEffect, useRef, useState } from "react";

export function useHorizontalScrollHint() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content) return;

    const updateScrollHint = () => {
      setCanScrollRight(
        scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 1,
      );
    };
    const observer = new ResizeObserver(updateScrollHint);
    observer.observe(scroller);
    observer.observe(content);
    scroller.addEventListener("scroll", updateScrollHint, { passive: true });
    updateScrollHint();

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", updateScrollHint);
    };
  }, []);

  return { scrollerRef, contentRef, canScrollRight };
}
