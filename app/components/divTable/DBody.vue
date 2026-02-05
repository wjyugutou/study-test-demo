<script lang='ts' setup>
import type { _Column, Column, DataItem } from './type'

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  dataRows: DataItem[]
}>()

function getTdClass(rowIndex: number) {
  return {
    'hide-b-border': rowIndex === props.dataRows.length - 1,
  }
}
</script>

<template>
  <!-- 行 -->
  <template v-for="dataRow, i in props.dataRows" :key="dataRow.rowData.id || i">
    <!-- 列 -->
    <div
      v-for="col, colI in dataRow.columns" :key="`${col.prop}-${colI}-${i}`"
      class="d-body-cell" :class="getTdClass(i)"
      :style="{ gridArea: col.areaId }"
    >
      {{ col.prop ? dataRow.rowData[col.prop] : '-' }}
    </div>
  </template>
</template>

<style scoped>
.d-body-cell {
  --at-apply: flex items-center justify-center py-2 border-b-(1px red solid);
}

.hide-b-border {
  --at-apply: border-b-0;
}
</style>
