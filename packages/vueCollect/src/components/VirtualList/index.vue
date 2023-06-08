<script lang='ts' setup>
import type { ComputedRef } from 'vue'
import type { VirtualListProps } from '.'

const props = withDefaults(defineProps<VirtualListProps>(), {
  height: 200,
  viewCount: 5,
})

defineOptions({ name: 'VirtualList', label: '虚拟列表' })

const virtualList = ref<HTMLDivElement>()
const virtualContent = ref<HTMLDivElement>()

const startIndex = ref(0)

const itemMap = shallowReactive({
  itemHeight: {} as Record<any, number>,
})

const virtualContentHeight = ref(props.dataSource.length * (props.itemSize ?? 50))

const containerPaddingTop = ref('0px')

const viewList: ComputedRef<(typeof props.dataSource)[number][]> = computed(() => {
  const bufferTopIndex = Math.max(startIndex.value - 2, 0)
  const endIndex = Math.min(props.dataSource.length - 1, startIndex.value + props.viewCount + 2)

  return props.dataSource.slice(bufferTopIndex, endIndex + 1).map((item, index) => ({
    record: item,
    index: index + bufferTopIndex,
  }))
})

function childHeightChange(node: HTMLElement, index: number) {
  virtualContentHeight.value += (node.clientHeight - 50)

  itemMap.itemHeight[index] = node.clientHeight
}

function getStartIndex(scrollTop: number): number {
  if (props.itemSize)
    return Math.floor(scrollTop / props.itemSize)
  let num = 0
  let i = 0
  for (let index = 0; index < props.dataSource.length; index++) {
    num += itemMap.itemHeight[index]

    i++
    if (num >= scrollTop)
      break
  }
  console.log(i)

  return i
}

function getPaddingTop(index: number): string {
  if (props.itemSize)
    return `${index * props.itemSize}px`
  let paddingTop = 0

  for (let i = 0; i < index; i++) {
    paddingTop += itemMap.itemHeight[i]
    if (index >= i)
      break
  }
  return `${paddingTop}px`
}

function scrollHandle(e: Event) {
  const el = e.target as HTMLElement
  console.log(el.scrollTop)

  startIndex.value = getStartIndex(el.scrollTop)

  const bufferTopIndex = Math.max(startIndex.value - 2, 0)

  // containerPaddingTop.value = getPaddingTop(bufferTopIndex)
}
</script>

<template>
  <div ref="virtualList" class="virtualList" @scroll="scrollHandle">
    <div ref="virtualContent" :style="{ height: `${virtualContentHeight}px`, paddingTop: containerPaddingTop }">
      <VirtualListItem v-for="(item) of viewList" :key="item.index" :index="item.index" @sizeChange="childHeightChange">
        <slot :record="item.record" :index="item.index" />
      </VirtualListItem>
    </div>
  </div>
</template>

<style>
.virtualList {
  position: relative;
  height: 250px;
  overflow-y: auto;
}
</style>
