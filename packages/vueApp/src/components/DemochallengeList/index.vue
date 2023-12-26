<script lang='ts' setup generic="T extends {
  path: string;
  name?: string;
  description?: string;
}"
>
import type { CSSProperties } from 'vue'

defineOptions({ name: 'DemochallengeList' })
const props = defineProps<{
  list: T[]
}>()
const { push } = useRouter()

const activeIndex = ref(7)
const scrollRef = ref<HTMLDivElement>()
const searchName = ref()

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

watch(searchName, (newValue, oldValue) => {
  const index = props.list.map(item => item.name?.toLocaleLowerCase()).findIndex(item => item?.includes(`${newValue}`.toLocaleLowerCase()))
  console.log(111)

  if (index !== -1)
    activeIndex.value = index
})
</script>

<template>
  <div
    ref="scrollRef" relative
    w-full overflow-hidden border py-200px
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
          transition="~ 500" shrink-0 select-none bg-red pt-10px
          :title="item.name"
          :style="{
            transform: `perspective(${1000}px) rotateY(${i === activeIndex ? 0 : i < activeIndex ? 45 : -45}deg)`,
          }"
          @click="pageJump(item.path)"
        >
          <div h-full w-full overflow-hidden>
            <h1 text-center font-bold>
              {{ item.name }}
            </h1>
            <p mt-15px px-4px text-14px>
              {{ item.description }}
            </p>
          </div>
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

.active,
.item:hover {
  box-shadow: 0 0 10px #e5e7eb;

  & .left,
  & .right {
    box-shadow: 0 0 10px #e5e7eb;
  }
}
</style>
