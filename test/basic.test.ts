import { describe, expect, it } from 'vitest'

const a = () => {
  return 'a'
}

describe('Hi', () => {
  it('should works', () => {
    expect(a()).toEqual('a')
  })
})
