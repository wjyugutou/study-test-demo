<script lang='ts' setup>
import type { BundledLanguage, BundledLanguageInfo, BundledTheme, BundledThemeInfo } from 'shiki'
import { codeToHtml, codeToTokens, getHighlighter } from 'shiki'

const props = withDefaults(defineProps<{
  lang?: BundledLanguage
  theme?: BundledTheme
  code?: string
  editor?: boolean
  collapse?: boolean
}>(), { lang: 'typescript', collapse: true, code: '', editor: false, theme: 'vitesse-dark' })

const code = defineModel('code', { type: String, default: '' })

const textarea = ref<HTMLTextAreaElement>()
const codeParent = ref<HTMLSpanElement>()
const html = ref('')
const theme = ref(props.theme)
const lang = ref(props.lang)
const themes = shallowRef<BundledThemeInfo[]>()
const langs = shallowRef<BundledLanguageInfo[]>()
const backgroundColor = ref('')
const [collapse, setCollapse] = useToggle(props.collapse)

const toolbarStyle = computed(() => ({
  backgroundColor: backgroundColor.value,
}))

watch([lang, theme, code], () => {
  codeToHtml(code.value, {
    lang: props.lang,
    theme: props.theme,
  }).then((res) => { html.value = res })

  codeToTokens('<div class="foo">bar</div>', {
    theme: props.theme,
  }).then((res) => {
    backgroundColor.value = res.bg!
  })
}, { immediate: true })

function copyCode() {
  navigator.clipboard.writeText(code.value)
}

onMounted(async () => {
  langs.value = (await import('shiki/bundle/full')).bundledLanguagesInfo
  themes.value = (await import('shiki/themes')).bundledThemesInfo
})
</script>

<template>
  <div class="code-editor" :class="props.theme">
    <div
      class="editor-toolbar" :class="collapse ? 'important-border-b-none' : ''" :style="toolbarStyle"
    >
      <ArrowIcon class="tool-arrow" :rotate="collapse" @click="setCollapse()" />
      <!-- <p>{{ title }}</p> -->
      <div class="tool-select">
        <select v-model="lang">
          <option v-for="lang in langs" :key="lang.id" :value="lang.id">
            {{ lang.name }}
          </option>
        </select>
        <select v-model="theme">
          <option v-for="theme in themes" :key="theme.id" :value="theme.id">
            {{ theme.displayName }}
          </option>
        </select>
      </div>
      <div @click="copyCode">
        复制代码
      </div>
    </div>
    <div class="editor-content" :style="{ maxHeight: collapse ? 0 : `${codeParent?.parentElement?.clientHeight}px` }">
      <div>
        <span ref="codeParent" v-html="html" />
        <textarea
          ref="textarea"
          v-model="code"
          :disabled="editor"
          autocomplete="off"
          class="code-textarea"
        />
      </div>
    </div>
  </div>
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

    .tool-arrow {
      position: absolute;
      font-size: 24px;
      transition-duration: 0.3s
    }

    .tool-select {
      margin-left: 50px;
    }
  }

  .editor-content {
    position: relative;
    height: fit-content;
    transition: 0.3s;

    & .shiki {
      padding: 14px 16px;
    }

    & textarea {
      position: absolute;
      padding: 14px 16px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      color: transparent;
      background: transparent;
      outline: none;
      resize: none;
      inset: 0;
      caret-color: #fff;
    }
  }
}
</style>
