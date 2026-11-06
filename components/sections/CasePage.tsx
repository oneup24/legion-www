"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { motion } from "framer-motion";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexBadge, HexIcon } from "@/components/brand/Hex";

type CasePageProps = {
  namespace: "trading" | "professionalServices";
};

export function CasePage({ namespace }: CasePageProps) {
  const t = useTranslations(`useCases.${namespace}`);
  const tKickers = useTranslations("useCases.sectionKickers");
  const tNav = useTranslations("nav");
  const tFinal = useTranslations("home.final");
  const painItems = t.raw("pain.items") as string[];
  const solutionItems = t.raw("solution.items") as string[];
  const dayFlow = t.raw("dayFlow.steps") as Array<{
    time: string;
    title: string;
    detail: string;
  }>;
  const { setOpen, setSource } = useBookDemo();

  return (
    <>
      <PageHero
        tone="void"
        kicker={tNav("useCases")}
        title={t("headline")}
        lead={t("sub")}
      />

      {/* Pain */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="01"
            kicker={tKickers("pain")}
            title={t("pain.title")}
            tone="surface"
          />

          <ul className="mt-14 border-t border-white/12">
            {painItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-white/12 py-6 lg:grid-cols-12 lg:gap-8"
              >
                <span className="lg:col-span-1">
                  <HexBadge size={28} tone="onDark">
                    {String(i + 1).padStart(2, "0")}
                  </HexBadge>
                </span>
                <span className="lg:col-span-11 t-body text-smoke/60">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* Solution */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <SectionHeader
            index="02"
            kicker={tKickers("solution")}
            title={t("solution.title")}
            tone="void"
          />

          <ul className="mt-14 border-t border-white/12">
            {solutionItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-white/12 py-6 lg:grid-cols-12 lg:gap-8"
              >
                <span className="lg:col-span-1">
                  <HexIcon size={28} tone="legion">
                    <span className="t-micro text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </HexIcon>
                </span>
                <span className="lg:col-span-11 t-body text-white/90">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* Day flow — numbered spine */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="03"
            kicker={tKickers("dayFlow")}
            title={t("dayFlow.title")}
            tone="surface"
          />

          <div className="mt-14 border-t border-white/12">
            {dayFlow.map((step, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
              >
                <div className="flex items-center gap-4 lg:col-span-2">
                  <HexBadge size={32} tone="legion">
                    {String(i + 1).padStart(2, "0")}
                  </HexBadge>
                  <span className="t-label text-accent">{step.time}</span>
                </div>
                <div className="lg:col-span-10">
                  <h3 className="t-display-3 text-white">{step.title}</h3>
                  <p className="mt-3 t-body max-w-xl text-smoke/65">{step.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell tone="accent" hexField fieldOpacity={0.12}>
        <div className="shell section-y flex justify-center">
          <Button
            variant="white"
            size="lg"
            data-cta-id={`case_${namespace}_book_demo`}
            onClick={() => {
              setSource(`case_${namespace}`);
              setOpen(true);
            }}
          >
            {tFinal("primaryCta")}
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
