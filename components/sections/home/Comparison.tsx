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
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { FinanceModuleMockup } from "@/components/brand/mockups/FinanceModule";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";

type MockupKey = "dashboard" | "finance" | "crm";
const mockupMap: Record<MockupKey, React.ComponentType<{ className?: string }>> = {
  dashboard: DashboardOverviewMockup,
  finance: FinanceModuleMockup,
  crm: CrmModuleMockup,
};

type Row = {
  number: string;
  icon: string;
  title: string;
  pain: string;
  painTag: string;
  solution: string;
  solutionTag: string;
  mockup: MockupKey;
};

const iconMap: Record<string, LucideIcon> = {
  Puzzle,
  EyeOff,
  Calculator,
  Briefcase,
  Bell,
  Database,
};

const cardGradients = [
  "bg-[linear-gradient(135deg,#003a8c_0%,#0066cc_100%)]",
  "bg-[linear-gradient(180deg,#0066cc_0%,#1e40af_100%)]",
  "bg-[linear-gradient(45deg,#2997ff_0%,#0066cc_100%)]",
  "bg-[linear-gradient(225deg,#1e40af_0%,#2997ff_100%)]",
  "bg-[linear-gradient(135deg,#0071e3_0%,#003a8c_100%)]",
  "bg-[linear-gradient(180deg,#003a8c_0%,#2997ff_100%)]",
] as const;

export function Comparison() {
  const t = useTranslations("home.comparison");
  const rows = t.raw("rows") as Row[];

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 sm:mb-16"
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

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 sm:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
          {rows.map((row, i) => {
            const Icon = iconMap[row.icon] ?? Puzzle;
            const Mockup = mockupMap[row.mockup];
            const gradient = cardGradients[i % cardGradients.length];
            return (
              <motion.article
                key={row.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden flex flex-col bg-canvas-pearl min-w-[78vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0"
              >
                <Link
                  href="/product"
                  data-cta-id={`comparison_learn_${row.number}`}
                  className={`${gradient} relative p-6 sm:p-8 text-on-dark flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-white/15" aria-hidden />

                  <header className="flex items-start justify-between mb-5">
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-white"
                      aria-hidden
                    />
                    <ArrowRight
                      size={20}
                      strokeWidth={2}
                      className="text-white/70 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </header>

                  <h3 className="text-tagline text-white font-semibold mb-2">
                    {row.title}
                  </h3>
                  <p className="text-body text-white/85 text-body-cjk">
                    {row.solution}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-caption tracking-wide uppercase text-white/70">
                    <span>{row.solutionTag}</span>
                    <span className="h-px flex-1 bg-white/15" aria-hidden />
                  </div>
                </Link>

                <div className="bg-canvas-pearl product-shadow">
                  <Mockup className="w-full h-auto block" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}