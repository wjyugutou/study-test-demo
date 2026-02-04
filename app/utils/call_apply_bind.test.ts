import { expect, it } from 'vitest'
import { _apply, _bind } from './call_apply_bind'

function a(this: any) {
  console.log(this)
}

const b = {
  a: 'a',
  b: 'b',
  c: 'c',
}

it('_apply', () => {
  a.apply = _apply

  expect(a.apply(b, ['a', 'b', 'c'])).toEqual(undefined)
})

it('_bind', () => {
  a.bind = _bind

  expect(a.bind(b, ['a', 'b', 'c'])()).toEqual(undefined)
})
