<script lang='ts' setup>
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import SlotRender from '@/components/SlotRenderCom'

defineOptions({
  description: 'vue: createSSRApp,renderToString 方法',
})

const Basic = defineComponent({
  setup() {
    const text = ref('111')

    return () => h('div', {
      onClick: () => {
        console.log(2222222)
      },
    }, `${text.value}`)
  },
})

const divRef = ref<HTMLDivElement>()
const app = createSSRApp(Basic, { id: 1, test: 'adasd' })

async function init() {
  const result = await renderToString(app)
  divRef.value!.innerHTML = result
}

function srMounted() {
  console.log('srMounted')
}

onMounted(() => {
  init()
})
</script>

<template>
  <div ref="divRef" />
  <Basic />
  aaa
  <SlotRender @mounted="srMounted">
    <Basic />
  </SlotRender>
</template>
