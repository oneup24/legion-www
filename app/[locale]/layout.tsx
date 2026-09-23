import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import { Inter, Inter_Tight, Noto_Sans_TC } from "next/font/google";
import { GlobalNav } from "@/components/chrome/GlobalNav";
import { SubNavFrosted } from "@/components/chrome/SubNavFrosted";
import { Footer } from "@/components/chrome/Footer";
import { FloatingStickyBar } from "@/components/chrome/FloatingStickyBar";
import { WhatsAppFAB } from "@/components/chrome/WhatsAppFAB";
import { BookDemoModalProvider } from "@/components/chrome/BookDemoModalProvider";
import { Analytics } from "@/components/Analytics";
import { routing } from "@/lib/i18n/config";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://legionone.vercel.app",
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "zh-HK": `/zh-HK`,
        en: `/en`,
      },
    },
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
      className={`${inter.variable} ${interTight.variable} ${notoSansTC.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <a href="#main" className="skip-link">
          跳至主要內容
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Suspense fallback={null}>
            <BookDemoModalProvider>
              <GlobalNav locale={locale} />
              <SubNavFrosted />
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