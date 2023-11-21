<script setup lang="ts">
  import router from '@/router'
  import { onMounted, ref, watch } from 'vue'

  const countDown = ref(5)
  function start() {
    setInterval(() => {
      countDown.value -= 1
    }, 1000)
  }
  watch([countDown], () => {
    if (countDown.value < 0) router.push('generator')
  })
  onMounted(() => {
    start()
  })
</script>
<template>
  <main>
    <h1 class="title">Cette page n'existe pas.</h1>
    <p class="subtitle"
      >NE REVIENS PAS ICI SINON JE TE
      <span style="color: red; font-size: x-large; font-weight: 900">#$ù*$^!&</span></p
    >
    <img src="/src/assets/images/ori.webp" />
    <br />
    <p
      >Vous allez être redirigé dans
      <span style="font-weight: 700">{{ countDown }}</span> secondes</p
    >
  </main>
</template>

<style scoped>
  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    filter: brightness(2.7);
  }
</style>
