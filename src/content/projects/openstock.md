---
title: OpenStock
status: active
summary: 一个 A 股研究站——不做又一块行情看板，而是把每一次判断写清楚：这只票为什么进、依据是什么、什么条件下算看错、什么时候复盘。
start: 2026-09-08
end: 2026-10-06
url: https://paiflow-openstock.pages.dev
logo: /openstock-logo.png
tech:
  - Astro
  - AkShare
  - Cloudflare Pages
  - D1
  - Resend
links:
  - label: 访问站点
    href: https://paiflow-openstock.pages.dev
timeline:
  - date: 2026-09-08
    event: 启动批次台账与统一建仓口径（入选当收盘价为基准）
  - date: 2026-09-20
    event: 接入免费行情与财务数据源（AkShare 等）
  - date: 2026-10-05
    event: 打通联系表单后端（Cloudflare Pages Function + D1 + 邮件通知）
---

OpenStock 是我推进中的 A 股研究站。核心不是展示行情，而是把每一次判断写清楚：这只票为什么进、依据是什么、什么条件下算看错、什么时候复盘。

站点独立部署在 `paiflow-openstock.pages.dev`，与本主站各自独立仓库、独立部署。
