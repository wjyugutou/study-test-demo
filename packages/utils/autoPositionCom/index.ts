import type { CSSProperties } from 'vue'

interface Options {
  mode?: 'left' | 'right' | 'top' | 'bottom'
}

function createObserve(callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void, options: IntersectionObserverInit | undefined): IntersectionObserver {
  return new IntersectionObserver(callback, options)

  // let instance: IntersectionObserver
  // return (() => {
  //   if (instance) {
  //     return instance
  //   }
  //   else {
  //     const intersectionObserver = new IntersectionObserver(callback, options)
  //     instance = intersectionObserver
  //     return instance
  //   }
  // })()
}

export function autoPosition(sourceEl: Element, target: Element, options: Options, callback: (style: CSSProperties) => void): {
  style: CSSProperties
  destroy: () => void
} {
  console.log({ sourceEl, target })
  const sourcePos = sourceEl.getBoundingClientRect()
  const targetPos = target.getBoundingClientRect()
  const style: CSSProperties = {
    top: `${sourcePos.height}px`,
    left: `${sourcePos.left + sourcePos.width / 2 - targetPos.width / 2}px`,
  }

  function cb(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    console.log(entries)
    callback(style)
  }
  console.log('parentElement', target.parentElement)
  const observer = createObserve(cb, { threshold: 1 })

  observer.observe(target)

  function destroy() {

  }

  return { style, destroy }
}
