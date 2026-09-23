"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useBookDemo } from "./useBookDemo";

export function FloatingStickyBar() {
  const t = useTranslations("nav");
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-[60px] bg-canvas/95 backdrop-blur-md border-t border-divider-soft px-4 flex items-center justify-between gap-3">
      <span className="text-caption text-ink-muted-80 truncate">
        為香港中小企而設
      </span>
      <button
        type="button"
        onClick={() => {
          setSource("floating_bar");
          setBookOpen(true);
        }}
        data-cta-id="floating_book_demo"
        className="h-11 px-5 bg-primary text-on-primary rounded-pill text-button"
      >
        {t("bookDemo")}
      </button>
    </div>
  );
}