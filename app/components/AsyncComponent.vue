<script setup lang="ts">
function asyncFunction() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(1)
    }, 2000)
  })
}

await asyncFunction()

const boxStyle = ref({
  bgColor: 'red',
})

function toggleStyle() {
  boxStyle.value.bgColor = boxStyle.value.bgColor === 'red' ? 'blue' : 'red'
}

// new MyP((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// }).then((val: any) => {
//   console.log(val)
//   return 'asddsa'
// }).then((val: any) => {
//   console.log(`${val}lll`)
// })
</script>

<template>
  <div class="box">
    测试div
  </div>
  <button @click="toggleStyle">
    修改颜色
  </button>
</template>

<style scoped>
.box {
  background-color: v-bind('boxStyle.bgColor');
}
</style>
