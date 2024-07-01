import { describe, expect, it } from 'vitest'

function a() {
  return 'a'
}

describe('hi', () => {
  it('should works', () => {
    expect(a()).toEqual('a')
  })
})
