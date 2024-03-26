import { random } from 'lodash-es'
import type { MockMethod } from 'vite-plugin-mock'

function defaultMock(opt: MockMethod) {
  return {
    timeout: 400,
    ...opt,
  }
}

export default [
  defaultMock({
    url: '/mock/login',
    method: 'post',
    response: ({ query, body }) => {
      console.log(JSON.stringify({ query, body }))

      const data = [101, 102, 103, 104, 105] // Array.from({ length: random(0, 5) }).map(item => random(101, 105))

      return {
        code: 200,
        data,
      }
    },
  }),
  defaultMock({
    url: '/mock/test',
    method: 'get',
    response: () => ({ code: 200, data: 'test success ' }),
  }),
] as MockMethod[]
