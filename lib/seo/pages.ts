/**
 * Per-page search metadata, in both languages.
 *
 * Kept in one place so the English and Hong Kong Chinese versions of a
 * page never drift apart, and so the copy for search results is reviewed
 * next to the page copy rather than scattered through the route files.
 */

export type SeoLocale = "en" | "zh-HK";

export type PageKey =
  | "home"
  | "product"
  | "pricing"
  | "about"
  | "security"
  | "useCases"
  | "trading"
  | "professionalServices"
  | "partners"
  | "contact"
  | "privacy"
  | "terms"
  | "notFound";

/**
 * Sitemap hints travel with the page entry so the sitemap can never list a
 * route the site does not have, or miss one it does.
 */
export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type Entry = {
  path: string;
  og?: "default" | "product" | "pricing" | "use-cases" | "security";
  priority: number;
  changeFrequency: ChangeFrequency;
  en: { title: string; description: string };
  "zh-HK": { title: string; description: string };
};

export const PAGE_SEO: Record<PageKey, Entry> = {
  home: {
    path: "",
    og: "default",
    priority: 1.0,
    changeFrequency: "weekly",
    en: {
      title: "One system. Every team. The same numbers.",
      description:
        "The ERP + CRM platform built for Hong Kong SMEs. One system for revenue, finance, customers and inventory.",
    },
    "zh-HK": {
      title: "少數精銳，全力出擊",
      description:
        "為香港中小企而設的 ERP + CRM 平台。一個系統，統一營收、財務、客戶與庫存。15 分鐘免費示範。",
    },
  },
  product: {
    path: "/product",
    og: "product",
    priority: 0.9,
    changeFrequency: "weekly",
    en: {
      title: "Seven modules, one platform",
      description:
        "Dashboard, finance, CRM, inventory, sales, HR and automation — one platform across your whole operation.",
    },
    "zh-HK": {
      title: "七大模組，一個平台",
      description:
        "Dashboard、財務、CRM、庫存、銷售、HR、自動化——一個平台覆蓋你整條作業流程。",
    },
  },
  pricing: {
    path: "/pricing",
    og: "pricing",
    priority: 0.8,
    changeFrequency: "weekly",
    en: {
      title: "Transparent pricing that grows with you",
      description:
        "Three plans covering a one-person company through to a 200-person team. Every plan includes the four core modules.",
    },
    "zh-HK": {
      title: "透明定價，隨業務成長",
      description:
        "三個方案覆蓋由一人公司至 200 人團隊。所有方案包含核心四大模組。",
    },
  },
  about: {
    path: "/about",
    priority: 0.6,
    changeFrequency: "yearly",
    en: {
      title: "About LegionOne",
      description:
        "We believe good tools should not only serve large enterprises. LegionOne was founded by Hong Kong SME owners and a technical team.",
    },
    "zh-HK": {
      title: "關於 LegionOne",
      description:
        "我們相信，好的工具不應只服務大企業。LegionOne 由一班香港中小企老闆與技術團隊創立。",
    },
  },
  security: {
    path: "/security",
    og: "security",
    priority: 0.5,
    changeFrequency: "monthly",
    en: {
      title: "Enterprise-grade security, built into the architecture",
      description:
        "ISO 27001, GDPR Ready, AWS Hong Kong and Cyber Trust Mark. Your data stays in Hong Kong.",
    },
    "zh-HK": {
      title: "企業級資訊安全，由架構開始",
      description:
        "ISO 27001、GDPR Ready、AWS Hong Kong、Cyber Trust Mark 四項認證，資料留在香港。",
    },
  },
  useCases: {
    path: "/use-cases",
    og: "use-cases",
    priority: 0.8,
    changeFrequency: "weekly",
    en: {
      title: "Built for different industries",
      description:
        "We went deep on two industries first: trading and professional services. More to follow.",
    },
    "zh-HK": {
      title: "為不同行業而生",
      description:
        "我們選擇先深入兩個行業：貿易與專業服務。其他行業陸續推出。",
    },
  },
  trading: {
    path: "/use-cases/trading",
    og: "use-cases",
    priority: 0.7,
    changeFrequency: "monthly",
    en: {
      title: "Trading companies",
      description:
        "From quotation, order and shipping through to payment — LegionOne keeps the whole supply chain in step.",
    },
    "zh-HK": {
      title: "貿易公司",
      description:
        "由報價、訂單、船務、收款的整條供應鏈，LegionOne 幫你理順。",
    },
  },
  professionalServices: {
    path: "/use-cases/professional-services",
    og: "use-cases",
    priority: 0.7,
    changeFrequency: "monthly",
    en: {
      title: "Professional services",
      description:
        "Accounting, legal and consulting firms — clients, projects, time and invoices under one roof.",
    },
    "zh-HK": {
      title: "專業服務",
      description:
        "會計師、法律、顧問公司 — 客戶、專案、時間、發票統一管理。",
    },
  },
  partners: {
    path: "/partners",
    priority: 0.6,
    changeFrequency: "weekly",
    en: {
      title: "Partner with LegionOne",
      description:
        "Referral, implementation and solution partners — three ways to bring better tools to Hong Kong SMEs.",
    },
    "zh-HK": {
      title: "與 LegionOne 同行",
      description:
        "推薦、實施、解決方案三種合作模式，一起把更好的工具帶給香港中小企。",
    },
  },
  contact: {
    path: "/contact",
    priority: 0.6,
    changeFrequency: "weekly",
    en: {
      title: "Contact us",
      description:
        "Tell us about your situation. We reply within one working day.",
    },
    "zh-HK": {
      title: "聯絡我們",
      description: "直接同我哋講你嘅情況。我們於 1 個工作天內回覆。",
    },
  },
  privacy: {
    path: "/privacy",
    priority: 0.3,
    changeFrequency: "yearly",
    en: {
      title: "Privacy policy",
      description:
        "We collect only what we need to answer your enquiry, and we keep it in Hong Kong.",
    },
    "zh-HK": {
      title: "私隱政策",
      description: "我們只收集回覆你查詢所需的資料，並把它們放在香港。",
    },
  },
  terms: {
    path: "/terms",
    priority: 0.3,
    changeFrequency: "yearly",
    en: {
      title: "Terms of use",
      description:
        "This website introduces the LegionOne platform; using the platform itself is covered by separate service terms.",
    },
    "zh-HK": {
      title: "使用條款",
      description:
        "本網站介紹 LegionOne 平台；使用平台本身，另有正式服務條款。",
    },
  },
  notFound: {
    path: "",
    priority: 0.1,
    changeFrequency: "never",
    en: {
      title: "Page not found",
      description: "The page you are looking for may have moved or never existed.",
    },
    "zh-HK": {
      title: "頁面不存在",
      description: "你要找的內容可能已被移動、重新命名，或者從未存在。",
    },
  },
};
