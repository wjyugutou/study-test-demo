<script lang='ts' setup>
import type { TreeData } from './type'

defineOptions({ name: 'Treelist' })
const props = defineProps<{
  list: TreeData[]
}>()

const emits = defineEmits<{
  click: [item: object]
}>()
</script>

<template>
  <div class="treelist">
    <template v-for="item, index in list" :key="index">
      <TreeListItem :data="item" />
    </template>
  </div>
</template>
