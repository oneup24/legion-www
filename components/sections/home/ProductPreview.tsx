"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { FinanceModuleMockup } from "@/components/brand/mockups/FinanceModule";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";
import { Link } from "@/lib/i18n/navigation";

type TabKey = "dashboard" | "finance" | "crm";

const TABS: TabKey[] = ["dashboard", "finance", "crm"];

/**
 * Product preview — the three modules, one at a time.
 *
 * Built on the reference site's tabbed tool index: a row of tabs with the
 * active one underlined, a row of round chips naming what sits inside the
 * selected module, and a grid of cards for those features. The product
 * render stays at the bottom as the proof.
 */
export function ProductPreview() {
  const t = useTranslations("home.productPreview");
  const tModules = useTranslations("product.section");
  const [tab, setTab] = React.useState<TabKey>("dashboard");
  const [focus, setFocus] = React.useState<number | null>(null);

  const chips = t.raw(`chips.${tab}`) as string[];
  const bullets = tModules.raw(`${tab}.bullets`) as string[];

  // Switching module clears the chip selection — the chips belong to the
  // module that was open.
  const selectTab = (key: TabKey) => {
    setTab(key);
    setFocus(null);
  };

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.014}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="surface">{t("eyebrow")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-ink max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-ink-muted">{t("sub")}</p>

            {/* ── Modules ── */}
            <div
              role="tablist"
              aria-label={t("eyebrow")}
              className="mt-12 flex flex-wrap gap-x-10 border-b border-line"
            >
              {TABS.map((key) => (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={tab === key}
                  onClick={() => selectTab(key)}
                  className={`-mb-px border-b-2 pb-4 pt-2 text-[15px] font-medium transition-colors ${
                    tab === key
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-faint hover:text-ink"
                  }`}
                >
                  {t(`tabs.${key}`)}
                </button>
              ))}
            </div>

            {/* ── What sits inside the selected module ── */}
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip, i) => (
                <button
                  key={chip}
                  type="button"
                  aria-pressed={focus === i}
                  onClick={() => setFocus(focus === i ? null : i)}
                  className={`rounded-full border px-4 py-2.5 text-[14px] transition-colors ${
                    focus === i
                      ? "border-accent bg-accent-tint text-accent"
                      : "border-line bg-white text-ink-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* ── The features themselves ── */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {bullets.map((bullet, i) => (
                <article
                  key={bullet}
                  className={`flex flex-col rounded-card border p-6 transition-colors ${
                    focus === i
                      ? "border-accent bg-accent-tint"
                      : "border-line bg-white"
                  }`}
                >
                  <h3 className="t-display-3 text-ink">{chips[i]}</h3>
                  <p className="mt-3 t-body text-ink-muted">{bullet}</p>

                  <Link
                    href={`/product#module-${tab}-${i}` as never}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
                  >
                    {t("cardCta")}
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </article>
              ))}
            </div>

            {/* ── The proof ── */}
            <p className="mt-10 t-body text-ink-muted max-w-2xl">
              {t(`descriptions.${tab}`)}
            </p>

            <div className="mt-6 relative">
              <div
                aria-hidden
                className="absolute -inset-5 bg-accent/10 clip-hex hidden lg:block"
              />
              <div className="relative overflow-hidden rounded-card border border-line bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tab === "dashboard" ? (
                      <DashboardOverviewMockup className="block w-full h-auto" />
                    ) : tab === "finance" ? (
                      <FinanceModuleMockup className="block w-full h-auto" />
                    ) : (
                      <CrmModuleMockup className="block w-full h-auto" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
