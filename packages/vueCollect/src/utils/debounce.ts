export function debounce(fn: () => void, wait = 1000, immediate = true): (this: any, ...args: any) => any {
  let timer: NodeJS.Timeout | undefined
  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-invalid-this
    const _this = this

    timer && clearTimeout(timer)
    if (immediate) {
      const callNow = !timer

      timer = setTimeout(() => {
        timer = undefined
      }, wait)
      callNow && fn.apply(_this, args)
    }
    else {
      timer = setTimeout(() => {
        fn.apply(_this, args)
      }, wait)
    }
  }
}
