<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavigationBar from '@/components/NavigationBar.vue'
  import Toast from 'primevue/toast'
  import InformationModal from './components/InformationModal.vue'
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
