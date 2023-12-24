<script lang='ts' setup>
const name = useSessionStorage('hi-name', '鱼骨头')

const demoChallengeFile = import.meta.glob(['./demoChallenge/index/**/*.vue', '!**/components/*'], { eager: true })

const demochallengeList = Object.keys(demoChallengeFile).map((item) => {
  const fileName = item.split('/').at(-1)
  let name = fileName?.substring(0, fileName.length - 4)
  if (item.includes('index.vue'))
    name = item.split('/').at(-2)

  return {
    path: item.replaceAll('.', '').replace(/(index\/)?(vue)?/g, ''),
    name,
  }
})

demochallengeList.push({
  name: 'starport',
  path: '/flip/flipOne',
})
</script>

<template>
  <div py-2>
    <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
    <router-link :to="`/hi/${name}`">
      前往
    </router-link>
  </div>
  <DemochallengeList :list="demochallengeList" />
</template>
