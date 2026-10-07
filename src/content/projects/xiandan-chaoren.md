---
title: 咸淡超人
status: active
summary: 一个测「今日状态」的小工具——1 分钟答几道题，告诉你今天是咸人还是淡人，顺带给今日宜忌、幸运物和彩蛋。
start: 2026-10-07
url: https://salty-bland-superman.pages.dev
logo: /xiandan-logo.png
tech:
  - 原生 JS
  - Canvas
  - Cloudflare Pages
links:
  - label: 访问站点
    href: https://salty-bland-superman.pages.dev
  - label: GitHub 源码
    href: https://github.com/PaiFlow-long/Salty-Bland-Superman
---

咸淡超人把「今天状态」拆成可计算的两件事：**咸度**（唤醒强度，越高越坐不住）和**情绪正负**（方向，好还是差）。两者交叉出 12 种状态类型，再叠加当天日期的先验——节前更咸、节后更淡。

几个刻意的设计：

- **答题轻，计算重**：核心 5 题，条件触发时最多追问 3 道；背后是七维状态向量（能量/意愿/负荷/社交/情绪/掌控/躁度）加权。
- **同一天同一答案 = 同一个结果**：用日期 + 答案做种子随机，可复现、可对照。
- **零后端、零依赖**：单文件 HTML，所有计算在浏览器里完成，不收集任何数据。
- **分享卡带二维码**：右下角二维码扫码直达本站。

站点独立部署在 `salty-bland-superman.pages.dev`，仓库 `PaiFlow-long/Salty-Bland-Superman` 完全开源（MIT），与本主站各自独立。