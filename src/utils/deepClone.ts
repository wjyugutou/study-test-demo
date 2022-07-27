import { cloneDeep } from 'lodash-es'

export function deepClone<T>(obj: T, newObj: T extends object ? T: any = {}): T {
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

cloneDeep
