"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PageHero } from "@/components/editorial/PageHero";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { SectionShell } from "@/components/editorial/SectionShell";
import { HexIcon } from "@/components/brand/Hex";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { Link } from "@/lib/i18n/navigation";

type Badge = { label: string; desc: string };

/**
 * Security page.
 *
 * Every line on this page is reused from copy the site already publishes —
 * the four certification badges from the homepage and the data-residency
 * answer from the pricing FAQ. Nothing here states a technical control,
 * uptime figure or certification detail that we have not already claimed.
 */
export function SecurityPage() {
  const t = useTranslations("security");
  const tHome = useTranslations("home.security");
  const tFinal = useTranslations("home.final");
  const tNav = useTranslations("nav");
  const badges = tHome.raw("items") as Badge[];
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("headline")}
        lead={t("sub")}
        tone="void"
      />

      {/* The four certifications */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <SectionHeader
            index="01"
            kicker={t("badgesKicker")}
            title={t("badgesTitle")}
            tone="surface"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-10 sm:grid-cols-2">
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <HexIcon size={40} tone="legion">
                    <ShieldCheck size={18} strokeWidth={1.6} aria-hidden />
                  </HexIcon>
                  <span className="t-index text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 t-display-3 text-white">{b.label}</h3>
                <p className="mt-3 t-body text-smoke/65">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Where the data lives */}
      <SectionShell tone="void">
        <div className="shell section-y">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                index="02"
                kicker={t("dataKicker")}
                title={t("dataTitle")}
                tone="void"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="t-statement text-white">{t("dataBody")}</p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Detailed documentation */}
      <SectionShell tone="surface" hexField fieldOpacity={0.04}>
        <div className="shell section-y">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                index="03"
                kicker={t("docsKicker")}
                title={t("docsTitle")}
                tone="surface"
              />
            </div>
            <div className="lg:col-span-8">
              <p className="t-lead text-smoke/70">{t("docsBody")}</p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell tone="accent" hexField fieldOpacity={0.12}>
        <div className="shell relative section-y">
          <SectionHeader
            index="04"
            kicker={t("ctaKicker")}
            title={t("ctaTitle")}
            tone="accent"
            titleClassName="text-white"
            className="max-w-3xl"
          />

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <p className="t-lead max-w-2xl text-white/85">{t("ctaBody")}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <Button
                  variant="white"
                  size="lg"
                  data-cta-id="security_book_demo"
                  onClick={() => {
                    setSource("security_bottom");
                    setBookOpen(true);
                  }}
                >
                  {tFinal("primaryCta")}
                </Button>
                <Link
                  href="/contact"
                  data-cta-id="security_contact"
                  className="link-arrow text-white"
                >
                  {tNav("contact")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
