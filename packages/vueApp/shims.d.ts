declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import type { defineOptions } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg?view'
declare module '*.svg?use' {
  export default any
}

interface ImportGlob {
  [key: string]: { default: Record<string, any> }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface IDBEventTarget {

}

interface EventTarget extends IDBEventTarget { result: IDBDatabase}
