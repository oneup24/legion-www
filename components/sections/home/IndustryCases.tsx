"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";
import { Link } from "@/lib/i18n/navigation";

/**
 * Featured work — the industry cases.
 *
 * Each entry pairs a product render with the industry it serves, set as a
 * work list rather than as cards: the image carries the weight, the title
 * and the discipline sit underneath it.
 */
export function IndustryCases() {
  const t = useTranslations("home.work");
  const items = t.raw("items") as {
    index: string;
    key: string;
    title: string;
    role: string;
    desc: string;
  }[];

  const hrefFor = (key: string) =>
    key === "professionalServices"
      ? "/use-cases/professional-services"
      : "/use-cases/trading";

  return (
    <SectionShell tone="void" hexField fieldOpacity={0.03}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="void">{t("label")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("lead")}</p>

            <ul className="mt-14 space-y-16">
              {items.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={hrefFor(item.key) as never} className="group block">
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute -inset-4 bg-accent/10 clip-hex hidden lg:block"
                      />
                      <div className="relative border border-white/12 bg-white transition-opacity group-hover:opacity-90">
                        {item.key === "professionalServices" ? (
                          <CrmModuleMockup className="block w-full h-auto" />
                        ) : (
                          <DashboardOverviewMockup className="block w-full h-auto" />
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-white/12 pt-5">
                      <span className="t-index text-accent">{item.index}</span>
                      <h3 className="t-display-3 text-white">{item.title}</h3>
                      <span className="t-label text-ash">{item.role}</span>
                    </div>
                    <p className="mt-3 max-w-xl text-body text-smoke/65">
                      {item.desc}
                    </p>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link href="/use-cases" className="link-arrow mt-12 text-white">
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
