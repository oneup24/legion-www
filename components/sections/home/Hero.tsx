"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { HexField, HexOutline } from "@/components/brand/Hex";
import { LogoMark } from "@/components/brand/LogoMark";
import { Link } from "@/lib/i18n/navigation";

/**
 * Hero — the first impression.
 *
 * Black is the canvas, the statement is set at the top of the type scale,
 * and the navigation sits in a strip along the bottom edge, the way the
 * reference site carries its section menu. The product render is the only
 * bright thing on the page.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const nav = t.raw("nav") as { label: string; href: string }[];
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  return (
    <section className="relative flex flex-col overflow-hidden bg-void">
      <HexField
        className="pointer-events-none absolute inset-0 h-full w-full text-white"
        style={{ opacity: 0.04 }}
      />
      <HexOutline
        size={760}
        strokePx={1}
        className="pointer-events-none absolute -right-52 top-[-10%] text-accent"
        style={{ opacity: 0.28 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-[-18%] opacity-[0.06]"
      >
        <LogoMark size={520} tone="light" />
      </div>

      <div className="shell relative flex-1 flex flex-col justify-center pt-[112px] pb-10 sm:pt-[132px] lg:pt-[150px] lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Statement — 7 of 12 columns */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="t-label text-accent">{t("tagline")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-7 t-display-hero t-balance text-white"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-7 t-lead max-w-xl text-smoke/70"
            >
              {t("sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  setSource("hero");
                  setBookOpen(true);
                }}
                data-cta-id="hero_book_demo"
                className="btn btn-accent"
              >
                {t("primaryCta")}
              </button>
              <Link href="/product" className="btn btn-ghost">
                {t("secondaryCta")}
              </Link>
            </motion.div>
          </div>

          {/* Product render — 5 of 12 columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="lg:col-span-5 relative"
          >
            <div
              aria-hidden
              className="absolute -inset-6 bg-accent/10 clip-hex hidden lg:block"
            />
            <div className="relative border border-white/12 bg-white">
              <DashboardOverviewMockup className="block w-full h-auto" />
            </div>
            <p className="mt-3 t-micro text-ash">{t("mockupCaption")}</p>
          </motion.div>
        </div>
      </div>

      {/* Section menu pinned to the bottom edge, as on the reference site */}
      <nav className="relative border-t border-white/10">
        <div className="hero-nav-strip">
          {nav.map((item) => (
            <Link key={item.href} href={item.href as never}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
