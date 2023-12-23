import { expect, it } from 'vitest'
import { debounce } from './debounce'

it('debounce', () => {
  const fn = () => {
    console.log('debounce')
  }
  const debounced = debounce(fn, 1000)
  debounced()
})
