<script lang='ts' setup>
import kindred from '@/assets/carousel/kindred.jpg'
import butt from '@/assets/carousel/butt.jpg'
import lotusPond from '@/assets/carousel/lotusPond.jpg'
import nanny from '@/assets/carousel/nanny.jpg'

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

const demoChallengeFile = import.meta.glob(['./demoChallenge/*.vue'], { eager: true })

const demochallengeList = Object.keys(demoChallengeFile).map((item) => {
  const fileName = item.split('/').at(-1)
  let name = fileName?.substring(0, fileName.length - 4)
  if (item.includes('index.vue'))
    name = item.split('/').at(-2)

  return {
    path: item.replaceAll('.', '').replace('', '').replace(/(index\/)?(vue)?/g, ''),
    name,
  }
})
console.log(demochallengeList)

demochallengeList.push({
  name: 'starport',
  path: '/flip/flipOne',
})
</script>

<template>
  <div>
    <NuxtLink to="/demoChallenge/matter">
      matter
    </NuxtLink>
    <NuxtLink to="/demoChallenge/lens">
      lens
    </NuxtLink>
    <NuxtLink to="/demoChallenge/digitalRain">
      digitalRain
    </NuxtLink>
    <NuxtLink to="/demoChallenge/indexedDB">
      indexedDB
    </NuxtLink>
    <div flex items-center justify-between>
      <Carousel
        autoplay dot director h-50 w-100
        :duration="3000" :initial="2"
      >
        <template v-for="item, index of carouselData" :key="index">
          <carousel-item :data="item" />
        </template>
      </Carousel>
    </div>
    <div my-2>
      <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
      <NuxtLink :to="`/hi/${name}`">
        前往
      </NuxtLink>
    </div>
    <DemochallengeList :list="demochallengeList" />
  </div>
</template>
