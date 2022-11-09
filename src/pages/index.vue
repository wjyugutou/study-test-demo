<script lang='ts' setup>
import butt from '@/static/carousel/butt.jpg'
import kindred from '@/static/carousel/kindred.jpg'
import lotusPond from '@/static/carousel/lotusPond.jpg'
import nanny from '@/static/carousel/nanny.jpg'

const { push } = useRouter()

const carouselData: {
  title: string
  url: string
}[] = [
  { title: 'woman', url: butt },
  { title: '千珏', url: kindred },
  { title: '荷花池', url: lotusPond },
  { title: '奶妈', url: nanny },
]
const demoChallengeGlob = import.meta.glob('./demoChallenge/*.vue', { eager: true }) as ImportGlob

const demoChallengeRouteList = Object.entries(demoChallengeGlob).map(([path, module]) => {
  const url = path.substring(2, path.length - 4)

  return {
    url,
    title: module.default?.label || url.split('/').at(-1),
  }
})

const name = useSessionStorage('hi-name', '鱼骨头')

const routeList: {
  title: string
  url: string
}[] = [
  { title: '扫雷', url: '/minesweeper' },
  { title: '梅花动画', url: '/canvas-plum' },
  { title: 'flip', url: '/flip/flip-one' },
  { title: 'fileUpload', url: '/fileUpload' },
].concat(demoChallengeRouteList)

const pageJump = (url: string) => {
  push(url)
}
</script>

<template>
  <Carousel
    w-100 h-50 autoplay dot director
    :duration="3000" :initial="2"
  >
    <template v-for="item, index of carouselData" :key="index">
      <carousel-item :data="item" />
    </template>
  </Carousel>
  <div my-2>
    <input v-model="name" type="text" placeholder="该如何称呼您？" px-2 py-1 border-1> <router-link :to="`/hi/${name}`">
      前往
    </router-link>
  </div>
  <div flex gap-1 justify-center border p-5>
    <template v-for="item in routeList" :key="item.url">
      <button px-5 py-1 rounded-5 bg-green-400 dark:bg-green-600 @click="pageJump(item.url)">
        {{ item.title }}
      </button>
    </template>
  </div>
</template>

<style lang='less' scoped>

</style>
