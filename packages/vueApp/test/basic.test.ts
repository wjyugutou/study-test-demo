import { describe, expect, it } from 'vitest'

function a() {
  return 'a'
}

describe('Hi', () => {
  it('should works', () => {
    expect(a()).toEqual('a')
  })
})
