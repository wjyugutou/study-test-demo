<script lang='ts' setup>
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

const demoChallengeFile = import.meta.glob(['./demoChallenge/index/**/*.vue', '!**/components/*'], { eager: true })

const routeList = Object.keys(demoChallengeFile).map((item) => {
  const fileName = item.split('/').at(-1)
  let name = fileName?.substring(0, fileName.length - 4)
  if (item.includes('index.vue'))
    name = item.split('/').at(-2)

  return {
    path: item.replaceAll('.', '').replace(/(\/index)?(vue)?/g, ''),
    name,
  }
})

routeList.push({
  name: 'starport',
  path: '/flip/flipOne',
})

function pageJump(url: string) {
  push(url)
}
</script>

<template>
  <div flex items-center justify-between>
    <Carousel
      w-100 h-50 autoplay dot director
      :duration="3000" :initial="2"
    >
      <template v-for="item, index of carouselData" :key="index">
        <carousel-item :data="item" />
      </template>
    </Carousel>
  </div>
  <div my-2>
    <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
    <router-link :to="`/hi/${name}`">
      前往
    </router-link>
  </div>

  <div flex>
    <div flex gap-1 flex-col border w-fit min-h-100 max-h-880px overflow-auto class="hideScrollbar">
      <div v-for="item in routeList" :key="item.path" px-5 py-1 hover:bg-gray-400 hover:dark:bg-gray-400>
        <button class="basicBtn" @click="pageJump(item.path)">
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
