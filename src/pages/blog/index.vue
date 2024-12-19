<script lang='ts' setup>
</script>

<template>
  <div class="pt-50px">
    <div class="mx-auto min-h-500px w-80% border border-gray-400 p-20px">
      <Treelist
        :list="[{
          title: '测速',
          children: [{ title: '测速-c' }],
        }]"
      />
    </div>
  </div>
</template>
