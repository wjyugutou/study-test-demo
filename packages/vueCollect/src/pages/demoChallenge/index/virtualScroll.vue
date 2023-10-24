<script lang='ts' setup>
import { random } from 'lodash-es'

defineOptions({ name: 'VirtualScroll' })

const data = Array.from({ length: 1000 }).map((item, index) => ({ content: `但是价格法大师傅--${index}`, index, src: '', height: random(20, 165) }))
</script>

<template>
  <div>
    <h1 text-center>
      动态高度
    </h1>
    <VirtualList :data-source="data" class="virtualList">
      <template #default="{ record, index } ">
        <div :style="{ height: `${record.height}px` }" :class="{ 'bg-pink-400': record.index % 2 === 0, 'bg-blue-400': record.index % 2 !== 0 }">
          {{ record }}--          {{ index }}
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<style>
.virtualList {
  position: relative;
  height: 300px;
  overflow-y: auto;
}
</style>
