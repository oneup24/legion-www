"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { motion } from "framer-motion";

type CasePageProps = {
  namespace: "trading" | "professionalServices";
};

export function CasePage({ namespace }: CasePageProps) {
  const t = useTranslations(`useCases.${namespace}`);
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
      {/* Hero */}
      <section className="tile-dark-1">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-20 sm:py-32 text-center">
          <h1 className="text-hero-display text-on-dark">{t("headline")}</h1>
          <p className="text-lead text-body-muted mt-4 max-w-2xl mx-auto text-body-cjk">
            {t("sub")}
          </p>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-canvas-parchment">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink mb-8">{t("pain.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-canvas rounded-xl p-6"
              >
                <p className="text-body text-ink text-body-cjk">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink mb-8">{t("solution.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutionItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-canvas-parchment rounded-xl p-6 border-l-4 border-primary"
              >
                <p className="text-body text-ink text-body-cjk">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Flow */}
      <section className="bg-canvas-parchment">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16">
          <h2 className="text-display-lg text-ink mb-10 text-center">
            {t("dayFlow.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {dayFlow.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-canvas rounded-xl p-6"
              >
                <div className="text-tagline text-primary">{step.time}</div>
                <h3 className="text-body-strong text-ink mt-2">{step.title}</h3>
                <p className="text-caption text-ink-muted-80 mt-2 text-body-cjk">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tile-dark-2">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 text-center">
          <Button
            variant="primary"
            size="lg"
            data-cta-id={`case_${namespace}_book_demo`}
            onClick={() => {
              setSource(`case_${namespace}`);
              setOpen(true);
            }}
          >
            預約免費示範
          </Button>
        </div>
      </section>
    </>
  );
}