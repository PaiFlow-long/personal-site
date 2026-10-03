import type { ImageMetadata } from 'astro'

/**
 * 图库数据源：自动发现 src/assets/heroes/ 下所有照片，
 * 用 META 维护每张图的相册 / 名字 / 用户文字（note）。
 * pai 加新图：把照片丢进 heroes/ 即可自动出现；分类在下方 META 里补一行。
 */

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/heroes/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true, import: 'default' }
)

export interface Photo {
  file: string
  src: ImageMetadata
  album: string
  caption: string
  note: string
}

// 相册分类（按文件名维护）。未列出的图自动归「未分类」。
const META: Record<string, { album?: string; caption?: string; note?: string }> = {
  '城市之光.jpg': { album: '城市' },
  '城市灌溉者.jpg': { album: '城市' },
  '城底之蛙.jpg': { album: '城市' },
  '深渊.jpg': { album: '城市' },
  '炫彩.jpg': { album: '城市' },
  '穿梭时空.jpg': { album: '城市' },
  '牛舌.jpg': { album: '城市' },
  '三潭印象.jpg': { album: '自然' },
  '云路.jpg': { album: '自然' },
  '佛心.jpg': { album: '自然' },
  '秋天痕迹.jpg': { album: '自然' },
  '爬山虎.jpg': { album: '自然' },
  '青绿.jpg': { album: '自然' },
  '雨后喜悦.jpg': { album: '自然' },
  '鲜活.jpg': { album: '自然' },
  '黑白世界的色彩.jpg': { album: '自然' },
  '一家人.jpg': { album: '生活' },
  '小憩.jpg': { album: '生活' },
  '新开始.jpg': { album: '生活' },
}

// 相册在筛选栏里的固定顺序
const ALBUM_ORDER = ['城市', '自然', '生活', '未分类']

export const photos: Photo[] = Object.entries(modules).map(([path, mod]) => {
  const file = path.split('/').pop() as string
  const m = META[file] || {}
  return {
    file,
    src: mod,
    album: m.album ?? '未分类',
    caption: m.caption ?? file.replace(/\.[^.]+$/, ''),
    note: m.note ?? '',
  }
})

export const albums: string[] = ALBUM_ORDER.filter((a) =>
  photos.some((p) => p.album === a)
)
