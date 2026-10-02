---
title: A股研究站（子站示例）
status: active
summary: 用"每日判断 + 证据链 + 复盘留痕"的方式追踪 A 股投资决策。这张卡片演示主站如何链接到独立子站。
start: 2026-09-08
url: https://your-subdomain.pages.dev
timeline:
  - date: 2026-09-08
    event: 启动 A 股决策跟踪台账
  - date: 2026-10-02
    event: 作为独立子站接入主站
---

本卡片是**外部子站示例**。把 frontmatter 里的 `url` 换成你的真实子站域名（例如 `https://openclue.yourdomain.com`）后，访客点击这张卡片就会在新标签页跳转到独立站点。

主站与子站完全解耦：各自独立仓库、独立部署，互不影响。主站只负责"放链接"，不共享任何后端或数据库。
