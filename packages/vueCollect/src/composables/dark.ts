export const isDark = useDark({
  attribute: 'theme',
  valueLight: 'light',
})

export const toggleDark = useToggle(isDark)
