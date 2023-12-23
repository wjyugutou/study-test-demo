import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

export interface AppState {
  theme: Theme
  toggleTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>()(subscribeWithSelector(persist((set, get) => ({
  theme: 'dark',
  toggleTheme: theme => set({ theme }),
}),
{
  name: 'app',
  storage: createJSONStorage(() => localStorage),
})))
