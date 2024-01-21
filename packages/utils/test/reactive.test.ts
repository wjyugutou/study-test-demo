import { expect, test, vi } from 'vitest'
import { stateObserver } from '../index'

const so = stateObserver({ name: 'stateObserver', age: 14 })
so.on('nameUpdate', () => {})

function ageUpdate(oldValue: number, newValue: number) {
  console.log('ageUpdate', { oldValue, newValue })
}
so.on('ageUpdate', ageUpdate)

test('stateObserver updateFn', () => {
  const spy = vi.spyOn(so, 'on')
  so.state.age = 111
  // expect(so.state.age = 20).toMatchSnapshot()
  expect(spy).toHaveBeenCalled()
})
