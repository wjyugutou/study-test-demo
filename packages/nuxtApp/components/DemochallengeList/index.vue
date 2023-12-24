<script lang='ts' setup>
import type { CSSProperties } from 'vue'

defineOptions({ name: 'DemochallengeList' })
const props = defineProps<{
  list: {
    path: string
    name: string | undefined
  }[]
}>()

const activeIndex = ref(7)
const scrollRef = ref<HTMLDivElement>()
const searchName = ref()

async function pageJump(url: string) {
  await navigateTo(url)
}

const boxStyle = computed<CSSProperties>(() => {
  const displacement = (40 + 130) * (activeIndex.value - 4)
  return {
    transform: `translate3d(${-displacement}px, 0, 0)`,
  }
})

function wheel(e: WheelEvent) {
  e.preventDefault()

  const flag = e.deltaY < 0
  if (flag)
    activeIndex.value = activeIndex.value - 1 < 0 ? props.list.length - 1 : activeIndex.value - 1
  else
    activeIndex.value = activeIndex.value + 1 > props.list.length - 1 ? 0 : activeIndex.value + 1
}

watch(searchName, (newValue, oldValue) => {
  const index = props.list.map(item => item.name?.toLocaleLowerCase()).findIndex(item => item?.includes(`${newValue}`.toLocaleLowerCase()))

  if (index !== -1)
    activeIndex.value = index
}, { deep: true })
</script>

<template>
  <div
    ref="scrollRef"

    relative w-full overflow-hidden border py-200px
    class="box"
    @wheel="wheel"
  >
    <div absolute left-0 top-0 pt-15px>
      <InputAnimate v-model="searchName" placeholder="search" />
    </div>
    <div flex transition="~ 500" :style="boxStyle">
      <template v-for="item, i in list" :key="item.path">
        <div
          class="item" :class="i === activeIndex && 'active'"
          transition="~ 500" flex shrink-0 select-none items-center justify-center bg-hex-993366
          :style="{
            transform: `perspective(${1000}px) rotateY(${i === activeIndex ? 0 : i < activeIndex ? 45 : -45}deg)`,
          }"
          @click="pageJump(item.path)"
        >
          {{ item.name }}
          <div class="left" transition="~ 500" />
          <div class="right" transition="~ 500" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.box {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.item {
  position: relative;
  margin: 0 20px;
  width: 130px;
  height: 210px;
  word-break: break-all;
  cursor: pointer;
  transform-style: preserve-3d;
}

.left,
.right {
  position: absolute;
  top: 0;
  width: 30px;
  height: 210px;
  background-color: #639;
  backface-visibility: hidden;
}

.left {
  left: -30px;
  transform:  rotateY(-90deg);
  transform-origin: right;
}

.right {
  right: -30px;
  transform:  rotateY(90deg);
  transform-origin: left;
}

.active,
.item:hover {
  box-shadow: 0 0 10px #e5e7eb;

  & .left,
  & .right {
    box-shadow: 0 0 10px #e5e7eb;
  }
}
</style>
