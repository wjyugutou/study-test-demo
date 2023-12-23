<script setup lang="ts">
const props = defineProps({
  // 颜色
  color: {
    type: String,
    default: '',
  },
  // class
  className: {
    type: String,
    default: '',
  },
  // svg名称
  name: {
    type: String,
    required: true,
  },
})

const iconName = computed(() => {
  if (props.name)
    return `#icon-${props.name}`
  return ''
})
const svgClass = computed(() => {
  if (props.className)
    return `svg-icon ${props.className}`
  return 'svg-icon'
})
</script>

<template>
  <svg :class="svgClass" v-bind="$attrs" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: bottom;
}
</style>
