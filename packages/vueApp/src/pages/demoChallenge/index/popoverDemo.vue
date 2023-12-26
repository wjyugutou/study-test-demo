<script lang='ts' setup>
defineOptions({
  description: 'Popover 弹出框提示',
})
</script>

<template>
  <div m-auto h-400px w-800px flex overflow-auto pl-200px border="1px solid red">
    <div h-1000px w-200px bg-pink>
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
    <div h-1000px w-200px bg-blue-400>
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
