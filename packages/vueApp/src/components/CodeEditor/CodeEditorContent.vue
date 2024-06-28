<script lang='ts' setup>
import type { BundledLanguage, BundledLanguageInfo, BundledTheme, BundledThemeInfo, LanguageRegistration, StringLiteralUnion } from 'shiki'
import { codeToHtml, codeToTokens, createHighlighter } from 'shiki'

const props = defineProps<{
  lang: string
  theme: string
  isEdit: boolean
  collapse: boolean
  themes: StringLiteralUnion<BundledLanguage, string>[]
  langs: LanguageRegistration[]
}>()

const code = defineModel<string>({ required: true })

const textarea = ref<HTMLTextAreaElement>()
const codeParent = ref<HTMLSpanElement>()
const html = ref('')
const backgroundColor = ref('')

const langs = computed(() => props.langs.map(item => item.name))

const highlighter = await createHighlighter({
  langs: langs.value,
  themes: props.themes,
})

highlighter.codeToHtml(code.value, {
  lang: props.lang,
  theme: props.theme,
})
</script>

<template>
  <div class="editor-content" :style="{ maxHeight: collapse ? 0 : `${codeParent?.parentElement?.clientHeight}px` }">
    <div>
      <span ref="codeParent" v-html="html" />
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
</style>
