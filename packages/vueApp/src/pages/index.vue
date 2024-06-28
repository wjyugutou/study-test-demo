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
  <div class="p-y-10">
    <CodeEditor v-model="code" lang="vue" />
  </div>
  <div class="b b-gray-400 m-y-10 p-2">
    <RouterLink to="/webGL">
      webGL
    </RouterLink>
  </div>
  <DemochallengeList :list="demochallengeList" />
</template>
