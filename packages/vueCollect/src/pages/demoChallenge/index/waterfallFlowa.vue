<script lang='ts' setup>
import { randomNum } from '@yugutou/utils'

const arr = [77, 50, 20, 15, 83, 85, 87]
const a = ref(new Array(20).fill(''))
</script>

<template>
  <div w-1000px>
    <WaterfallFlow>
      <div v-for="(v, i) in a" :key="i" class="listItem" :a.attr="`${i}, ${i % 2}` " :style="{ backgroundColor: i % 2 === 0 ? 'red' : 'green', height: `${arr[randomNum(0, 6)]}px` }">
        <div />
      </div>
    </WaterfallFlow>
  </div>
</template>

<style scoped>
.listItem {
  border-radius: 5px;
}
</style>
