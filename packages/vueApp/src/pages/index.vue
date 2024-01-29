<script lang='ts' setup>
const name = useSessionStorage('hi-name', '鱼骨头')

const demoChallengeFile = import.meta.glob(['./demoChallenge/index/**/*.vue', '!**/components/*'])

const demochallengeList = Object.entries(demoChallengeFile).map(([key, module]) => {
  const fileName = key.split('/').at(-1)!
  let name = fileName.substring(0, fileName.length - 4)
  if (key.includes('index.vue'))
    name = key.split('/').at(-2)!

  return {
    path: key.replaceAll('.', '').replace(/(index\/)?(vue)?/g, ''),
    name,
    // description: (module as any).default.description as string,
  }
})

demochallengeList.push({
  name: 'starport',
  path: '/flip/flipOne',
  // description: '',
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
