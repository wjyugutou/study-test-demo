<script lang='ts' setup>
defineOptions({ name: 'CssVirtualList' })

const props = withDefaults(defineProps<{
  itemHeight?: number
}>(), { itemHeight: 50 })
/**
 * contain-intrinsic-size、content-visibility
 */

const style = computed(() => ({
  containIntrinsicSize: `${props.itemHeight}px`,
}))
</script>

<template>
  <div class="css-virtual-list" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.css-virtual-list {
  overflow: auto;
  height: 200px;
  content-visibility: auto;
}
</style>
