<script setup lang="ts">
definePageMeta({
  title: '登录',
  layout: 'fullscreen',
})

const userStore = useUserStore()

// 表单数据
const formData = reactive({
  username: 'username',
  password: 'password',
  remember: false,
})

// 加载状态
const isLoading = ref(false)

// 错误信息
const errorMessage = ref('')

/**
 * 处理登录
 */
async function handleLogin(): Promise<void> {
  try {
    isLoading.value = true
    errorMessage.value = ''

    await userStore.login(formData)

    // 跳转到首页
    await navigateTo('/auth')
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请重试'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">
        登录
      </h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <!-- 用户名输入框 -->
        <div class="form-group">
          <label for="username" class="form-label">用户名</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="form-input"
            placeholder="请输入用户名"
            required
          >
        </div>

        <!-- 密码输入框 -->
        <div class="form-group">
          <label for="password" class="form-label">密码</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="form-input"
            placeholder="请输入密码"
            required
          >
        </div>

        <!-- 记住密码 -->
        <div class="form-checkbox">
          <input
            id="remember"
            v-model="formData.remember"
            type="checkbox"
          >
          <label for="remember">记住密码</label>
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          class="login-btn"
          :class="{ 'cursor-not-allowed bg-gray-400': isLoading }"
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- 其他链接 -->
      <div class="login-footer">
        <NuxtLink class="link">
          注册新账户
        </NuxtLink>
        <NuxtLink class="link">
          忘记密码？
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  --at-apply: min-h-screen flex items-center justify-center bg-gray-100;
}

.login-box {
  --at-apply: w-full max-w-md bg-white rounded-lg shadow-lg p-8;
}

.login-title {
  --at-apply: text-3xl font-bold text-center mb-8 text-gray-800;
}

.login-form {
  --at-apply: space-y-5;
}

.form-group {
  --at-apply: flex flex-col;
}

.form-label {
  --at-apply: text-sm font-semibold text-gray-700 mb-2;
}

.form-input {
  --at-apply: color-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition;
}

.form-checkbox {
  --at-apply: flex items-center gap-2;
}

.form-checkbox input[type="checkbox"] {
  --at-apply: w-4 h-4 cursor-pointer;
}

.form-checkbox label {
  --at-apply: text-sm text-gray-700 cursor-pointer;
}

.login-btn {
  --at-apply: w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed;
}

.error-message {
  --at-apply: mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm;
}

.login-footer {
  --at-apply: mt-6 flex justify-between text-sm;
}

.link {
  --at-apply: text-blue-500 hover:text-blue-700 transition cursor-pointer;
}
</style>
