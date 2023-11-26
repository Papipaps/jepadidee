import { defineStore } from 'pinia'

import { useLocalStorage } from '@vueuse/core'

export interface AppUser {
  id?: number
  firstName?: string
  lastName?: string
  email: string
  lastUpload?: Date
  drawings?: Record<string, unknown>[]
}

export interface UserState {
  isAuthenticated: boolean
  user: AppUser | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null
  }),

  actions: {
    setIsAuthenticated(isAuthenticated: boolean): void {
      this.isAuthenticated = isAuthenticated
    },

    setUser(user: AppUser | null): void {
      this.user = user
    },

    login(user: AppUser): void {
      console.log('user', user)
      this.setIsAuthenticated(true)
      this.setUser(user)
      useLocalStorage('jepadidee-logged-user', JSON.stringify(user.value))
    },

    logout(): void {
      this.setIsAuthenticated(false)
      this.setUser(null)
      localStorage.removeItem('jepadidee-logged-user')
    }
  }
})
