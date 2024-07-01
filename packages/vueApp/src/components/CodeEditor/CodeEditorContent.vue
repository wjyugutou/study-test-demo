<script lang='ts' setup>
import type { BundledLanguage, BundledTheme, DynamicImportLanguageRegistration, DynamicImportThemeRegistration } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const props = defineProps<{
  lang: string
  theme: string
  isEdit: boolean
  themes: BundledTheme[]
  langs: BundledLanguage[]
}>()

const code = defineModel<string>({ required: true })

const textarea = ref<HTMLTextAreaElement>()
const html = ref('')

const highlighter = await createHighlighter({
  langs: [],
  themes: [],
})

watch(props.langs, (value) => {
  value.forEach((lang) => {
    const loadedLangs = highlighter.getLoadedLanguages()
    if (!loadedLangs.includes(lang)) {
      loadLang(bundledLanguages[lang])
    }
  })
}, { immediate: true })

watch(props.themes, (value) => {
  value.forEach((theme) => {
    const loadedThemes = highlighter.getLoadedLanguages()
    if (!loadedThemes.includes(theme)) {
      loadTheme(bundledThemes[theme])
    }
  })
}, { immediate: true })

watch(code, () => {
  render()
})

async function loadLang(loadFn: DynamicImportLanguageRegistration) {
  try {
    const langInfo = (await loadFn()).default
    await highlighter.loadLanguage(langInfo)
    render()
  }
  catch (error) {

  }
}

async function loadTheme(loadFn: DynamicImportThemeRegistration) {
  try {
    const langInfo = (await loadFn()).default
    await highlighter.loadTheme(langInfo)
    render()
  }
  catch (error) {

  }
}

function render() {
  html.value = highlighter.codeToHtml(code.value, {
    lang: props.lang,
    theme: props.theme,
  })

  console.log(html)
}
</script>

<template>
  <div class="editor-content">
    <div>
      <div v-html="html" />
      <textarea
        ref="textarea"
        v-model="code"
        :disabled="!isEdit"
        autocomplete="off"
        class="code-textarea"
      />
    </div>
  </div>
</template>

<style>
.editor-content {
    position: relative;

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
</style>
