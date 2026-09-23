"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useBookDemo } from "@/components/chrome/useBookDemo";

type TileProps = {
  bg: "canvas" | "parchment" | "tile-dark-1" | "tile-dark-2" | "tile-dark-3";
  title: string;
  tagline: string;
  bullets: string[];
  mockup: React.ReactNode;
};

function ProductTileBlock({ bg, title, tagline, bullets, mockup }: TileProps) {
  const dark = bg.startsWith("tile");
  const bgClass = dark ? bg : bg === "canvas" ? "bg-canvas" : "bg-canvas-parchment";
  return (
    <section className={bgClass}>
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className={`text-display-lg ${dark ? "text-on-dark" : "text-ink"}`}
            >
              {title}
            </h2>
            <p
              className={`text-lead mt-3 ${dark ? "text-body-muted" : "text-ink-muted-80"} text-body-cjk`}
            >
              {tagline}
            </p>
            <ul className="mt-6 space-y-2">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-body text-body-cjk ${dark ? "text-on-dark" : "text-ink"}`}
                >
                  <span
                    aria-hidden
                    className={`mt-2 w-1.5 h-1.5 rounded-full ${dark ? "bg-primary-on-dark" : "bg-primary"}`}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden product-shadow bg-canvas-pearl">
            {mockup}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductPage() {
  const t = useTranslations("product");
  const { setOpen, setSource } = useBookDemo();

  const sections: Array<{
    key: "dashboard" | "finance" | "crm" | "inventory" | "sales" | "hr" | "automation";
    bg: TileProps["bg"];
    mockup: React.ReactNode;
  }> = [
    {
      key: "dashboard",
      bg: "canvas",
      mockup: <div className="aspect-[16/10] bg-canvas-pearl" />,
    },
    {
      key: "finance",
      bg: "parchment",
      mockup: <div className="aspect-[16/10] bg-canvas-pearl" />,
    },
    {
      key: "crm",
      bg: "tile-dark-1",
      mockup: <div className="aspect-[16/10] bg-white/10" />,
    },
    {
      key: "inventory",
      bg: "canvas",
      mockup: <div className="aspect-[16/10] bg-canvas-pearl" />,
    },
    {
      key: "sales",
      bg: "tile-dark-2",
      mockup: <div className="aspect-[16/10] bg-white/10" />,
    },
    {
      key: "hr",
      bg: "parchment",
      mockup: <div className="aspect-[16/10] bg-canvas-pearl" />,
    },
    {
      key: "automation",
      bg: "tile-dark-3",
      mockup: <div className="aspect-[16/10] bg-white/10" />,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 pt-12 sm:pt-20 pb-12 text-center">
          <h1 className="text-hero-display text-ink">{t("headline")}</h1>
          <p className="text-lead text-ink-muted-80 mt-4 max-w-2xl mx-auto text-body-cjk">
            {t("sub")}
          </p>
        </div>
      </section>

      {sections.map((s) => (
        <ProductTileBlock
          key={s.key}
          bg={s.bg}
          title={t(`section.${s.key}.title`)}
          tagline={t(`section.${s.key}.tagline`)}
          bullets={t.raw(`section.${s.key}.bullets`) as string[]}
          mockup={s.mockup}
        />
      ))}

      {/* Bottom CTA */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-16 text-center">
          <h2 className="text-display-lg text-ink">
            {t("bottomCta.headline")}
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              data-cta-id="product_book_demo"
              onClick={() => {
                setSource("product_bottom");
                setOpen(true);
              }}
            >
              {t("bottomCta.primaryCta")}
            </Button>
            <a
              href="#"
              data-cta-id="product_download"
              className="text-button text-primary hover:text-primary-focus"
            >
              {t("bottomCta.secondaryCta")} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}