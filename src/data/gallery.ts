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

// 相册分类 + 配文（按文件名维护）。未列出的图自动归「未分类」。
// 配文（note）= pai 在「图库配文.docx」里给每图写的话；灯箱里以打字机样式逐渐出现。
// 想加新图：把照片丢进 src/assets/heroes/，在此补一行 { album, note } 即可。
const META: Record<string, { album?: string; caption?: string; note?: string }> = {
  // 城市
  '一家人.jpg': { album: '城市', note: '江边坐着的一家人，比起欣赏黄浦江，似乎更关注身边的人。' },
  '三潭印象.jpg': { album: '城市', note: '雨后的江边，多层水潭分别映照着高楼的灯光。' },
  '城市之光.jpg': { album: '城市', note: '阳光试图从摩天大楼的织网中逃脱。' },
  '城市灌溉者.jpg': { album: '城市', note: '红花绿叶小草，城市中的勃勃生机，无声地赞美着他们的灌溉者。' },
  '城底之蛙.jpg': { album: '城市', note: '摩天高楼像是井壁，把人牢牢的锁在一小片天空之下。' },
  '炫彩.jpg': { album: '城市', note: '你知道吗，透着棱镜看灯牌，会出现彩虹晕哦。' },
  '爬山虎.jpg': { album: '城市', note: '爬山虎从阴处生长，生长到阳光下，逐渐铺满整面墙壁，给城市外墙挂上了一幅立体油画。' },
  '穿梭时空.jpg': { album: '城市', note: '镜子里，车流仿佛来自于另一个时空。' },
  '雨后喜悦.jpg': { album: '城市', note: '雨过天晴后，小女孩兴奋的转着雨伞，哦，雨伞除了用来遮雨外还能当作陀螺。' },
  '鲜活.jpg': { album: '城市', note: '大爷开心的炫耀着他的小狗，小狗好像不想营业。' },
  // 自然
  '云路.jpg': { album: '自然', note: '龙从天空穿过，留下长长的轨迹。' },
  '秋天痕迹.jpg': { album: '自然', note: '在上海徘徊许久，始终找不到秋天到来的证据，抬头看到斑斑凋零的落叶，才发现秋天快要离去，如果每天观察这棵树，应该能看到秋天的痕迹吧。' },
  '青绿.jpg': { album: '自然', note: '微距拍摄一盆花，仿佛进入了丛林。' },
  // 生活
  '小憩.jpg': { album: '生活', note: '猫咪打了个哈欠，似乎想要睡去。' },
  '深渊.jpg': { album: '生活', note: '缤纷的灯光勾勒出深渊的喧嚣。' },
  '牛舌.jpg': { album: '生活', note: '刚出炉的牛舌必须趁热吃！' },
  // 回忆
  '佛心.jpg': { album: '回忆', note: '处在灵山干净空旷的大殿前，心灵仿佛也受到了洗涤。' },
  '新开始.jpg': { album: '回忆', note: '站在阳台上眺望着陆家嘴，我曾经以为这里会是全新的开始。' },
  '黑白世界的色彩.jpg': { album: '回忆', note: '彩色的头发戴上后，世界对照下变成了黑白色。' },
}

// 相册在筛选栏里的固定顺序
const ALBUM_ORDER = ['城市', '自然', '生活', '回忆', '未分类']

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
