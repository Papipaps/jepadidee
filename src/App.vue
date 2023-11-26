<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavigationBar from '@/components/NavigationBar.vue'
  import Toast from 'primevue/toast'
  import InformationModal from './components/InformationModal.vue'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { watch } from 'vue'
  import { useUserStore, type AppUser } from './stores/user-store'

  const { user: authUser } = useAuth0()
  const { login, isAuthenticated } = useUserStore()

  watch([authUser], () => {
    if (!isAuthenticated && authUser.value && authUser.value.email) {
      const appUser: AppUser = {
        email: authUser.value.email,
        drawings: [],
        firstName: authUser.value.given_name
      }
      login(appUser)
    }
  })
</script>
<template>
  <main>
    <div class="HUD" v-if="!$route.meta.hideHUD">
      <Toast />
      <InformationModal />
      <navigation-bar />
    </div>
    <RouterView />
  </main>
</template>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
