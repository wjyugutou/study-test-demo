<script lang='ts' setup>
import type { Ref } from 'vue'

const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' },
]

const indexedDB = window.indexedDB

const databaseName = 'MyTestDatabase'
const successOpenDatabase = ref(false)
const DB = ref() as Ref<IDBDatabase>

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (successOpenDatabase.value)
      return reject(Error('数据库已打开'))
    const request = indexedDB.open(databaseName)
    request.onerror = (err) => {
      console.error(err)
      successOpenDatabase.value = false
      reject(err)
    }
    request.onsuccess = (e) => {
      successOpenDatabase.value = true
      DB.value = e.target!.result
      resolve(e.target!.result)
    }

    // 数据库有更新时候的回调
    request.onupgradeneeded = (event) => {
      console.log('onupgradeneeded ')
    }
  })
}

function addData() {
  // 设置 autoIncrement 标志为 true 来创建一个名为 names 的对象仓库
  const objStore = DB.value.createObjectStore('names', { autoIncrement: true })

  // 因为 names 对象仓库拥有键生成器，所以它的键会自动生成。
  customerData.forEach((customer) => {
    objStore.add(customer.name)
  })
}
</script>

<template>
  <h1 text-12>
    {{ successOpenDatabase ? '数据库打开成功' : '数据库打开失败' }}
  </h1>
  <button class="basicBtn" @click="openDatabase">
    打开数据库
  </button>
  <button class="basicBtn" @click="addData">
    添加一个数据
  </button>
  <button class="basicBtn">
    获取数据
  </button>
</template>

<style scoped>

</style>
