<script lang='ts' setup>
</script>

<template>
  <div bg-pink w-full h-500px>
    <Popover mode="click">
      <template #default>
        <div>
          children
        </div>
      </template>
      <template #content>
        <div>content</div>
      </template>
    </Popover>
  </div>
</template>

<style scoped>

</style>
