<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavigationBar from '@/components/NavigationBar.vue' 
  import Toast from 'primevue/toast';
</script>
<template>
  <main>
    <Toast/>
    <navigation-bar v-if="!$route.meta.hideNavbar" />
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
