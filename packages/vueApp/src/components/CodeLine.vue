<script lang='ts' setup>
import { codeToHtml } from 'shiki'

const props = withDefaults(defineProps<{
  lang?: typeof languagelist[number]
  code: string
  title?: string
  isCollapse?: boolean
}>(), { lang: 'typescript', isCollapse: true, code: '' })

const languagelist = [
  'javascript',
  'typescript',
  'css',
  'plaintext',
  'html',
  'markdown',
  'jsx',
  'tsx',
  'xml',
  'json',
] as const

const [collapse, setCollapse] = useToggle(!props.isCollapse)

function copyCode() {
  navigator.clipboard.writeText(props.code)
}

const Html = defineComponent({
  async setup() {
    const refDiv = ref<HTMLDivElement>()

    const maxHeight = computed(() => collapse.value ? 0 : `${refDiv.value?.children?.[0].clientHeight}px`)
    watch(maxHeight, () => {
      console.log(refDiv)

      console.log({ maxHeight: maxHeight.value })
    })
    const str = await codeToHtml(props.code, {
      lang: props.lang,
      theme: 'ayu-dark',
    })

    return () => h('div', { innerHTML: str, ref: refDiv, class: `language-${props.lang} transition-all overflow-hidden`, style: { maxHeight: maxHeight.value } })
  },
})
</script>

<template>
  <div :class="`language-${lang}`" class="code-line">
    <div class="toolbar" :class="collapse ? 'important-border-b-none' : ''">
      <ArrowIcon class="absolute left-0 important-text-24px" duration="0.3s" :rotate="collapse" @click="setCollapse()" />
      <p>{{ title }}</p>
      <span @click="copyCode">复制代码</span>
    </div>
    <Suspense>
      <template #fallback>
        loading..
      </template>
      <template #default>
        <Html />
      </template>
    </Suspense>
  </div>
</template>

<style>
.code-line {
  position: relative;
  border-radius: 10px;

  & .toolbar {
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

  & .shiki {
    padding: 40px;
  }
}
</style>
