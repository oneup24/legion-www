"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useBookDemo } from "./useBookDemo";

/**
 * Mobile action bar — the demo booking stays reachable without scrolling
 * back to the top on a phone.
 */
export function FloatingStickyBar() {
  const t = useTranslations("nav");
  const tHero = useTranslations("home.hero");
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex h-[60px] items-center justify-between gap-3 border-t border-white/12 bg-void/95 px-4 backdrop-blur-md md:hidden">
      <span className="t-label truncate text-ash">{tHero("tagline")}</span>
      <button
        type="button"
        onClick={() => {
          setSource("floating_bar");
          setBookOpen(true);
        }}
        data-cta-id="floating_book_demo"
        className="btn btn-accent btn-sm"
      >
        {t("bookDemo")}
      </button>
    </div>
  );
}
