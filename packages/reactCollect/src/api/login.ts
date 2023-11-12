import type { ReqResult } from '@/utils/axios'
import request from '@/utils/axios'

export function loginApi(data: { username: string;password: string }) {
  return request.post<string[]>('/mock/login', {
    data,
  })
}
