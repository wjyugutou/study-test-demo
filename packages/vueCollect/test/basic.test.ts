import { describe, expect, it } from 'vitest'
import random from '@/utils/random'

function a() {
  return 'a'
}

describe('Hi', () => {
  it('should works', () => {
    expect(a()).toEqual('a')
  })

  it('random', () => {
    expect(random(1, 9)).toMatchInlineSnapshot('9')
  })
})
