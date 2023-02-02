export default function debounce(fn: Function, wait = 1000, immediate = true): (this: any, ...args: any) => any {
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
      console.log(this === _this)

      callNow && fn.apply(_this, args)
    }
    else {
      timer = setTimeout(() => {
        fn.apply(_this, args)
      }, wait)
    }
  }
}

// if (import.meta.vitest) {
//   const { it, expect } = import.meta.vitest

//   it('debounce', () => {
//     const fn = () => {
//       console.log('debounce')
//     }
//     const debounced = debounce(fn, 1000)
//     debounced()
//   })
// }
