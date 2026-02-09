import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'

export interface RequestResponse<T = any> {
  data: T
  code: number
  message: string
  success: boolean
}

interface RequestMeta {
  options: {
    /** 是否需要token */
    token?: false
    /** 是否需要原始响应 */
    originResponse?: boolean
  }
}

type RequestContext = FetchContext<RequestResponse> & RequestMeta

function handleError<T>(response: FetchResponse<RequestResponse<T>>) {
  const { $toast } = useNuxtApp()
  const err = (text: string) => {
    $toast.error(text)
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  const userStore = useUserStore()
  const handleMap: { [key: number]: () => void } = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
    401: () => {
      err('登录状态已过期，需要重新登录')
      userStore.clearUserInfo()
      // TODO 跳转实际登录页
      navigateTo('/')
    },
  }

  if (handleMap[response.status]) {
    handleMap[response.status]?.()
  }
  else {
    err('未知错误！')
  }
}

const _fetch = $fetch.create({
  // 请求拦截器
  onRequest(context) {
    const { options } = context as RequestContext

    const { public: { apiBase } } = useRuntimeConfig()
    options.baseURL = apiBase

    if (options.token !== false) {
      const token = useToken()
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },
  // 响应拦截器
  onResponse(context) {
    const { response, options } = context as RequestContext

    console.log('onResponse', {
      response,
      options,
    })

    if (options.originResponse) {
      return response?._data
    }
    else {
      if (response?._data?.code !== 200) {
        handleError(response || {} as FetchResponse<RequestResponse>)

        return Promise.reject(response?._data?.message ?? null)
      }

      // 成功返回
      return response?._data?.data
    }
  },
  // 错误处理
  onResponseError(context) {
    const { response } = context as RequestContext
    console.error('onResponseError', context)

    handleError(response || {} as FetchResponse<RequestResponse>)
    return Promise.reject(response?._data ?? null)
  },
})

type RequestOptions = Omit<FetchOptions, 'method'> & RequestMeta['options']

const request = {
  get<T>(url: string, options?: RequestOptions) {
    return _fetch<RequestResponse<T>>(url, { ...options, method: 'get' })
  },
  post<T>(url: string, options?: RequestOptions) {
    return _fetch<RequestResponse<T>>(url, { ...options, method: 'post' })
  },
  put<T>(url: string, options?: RequestOptions) {
    return _fetch<RequestResponse<T>>(url, { ...options, method: 'put' })
  },
  delete<T>(url: string, options?: RequestOptions) {
    return _fetch<RequestResponse<T>>(url, { ...options, method: 'delete' })
  },
}

export default request
