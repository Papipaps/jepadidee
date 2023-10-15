<script lang="ts" setup>
import lottieLoaderAnimation from '@/assets/animations/loader.json'
import { useModal } from '@/utilities/useModal'; 
import { onMounted, ref } from 'vue';
  
const { isModalOpen, open, close } = useModal(true); 
const isReady = ref(false)

onMounted(()=>{
 setTimeout(()=>{
   isReady.value = true
 },1000)  
})
defineExpose({open,close})
</script> 

<template>
  <div 
    class="lottie-animation-wrapper"
    v-if="isModalOpen"
  > 
    <vue3-lottie 
      :animation-data="lottieLoaderAnimation"
      :height="400"
      :width="400" 
    />
    <p class="subtitle">Pas d'idée ? Ne t'inquiètes pas, on est la pour toi ! </p>
    <prime-button
      rounded
      outlined
      icon="pi pi-check"
      severity="secondary"
      aria-label="Search"
      @click="close"
      :disabled="!isReady"
      :style="{opacity: isReady?'1':'0'}"
    />
  </div>
</template> 

<style lang="scss" scoped>
.lottie-animation-wrapper {
  h1 {
    margin-bottom: 16px;
  }

  .p-button {
    width: 50px;
    height: 50px;
    margin: 10px auto;
  }

  position: absolute;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
  z-index: 99;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: white;
}

</style>

