<script lang='ts' setup>
definePageMeta({
  middleware: 'demo-redirect',
})

const router = useRouter()
const route = useRoute()

const footerEnter = ref(false)

const visibleList = ref(false)

const allDemo = [
  { path: '/demoChallenge/autoNavBar', label: 'autoNavBar' },
  { path: '/demoChallenge/DivTable', label: 'DivTable' },
  { path: '/demoChallenge/intersectionObserver', label: 'intersectionObserver' },
  { path: '/demoChallenge/lens', label: 'lens' },
  { path: '/demoChallenge/webrtc', label: 'webrtc' },
  { path: '/demoChallenge/waterfallFlowa', label: 'waterfallFlowa' },
  { path: '/demoChallenge/watchCarousel', label: 'watchCarousel' },
  { path: '/demoChallenge/virtualScroll', label: 'virtualScroll' },
  { path: '/demoChallenge/videojsPlayRemp', label: 'videojsPlayRemp' },
  { path: '/demoChallenge/svgComponent', label: 'svgComponent' },
  { path: '/demoChallenge/scope', label: 'scope' },
  { path: '/demoChallenge/renderToString', label: 'renderToString' },
  { path: '/demoChallenge/recorder', label: 'recorder' },
  { path: '/demoChallenge/popoverDemo', label: 'popoverDemo' },
  { path: '/demoChallenge/minesweeperPage', label: 'minesweeperPage' },
  { path: '/demoChallenge/matter', label: 'matter' },
  { path: '/demoChallenge/indexedDB', label: 'indexedDB' },
  { path: '/demoChallenge/fileUpload', label: 'fileUpload' },
  { path: '/demoChallenge/ellipsePanel', label: 'ellipsePanel' },
  { path: '/demoChallenge/editorDiv', label: 'editorDiv' },
  { path: '/demoChallenge/digitalRain', label: 'digitalRain' },
  { path: '/demoChallenge/canvasPlum', label: 'canvasPlum' },
  { path: '/demoChallenge/SemanticTags', label: 'SemanticTags' },
  { path: '/demoChallenge/canvasDrawPage', label: 'canvasDrawPage' },
]

const curIndex = computed(() => allDemo.findIndex(item => item.path === router.currentRoute.value.fullPath))

const showDemoList = computed(() => {
  const arr = [allDemo[curIndex.value - 1], allDemo[curIndex.value], allDemo[curIndex.value + 1]]
  return arr.filter(Boolean) as {
    path: string
    label: string
  }[]
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

const title = computed(() => route.fullPath.split('/').at(-1))
</script>

<template>
  <header class="mb-8px py-5px flex h-46px items-center justify-center">
    <div
      text="hover:gray-200 gray-400"
      class="h-30px inline-30px left-0 absolute hover:cursor-pointer"
      i-carbon-chevron-left
      @click="back"
    />
    <div class="text-20px font-bold">
      {{ title }}
    </div>
  </header>
  <main class="relative overflow-hidden">
    <NuxtPage />
  </main>
  <footer class="text-26px px-2 text-left flex items-center bottom-0 left-0 right-0 justify-between fixed">
    <div class="cursor-pointer z-2" @pointerenter="pointerEnterHandle" @pointerleave="pointerLeaveHandle">
      <template v-if="footerEnter">
        <div v-for="item in showDemoList" :key="item.path">
          <NuxtLink :to="item.path" replace>
            {{ item.label }}
          </NuxtLink>
        </div>
      </template>
      <template v-else>
        {{ allDemo[curIndex]?.label }}
      </template>
    </div>
    <div class="cursor-pointer z-2" @click="listClickHandle">
      list
    </div>
  </footer>
  <Modal v-model="visibleList" title="demoList" :drag="modalDrag">
    <div>
      <p v-for="item in allDemo" :key="item.path" hover:text="[var(--primary)]">
        <NuxtLink :to="item.path">
          {{ item.label }}
        </NuxtLink>
      </p>
    </div>
    <template #footer>
      <button class="basicBtn" @click="modalDrag = !modalDrag">
        切换拖拽 {{ modalDrag }}
      </button>
    </template>
  </Modal>
</template>
