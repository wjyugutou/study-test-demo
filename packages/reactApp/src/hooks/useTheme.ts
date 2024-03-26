import type { MouseEvent } from 'react'

const isAppearanceTransition
  = typeof document !== 'undefined'
  // @ts-expect-error: Transition API
  && document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export type Theme = 'dark' | 'light'

// function useMedia(media: string) {
//   return window.matchMedia(media).matches
// }

export function useTheme() {
  const isDark = useRef(document.documentElement.className.includes('dark'))
  const [theme, setTheme] = useState(!isDark.current ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
    isDark.current = !isDark.current
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    toggleTheme(event: MouseEvent) {
      if (!isAppearanceTransition || !event) {
        setTheme(isDark.current ? 'light' : 'dark')
        return
      }

      const x = event.clientX
      const y = event.clientY
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = document.startViewTransition(() => {
        setTheme(isDark.current ? 'light' : 'dark')
      })

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]

        document.documentElement.animate(
          {
            clipPath: isDark.current ? clipPath.toReversed() : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-in',
            pseudoElement: isDark.current
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
    },
  }
}
