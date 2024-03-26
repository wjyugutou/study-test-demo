import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'

export interface AppState {
}

export const useAppStore = create<AppState>()(subscribeWithSelector(persist((set, get) => ({

}),
{
  name: 'app',
  storage: createJSONStorage(() => localStorage),
})))
