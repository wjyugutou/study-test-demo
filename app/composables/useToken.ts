export function useToken() {
  const userStore = useUserStore()
  return userStore.token
}
