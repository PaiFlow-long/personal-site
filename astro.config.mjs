import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// 公开部署目标：Cloudflare Pages。
// Astro 5 的 output 默认即为 'static'，且已兼具 SSR 能力：
// 默认全部预渲染为静态（零运维），到 P3 接入访客留言时，
// 只需把 API 路由设为 `export const prerender = false` 即可用上 Worker/D1。
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://your-domain.pages.dev',
});
