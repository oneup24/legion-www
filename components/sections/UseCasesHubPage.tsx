"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { motion } from "framer-motion";
import { Ship, Briefcase, ShoppingBag, Factory } from "lucide-react";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { BrandMoment } from "@/components/editorial/BrandMoment";
import { Chip } from "@/components/editorial/Chip";
import { HexBadge, HexIcon } from "@/components/brand/Hex";

const industries = [
  {
    key: "trading",
    href: "/use-cases/trading",
    comingSoon: false,
    Icon: Ship,
  },
  {
    key: "professional-services",
    href: "/use-cases/professional-services",
    comingSoon: false,
    Icon: Briefcase,
  },
  {
    key: "retail",
    href: null,
    comingSoon: true,
    Icon: ShoppingBag,
  },
  {
    key: "manufacturing",
    href: null,
    comingSoon: true,
    Icon: Factory,
  },
] as const;

export function UseCasesHubPage() {
  const t = useTranslations("useCases.hub");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tComing = useTranslations("useCases.comingSoon");
  const tTrading = useTranslations("useCases.trading");
  const tProfessional = useTranslations("useCases.professionalServices");

  const titleFor = (key: string) =>
    key === "retail"
      ? tComing("retail")
      : key === "manufacturing"
        ? tComing("manufacturing")
        : key === "trading"
          ? tTrading("headline")
          : tProfessional("headline");

  return (
    <>
      <PageHero
        tone="void"
        kicker={tNav("useCases")}
        title={t("headline")}
        lead={t("sub")}
      />

      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="01"
            kicker={t("sectionsKicker")}
            title={t("sectionsTitle")}
            tone="surface"
          />

          <div className="mt-14 border-t border-white/12">
            {industries.map((ind, i) => {
              const title = titleFor(ind.key);
              const row = (
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="grid grid-cols-1 gap-4 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
                >
                  <div className="lg:col-span-1">
                    <HexBadge size={32} tone={ind.comingSoon ? "onDark" : "legion"}>
                      {String(i + 1).padStart(2, "0")}
                    </HexBadge>
                  </div>

                  <div className="lg:col-span-1">
                    <HexIcon size={44} tone={ind.comingSoon ? "onDark" : "legion"}>
                      <ind.Icon size={20} strokeWidth={1.6} aria-hidden />
                    </HexIcon>
                  </div>

                  <div className="lg:col-span-5">
                    <h3
                      className={`t-display-3 ${
                        ind.comingSoon ? "text-ash" : "text-white"
                      }`}
                    >
                      {title}
                    </h3>
                  </div>

                  <div className="lg:col-span-5 lg:flex lg:items-start lg:justify-end">
                    {ind.comingSoon ? (
                      <Chip>{t("comingSoon")}</Chip>
                    ) : (
                      <span className="link-arrow text-white">{t("viewCase")}</span>
                    )}
                  </div>
                </motion.article>
              );

              return ind.href ? (
                <Link
                  key={ind.key}
                  href={ind.href}
                  className="block transition-opacity hover:opacity-80"
                  data-cta-id={`use_cases_${ind.key}`}
                >
                  {row}
                </Link>
              ) : (
                <div key={ind.key}>{row}</div>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <BrandMoment
        headline={tFooter("tagline")}
        primaryCta={tNav("bookDemo")}
        secondaryCta={t("viewCase")}
        secondaryHref="/use-cases/trading"
        source="use_cases_hub"
        ctaId="use_cases_hub_book_demo"
      />
    </>
  );
}
