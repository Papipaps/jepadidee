import { defineStore } from 'pinia';

interface UserState {
  isAuthenticated: boolean;
  user: Record<string, unknown> | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    setIsAuthenticated(isAuthenticated: boolean): void {
      this.isAuthenticated = isAuthenticated;
    },

    setUser(user: Record<string, unknown> | null): void {
      this.user = user;
    },

    login(user: Record<string, unknown>): void {
      this.setIsAuthenticated(true);
      this.setUser(user);
    },

    logout(): void {
      this.setIsAuthenticated(false);
      this.setUser(null);
    },
  },
});
