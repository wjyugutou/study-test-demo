<script lang='ts' setup>
import { random } from 'lodash-es'

defineOptions({ description: '虚拟列表' })

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

    <CssVirtualList h-200px>
      <div v-for="(item) of data" :key="item.index">
        <p>5asdasdas <br> 5</p>
      </div>
    </CssVirtualList>
  </div>
</template>

<style>
.virtualList {
  overflow-y: auto;
  position: relative;
  height: 300px;
}
</style>
