"use client";

import * as React from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { NotFoundMark } from "@/components/editorial/NotFoundMark";
import { SectionLabel } from "@/components/editorial/SectionLabel";

/**
 * Runtime error boundary. The static build prerenders every page, so this
 * only fires if something breaks in the browser — it still has to look like
 * the rest of the site rather than Next.js's default error screen.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Keep the digest in the console so a report can be traced back.
    console.error("[legionone] route error:", error);
  }, [error]);

  return (
    <section className="bg-canvas">
      <div className="shell py-16 sm:py-24 lg:py-32">
        <SectionLabel>{t("kicker")}</SectionLabel>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          <div className="lg:col-span-7">
            <h1 className="text-display-xl text-ink text-balance">{t("title")}</h1>
            <p className="mt-7 text-editorial-lead text-ink-muted-80 max-w-xl text-body-cjk">
              {t("body")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
              <button
                type="button"
                onClick={() => reset()}
                data-cta-id="error_retry"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-pill bg-primary text-on-primary text-button hover:bg-primary-focus transition-colors"
              >
                {t("retry")}
              </button>
              <Link
                href="/"
                data-cta-id="error_home"
                className="inline-flex items-center gap-2 h-12 px-4 text-button text-ink hover:text-primary transition-colors"
              >
                {t("backHome")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <NotFoundMark className="w-full max-w-[320px] text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
