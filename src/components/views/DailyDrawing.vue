<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie'

import '@/assets/animations/drawing.json'
const isLoading = ref(true)

onMounted(() => {
  setInterval(()=>{
    isLoading.value = false
  },1000)
console.log('fjeiozj')
})
</script>

<template>
  <main>
    <Vue3Lottie 
      :animation-data="lottieDrawingAnimation"
    />
  </main>  
</template>

<style lang="scss" scoped>
main{
  background-color: red;
  width: 100%;
  height: 100%;
}
</style>