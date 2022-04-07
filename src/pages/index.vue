<script lang='ts' setup>
const { push } = useRouter()
function toMineSweeper() {
  push('/minesweeper')
}
</script>

<template>
  <button bg-green-400 w-20 h-10 rounded-5 @click="toMineSweeper">
    跳转
  </button>
</template>

<style lang='less' scoped>

</style>
