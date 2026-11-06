import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { LogoMark } from "@/components/brand/LogoMark";
import { HexField } from "@/components/brand/Hex";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Footer — the page's bookend.
 *
 * Built on the monopo structure: the brand symbol and two primary actions
 * at the top, then the menu, the address and the branch links, then the
 * logo and the copyright line. Black all the way down, with the hexagon
 * field carrying the brand shape instead of flat colour.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden bg-void border-t border-white/10">
      <HexField
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.045 }}
      />

      <div className="shell relative pt-16 sm:pt-20 pb-10">
        {/* Masthead — symbol, wordmark and the two primary actions */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between pb-14">
          <div>
            <div className="flex items-center gap-4">
              <LogoMark size={44} tone="light" />
              <Wordmark size="lg" />
            </div>
            <p className="mt-6 t-label text-ash">{t("tagline")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn btn-accent">
              {t("contact")}
            </Link>
            <Link href="/product" className="btn btn-ghost">
              {t("brochure")}
            </Link>
          </div>
        </div>

        {/* Menu, address, branches */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-10">
          <FooterCol title={t("company")}>
            <FooterLink href="/about">{tNav("about")}</FooterLink>
            <FooterLink href="/contact">{tNav("contact")}</FooterLink>
            <FooterLink href="/partners">{tNav("partners")}</FooterLink>
            <FooterLink href="/security">{t("security")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("product")}>
            <FooterLink href="/product">{tNav("products")}</FooterLink>
            <FooterLink href="/use-cases">{tNav("useCases")}</FooterLink>
            <FooterLink href="/pricing">{tNav("pricing")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("industry")}>
            <FooterLink href="/use-cases/trading">Trading</FooterLink>
            <FooterLink href="/use-cases/professional-services">
              Professional services
            </FooterLink>
            <FooterLink href="/use-cases">{tNav("useCases")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("legal")}>
            <FooterLink href="/privacy">{t("privacy")}</FooterLink>
            <FooterLink href="/terms">{t("terms")}</FooterLink>
            <FooterExternalLink href={`${BASE_PATH}/sitemap.xml`}>
              {t("sitemap")}
            </FooterExternalLink>
          </FooterCol>
        </div>

        {/* Address line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="t-micro text-ash">
            {t("address")} · hello@legionone.hk
          </p>
          <p className="t-micro text-ash">
            © {new Date().getFullYear()} LegionOne. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="t-label text-ash mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href as never}
        className="t-caption text-white/70 hover:text-accent-bright transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

/** For non-localised static assets (e.g. sitemap.xml) — no locale prefix. */
function FooterExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="t-caption text-white/70 hover:text-accent-bright transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
