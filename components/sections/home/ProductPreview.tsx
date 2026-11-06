"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { FinanceModuleMockup } from "@/components/brand/mockups/FinanceModule";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";

type TabKey = "dashboard" | "finance" | "crm";

/**
 * Product preview — the three modules, one at a time.
 *
 * The product render is the brightest object on the page, so the panel is
 * left clear of ornament and the tab strip is set above it as a row of
 * index links rather than as pills.
 */
export function ProductPreview() {
  const t = useTranslations("home.productPreview");
  const [tab, setTab] = React.useState<TabKey>("dashboard");

  const tabs: TabKey[] = ["dashboard", "finance", "crm"];

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.04}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="surface">{t("eyebrow")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("sub")}</p>

            <div
              role="tablist"
              aria-label={t("eyebrow")}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/12"
            >
              {tabs.map((key) => (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`t-label pb-4 -mb-px border-b-2 transition-colors ${
                    tab === key
                      ? "border-accent text-white"
                      : "border-transparent text-ash hover:text-white"
                  }`}
                >
                  {t(`tabs.${key}`)}
                </button>
              ))}
            </div>

            <p className="mt-6 t-body text-smoke/65 max-w-2xl">
              {t(`descriptions.${tab}`)}
            </p>

            <div className="mt-10 relative">
              <div
                aria-hidden
                className="absolute -inset-5 bg-accent/10 clip-hex hidden lg:block"
              />
              <div className="relative border border-white/12 bg-white">
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
