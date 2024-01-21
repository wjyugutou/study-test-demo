import { expect, test, vi } from 'vitest'
import { stateObserver } from '../index'

const so = stateObserver({ name: 'stateObserver', age: 14 })
so.on('nameUpdate', () => {})

function ageUpdate(oldValue: number, newValue: number) {
  console.log('ageUpdateFn', { oldValue, newValue })
}

so.on('ageUpdate', ageUpdate)

so.on('ageUpdate', () => {
  console.log('ageUpdate 222')
})

test('stateObserver updateFn', () => {
  const spyF = vi.fn(ageUpdate)

  so.state.age = 111
  so.state.age = 222
  so.state.age = 333
  console.log('getMockName', spyF.getMockName())

  expect(spyF).toHaveBeenCalled()

  // expect(so.state.age = 20).toMatchSnapshot()
})
