<script lang='ts' setup>
import type { BundledLanguage, BundledLanguageInfo, BundledTheme, BundledThemeInfo } from 'shiki'

import { bundledLanguages, bundledLanguagesInfo } from 'shiki/langs'

import { bundledThemesInfo } from 'shiki/themes'

const props = withDefaults(defineProps<{
  isEdit?: boolean
  collapse?: boolean
}>(), { lang: 'typescript', collapse: true, isEdit: false, theme: 'vitesse-dark' })
const code = defineModel<string>({ required: true })
const theme = defineModel<string>('theme', { default: '' })
const lang = defineModel<string>('lang', { default: '' })

const langs = ref([])

const themes = shallowRef<BundledThemeInfo[]>()

const [collapse, setCollapse] = useToggle(props.collapse)

// javascript typescript text xml

function copyCode() {
  navigator.clipboard.writeText(code.value)
}

function handleLangChange(e: Event) {
  const value: BundledLanguage = (<HTMLInputElement>e.target).value as BundledLanguage
  bundledLanguages[value]().then(res => {
    console.log(res.default); 
    langs.value.concat(res.default)
  })
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
          <!-- <select v-model="theme">
            <option v-for="theme in themes" :key="theme" :value="theme">
              {{ theme }}
            </option>
          </select> -->
        </div>
        <div @click="copyCode">
          复制代码
        </div>
      </div>

      <!-- <CodeEditorContent v-model="code" :langs="langs" :lang="lang" :theme="theme" /> -->
    </div>
  </Suspense>
</template>

<style>
.code-editor {
  overflow: hidden;
  border-radius: 10px;

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 10px;
    background-color: red;

    .tool-arrow {
      position: absolute;
      font-size: 24px;
      transition-duration: 0.3s
    }

    .tool-select {
      margin-left: 50px;
    }
  }

}
</style>
