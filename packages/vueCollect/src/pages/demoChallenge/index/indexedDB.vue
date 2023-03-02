<script lang='ts' setup>
const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' },
]

const indexedDB = window.indexedDB

const successOpenDatabase = ref(false)
const DB = ref()

function openDatabase() {
  const request = indexedDB.open('MyTestDatabase')
  request.onerror = (err) => {
    console.error(err)
    successOpenDatabase.value = false
  }
  request.onsuccess = (e: any) => {
    console.log(e)
    successOpenDatabase.value = true
    DB.value = e.target.result
  }
}
</script>

<template>
  <button class="basicBtn" @click="openDatabase">
    打开数据库
  </button>
  <button class="basicBtn">
    添加一个数据
  </button>
  <button class="basicBtn">
    获取数据
  </button>
</template>

<style scoped>

</style>
