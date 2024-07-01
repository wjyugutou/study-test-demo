export function throttle(this: any, fn: Function, wait = 1000): (this: any, ...args: any) => any {
  let timer: NodeJS.Timer | null

  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}
