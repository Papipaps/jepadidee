<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import lottieLoaderAnimation from '@/assets/animations/loader.json'
import ToolBox from '@/components/ToolBox.vue'
const isLoading = ref(true)
const isReady = ref(false)
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
    isReady.value = true
  }, 3000)
})
const emptyidea = computed(() => (!(themeRef.value || timeRef.value || subjectRef.value)))
</script>

<template>
  <Transition appear class="lottie-animation">
    <div v-if="isLoading">
      <vue3-lottie :animation-data="lottieLoaderAnimation" :height="400" :width="400" />
      <h1 class="title">Pas d'idée ? Ne t'inquiètes pas, on est la pour toi ! </h1>
      <Transition :duration="1000" appear>
        <div v-if="isReady" class="action">
          <prime-button @click="isLoading = false" rounded outlined icon="pi pi-check" severity="secondary"
            aria-label="Search"></prime-button>
        </div>
      </Transition>
    </div>
  </Transition>
  <div v-if="!isLoading">
    <header>
      <nav>
      </nav>
    </header>
    <main>
      <div class="centered-container">
        <tool-box @subject="handleSubject" @theme="handleTheme" @time="handleTime" />
        <div>
          <span>Tu as </span>
          <p class="card subtitle">{{ timeRef || 'Aucune idée générée' }} </p>
          <span>pour dessiner </span>
          <p class="card subtitle">{{ subjectRef || 'Aucune idée générée' }}</p>
          <span>dans un theme </span>
          <p class="card subtitle">{{ themeRef || 'Aucune idée générée' }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.lottie-animation {
  h1 {
    margin-bottom: 16px;
  }

  .p-button {
    scale: 1.5;
  }

  position: absolute;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

.card {
  border-radius: 10px;
  background-color: #eee;
  width: 200px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
