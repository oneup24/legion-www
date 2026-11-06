"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";
import { HexIcon } from "@/components/brand/Hex";

/**
 * One working day.
 *
 * Five decisions laid out on a single spine, each marked by a hexagon —
 * the brand's own shape doing the job of a timeline node.
 */
export function DayInTheLife() {
  const t = useTranslations("home.day");
  const steps = t.raw("steps") as {
    number: string;
    time: string;
    title: string;
    desc: string;
    modules: string[];
  }[];

  return (
    <SectionShell tone="surface" hexField fieldOpacity={0.04}>
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="surface">{t("label")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("lead")}</p>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* the spine */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-white/14 lg:block"
          />

          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative"
            >
              <HexIcon size={34} tone="legion" className="relative z-10">
                <span className="t-micro text-white">{step.number}</span>
              </HexIcon>

              <p className="mt-5 t-label text-accent">{step.time}</p>
              <h3 className="mt-3 t-display-3 text-white">{step.title}</h3>
              <p className="mt-3 t-body text-smoke/65">{step.desc}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {step.modules.map((m) => (
                  <li
                    key={m}
                    className="t-micro text-ash border border-white/14 px-2.5 py-1"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
