<script lang='ts' setup>
definePage({
  beforeEnter(to, form) {
    console.log({ to, form })
  },
})
const name = useSessionStorage('hi-name', '鱼骨头')

const router = useRouter()

const demochallengeList = router.options.routes.find(item => item.path === '/demoChallenge')!.children!.map(item => ({
  name: item.name as string,
  path: item.path as string,
  // @ts-expect-error description
  description: item.description as string | undefined,
}))

demochallengeList.push({
  name: 'starport',
  path: '/flip/flipOne',
  description: '这是一个starport demo',
})

const code = `<script setup>
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
</style>`
</script>

<template>
  <div py-2>
    <InputAnimate v-model="name" placeholder="Input&nbsp;Your&nbsp;Name" />
    <RouterLink :to="`/hi/${name}`">
      前往
    </RouterLink>
  </div>

  <div class="m-y-10 b b-gray-400 p-2">
    <RouterLink to="/webGL">
      webGL
    </RouterLink>

    <RouterLink to="/webGPU">
      webGPU
    </RouterLink>

    <RouterLink to="/three">
      three
    </RouterLink>
  </div>
  <DemochallengeList :list="demochallengeList" />
  <div class="p-y-10">
    <CodeEditor v-model="code" lang="vue" />
  </div>
</template>
