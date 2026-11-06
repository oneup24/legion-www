"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionShell } from "@/components/editorial/SectionShell";
import { SectionLabel } from "@/components/editorial/SectionLabel";

/**
 * Onboarding in three steps.
 *
 * Three columns, each numbered, each carrying one move. Kept deliberately
 * plain — the promise is that we look at your situation first.
 */
export function Methodology() {
  const t = useTranslations("home.methodology");
  const steps = t.raw("steps") as {
    number: string;
    title: string;
    desc: string;
    tags: string[];
  }[];

  return (
    <SectionShell tone="void">
      <div className="shell section-y">
        <div className="split-grid">
          <div>
            <SectionLabel tone="void">{t("kicker")}</SectionLabel>
          </div>

          <div>
            <h2 className="t-display-1 t-balance text-white max-w-3xl">
              {t("headline")}
            </h2>
            <p className="mt-6 t-lead max-w-2xl text-smoke/70">{t("lead")}</p>

            <ol className="mt-14 grid gap-px bg-white/12 sm:grid-cols-3">
              {steps.map((step, i) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-void p-7"
                >
                  <span className="t-giant-index text-accent block text-[52px]">
                    {step.number}
                  </span>
                  <h3 className="mt-5 t-display-3 text-white">{step.title}</h3>
                  <p className="mt-3 t-body text-smoke/65">{step.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <li
                        key={tag}
                        className="t-micro text-ash border border-white/14 px-2.5 py-1"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
