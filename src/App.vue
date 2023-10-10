<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import lottieLoaderAnimation from '@/assets/animations/loader.json'
import ToolBox from '@/components/ToolBox.vue'
const isLoaded = ref(false)
const themeRef = ref("")
const timeRef = ref("")
const subjectRef = ref("")

function handleTime(time: string) {
  timeRef.value = time
}
function handleTheme(theme: string) {
  themeRef.value = theme
}
function handleSubject(subject: string) {
  subjectRef.value = subject
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 3000)
})
const emptyidea = computed(() => (!(themeRef.value || timeRef.value || subjectRef.value)))
</script>

<template>
  <Transition appear class="lottie-animation">
    <div v-if="!isLoaded">
      <vue3-lottie :animation-data="lottieLoaderAnimation" :height="400" :width="400" />
      <h1 class="title">Pas d'idée ? Ne t'inquiètes pas, on est la pour toi ! </h1>
    </div>
  </Transition>
  <div v-if="isLoaded">
    <header>
      <nav>
        <tool-box @subject="handleSubject" @theme="handleTheme" @time="handleTime" />
      </nav>
    </header>
    <main>
      <p v-if="emptyidea">
        Aucune idée générée
      </p>
      <p v-else>
        {{ timeRef }} {{ themeRef }}{{ subjectRef }}
      </p>
    </main>
  </div>
</template>

<style scoped> .lottie-animation {
   position: absolute;
   width: 100%;
   height: 100%;
   padding: 100px 50px;
   display: flex;
   justify-content: center;
   text-align: center;
   flex-direction: column;
 }

 .v-enter-active,
 .v-leave-active {
   transition: opacity 0.5s ease;
 }

 .v-enter-from,
 .v-leave-to {
   opacity: 0;
 }
</style>
