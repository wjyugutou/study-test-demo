<script lang='ts' setup>
defineOptions({
  name: 'Popover',
  label: 'Popover',
})
</script>

<template>
  <div w-800px h-400px overflow-auto pl-200px m-auto mt-20 flex border="1px solid red">
    <div bg-pink w-200px h-1000px>
      <Popover placement="top" strategy="absolute" mode="click" content="String content">
        <div w="200px" bg="green-400" dark:bg="green-800">
          strategy="absolute" click
        </div>
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
    <div bg-blue-400 w-200px h-1000px>
      <Popover placement="top" strategy="fixed" mode="hover" content="String content">
        <div w="200px" bg="green-400" dark:bg="green-800">
          strategy="fixed" hover
        </div>
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
