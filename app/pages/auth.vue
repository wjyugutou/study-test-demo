<script lang='ts' setup>
definePageMeta({
  title: '认证页面',
})
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
