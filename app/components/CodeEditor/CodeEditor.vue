<script lang='ts' setup>
import type { BundledLanguage, BundledTheme } from 'shiki'

import { bundledLanguagesInfo, bundledThemesInfo } from 'shiki'

const props = withDefaults(defineProps<{
  isEdit?: boolean
  collapse?: boolean
}>(), { lang: 'typescript', collapse: false, isEdit: false })
const code = defineModel<string>({ required: true })
const lang = defineModel<BundledLanguage>('lang', { default: 'vue' })
const theme = defineModel<BundledTheme>('theme', { default: 'vitesse-dark' })

const [collapse, setCollapse] = useToggle(props.collapse)

const langs = ref<BundledLanguage[]>([lang.value!])
function handleLangChange(e: Event) {
  const value: BundledLanguage = (e.target as HTMLInputElement).value as BundledLanguage
  langs.value.push(value)
}

const themes = ref<BundledTheme[]>([theme.value!])
function handleThemeChange(e: Event) {
  const value: BundledTheme = (e.target as HTMLInputElement).value as BundledTheme
  themes.value.push(value)
}

function copyCode() {
  navigator.clipboard.writeText(code.value)
}
</script>

<template>
  <div class="code-editor" :class="theme">
    <div class="editor-toolbar" :class="collapse ? 'important-border-b-none' : ''">
      <ArrowIcon class="tool-arrow" :rotate="collapse" @click="setCollapse()" />
      <!-- <p>{{ title }}</p> -->
      <div class="tool-select">
        <select v-model="lang" style="scrollbar-width: thin;" @change="handleLangChange">
          <option v-for="lang in bundledLanguagesInfo" :key="lang.id" :value="lang.id" style="scrollbar-width: thin;">
            {{ lang.name }}
          </option>
        </select>
        <select v-model="theme" @change="handleThemeChange">
          <option v-for="theme in bundledThemesInfo" :key="theme.id" :value="theme.id">
            {{ theme.displayName }}
          </option>
        </select>
      </div>
      <div @click="copyCode">
        复制代码
      </div>
    </div>

    <Suspense>
      <template #fallback>
        <Loading />
      </template>
      <CodeEditorContent v-model="code" :collapse="collapse" :langs="langs" :lang="lang!" :themes="themes" :theme="theme!" :is-edit="isEdit" />
    </Suspense>
  </div>
</template>

<style>
.code-editor {
  overflow: hidden;
  border-radius: 10px;

  --at-apply: border b-gray-400;

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 10px;

    --at-apply: b-solid border-b b-gray-400;

    .tool-arrow {
      position: absolute;
      font-size: 24px;
      transition-duration: 0.3s
    }

    .tool-select {
      margin-left: 50px;
      outline: none;
    }
  }

}
</style>
