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

const bg_img_1 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
  linear-gradient(to right,transparent 0%,transparent 55%,#000 50%,#000 100%)`
const bg_img_2 = `linear-gradient(to right,red 0%,red 50%,#000 50%,#000 100%),
  linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%)`
const bg_img_3 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
  linear-gradient(to right,transparent 0%,transparent 25%,#000 50%,#000 100%)`

const code = computed(() =>
`.a {
  color: red;
}`)
</script>

<template>
  <div py-2>
    <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
    <router-link :to="`/hi/${name}`">
      前往
    </router-link>
  </div>
  <div class="p-y-10">
    <CodeLine lang="css" :code="code" />
  </div>
  <DemochallengeList :list="demochallengeList" />
</template>
