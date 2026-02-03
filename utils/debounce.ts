export function debounce(this: any, fn: () => void, wait = 1000, immediate = true): (this: any, ...args: any) => any {
  let timer: NodeJS.Timeout | undefined
  return (...args: any) => {
    timer && clearTimeout(timer)
    if (immediate) {
      const callNow = !timer

      timer = setTimeout(() => {
        timer = undefined
      }, wait)
      callNow && fn.apply(this, args)
    }
    else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}
