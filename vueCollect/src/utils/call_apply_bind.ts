/* eslint-disable @typescript-eslint/no-this-alias */
export function _apply(this: any, that: any, args: any[]) {
  let o
  // 判断上下文类型 如果是undefined或者 null 指向window
  if (that === undefined || that === null)
    o = window
  else
    o = Object(that)
  const key = Symbol('key')
  o[key] = this

  const result = o[key](...args)
  delete o[key]

  return result
}

export function _call(this: any, that: any, ...args: any[]) {
  let o
  // 判断上下文类型 如果是undefined或者 null 指向window
  if (that === undefined || that === null)
    o = window
  else
    o = Object(that)
  const key = Symbol('key')
  o[key] = this

  const result = o[key](...args)
  delete o[key]

  return result
}

export function _bind(this: any, that: any, args: any[]) {
  const _this = this
  return function (...args2: any[]) {
    let o
    // 判断上下文类型 如果是undefined或者 null 指向window
    if (that === undefined || that === null)
      o = window
    else
      o = Object(that)
    const key = Symbol('key')
    o[key] = _this

    const result = o[key](...[...args, ...args2])
    delete o[key]

    return result
  }
}

