<script lang='ts' setup>
import { MyPromise, request, retry } from '@/utils/asdas'
async function requestTest() {
  try {
    const res = await retry(request, 3, 1000)
    console.log(res)
  }
  catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  // requestTest()

  myPro()
})
function myPro() {
  const a = new MyPromise((resolve) => {
    resolve('成功')
  })
  console.log(a)

  a.then((res) => {
    console.log(res)
  })
}
</script>

<template />

<style lang='less' scoped>

</style>
