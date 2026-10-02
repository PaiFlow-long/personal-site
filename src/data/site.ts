/**
 * 站点配置：品牌信息 + 栏目导航
 *
 * 【扩展方式】以后要加栏目（例如「播客」「实验室」），只需：
 *   1) 在 NAV 数组里加一行 { key, path }
 *   2) 在 src/i18n/ui.ts 里补上 `nav.<key>` 的三语文案
 *   3) 新建对应页面 src/pages/<path>/index.astro
 * 导航栏、页脚、当前页高亮会自动跟上，无需改动布局代码。
 */

export const SITE = {
  brand: 'PaiFlow苹果派',
  brandEn: 'PaiFlow',
  /** 页面底部的中英双语宣言 —— 中英同时呈现，不随语言切换 */
  statement: {
    cn: '跳出人生的循环',
    en: 'Breaking Free from Life\u2019s Endless Cycle',
  },
  url: 'https://paiflow.pages.dev',
} as const

export interface NavItem {
  /** i18n 键后缀，对应 ui.ts 里的 `nav.<key>` */
  key: string
  /** 路径，'/' 为首页 */
  path: string
}

export const NAV: NavItem[] = [
  { key: 'home', path: '/' },
  { key: 'articles', path: '/articles' },
  { key: 'videos', path: '/videos' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
]
