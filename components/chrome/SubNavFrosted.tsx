"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";

const sectionPaths: { test: (p: string) => boolean; key: string }[] = [
  { test: (p) => p.startsWith("/product"), key: "products" },
  { test: (p) => p.startsWith("/use-cases"), key: "useCases" },
  { test: (p) => p.startsWith("/partners"), key: "partners" },
  { test: (p) => p.startsWith("/pricing"), key: "pricing" },
  { test: (p) => p.startsWith("/about"), key: "about" },
];

export function SubNavFrosted() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const active = sectionPaths.find((s) => s.test(pathname));

  if (!active) return null;

  return (
    <div
      role="navigation"
      aria-label="Section"
      className="sticky top-11 z-30 bg-canvas/70 backdrop-blur-md border-b border-divider-soft"
      style={{ height: 52 }}
    >
      <div className="mx-auto max-w-[1024px] h-full px-4 sm:px-6 flex items-center">
        <span className="text-tagline text-ink">
          {t(active.key as never)}
        </span>
      </div>
    </div>
  );
}