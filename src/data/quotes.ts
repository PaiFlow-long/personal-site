/**
 * 每日一句 · 句子池
 *
 * 【怎么加句子】往同目录的 quotes.md 里一行一句地贴就行，这里不用改。
 * 文件格式说明写在 quotes.md 顶部注释里（编号、出处、分类都是可选且容错的）。
 *
 * 本文件只做一件事：把那堆纯文本解析成结构化数组。
 * 之所以不把句子硬编码在这里，是为了让「加一句」永远是一个纯文本操作 ——
 * 不用碰引号、逗号、分号这些一写错就构建失败的语法。
 *
 * 【选句原则】尽量放有确切出处的。中英文网络上流传的「鲁迅说」「乔布斯说」
 * 十有八九查无出处；首页每天都要露一次脸，说错比不说更伤信任。
 */
import raw from './quotes.md?raw'

export interface Quote {
  text: string
  /** 出处。渲染成「— 作者」的小字署名 */
  author?: string
  /** 分类标记（成长 / 投资 / 任意自定义）。目前全池混合抽取，留着以后按栏目过滤 */
  tag?: string
}

const RE_NUM = /^\d+\s*[、.．。)）:：]\s*/
const RE_TAG = /\s*#([^\s#]+)\s*$/
const RE_DASH = /\u2014{2,}|\u2013{2,}|-{2,}/

/** 拆出一行的「正文 —— 出处」 */
function splitAuthor(line: string): { text: string; author?: string } {
  const m = line.match(RE_DASH)
  let at = m && m.index !== undefined ? m.index : -1
  let len = m ? m[0].length : 0

  if (at < 0) {
    // 只有一个破折号时取最后一个 —— 出处通常在句末
    at = line.lastIndexOf('\u2014')
    len = 1
  }
  if (at <= 0) return { text: line }

  const rest = line.slice(at + len).trim()
  // 破折号后面太长就不当出处了，那多半是句子内部的破折号
  if (!rest || rest.length > 40) return { text: line }

  return { text: line.slice(0, at).trim(), author: rest }
}

export function parseQuotes(src: string): Quote[] {
  return src
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('//'))
    .map((line) => {
      let tag: string | undefined
      let s = line.replace(RE_TAG, (_m, g1) => {
        tag = g1
        return ''
      })
      s = s.replace(RE_NUM, '')
      const { text, author } = splitAuthor(s)
      if (!text) return null
      const q: Quote = { text }
      if (author) q.author = author
      if (tag) q.tag = tag
      return q
    })
    .filter((q): q is Quote => q !== null)
}

export const QUOTES: Quote[] = parseQuotes(raw)

/** 兜底：万一 quotes.md 被清空或改坏了，首页也不能是空白 */
export const FALLBACK: Quote = { text: '今天没有句子，明天再来。' }

/** 中文占比够低就当西文句 —— 楷体没有西文衬线字形，硬套会很难看 */
export function isLatin(q: Quote): boolean {
  const s = q.text
  if (!s) return false
  const cjk = (s.match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length
  return cjk / s.length < 0.25
}
