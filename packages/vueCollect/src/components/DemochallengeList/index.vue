<script lang='ts' setup>
import { throttle } from 'lodash-es'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'DemochallengeList' })
const props = defineProps<{
  list: {
    path: string
    name: string | undefined
  }[]
}>()
const { push } = useRouter()

const activeIndex = ref(7)
const scrollRef = ref<HTMLDivElement>()

function pageJump(url: string) {
  push(url)
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
</script>

<template>
  <div
    ref="scrollRef"
    border w-full py-200px overflow-hidden
    class="box"
    @wheel="wheel"
  >
    <div flex transition="~ 500" :style="boxStyle">
      <template v-for="item, i in list" :key="item.path">
        <div
          class="item" :class="i === activeIndex && 'active'"
          transition="~ 500" shrink-0 bg-red flex items-center justify-center select-none
          :style="{
            transform: `perspective(${1000}px) rotateY(${i === activeIndex ? 0 : i < activeIndex ? 45 : -45}deg)`,
          }"
          @click="pageJump(item.path)"
        >
          {{ item.name }}
          <div class="left" />
          <div class="right" />
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
  cursor: pointer;
  width: 130px;
  height: 210px;
  margin: 0 20px;
  word-break: break-all;
  transform-style: preserve-3d;
}

.item:hover,
.active {
    box-shadow: 0 0 10px #e5e7eb;

    & .left,
    & .right {
      box-shadow: 0 0 10px #e5e7eb;
    }
  }

.left,
.right {
  position: absolute;
  top: 0;
  width: 30px;
  height: 210px;
  background-color: aquamarine;
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
</style>
