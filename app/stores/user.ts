import type { LoginRequest, LoginResponse } from '~/api/login.d'
import { loginApi, logoutApi } from '~/api/login'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: null,
      token: null,
    } as {
      userInfo: LoginResponse['user'] | null
      token: LoginResponse['token'] | null
    }
  },
  actions: {
    async login(data: LoginRequest) {
      const res = await loginApi(data)

      this.token = res.data.token
      this.userInfo = res.data.user
    },
    async logout() {
      await logoutApi()

      this.clearUserInfo()
    },
    clearUserInfo() {
      this.token = null
      this.userInfo = null
    },
  },
})
