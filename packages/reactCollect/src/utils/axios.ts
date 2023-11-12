import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
})

instance.interceptors.request.use(req => req, err => Promise.resolve({ code: 0, ...err }))

instance.interceptors.response.use((response) => {
  return response.data
}, err => Promise.resolve({ code: 0, ...err }))

export interface ReqResult<T = any> {
  code: number
  data: T
}

declare module 'axios' {
  export interface Axios {
    get<T = any, D = any, R = ReqResult<T>>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
    delete<T = any, D = any, R = ReqResult<T>>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
    head<T = any, D = any, R = ReqResult<T>>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
    options<T = any, D = any, R = ReqResult<T>>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
    post<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
    put<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
    patch<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
    postForm<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
    putForm<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
    patchForm<T = any, D = any, R = ReqResult<T>>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  }
}

export default instance
