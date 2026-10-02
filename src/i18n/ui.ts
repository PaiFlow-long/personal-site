/**
 * 界面文案字典（中 / 英 / 繁）
 *
 * 范围约定：只覆盖「界面文案」——导航、按钮、页脚、栏目导语。
 * 文章正文与关于页正文保持中文，后续若要全站多语，再在这套结构上加语言前缀路由即可。
 * 繁体不用简繁自动转换，而是逐条手写，因为用词本身有差异
 * （视频/影片、项目/專案、联系/聯絡），自动转换只换字形不换词。
 */

export const LANGUAGES = [
  { code: 'zh-CN', label: '中', htmlLang: 'zh-CN' },
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'zh-TW', label: '繁', htmlLang: 'zh-Hant' },
] as const

export type Lang = (typeof LANGUAGES)[number]['code']

export const DEFAULT_LANG: Lang = 'zh-CN'

type Dict = Record<string, string>

const zhCN: Dict = {
  'nav.home': '主页',
  'nav.articles': '文章',
  'nav.videos': '视频',
  'nav.projects': '项目',
  'nav.about': '关于',
  'nav.contact': '联系',


  'ui.menu': '菜单',
  'ui.theme.toggle': '切换白天 / 夜间',
  'ui.lang': '语言',
  'ui.all': '全部',
  'ui.watch': '观看',

  'ui.articles.lead': '随笔、研究与思考。',
  'ui.projects.lead': '正在推进与已完成的项目，带状态与时间线。',
  'ui.videos.lead': '视频以外部平台嵌入的形式呈现，不在本站托管。',
  'ui.videos.empty': '还没有视频，之后会陆续放上来。',

  'ui.status.active': '进行中',
  'ui.status.paused': '暂停',
  'ui.status.done': '已完成',
  'ui.status.planned': '计划中',

  'ui.contact.lead': '有合作、咨询或想说的话，填下面的表单。表单尚未接入后端，接入后会真正收到。',
  'ui.contact.name': '称呼',
  'ui.contact.email': '邮箱',
  'ui.contact.message': '留言',
  'ui.contact.submit': '提交留言',
  'ui.contact.note': '说明：正式版将通过 Cloudflare Worker 写入 D1，并邮件通知。',
}

const zhTW: Dict = {
  'nav.home': '首頁',
  'nav.articles': '文章',
  'nav.videos': '影片',
  'nav.projects': '專案',
  'nav.about': '關於',
  'nav.contact': '聯絡',


  'ui.menu': '選單',
  'ui.theme.toggle': '切換白天 / 夜間',
  'ui.lang': '語言',
  'ui.all': '全部',
  'ui.watch': '觀看',

  'ui.articles.lead': '隨筆、研究與思考。',
  'ui.projects.lead': '正在推進與已完成的專案，附狀態與時間軸。',
  'ui.videos.lead': '影片以外部平台嵌入的形式呈現，不在本站託管。',
  'ui.videos.empty': '還沒有影片，之後會陸續放上來。',

  'ui.status.active': '進行中',
  'ui.status.paused': '暫停',
  'ui.status.done': '已完成',
  'ui.status.planned': '計劃中',

  'ui.contact.lead': '有合作、諮詢或想說的話，填下面的表單。表單尚未接入後端，接入後會真正收到。',
  'ui.contact.name': '稱呼',
  'ui.contact.email': '電子郵件',
  'ui.contact.message': '留言',
  'ui.contact.submit': '送出留言',
  'ui.contact.note': '說明：正式版將透過 Cloudflare Worker 寫入 D1，並以郵件通知。',
}

const en: Dict = {
  'nav.home': 'Home',
  'nav.articles': 'Articles',
  'nav.videos': 'Videos',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.contact': 'Contact',


  'ui.menu': 'Menu',
  'ui.theme.toggle': 'Toggle light / dark',
  'ui.lang': 'Language',
  'ui.all': 'All',
  'ui.watch': 'Watch',

  'ui.articles.lead': 'Notes, research and reflections.',
  'ui.projects.lead': 'Ongoing and finished projects, with status and timeline.',
  'ui.videos.lead': 'Videos are embedded from external platforms, not hosted here.',
  'ui.videos.empty': 'No videos yet — more coming soon.',

  'ui.status.active': 'Active',
  'ui.status.paused': 'Paused',
  'ui.status.done': 'Done',
  'ui.status.planned': 'Planned',

  'ui.contact.lead': 'For collaboration, consulting or just to say hi, use the form below. It is not wired to a backend yet.',
  'ui.contact.name': 'Name',
  'ui.contact.email': 'Email',
  'ui.contact.message': 'Message',
  'ui.contact.submit': 'Send',
  'ui.contact.note': 'Note: the production version will write to Cloudflare D1 and notify by email.',
}

export const UI: Record<Lang, Dict> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en,
}

export function t(lang: Lang, key: string): string {
  return UI[lang]?.[key] ?? UI[DEFAULT_LANG][key] ?? key
}

export function htmlLang(lang: Lang): string {
  return LANGUAGES.find((l) => l.code === lang)?.htmlLang ?? 'zh-CN'
}
