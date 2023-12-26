<script lang='ts' setup>
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import Basic from '@/components/ssrComponents/Basic.vue'

defineOptions({
  description: 'vue: createSSRApp,renderToString 方法',
})

const divRef = ref<HTMLDivElement>()
const app = createSSRApp(Basic)

async function init() {
  const result = await renderToString(app)
  console.log(result)
  divRef.value!.innerHTML = result
}

onMounted(() => {
  init()
})
</script>

<template>
  aaa
  <div ref="divRef" />
  <Basic />
</template>
