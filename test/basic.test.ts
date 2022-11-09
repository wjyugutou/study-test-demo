import { describe, expect, it } from 'vitest'
import { randomNum } from '@/utils/random'

const a = () => {
  return 'a'
}

describe('Hi', () => {
  it('should works', () => {
    expect(a()).toEqual('a')
  })

  it('random', () => {
    expect(randomNum(1, 9)).toMatchInlineSnapshot('9')
  })
})
