import type { LoginRequest, LoginResponse } from './login.d'

export function loginApi(data: LoginRequest) {
  return request.post<LoginResponse>('/user/login', { body: data })
}

export function logoutApi() {
  return request.post('/user/logout')
}
