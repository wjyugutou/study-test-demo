<script lang='ts' setup>
import { renderToString } from 'vue/server-renderer'
import digitalRain from './demoChallenge/index/digitalRain.vue'
import kindred from '@/static/carousel/kindred.jpg'
import butt from '@/static/carousel/butt.jpg'
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

const name = useSessionStorage('hi-name', '鱼骨头')

const routeList: {
  title: string
  url: string
}[] = [
  { title: '扫雷', url: '/minesweeper' },
  { title: '梅花动画', url: '/canvas-plum' },
  { title: 'flip', url: '/flip/flip-one' },
  { title: 'fileUpload', url: '/fileUpload' },
  { title: 'demo', url: '/demoChallenge' },
]

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
    <input v-model="name" type="text" placeholder="该如何称呼您？" px-2 py-1 border-1>
    <router-link :to="`/hi/${name}`">
      前往
    </router-link>
  </div>

  <div flex gap-1 flex-col border w-fit min-h-100>
    <div v-for="item in routeList" :key="item.url" px-5 py-1 hover:bg-pink hover:dark:bg-red>
      <button class="basicBtn" @click="pageJump(item.url)">
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<style lang='less' scoped>

</style>
