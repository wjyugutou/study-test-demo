import { NuxtPageMeta } from '#app'

declare module '#app' {
  interface PageMeta extends CustomPageMeta {}
}

// 定义你想要添加到 PageMeta 中的新属性
interface CustomPageMeta {
  starBg?: boolean
  partBg?: boolean
}
