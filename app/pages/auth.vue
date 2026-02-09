<script lang='ts' setup>
const userStore = useUserStore()
async function handleLogout() {
  await userStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <button @click="handleLogout">
      退出登录
    </button>
  </div>
</template>
