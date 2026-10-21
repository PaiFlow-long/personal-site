import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  // image() 由 schema 函数注入（Astro 5 的写法），不能从 astro:assets 直接 import
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      category: z.string().optional(),
      summary: z.string().optional(),
      /** 封面图：放 src/assets/covers/ 下，路径相对本 md 文件写 */
      cover: image().optional(),
      /** 外链：填了就表示全文在别处（如微信公众号），卡片直接跳转，不生成本地详情页 */
      link: z.string().optional(),
      /** 外链的出处名，显示在卡片上，如「微信公众号」 */
      source: z.string().optional(),
    }),
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'paused', 'done', 'planned']),
    summary: z.string().optional(),
    start: z.date().optional(),
    /** 结束时间；进行中的项目留空，卡片右上角只显示「起 → 至今」 */
    end: z.date().optional(),
    url: z.string().optional(),
    /** 子站 logo（放 public/ 下，写 /xxx.png 这种绝对路径） */
    logo: z.string().optional(),
    /** 技术栈标签 */
    tech: z.array(z.string()).optional(),
    /** 卡片底部链接行；label 必填，href 必填 */
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .optional(),
  }),
})

/**
 * 视频：不自托管，只存外部平台链接 + 元信息。
 * 新增一条：在 src/content/videos/ 下加一个 .md 即可。
 */
const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    /** 平台，决定卡片右上角的角标 */
    platform: z.enum(['bilibili', 'youtube', 'douyin', 'other']).default('bilibili'),
    /** 外部链接 */
    url: z.string(),
    summary: z.string().optional(),
  }),
})

export const collections = { articles, projects, videos }
