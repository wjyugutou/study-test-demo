<script lang='ts' setup>
defineOptions({
  name: 'Popover',
  label: 'tipsPopover demo',
})
</script>

<template>
  <div w-400px h-200px overflow-auto pl-200px>
    <div bg-pink w-800px h-500px>
      <div bg-blue-400 h-200px />
      <Popover placement="top" strategy="fixed" mode="click" content="String content">
        <template #default>
          <div w="200px" bg-yellow-400>
            children
          </div>
        </template>
        <template #content>
          <div>
            asdasd
            <div>content1</div>
            <div>content2</div>
            <div>content3</div>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>

<style scoped>

</style>
