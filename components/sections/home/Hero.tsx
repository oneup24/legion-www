"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useBookDemo } from "@/components/chrome/useBookDemo";
import { DashboardOverviewMockup } from "@/components/brand/mockups/DashboardOverview";
import { FinanceModuleMockup } from "@/components/brand/mockups/FinanceModule";
import { CrmModuleMockup } from "@/components/brand/mockups/CrmModule";
import { HexField, HexOutline } from "@/components/brand/Hex";
import { LogoMark } from "@/components/brand/LogoMark";
import { Link } from "@/lib/i18n/navigation";

/**
 * Hero — the first impression, built as a slide show.
 *
 * The reference site opens with a carousel: each slide is one statement with
 * its own illustration, and the visitor moves through the platform's most
 * seen modules before reaching anything else. Ours does the same, using the
 * brand mockups we already draw.
 *
 * The section menu stays pinned to the bottom edge, the way the reference
 * site carries its section menu.
 */
export function Hero() {
  const t = useTranslations("home.hero");
  const tModules = useTranslations("product.section");
  const tServices = useTranslations("home.services");
  const nav = t.raw("nav") as { label: string; href: string }[];
  const services = tServices.raw("items") as {
    index: string;
    title: string;
    desc: string;
  }[];
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  const slides = React.useMemo(
    () => [
      {
        key: "platform",
        label: t("tagline"),
        title: t("headline"),
        sub: t("sub"),
        visual: <DashboardOverviewMockup className="block w-full h-auto" />,
      },
      {
        key: "finance",
        label: services[1].title,
        title: tModules("finance.tagline"),
        sub: services[1].desc,
        visual: <FinanceModuleMockup className="block w-full h-auto" />,
      },
      {
        key: "crm",
        label: services[2].title,
        title: tModules("crm.tagline"),
        sub: services[2].desc,
        visual: <CrmModuleMockup className="block w-full h-auto" />,
      },
    ],
    [t, tModules, services],
  );

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const current = slides[active];

  return (
    <section className="relative flex flex-col overflow-hidden bg-canvas">
      <HexField
        className="pointer-events-none absolute inset-0 h-full w-full text-ink"
        style={{ opacity: 0.022 }}
      />
      <HexOutline
        size={760}
        strokePx={1}
        className="pointer-events-none absolute -right-80 top-[-16%] text-accent"
        style={{ opacity: 0.05 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-[-18%] opacity-[0.025]"
      >
        <LogoMark size={520} tone="dark" />
      </div>

      <div className="shell relative flex-1 flex flex-col justify-center pt-[112px] pb-10 sm:pt-[132px] lg:pt-[150px] lg:pb-16">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:min-h-[500px] items-center"
            >
              {/* Statement — 7 of 12 columns */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="t-label text-accent">{current.label}</span>
                </motion.div>

                {active === 0 ? (
                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 }}
                    className="mt-6 t-display-hero t-balance text-ink"
                  >
                    {current.title}
                  </motion.h1>
                ) : (
                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 }}
                    className="mt-6 t-display-hero t-balance text-ink"
                  >
                    {current.title}
                  </motion.h2>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="mt-6 t-lead max-w-xl text-ink-muted"
                >
                  {current.sub}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="mt-8 flex flex-wrap gap-3"
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
                <div className="relative overflow-hidden rounded-card border border-line bg-white">
                  {current.visual}
                </div>
                <p className="mt-3 t-micro text-ink-faint">{t("mockupCaption")}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide control */}
          <div className="mt-10 flex items-center gap-4">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label={t("slideLabel")}
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${t("slideLabel")} ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-1.5 bg-line-strong hover:bg-ink-faint"
                  }`}
                />
              ))}
            </div>
            <span className="t-micro text-ink-faint tabular-nums">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Section menu pinned to the bottom edge, as on the reference site */}
      <nav className="relative border-t border-line">
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
