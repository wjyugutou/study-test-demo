// app/plugins/meta.types.d.ts
import { NuxtPageMeta } from '#app'

declare module '#app' {
  interface PageMeta extends CustomPageMeta {}
}

// 定义你想要添加到 PageMeta 中的新属性
interface CustomPageMeta {
  starBg?: boolean
  partBg?: boolean
}

// 如果你也想在组合式 API 中使用的返回值上获得类型提示，
// 你可能还需要增强 NuxtApp 本身，但这通常是可选的，
// 因为 PageMeta 是专门为 definePageMeta 设计的。
// 如果需要，可以参考 Nuxt 文档关于类型扩展的部分。
