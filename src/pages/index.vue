<script lang='ts' setup>
const { push } = useRouter()
function toMineSweeper() {
  push('/minesweeper')
}
function toPlum() {
  push('/canvas-plum')
}
</script>

<template>
  <div flex gap-1 justify-center>
    <button bg-green-400 w-20 h-10 rounded-5 @click="toMineSweeper">
      扫雷
    </button>
    <button bg-green-400 w-20 h-10 rounded-5 @click="toPlum">
      梅花动画
    </button>
  </div>
</template>

<style lang='less' scoped>

</style>
