<script lang='ts' setup>
defineOptions({ name: 'WaterfallFlow' })

onMounted(() => {
  const ins = getCurrentInstance()
  Array.from(ins!.vnode.el!.children as HTMLAllappion).forEach((item) => {
    const row = Math.floor((item.clientHeight / 5) + 2);

    (item as HTMLElement).style.gridRowEnd = `span ${row}`
  })
})
</script>

<template>
  <div class="waterfall">
    <slot />
  </div>
</template>

<style scoped>
.waterfall {
  display: grid;
  grid-auto-rows: 5px;
  grid-template-columns: repeat(auto-fill, calc(50% - 5px));
  align-items: start;
  justify-content: space-between;
  padding: 0 10px 10px;
}
</style>
