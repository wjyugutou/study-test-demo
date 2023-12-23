export function throttle(this: any, fn: Function, wait = 1000): (this: any, ...args: any) => any {
  let timer: NodeJS.Timer | null

  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this, @typescript-eslint/no-this-alias
    const _this = this

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, args)
        timer = null
      }, wait)
    }
  }
}
