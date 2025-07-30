import { create } from 'zustand'

interface AppState {
  // Add your state properties here
  user: null | { id: string; name: string }
  setUser: (user: AppState['user']) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
