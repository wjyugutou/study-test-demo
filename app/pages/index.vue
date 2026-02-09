<script lang='ts' setup>
const name = useSessionStorage('hi-name', '鱼骨头')

const demochallengeList = [
  { name: 'autoNavBar', path: '/demoChallenge/autoNavBar', description: '自动导航栏' },
  { name: 'DivTable', path: '/demoChallenge/DivTable', description: 'Div表格' },
  { name: 'intersectionObserver', path: '/demoChallenge/intersectionObserver', description: '交叉观察器' },
  { name: 'lens', path: '/demoChallenge/lens', description: '透镜效果' },
  { name: 'webrtc', path: '/demoChallenge/webrtc', description: 'WebRTC' },
  { name: 'waterfallFlowa', path: '/demoChallenge/waterfallFlowa', description: '瀑布流' },
  { name: 'watchCarousel', path: '/demoChallenge/watchCarousel', description: '轮播图' },
  { name: 'virtualScroll', path: '/demoChallenge/virtualScroll', description: '虚拟滚动' },
  { name: 'videojsPlayRemp', path: '/demoChallenge/videojsPlayRemp', description: '视频播放' },
  { name: 'svgComponent', path: '/demoChallenge/svgComponent', description: 'SVG组件' },
  { name: 'scope', path: '/demoChallenge/scope', description: '作用域' },
  { name: 'renderToString', path: '/demoChallenge/renderToString', description: '渲染字符串' },
  { name: 'recorder', path: '/demoChallenge/recorder', description: '录音器' },
  { name: 'popoverDemo', path: '/demoChallenge/popoverDemo', description: '弹出框' },
  { name: 'minesweeperPage', path: '/demoChallenge/minesweeperPage', description: '扫雷' },
  { name: 'matter', path: '/demoChallenge/matter', description: '物理引擎' },
  { name: 'indexedDB', path: '/demoChallenge/indexedDB', description: 'IndexedDB' },
  { name: 'fileUpload', path: '/demoChallenge/fileUpload', description: '文件上传' },
  { name: 'ellipsePanel', path: '/demoChallenge/ellipsePanel', description: '椭圆面板' },
  { name: 'editorDiv', path: '/demoChallenge/editorDiv', description: '编辑器Div' },
  { name: 'digitalRain', path: '/demoChallenge/digitalRain', description: '数字雨' },
  { name: 'canvasPlum', path: '/demoChallenge/canvasPlum', description: '画布梅花' },
  { name: 'SemanticTags', path: '/demoChallenge/SemanticTags', description: '语义标签' },
  { name: 'canvasDrawPage', path: '/demoChallenge/canvasDrawPage', description: '画布绘制' },
]

demochallengeList.push({
  name: 'starport',
  path: '/flip/flipOne',
  description: '这是一个starport demo',
})

const code = ref(`<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  // Access/mutate the value of a ref via
  // its .value property.
  message.value = message.value.split('').reverse().join('')
}

function notify() {
  alert('navigation was prevented.')
}
<\/script>

<template>
  <h1>{{ message }}</h1>
  <button @click="reverseMessage">Reverse Message</button>
  <button @click="message += '!'">Append "!"</button>
  <a href="https://vuejs.org" @click.prevent="notify">
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>`)
</script>

<template>
  <div class="mx-auto container max-w-7xl">
    <!-- 顶部输入区域 -->
    <div class="mb-8 p-6 border border-white/10 rounded-xl from-blue-900/30 to-purple-900/30 bg-gradient-to-r backdrop-blur-sm">
      <h1 class="text-2xl text-white font-bold mb-4">
        Welcome to Demo Hub
      </h1>
      <div class="flex flex-col gap-4 items-start sm:flex-row sm:items-center">
        <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" class="flex-grow" />
        <NuxtLink
          :to="`/hi/${name}`"
          class="text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 from-blue-500 to-purple-500 bg-gradient-to-r hover:shadow-blue-500/20 hover:shadow-lg"
        >
          前往
        </NuxtLink>
      </div>
    </div>

    <!-- 技术导航区域 -->
    <div class="mb-10 p-4 border border-white/10 rounded-xl from-gray-900/50 to-gray-800/50 bg-gradient-to-r">
      <h2 class="text-xl text-white font-semibold mb-4">
        3D & Graphics
      </h2>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/webGL"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          webGL
        </NuxtLink>

        <NuxtLink
          to="/webGPU"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          webGPU
        </NuxtLink>

        <NuxtLink
          to="/three"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          three
        </NuxtLink>
      </div>
    </div>

    <!-- 项目列表区域 -->
    <div class="mb-12">
      <h2 class="text-xl text-white font-semibold mb-6">
        Demo Challenges
      </h2>
      <DemochallengeList :list="demochallengeList" />
    </div>

    <!-- 代码编辑器区域 -->
    <div class="">
      <h2 class="text-xl text-white font-semibold mb-4">
        Code Editor
      </h2>
      <div class="border border-white/10 rounded-xl bg-gray-900/80 overflow-hidden">
        <CodeEditor v-model="code" lang="vue" />
      </div>
    </div>
  </div>
</template>
