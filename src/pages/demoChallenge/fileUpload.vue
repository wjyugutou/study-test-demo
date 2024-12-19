<script lang='ts' setup>
defineOptions({
  description: '文件上传',
})

const file = ref<HTMLInputElement>()

function onChange(_e: Event) {
  console.log(file.value?.files)
}

function onSubmit(e: Event) {
  console.log(e)
  // file.value.f
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
