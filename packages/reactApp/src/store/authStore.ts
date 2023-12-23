import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface AuthState {
  authlist: string[]
  setAuthlist: (authlist: string[]) => void
}

export const useAuthStore = create<AuthState>()(persist((set, get) => ({
  authlist: [],
  setAuthlist: authlist => set({ authlist }),
}),
{ name: 'auth', storage: createJSONStorage(() => sessionStorage) }))
