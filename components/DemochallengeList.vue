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
    activeIndex.value = Math.max(0, activeIndex.value - 1)
  else
    activeIndex.value = Math.min(props.list.length - 1, activeIndex.value + 1)

  // 滚动到活动卡片
  const container = scrollRef.value
  const activeCard = container?.querySelector('.active')
  if (activeCard) {
    activeCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
}
</script>

<template>
  <div
    ref="scrollRef"
    class="box p-6 border border-white/10 rounded-xl w-full relative overflow-hidden from-gray-900/50 to-gray-800/50 bg-gradient-to-b"
    @wheel="wheel"
  >
    <div class="max-w-xs w-full left-4 top-4 absolute z-10">
      <InputAnimate v-model="searchName" placeholder="Search demos..." class="w-full" />
      <span v-if="searchResult.length === 0" class="text-sm text-white mt-2 inline-block">No Result</span>
    </div>
    <div class="pt-16 flex w-fit transition-all duration-500 ease-out">
      <template v-for="item, i in searchResult" :key="item.path">
        <RouterLink
          class="item"
          :class="i === activeIndex && 'active'"
          :title="item.name"
          :style="{
            transform: `perspective(1200px) rotateY(${i === activeIndex ? 0 : i < activeIndex ? 60 : -60}deg) translateZ(${i === activeIndex ? 100 : 0}px)`,
            opacity: i === activeIndex ? 1 : 0.7,
            scale: i === activeIndex ? 1 : 0.9,
          }"
          :to="`/demoChallenge/${item.path}`"
        >
          <div class="p-5 h-full w-full overflow-hidden">
            <h1 class="text-lg text-transparent font-bold mb-3 text-center from-blue-400 to-purple-400 bg-gradient-to-r bg-clip-text">
              {{ item.name }}
            </h1>
            <p class="text-sm text-gray-300 mt-2 px-2">
              {{ item.description }}
            </p>
          </div>
          <div class="left transition-all duration-500 ease-out" />
          <div class="right transition-all duration-500 ease-out" />
          <div class="top transition-all duration-500 ease-out" />
          <div class="bottom transition-all duration-500 ease-out" />
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.box {
  transform-style: preserve-3d;
  perspective: 1200px;
  min-height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 166, 141, 0.5) rgba(0, 0, 0, 0.2);
}

.box::-webkit-scrollbar {
  height: 8px;
}

.box::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.box::-webkit-scrollbar-thumb {
  background: rgba(100, 166, 141, 0.5);
  border-radius: 4px;
}

.box::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 166, 141, 0.7);
}

.item {
  position: relative;
  margin: 0 25px;
  padding-top: 15px;
  width: 160px;
  height: 240px;
  word-break: break-all;
  color: #fff;
  background: linear-gradient(135deg, rgba(86, 88, 93, 0.8) 0%, rgba(60, 62, 67, 0.9) 100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
  transform-style: preserve-3d;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.item:hover::before {
  transform: translateX(100%);
}

.left,
.right,
.top,
.bottom {
  position: absolute;
  background: linear-gradient(135deg, rgba(100, 166, 141, 0.8) 0%, rgba(80, 140, 118, 0.9) 100%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
}

.left,
.right {
  top: 0;
  width: 30px;
  height: 100%;
}

.left {
  left: -30px;
  transform: rotateY(-90deg);
  transform-origin: right;
  border-radius: 8px 0 0 8px;
}

.right {
  right: -30px;
  transform: rotateY(90deg);
  transform-origin: left;
  border-radius: 0 8px 8px 0;
}

.top,
.bottom {
  left: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(135deg, rgba(100, 166, 141, 0.6) 0%, rgba(80, 140, 118, 0.7) 100%);
}

.top {
  top: -30px;
  transform: rotateX(90deg);
  transform-origin: bottom;
  border-radius: 8px 8px 0 0;
}

.bottom {
  bottom: -30px;
  transform: rotateX(-90deg);
  transform-origin: top;
  border-radius: 0 0 8px 8px;
}

.active,
.item:hover {
  box-shadow: 0 0 25px rgba(100, 166, 141, 0.5);
  transform: perspective(1200px) rotateY(0deg) translateZ(120px) !important;
  opacity: 1 !important;
  scale: 1.05 !important;
}

.active .left,
.active .right,
.active .top,
.active .bottom,
.item:hover .left,
.item:hover .right,
.item:hover .top,
.item:hover .bottom {
  box-shadow: 0 0 15px rgba(100, 166, 141, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .item {
    width: 140px;
    height: 220px;
    margin: 0 15px;
  }

  .item h1 {
    font-size: 1rem;
  }

  .item p {
    font-size: 0.75rem;
  }
}
</style>
