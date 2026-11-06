---
type: project-brief
project: legionone
name: LegionOne 營銷網站
state: Active
updated: "2026-10-28"
tags: [project, brief]
---

# LegionOne 營銷網站 — Project Brief

> [!info] 呢份係 line leader 嘅第一份文件
> 機器級規則（charter、停手條件、派工規則）喺 `~/OU24/COMPANY.md` 同 agent 自己嘅 `AGENTS.md`。
> 呢份只講**呢條線係咩、做到邊、做完係咩**。

## 呢條線係咩

LegionOne（半獨立 AI ERP 產品公司）嘅 marketing site。zh-HK 為主，英文版只係 scaffolding。目標係俾香港 SME 老闆 10 秒內決定要唔要 Book a Demo。

## 技術棧

Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 + next-intl

## 技術棧細節 / 已有嘢

7 條核心路由 + 全域 Book a Demo modal、Radix Dialog、framer-motion 滾動動畫（respect prefers-reduced-motion）、Resend + Google Sheets 做 lead capture、Vercel Analytics + GA4 ready、三個靜態 dashboard mockup

## 常用指令

```bash
pnpm install / cp .env.example .env.local / pnpm dev（:3000，會跳去 /zh-HK）/ pnpm build
```

## 必讀文件

`README.md` 有 stack 同 quick start；`PLAN.md` 係 Phase 1 實作計劃同非目標；`Apple-DESIGN.md` 係設計語言（Apple 風格、單一 accent、相片優先）；`DEPLOY.md` + `GITHUB_PAGES.md` 講部署

## 重點位置

`messages/` 放 i18n 訊息、`app/` 放路由、`components/`、`lib/`。**唔好**為 Phase 1 加資源中心／真實客戶 testimonial／真實產品 demo

## 「做完」嘅定義

pnpm build 綠、TypeScript strict 過、zh-HK 每條路由都通、Book a Demo modal 喺手機可用、lead capture 真係送到 Resend／Sheets、PageSpeed 90+

## 現況

- 狀態：**Active**
- Repo：`https://github.com/oneup24/legion-www.git`
- 路徑：`/Users/user/Legionone`

## 停手條件（做完就要停，等 founder 批）

- **任何對外動作** — 發佈、部署上生產、email、社交平台、發訊息畀客戶
- **任何 git 寫操作** — `git add` / `commit` / `push` / `tag`。呢條線嘅 git 權限屬於 founder
- **開新 agent／新 project／改公司架構**
- **不可逆動作** — 刪資料、覆寫已有交付物、改動生產環境設定
- **冇出處嘅聲稱** — 冇官方文件支持嘅數字或功能承諾，唔准寫入任何對外文案
