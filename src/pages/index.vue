<script lang='ts' setup>
import butt from '@/static/carousel/butt.jpg'
import kindred from '@/static/carousel/kindred.jpg'
import lotusPond from '@/static/carousel/lotusPond.jpg'
import nanny from '@/static/carousel/nanny.jpg'
const data = [
  {
    title: 'woman', url: butt,
  },
  {
    title: '千珏', url: kindred,
  },
  {
    title: '荷花池', url: lotusPond,
  },
  {
    title: '奶妈', url: nanny,
  },
]

const { push } = useRouter()
function toMineSweeper() {
  push('/minesweeper')
}
function toPlum() {
  push('/canvas-plum')
}
</script>

<template>
  <Carousel
    w-100 h-50 autoplay dot director
    :duration="3000" :initial="2"
  >
    <template v-for="item, index of data" :key="index">
      <carousel-item :data="item" />
    </template>
  </Carousel>
  <div flex gap-1 justify-center>
    <button bg-green-400 w-20 h-10 rounded-5 @click="toMineSweeper">
      扫雷
    </button>
    <button bg-green-400 w-20 h-10 rounded-5 @click="toPlum">
      梅花动画
    </button>
  </div>
</template>

<style lang='less' scoped>

</style>
