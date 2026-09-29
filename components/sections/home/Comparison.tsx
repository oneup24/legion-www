"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Puzzle,
  EyeOff,
  Calculator,
  Briefcase,
  Bell,
  Database,
  X,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Row = {
  icon: string;
  title: string;
  before: string;
  beforeState: string;
  after: string;
  afterState: string;
};

const iconMap: Record<string, LucideIcon> = {
  Puzzle,
  EyeOff,
  Calculator,
  Briefcase,
  Bell,
  Database,
};

export function Comparison() {
  const t = useTranslations("home.comparison");
  const rows = t.raw("rows") as Row[];

  return (
    <section className="bg-canvas-parchment">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-caption text-ink-muted-48 mb-3 tracking-wide">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg text-ink max-w-3xl mx-auto">
            {t("headline")}
          </h2>
          <p className="text-lead text-ink-muted-80 mt-4 max-w-2xl mx-auto text-body-cjk">
            {t("lead")}
          </p>
        </motion.div>

        {/* Column headers (desktop) */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] gap-4 mb-4 pb-3 border-b border-divider-soft">
          <div className="text-caption font-semibold text-ink-muted-48 uppercase tracking-wide">
            {t("before")}
          </div>
          <div className="w-10" />
          <div className="text-caption font-semibold text-primary uppercase tracking-wide">
            {t("after")}
          </div>
        </div>

        <div className="space-y-3">
          {rows.map((row, i) => {
            const Icon = iconMap[row.icon] ?? Puzzle;
            return (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-canvas rounded-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 p-5 sm:p-6">
                  {/* BEFORE */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-ink-muted-48"
                      />
                      <span className="text-caption font-semibold text-ink-muted-48 uppercase tracking-wide">
                        {row.title}
                      </span>
                    </div>
                    <p className="text-body text-ink-muted-48 text-body-cjk line-through decoration-error/30 decoration-1">
                      {row.before}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-error/10">
                        <X size={12} className="text-error" strokeWidth={2.5} />
                      </span>
                      <span className="text-caption text-error font-medium">
                        {row.beforeState}
                      </span>
                    </div>
                  </div>

                  {/* ICON DIVIDER */}
                  <div className="hidden sm:flex flex-col items-center justify-center px-2">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-ink-muted-48"
                    />
                    <span className="text-caption font-semibold text-ink-muted-80 mt-1.5">
                      {row.title}
                    </span>
                  </div>

                  {/* AFTER */}
                  <div className="flex flex-col sm:border-l sm:border-divider-soft sm:pl-4">
                    <p className="text-body text-ink text-body-cjk">
                      {row.after}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-success/10">
                        <Check
                          size={12}
                          className="text-success"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-caption text-success font-medium">
                        {row.afterState}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}