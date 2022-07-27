<script lang='ts' setup>
const file = ref<HTMLInputElement>()

function onChange(e: Event) {
  console.log(file.value?.files)
}

function onSubmit(e: Event) {
  console.log(e)
  file.value.f
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input ref="file" name="file" type="file" @change="onChange">
    <button type="submit" btn>
      提交
    </button>
  </form>
</template>

<style lang='less' scoped>

</style>
