<script lang='ts' setup generic="T extends {
  path: string;
  name: string;
  description?: string;
}"
>
import type { CSSProperties } from 'vue'

const props = defineProps<{
  list: T[]
}>()

const activeIndex = ref(7)
const scrollRef = ref<HTMLDivElement>()
const searchName = ref('')

const searchResult = computed(() => {
  return props.list.filter((item) => {
    return item.name?.toLocaleLowerCase()?.includes(`${searchName.value}`.toLocaleLowerCase())
  })
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
    class="box relative w-full overflow-hidden border p-y-35"
    @wheel="wheel"
  >
    <div class="absolute left-0 top-0 pt-15px">
      <InputAnimate v-model="searchName" placeholder="search" />
      <span v-if="searchResult.length === 0" class="text-white">No Result</span>
    </div>
    <div class="w-fit flex transition-(500)">
      <template v-for="item, i in searchResult" :key="item.path">
        <RouterLink
          class="item" :class="i === activeIndex && 'active'"
          :title="item.name"
          :style="{
            transform: `perspective(1000px) rotateY(${i === activeIndex ? 0 : i < activeIndex ? 45 : -45}deg)`,
          }"
          :to="`/demoChallenge/${item.path}`"
        >
          <div class="h-full w-full overflow-hidden">
            <h1 class="text-center font-bold">
              {{ item.name }}
            </h1>
            <p class="mt-15px px-4px text-14px">
              {{ item.description }}
            </p>
          </div>
          <div class="left transition transition-(500)" />
          <div class="right transition transition-(500)" />
        </RouterLink>
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
  padding-top: 10px;
  width: 130px;
  height: 210px;
  word-break: break-all;
  color: #fff;
  background-color: #56585D;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  cursor: pointer;
  user-select: none;
  transform-style: preserve-3d;
  flex-shrink:0;
}

.left,
.right {
  position: absolute;
  top: 0;
  width: 30px;
  height: 210px;
  background-color: #64a68d;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  transition-property: box-shadow;
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
