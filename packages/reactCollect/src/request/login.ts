import request from '@/utils/axios'

export function loginApi(data: { username: string;password: string }) {
  return request.post('/mock/login', {
    data,
  })
}
