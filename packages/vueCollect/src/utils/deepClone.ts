export function deepClone<T = any>(obj: T, newObj: any = {}): T {
  if (typeof obj !== 'object' || obj === null)
    return obj
  if (Array.isArray(obj))
    return obj.map(item => deepClone(item))
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key))
      newObj[key] = deepClone(obj[key])
  }
  return newObj
}

export function cloneDeep(source: any): any {
  if (!source || typeof source !== 'object')
    return source
  if (Array.isArray(source))
    return source.map(item => cloneDeep(item))

  const newObj: any = {}
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const element = source[key]
      newObj[key] = cloneDeep(element)
    }
  }
  return newObj
}

export default deepClone
