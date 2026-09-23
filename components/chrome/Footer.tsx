import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-canvas-parchment border-t border-divider-soft">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Wordmark className="text-[20px]" />
            <p className="text-caption text-ink-muted-48 mt-3 leading-relaxed">
              {t("tagline")}
            </p>
          </div>
          <FooterCol title={t("company")}>
            <FooterLink href="/about">{tNav("about")}</FooterLink>
            <FooterLink href="/contact">{tNav("contact")}</FooterLink>
            <FooterLink href="/partners">{tNav("partners")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("product")}>
            <FooterLink href="/product">{tNav("products")}</FooterLink>
            <FooterLink href="/use-cases">{tNav("useCases")}</FooterLink>
            <FooterLink href="/pricing">{tNav("pricing")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("legal")}>
            <FooterLink href="/privacy">{t("privacy")}</FooterLink>
            <FooterLink href="/terms">{t("terms")}</FooterLink>
            <FooterLink href="/sitemap">{t("sitemap")}</FooterLink>
          </FooterCol>
        </div>
        <div className="mt-10 pt-6 border-t border-divider-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-fine-print text-ink-muted-48">
            © {new Date().getFullYear()} LegionOne. {t("rights")}.
          </p>
          <p className="text-fine-print text-ink-muted-48">{t("address")}</p>
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
      <h4 className="text-caption font-semibold text-ink mb-3">{title}</h4>
      <ul className="space-y-2">{children}</ul>
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
        className="text-caption text-ink-muted-80 hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}