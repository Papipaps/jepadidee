<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottieLoaderAnimation from '@/assets/animations/loader.json'
import ToolBox from '@/components/ToolBox.vue' 
import AnimatedBackground from '@/assets/AnimatedBackground.vue'
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
  }, 1000)
})
const getEmptyMessage = (message:string) => message || 'Aucune idée générée'
</script>

<template>
  <transition 
    appear
    class="lottie-animation-wrapper">
    <div v-if="isLoading">
      <vue3-lottie 
        :animation-data="lottieLoaderAnimation"
        :height="400"
        :width="400" />
      <p class="subtitle">Pas d'idée ? Ne t'inquiètes pas, on est la pour toi ! </p>
      <Transition appear>
        <div
          v-if="isReady"
          class="action">
          <prime-button
            rounded
            outlined
            icon="pi pi-check"
            severity="secondary"
            aria-label="Search"
            @click="isLoading = false"></prime-button>
        </div>
      </Transition>
    </div>
  </transition>
  <div v-if="!isLoading">
    <header>
      <nav>
      </nav>
    </header>
    <main>
      <section class="centered-container">
        <div class="content">
          <tool-box
            @subject="handleSubject"
            @theme="handleTheme"
            @time="handleTime" />
          <div class="prompts">
            <span>Tu as </span>
            <p class="card subtitle">{{ getEmptyMessage(timeRef) }} </p>
            <span>pour dessiner </span>
            <p class="card subtitle">{{ getEmptyMessage(subjectRef) }}</p>
            <span>dans un theme </span>
            <p class="card subtitle">{{ getEmptyMessage(themeRef) }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
  <animated-background/>
</template>

<style lang="scss" scoped> 
.lottie-animation-wrapper {
  h1 {
    margin-bottom: 16px;
  }

  .p-button {
    width: 50px;
    height: 50px;
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

.centered-container { 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:  100vw; 
  .content{
    padding: 24px;
    border-radius: 16px;
    height: 50vh;
    width: fit-content;
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  }
  .prompts{
    margin-top: 32px;
    width: 100%;
    text-align: center;
  }
}

.card {
  border-radius: 10px;
  background-color: #eee; 
  padding: 20px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
