<script lang='ts' setup>
import '/public/prism.min.js'

const props = withDefaults(defineProps<{
  lang?: typeof languagelist[number]
  code: string
  title?: string
  isCollapse?: boolean
}>(), { lang: 'typescript', isCollapse: true })

// 手动决定颜色显示时机 设为true
window.Prism.manual = true

// fix plugin inline-color 无效bug
// @ts-expect-error color
Prism.languages.css.color = /(#[a-zA-Z0-9]{3,6})|(rgba?)|([a-zA-Z]{3,6})|(\#000 0\%) | transparent/
// /(#[a-zA-Z0-9]{3,6})|(rgba?)|([a-zA-Z]{3,6})/

const languagelist = [
  'javascript', 'typescript', 'css', 'plaintext', 'html', 'markdown', 'jsx', 'tsx', 'xml', 'json',
] as const

const [collapse, setCollapse] = useToggle(!!props.isCollapse)
const preEle = ref()

watch(() => props.code, (value, old) => {
  preEle.value && window.Prism.highlightElement(preEle.value)
}, { immediate: true })

function copyCode() {
  navigator.clipboard.writeText(props.code)
}

onMounted(() => {
  window.Prism.highlightElement(preEle.value)
})
</script>

<template>
  <div :class="`language-${lang}`">
    <pre class="line-numbers match-braces" data-line :class="`language-${lang}`" :style="{ height: collapse ? '30px' : undefined }">
      <div class="toolbar" :class="collapse ? 'important-border-b-none' : ''">
        <ArrowIcon class="absolute left-0 important-text-24px" duration="0.3s" :rotate="collapse" @click="setCollapse()" />
        <p>{{ title }}</p>
        <span @click="copyCode">复制代码</span>
      </div>
      <code ref="preEle" v-text="code" />
    </pre>
  </div>
</template>

<style>
@import url('/public/prism-tomorrow-night.css');

pre[class*="language-"].line-numbers {
  padding-left: 0;

  & > code {
    display: inline-block;
  }
}

pre[class*="language-"] {
  overflow: hidden;
  position: relative;
  margin: 0;
  border-radius: 14px;
  padding-bottom: 0;

  & > .toolbar {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-bottom: 1px solid color-mix(in lch, #393939, #fff);
    padding-right: 15px;
    padding-left: 35px;
    min-width: 100px;
    height: 30px;
    min-height: 10px;
    transition: all 0.5s;
    justify-content: space-between;
    gap: 10px;
    align-items: center;

    & > span {
      border-radius: 10px;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        color: color-mix(in lch, #393939, #fff);
      }
    }
  }
}

pre[class*="language-"]:hover > .toolbar {
  opacity: 1;
}
</style>
