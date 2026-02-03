<script lang='ts' setup>
import type { _Column, Column } from './type'
import DHeader from './DHeader.vue'
import { useTable } from './useTable'

defineOptions({
  name: 'DTable',
})

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
}>()

const { headerRows, dataRows } = useTable(props.columns, props.data)

const gridHeaderArea = computed(() => {
  const area: string[][] = []

  headerRows.value.forEach((columns) => {
    const areaLine: string[] = []

    columns.forEach((column) => {
      for (let i = 0; i < column.colspan; i++) {
        areaLine.push(column.areaId)
      }
    })

    area.push(areaLine)
  })

  return arrayToGridTemplateAreas(area)
})

// 把数组转换成 grid-template-areas 的函数
function arrayToGridTemplateAreas(grid: string[][]) {
  // 处理名称：把空格换成下划线（CSS 区域名不能有空格）
  function sanitize(name: string) {
    return name.replace(/\s+/g, '_')
  }

  // 每行变成 "area1 area2 ..." 格式
  const lines = grid.map((row) => {
    const sanitizedRow = row.map(sanitize)
    return `"${sanitizedRow.join(' ')}"`
  })

  // 组合成完整的 CSS 属性
  return `${lines.join('\n  ')}`
}
</script>

<template>
  <div class="d-table" :style="{ gridTemplateAreas: gridHeaderArea }">
    <DHeader :rows="headerRows" />
    <DBody :columns="columns" :data="data" :data-rows="dataRows" />
  </div>
</template>

<style>
.d-table {
  --at-apply: bg-gray-200 border-(1 red solid);

  display: grid;
}
</style>
