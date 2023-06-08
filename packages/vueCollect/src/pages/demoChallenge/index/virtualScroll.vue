<script lang='ts' setup>
import { randomNum } from '@yugutou/utils'

defineOptions({ name: 'VirtualScroll', label: '虚拟列表' })

const height = ref(200)
const data = Array.from({ length: 1000 }).map((item, index) => ({ content: `但是价格法大师傅--${index}`, index, src: '', height: randomNum(20, 165) }))

function changeHeight() {
  height.value = height.value === 200 ? 300 : 200
}
</script>

<template>
  <div>
    <VirtualList :data-source="data" :height="height">
      <template #default="{ record, index } ">
        <div :style="{ height: `${record.height}px` }" :class="{ 'bg-pink-400': record.index % 2 === 0, 'bg-blue-400': record.index % 2 !== 0 }">
          {{ record }}--          {{ index }}
        </div>
      </template>
    </VirtualList>
    <button class="basicBtn" @click="changeHeight">
      +++
    </button>
  </div>
</template>

<style>
.virtualList {
  position: relative;
  height: 250px;
  overflow-y: auto;
}
</style>
