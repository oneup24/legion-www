import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import { Poppins, Noto_Sans_TC } from "next/font/google";
import { GlobalNav } from "@/components/chrome/GlobalNav";
import { Footer } from "@/components/chrome/Footer";
import { FloatingStickyBar } from "@/components/chrome/FloatingStickyBar";
import { WhatsAppFAB } from "@/components/chrome/WhatsAppFAB";
import { BookDemoModalProvider } from "@/components/chrome/BookDemoModalProvider";
import { Analytics } from "@/components/Analytics";
import { routing } from "@/lib/i18n/config";
import { assetUrl, SITE_URL } from "@/lib/seo/site";
import "../globals.css";

/**
 * Poppins stands in for Gilroy, which is a commercial licence we do not
 * bundle. The brand slot `--font-brand` is left free so dropping in the
 * licensed woff2 files is a one-line swap with no other change.
 */
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-tc",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale === routing.defaultLocale ? "" : locale}`,
      languages: {
        en: "/",
        "zh-HK": "/zh-HK",
      },
    },
    icons: {
      icon: [
        { url: assetUrl("favicon.ico"), sizes: "16x16 32x32 48x48" },
        { url: assetUrl("favicon-32x32.png"), sizes: "32x32", type: "image/png" },
        { url: assetUrl("favicon-16x16.png"), sizes: "16x16", type: "image/png" },
        { url: assetUrl("icon.svg"), type: "image/svg+xml" },
      ],
      apple: [{ url: assetUrl("apple-touch-icon.png"), sizes: "180x180" }],
    },
    manifest: assetUrl("site.webmanifest"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${notoSansTC.variable}`}
    >
      <body className="min-h-screen bg-void text-white antialiased">
        <a href="#main" className="skip-link">
          {locale === "zh-HK" ? "跳至主要內容" : "Skip to main content"}
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Suspense fallback={null}>
            <BookDemoModalProvider>
              <GlobalNav locale={locale} />
              <main id="main">{children}</main>
              <Footer />
              <FloatingStickyBar />
              <WhatsAppFAB />
            </BookDemoModalProvider>
          </Suspense>
        </NextIntlClientProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}