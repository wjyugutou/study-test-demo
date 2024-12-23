<script lang='ts' setup>
definePage({
  beforeEnter(to, form, next) {
    if (to.path === '/demoChallenge') {
      return next({ path: '/demoChallenge/autoNavBar', replace: true })
    }
    else {
      return next()
    }
  },
})

const router = useRouter()
const route = useRoute()

const footerEnter = ref(false)

const visibleList = ref(false)

const allDemo = router.options.routes.find(item => item.path === '/demoChallenge')!.children!.map(({ name, path }) => ({
  path,
  label: name,
}))

const stop = watchEffect(() => {
  if (router.currentRoute.value.fullPath === '/demoChallenge')
    router.replace(allDemo[0].path)
})

const curIndex = computed(() => allDemo.findIndex(item => item.path === router.currentRoute.value.fullPath))

const showDemoList = computed(() => {
  const arr = [allDemo[curIndex.value - 1], allDemo[curIndex.value], allDemo[curIndex.value + 1]]
  return arr.filter(Boolean)
})

function back() {
  router.back()
}

function pointerEnterHandle() {
  footerEnter.value = true
}

function pointerLeaveHandle() {
  footerEnter.value = false
}

function listClickHandle() {
  visibleList.value = true
}

const modalDrag = ref(true)

router.beforeEach(() => {
  visibleList.value = false
})

const title = computed(() => route.fullPath.split('/').at(-1))

onUnmounted(() => {
  stop()
})
</script>

<template>
  <header class="mb-8px h-46px flex items-center justify-center py-5px">
    <div
      text="hover:gray-200 gray-400"
      class="absolute left-0 h-30px inline-30px hover:cursor-pointer"
      i-carbon-chevron-left
      @click="back"
    />
    <div class="text-20px font-bold">
      {{ title }}
    </div>
  </header>
  <main class="relative overflow-hidden">
    <RouterView v-slot="{ Component }">
      <Transition name="demo-page">
        <div :key="route.path" h-full w-full>
          <AliveKeep>
            <component :is="Component" />
          </AliveKeep>
        </div>
      </Transition>
    </RouterView>
  </main>
  <footer class="fixed bottom-0 left-0 right-0 flex items-center justify-between px-2 text-left text-26px">
    <div class="z-2 cursor-pointer" @pointerenter="pointerEnterHandle" @pointerleave="pointerLeaveHandle">
      <template v-if="footerEnter">
        <div v-for="item in showDemoList" :key="item.path">
          <RouterLink :to="item.path" replace>
            {{ item.label }}
          </RouterLink>
        </div>
      </template>
      <template v-else>
        {{ allDemo[curIndex]?.label }}
      </template>
    </div>
    <div class="z-2 cursor-pointer" @click="listClickHandle">
      list
    </div>
  </footer>
  <Modal v-model="visibleList" title="demoList" :drag="modalDrag">
    <div>
      <p v-for="item in allDemo" :key="item.path" hover:text="[var(--primary)]">
        <RouterLink :to="item.path">
          {{ item.label }}
        </RouterLink>
      </p>
    </div>
    <template #footer>
      <button class="basicBtn" @click="modalDrag = !modalDrag">
        切换拖拽 {{ modalDrag }}
      </button>
    </template>
  </Modal>
</template>
