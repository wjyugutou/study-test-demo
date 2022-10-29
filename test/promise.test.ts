import { describe, expect, it } from 'vitest'
import { MyP } from '../src/utils/promise'

describe('promise', () => {
  it('customPromise', () => {
    expect(new MyP((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 1000)
    }).then((val: any) => {
      console.log(val)
      return 'asddsa'
    }).then((val: any) => {
      console.log(`${val}lll`)
    })).toMatchInlineSnapshot(`
      MyP {
        "catch": [Function],
        "onFulfilledCallbacks": [],
        "onRejectedCallbacks": [],
        "reason": null,
        "reject": [Function],
        "resolve": [Function],
        "status": "pending",
        "then": [Function],
        "value": null,
      }
    `)
  })

  // it('promise', () => {
  //   expect(new Promise((resolve, reject) => {
  //     resolve('success')
  //   }).then((val: any) => {
  //     console.log(val)
  //     return 'asddsa'
  //   }).then((val: any) => {
  //     console.log(`${val}lll`)
  //   })).toMatchInlineSnapshot('Promise {}')
  // })
})
