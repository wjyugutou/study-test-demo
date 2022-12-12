<script lang='ts'>
export default { name: '' }
</script>

<script lang='ts' setup>
const router = useRouter()
const route = useRoute()

console.log(route)

const demoList = import.meta.glob('./index/*.vue', { eager: true })
const allDemo = Object.entries(demoList).map(([path, module]) => {
  const label = path.replace('./index/', '').replace('.vue', '')
  return { path: `${router.currentRoute.value.fullPath}/${label}`, label }
})

watchEffect(() => {
  if (router.currentRoute.value.fullPath === '/demoChallenge')
    router.push(allDemo[0].path)
})

const showDemoList = computed(() => {
  const curIndex = allDemo.findIndex(item => item.path === router.currentRoute.value.fullPath)
  const arr = [allDemo[curIndex - 1], allDemo[curIndex], allDemo[curIndex + 1]].filter(Boolean)

  return arr
})

function back() {
  router.back()
}

function pointerEnterHandle() {

}
</script>

<template>
  <header mb-5>
    <div i-carbon-chevron-left hover:cursor-pointer text="hover:gray-200 gray-400" w-5 h-5 @click="back" />
  </header>
  <main><RouterView /></main>
  <footer absolute bottom-0 min-w-20 h-50px @pointerenter="pointerEnterHandle">
    <div v-for="item in showDemoList" :key="item.path">
      <RouterLink :to="item.path">
        {{ item.label }}
      </RouterLink>
    </div>
  </footer>
</template>
