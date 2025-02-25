<script lang='ts' setup>
import type { BundledLanguage, BundledTheme, DynamicImportLanguageRegistration, DynamicImportThemeRegistration } from 'shiki'
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const props = defineProps<{
  lang: BundledLanguage
  theme: BundledTheme
  isEdit: boolean
  themes: BundledTheme[]
  langs: BundledLanguage[]
  collapse?: boolean
}>()

const code = defineModel<string>({ required: true })

const textarea = ref<HTMLTextAreaElement>()
const html = ref('')

const highlighter = await createHighlighter({
  langs: [],
  themes: [],
})

await initial()

watch(() => props.lang, (value) => {
  const loadedLangs = highlighter.getLoadedLanguages()
  if (!loadedLangs.includes(value)) {
    loadLang(bundledLanguages[value]).then(render)
  }
  else {
    render()
  }
})

watch(() => props.theme, (value) => {
  const loadedThemes = highlighter.getLoadedLanguages()
  if (!loadedThemes.includes(value)) {
    loadTheme(bundledThemes[value]).then(render)
  }
  else {
    render()
  }
})

watch(code, () => {
  render()
})

async function loadLang(loadFn: DynamicImportLanguageRegistration) {
  try {
    const langInfo = (await loadFn()).default
    await highlighter.loadLanguage(langInfo)
  }
  catch (error) {
    console.error(error)
  }
}

async function loadTheme(loadFn: DynamicImportThemeRegistration) {
  try {
    const langInfo = (await loadFn()).default
    await highlighter.loadTheme(langInfo)
  }
  catch (error) {
    console.error(error)
  }
}

function render() {
  html.value = highlighter.codeToHtml(code.value, {
    lang: props.lang,
    theme: props.theme,
  })
}

async function initial() {
  await Promise.all([loadLang(bundledLanguages[props.lang]), loadTheme(bundledThemes[props.theme])])
  render()
}
</script>

<template>
  <div class="editor-content" :class="collapse ? '' : 'collapse'">
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
  transition: all .3s ease-in-out;
  height: calc-size(auto);
  /* 兼容性 */
  height: auto;
  /* 开启插值过渡 使auto也能有过渡效果 */
  interpolate-size: allow-keywords;

  &.collapse {
    height: 0;
  }

  & .shiki {
    padding: 14px 16px;
  }

  & .code-textarea {
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
