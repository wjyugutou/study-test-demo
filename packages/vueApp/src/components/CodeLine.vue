<script lang='ts' setup>
import Prism from 'prismjs'

// ts语言插件
import 'prismjs/components/prism-typescript'

// 行号插件
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css'

// 行高亮 https://prismjs.com/plugins/line-highlight/
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.js'
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.css'

// 行内颜色显示
import 'prismjs/plugins/inline-color/prism-inline-color.min.js'
import 'prismjs/plugins/inline-color/prism-inline-color.min.css'

// 渐变颜色 角度 预览
import 'prismjs/plugins/previewers/prism-previewers.min.js'
import 'prismjs/plugins/previewers/prism-previewers.min.css'

// {} [] 提示
import 'prismjs/plugins/match-braces/prism-match-braces.min.js'
import 'prismjs/plugins/match-braces/prism-match-braces.min.css'

defineOptions({ name: 'CodeLine' })

const props = withDefaults(defineProps<{
  lang?: typeof languagelist[number]
  code: string
}>(), { lang: 'typescript' })

// 手动决定颜色显示时机 设为true
Prism.manual = true
// fix plugin inline-color 无效bug
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Prism.languages.css.color = /(#[a-zA-Z]{3,6})|(rgba?)|([a-zA-Z]{3,6})/

const languagelist = [
  'javascript', 'typescript', 'css', 'plaintext', 'html',
] as const

const [collapse, setCollapse] = useToggle(false)
const preEle = ref()

watch(() => props.code, async (value) => {
  await nextTick()
  Prism.highlightAll()
}, { immediate: true })

function copyCode() {
  navigator.clipboard.writeText(props.code)
}

onMounted(() => {
  console.log(Prism)
})
</script>

<template>
  <div :class="`language-${lang}`">
    <pre ref="preEle" class="line-numbers match-braces" :class="`language-${lang}`" :style="{ height: collapse ? '30px' : undefined }">
      <div class="toolbar" :class="collapse ? 'important-border-b-none' : ''">
        <ArrowIcon class="important-text-24px" duration="0.3s" :rotate="collapse" @click="setCollapse()" />

        <span @click="copyCode">复制代码{{ collapse }}</span>
      </div>
      <code v-text="code" />
    </pre>
  </div>
</template>

<style>
@import url("prismjs/themes/prism-tomorrow.min.css");

pre[class*="language-"].line-numbers {
  padding-left: 0;

  & > code {
    display: inline-block;
  }
}

pre[class*="language-"] {
  --transition-time: 0.3s;
  --transition-timing-func: linear;

  overflow: hidden;
  border-radius: 14px;
  transition: all var(--transition-time) var(--transition-timing-func);

  & > .toolbar {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin-right: 5px;
    margin-left: 5px;
    border-bottom: 1px solid color-mix(in lch, #393939, #fff);
    min-width: 100px;
    height: 30px;
    min-height: 10px;
    transition: all 0.5s;
    justify-content: space-between;
    gap: 10px;

    & > span {
      border-radius: 10px;
      padding: 5px;
      padding-right: 10px;
      padding-left: 10px;
      font-size: 12px;
      transition: all var(--transition-time) var(--transition-timing-func);
      cursor: pointer;

      &[data-hide='true'] {
        transform: rotate3d(0,0,1, -90deg);
        transform-origin:  10px 15px;
      }
    }
  }
}

pre[class*="language-"]:hover > .toolbar {
  opacity: 1;
}
</style>
