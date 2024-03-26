<script setup lang="ts">
const { initial } = defineProps<{
  initial?: number
}>()

// const { count, inc, dec } = useCounter(initial)

const count = ref(0)

function inc() {
  count.value++
}
function dec() {
  count.value--
}

onActivated(()=> {
  console.log('onActivated');
})

onDeactivated(()=> {
  console.log('onDeactivated');
  
})
</script>

<template>
  <div>
    <p>Counter2</p>
    {{ count }}
    <button class="inc" @click="inc">
      +
    </button>
    <button class="dec" @click="dec">
      -
    </button>
  </div>
</template>
