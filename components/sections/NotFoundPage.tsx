"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { NotFoundMark } from "@/components/editorial/NotFoundMark";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexOutline } from "@/components/brand/Hex";

/**
 * The 404 body.
 *
 * Rendered twice: once by app/[locale]/not-found.tsx (in-app notFound()
 * calls) and once by app/[locale]/404/page.tsx. The second one matters for
 * static hosting — Next.js only prerenders a root-level not-found for static
 * export, so the /404 route is what actually ends up in out/404.html.
 */
export function NotFoundPage() {
  const t = useTranslations("notFound");
  const tNav = useTranslations("nav");

  const destinations = [
    { href: "/product", label: tNav("products") },
    { href: "/use-cases", label: tNav("useCases") },
    { href: "/pricing", label: tNav("pricing") },
    { href: "/partners", label: tNav("partners") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <SectionShell tone="void" hexField fieldOpacity={0.04}>
      <div className="shell relative section-y">
        <HexOutline
          size={460}
          strokePx={1}
          className="pointer-events-none absolute -right-32 top-10 text-accent"
          style={{ opacity: 0.24 }}
        />

        <SectionLabel tone="void">{t("kicker")}</SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="t-display-hero t-balance text-white">{t("title")}</h1>
            <p className="mt-7 t-lead max-w-xl text-smoke/70">{t("lead")}</p>

            <Link
              href="/"
              data-cta-id="notfound_home"
              className="btn btn-accent mt-10"
            >
              {t("backHome")}
            </Link>
          </div>

          <div className="flex items-start justify-center lg:col-span-5 lg:justify-end">
            <NotFoundMark className="w-full max-w-[320px] text-accent" />
          </div>
        </div>

        <div className="mt-16 border-t border-white/12 pt-10 sm:mt-24">
          <h2 className="t-label text-ash">{t("destinations")}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
            {destinations.map((d, i) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group flex items-baseline gap-3 py-1 t-body text-white/80 transition-colors hover:text-white"
                >
                  <span className="t-index text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{d.label}</span>
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
