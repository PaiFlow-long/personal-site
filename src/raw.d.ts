/** 让 TypeScript 认识 Vite 的 `?raw` 导入（把文件原文当字符串读进来）。
    句子池正是靠它从 quotes.md 读进来的，改文件即生效，无需改代码。 */
declare module '*.md?raw' {
  const content: string
  export default content
}
