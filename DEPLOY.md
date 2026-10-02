# 部署指南：上线到 Cloudflare Pages

站点代码已就绪，部署只需你完成「账号绑定」这唯一需要本人操作的部分。下面两条路径任选其一。

---

## 路径 A：Git 集成（推荐 · 自动部署）

以后 `git push` 就自动重新构建并上线，零额外操作。

**前提**：你需有 GitHub（或 GitLab）账号 + Cloudflare 账号。

**步骤**
1. 在 GitHub 新建一个**空仓库**（不要勾选 README / .gitignore）。
2. 把本地代码推上去（仓库地址换成你自己的）：
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```
3. 打开 Cloudflare 控制台 → **Workers & Pages** → **Create** → **Pages** → **连接到 Git**。
4. 选择刚推送的仓库。
5. 构建设置：框架预设选 **Astro**；构建命令 `npm run build`；输出目录 `dist`（选 Astro 预设会自动填好）。
6. 点击 **Deploy**，完成后得到一个 `*.pages.dev` 免费子域名，立即可访问。
7. （可选）在 **Custom domains** 绑定自己的域名，或用子域 `子站.yourdomain.com`。

> 之后每次改完内容：`git push` → 自动上线。

---

## 路径 B：Wrangler 直传（不用 GitHub）

适合只想把当前构建产物一次性传上去。

**步骤**
1. 本机装 Node，再装 wrangler：`npm i -g wrangler`
2. `wrangler login`（浏览器授权你的 Cloudflare 账号）
3. 在项目目录运行：`wrangler pages deploy dist`
4. 按提示给项目起名，完成。

---

## 成本

- 免费层（$0 永久）：**无限站点 / 无限请求 / 无限带宽**。
- 可选自定义域名约 ¥60/年；不绑也行，用免费 `*.pages.dev`。
- 开多个子站（主站 + 各项目站）边际成本 ≈ 0。

## 注意

- 本环境（WorkBuddy 沙箱）无法替你登录 Cloudflare，**「授权 / 绑定」这步必须你本人完成**。
- 本机本地预览：`npm run dev`（你本机正常；当前沙箱预览用 `python -m http.server` 托管 `dist/`）。
- 配置文件已备好：`wrangler.toml`（项目名 + 输出目录 `dist`）、`.gitignore`（已排除 `node_modules` / `dist` / `.astro`）。
