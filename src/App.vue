<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavigationBar from '@/components/NavigationBar.vue' 
</script>
<template>
  <main>
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
