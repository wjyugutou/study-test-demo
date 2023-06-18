<script lang='ts' setup>
const { index } = defineProps<{
  index: number
}>()
const emits = defineEmits<{
  (e: 'sizeChange', node: HTMLElement, index: number): any
}>()

const div = ref<HTMLElement>()

onMounted(() => {
  emits('sizeChange', div.value!, index)
})
</script>

<template>
  <div ref="div" h-fit :index="index">
    <slot />
  </div>
</template>

<style scoped>

</style>
