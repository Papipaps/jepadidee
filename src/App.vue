<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue';
import { onMounted } from 'vue';
const {options} = useRouter()
onMounted(()=>{
  console.log(options)
})
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