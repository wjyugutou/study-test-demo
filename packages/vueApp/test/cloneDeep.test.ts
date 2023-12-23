import { expect, it } from 'vitest'
import { cloneDeep } from '../src/utils/deepClone'

it('cloneDeep', () => {
  const a = {
    a: 1,
    b: 2,
    c: { d: 3 },
    d() {
      return 123
    },
  }
  function test() {
    const b = cloneDeep(a)
    return b === a
  }
  expect(test()).toMatchInlineSnapshot('false')
  expect(cloneDeep(a).d()).toMatchInlineSnapshot('123')
})
