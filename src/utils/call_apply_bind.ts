function apply(this: any, that: string, args: any[]) {
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

function call(this: any, ...args: any[]) {
  return this.apply(this, args)
}

