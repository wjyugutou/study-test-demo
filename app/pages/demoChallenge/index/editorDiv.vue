<script setup lang="ts">
const data = ref({
  text: '萨达{1733748787102}{1733748788226}{1733748788984}{1733748789843}{1733748790958}萨达',
  variableIds: [1733748787102, 1733748788226, 1733748788984, 1733748789843, 1733748790958],
})
</script>

<template>
  <!-- // 如果需要赋值, 初始化之后在渲染组件 -->
  <EditorDiv v-if="data.text" v-model="data" />
</template>
