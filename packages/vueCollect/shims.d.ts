declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
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
