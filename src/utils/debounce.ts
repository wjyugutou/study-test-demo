export default function debounce(fn: Function, wait = 1000, immediate = false): (this: any, ...args: any) => any {
  let timer: NodeJS.Timer | null
  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    timer && clearTimeout(timer)
    if (immediate) {
      const callNow = !timer

      timer = setTimeout(() => {
        timer = null
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

