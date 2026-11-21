"use client";

import { useCallback, useEffect, useRef } from "react";

export function useTocSheet() {
  const sheetRef = useRef<HTMLDialogElement>(null);
  const previousOverflowRef = useRef<string | null>(null);

  const restoreScroll = useCallback(() => {
    if (previousOverflowRef.current === null) return;
    document.documentElement.style.overflow = previousOverflowRef.current;
    previousOverflowRef.current = null;
  }, []);

  useEffect(() => restoreScroll, [restoreScroll]);

  const openSheet = () => {
    const sheet = sheetRef.current;
    if (!sheet || sheet.open) return;
    sheet.showModal();
    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  };

  const closeSheet = () => {
    sheetRef.current?.close();
    restoreScroll();
  };

  return { sheetRef, openSheet, closeSheet, restoreScroll };
}
