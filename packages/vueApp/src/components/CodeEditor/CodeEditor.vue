<script lang='ts' setup>
import type { BundledLanguage, BundledTheme } from 'shiki'

import { bundledLanguagesInfo, bundledThemesInfo } from 'shiki'

const props = withDefaults(defineProps<{
  isEdit?: boolean
  collapse?: boolean
}>(), { lang: 'typescript', collapse: true, isEdit: false, theme: 'vitesse-dark' })
const code = defineModel<string>({ required: true })
const lang = defineModel<BundledLanguage>('lang', { required: true, default: 'vue' })
const theme = defineModel<BundledTheme>('theme', { required: true, default: 'vitesse-dark' })

const langs = ref<BundledLanguage[]>([lang.value!])

const themes = ref<BundledTheme[]>([theme.value!])

const [collapse, setCollapse] = useToggle(props.collapse)

function copyCode() {
  navigator.clipboard.writeText(code.value)
}

function handleLangChange(e: Event) {
  const value: BundledLanguage = (e.target as HTMLInputElement).value as BundledLanguage
  langs.value.push(value)
}

function handleThemeChange(e: Event) {
  const value: BundledTheme = (e.target as HTMLInputElement).value as BundledTheme
  themes.value.push(value)
}
</script>

<template>
  <Suspense>
    <div class="code-editor" :class="theme">
      <div
        class="editor-toolbar" :class="collapse ? 'important-border-b-none' : ''"
      >
        <ArrowIcon class="tool-arrow" :rotate="collapse" @click="setCollapse()" />
        <!-- <p>{{ title }}</p> -->
        <div class="tool-select">
          <select v-model="lang" @change="handleLangChange">
            <option v-for="lang in bundledLanguagesInfo" :key="lang.id" :value="lang.name.toLocaleLowerCase()">
              {{ lang.name }}
            </option>
          </select>
          <select v-model="theme" @change="handleThemeChange">
            <option v-for="theme in bundledThemesInfo" :key="theme.id" :value="theme.displayName">
              {{ theme.displayName }}
            </option>
          </select>
        </div>
        <div @click="copyCode">
          复制代码
        </div>
      </div>

      <CodeEditorContent v-if="!collapse" v-model="code" :langs="langs" :lang="lang" :themes="themes" :theme="theme" :is-edit="isEdit" />
    </div>
  </Suspense>
</template>

<style>
.code-editor {
  overflow: hidden;
  border-radius: 10px;

  @apply  border b-gray-400;

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 10px;

    @apply b-solid border-b b-gray-400;

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
