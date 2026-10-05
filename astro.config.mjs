import { defineConfig } from 'astro/config';

// 公开部署目标：Cloudflare Pages（纯静态 + Pages Functions）。
//
// 为什么不用 @astrojs/cloudflare adapter：
//   站点全部页面都是预渲染静态页；唯一的动态部分是留言接口，
//   它由仓库根的 functions/api/contact.js（Cloudflare Pages Function）承担。
//   adapter 会另外产出 _worker.js，与 functions/ 同时存在时 CF 只认 _worker.js，
//   会导致 /api/contact 失效。故此处保持纯静态输出，让 functions/ 正常生效。
export default defineConfig({
  output: 'static',
  site: 'https://paiflow.pages.dev',
});
