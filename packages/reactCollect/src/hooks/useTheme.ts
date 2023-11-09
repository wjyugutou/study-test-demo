import type { Theme } from '@/store'
import { useAppStore } from '@/store'

export function updateHtmlTheme(theme: Theme) {
  const html = document.querySelector('html')
  html?.setAttribute('theme', theme)
}

export function useTheme() {
  const [theme, setTheme] = useState(useAppStore.getState().theme)

  useEffect(() => useAppStore.subscribe(
    state => state.theme,
    (theme) => {
      setTheme(theme)
      updateHtmlTheme(theme)
    }), [])

  return {
    theme,
    toggleTheme(_theme: Theme) {
      useAppStore.getState().toggleTheme(_theme)
    },
  }
}
