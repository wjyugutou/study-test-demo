<script setup lang="ts">
const a = ref(false)
const img2 = 'https://ts1.cn.mm.bing.net/th/id/R-C.f3355843ba57d6ac8dd2e15982b7a9e1?rik=qXa2xYELs%2bNu9Q&riu=http%3a%2f%2fcdn101.picsart.com%2f208783124002202.jpg&ehk=fbXKkXISNbA8NjabZZzxAOaA1l38Lp8z9aJZtrhxrp8%3d&risl=&pid=ImgRaw&r=0'

const count = ref(0)
const clickHandle = () => {
  a.value = !a.value
  count.value++
}
</script>

<template>
  <div overflow-hidden transition-all duration-1000 relative border="10px solid blue" hover:border="yellow" @click="clickHandle">
    <img w-full h-full :src="img2" alt="">
    <p text-white absolute bottom-0 left="50%" translate-x="-50%">
      {{ count }}
    </p>
  </div>
</template>
