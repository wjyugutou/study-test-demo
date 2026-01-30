<script lang='ts' setup>
definePage({
  beforeEnter(to, form) {
    console.log('index', { to, form })
  },
})
const name = useSessionStorage('hi-name', '鱼骨头')

const router = useRouter()

const demochallengeList = router.options.routes.find(item => item.path === '/demoChallenge')!.children!.map(item => ({
  name: item.name as string,
  path: item.path as string,
  // @ts-expect-error description is undefined in some routes
  description: item.description as string | undefined,
}))

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
  <div class="mx-auto px-4 py-8 container max-w-7xl lg:px-8 sm:px-6">
    <!-- 顶部输入区域 -->
    <div class="mb-8 p-6 border border-white/10 rounded-xl from-blue-900/30 to-purple-900/30 bg-gradient-to-r backdrop-blur-sm">
      <h1 class="text-2xl text-white font-bold mb-4">
        Welcome to Demo Hub
      </h1>
      <div class="flex flex-col gap-4 items-start sm:flex-row sm:items-center">
        <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" class="flex-grow" />
        <RouterLink
          :to="`/hi/${name}`"
          class="text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 from-blue-500 to-purple-500 bg-gradient-to-r hover:shadow-blue-500/20 hover:shadow-lg"
        >
          前往
        </RouterLink>
      </div>
    </div>

    <!-- 技术导航区域 -->
    <div class="mb-10 p-4 border border-white/10 rounded-xl from-gray-900/50 to-gray-800/50 bg-gradient-to-r">
      <h2 class="text-xl text-white font-semibold mb-4">
        3D & Graphics
      </h2>
      <div class="flex flex-wrap gap-4">
        <RouterLink
          to="/webGL"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          webGL
        </RouterLink>

        <RouterLink
          to="/webGPU"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          webGPU
        </RouterLink>

        <RouterLink
          to="/three"
          class="text-white px-5 py-2.5 rounded-lg bg-gray-800 transition-colors duration-300 hover:bg-gray-700"
        >
          three
        </RouterLink>
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
    <div class="mb-8">
      <h2 class="text-xl text-white font-semibold mb-4">
        Code Editor
      </h2>
      <div class="border border-white/10 rounded-xl bg-gray-900/80 overflow-hidden">
        <CodeEditor v-model="code" lang="vue" />
      </div>
    </div>
  </div>
</template>
