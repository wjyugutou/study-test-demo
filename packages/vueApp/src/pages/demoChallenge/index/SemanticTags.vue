<script lang='ts' setup>
defineOptions({
  description: '语义化标签',
})
</script>

<template>
  <div flex items-center justify-center>
    <code text-26px>{{ '<sub></sub>' }}</code>
    <span mr-2>:</span>
    <p>
      水的化学式: H<sub>2</sub>O
    </p>
  </div>
  <div flex items-center justify-center>
    <code text-26px>{{ '<sup></sup>' }}</code>
    <span mr-2>:</span>
    <p>2 <sup>2</sup> = 4 </p>
  </div>

  <details>
    details标签
  </details>
</template>
