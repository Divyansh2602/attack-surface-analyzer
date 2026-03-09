import { create } from 'zustand'
import Cookies from 'js-cookie'

interface AuthState {
  token: string | null
  username: string | null
  isAuthenticated: boolean
  setAuth: (token: string, username: string) => void
  clearAuth: () => void
  loadFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  isAuthenticated: false,

  setAuth: (token: string, username: string) => {
    Cookies.set('auth_token', token, { expires: 7 })
    localStorage.setItem('username', username)
    set({ token, username, isAuthenticated: true })
  },

  clearAuth: () => {
    Cookies.remove('auth_token')
    localStorage.removeItem('username')
    set({ token: null, username: null, isAuthenticated: false })
  },

  loadFromStorage: () => {
    const token = Cookies.get('auth_token')
    const username = localStorage.getItem('username')
    if (token && username) {
      set({ token, username, isAuthenticated: true })
    }
  },
}))
