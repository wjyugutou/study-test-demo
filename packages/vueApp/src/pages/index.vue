<script lang='ts' setup>
const name = useSessionStorage('hi-name', '鱼骨头')

const router = useRouter()

const demochallengeList = router.options.routes.find(item => item.path === '/demoChallenge')!.children!.map(({ name, path }) => ({
  name,
  path,
})) as {
  path: string
  name?: string | undefined
  description?: string | undefined
}[]

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
`${bg_img_1}
${bg_img_2}
${bg_img_3}`)
</script>

<template>
  <div py-2>
    <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
    <RouterLink :to="`/hi/${name}`">
      前往
    </RouterLink>
  </div>
  <div class="p-y-10">
    <CodeLine lang="css" :code="code" />
  </div>
  <DemochallengeList :list="demochallengeList" />
</template>
