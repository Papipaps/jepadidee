<script lang="ts" setup>
  import lottieLoaderAnimation from '@/assets/animations/loader.json'
  import router from '@/router'
  import { useModal } from '@/utilities/useModal'

  const { isModalOpen, open, close } = useModal(true)
  function handleClick() {
    close()
    setTimeout(() => {
      router.push('generator')
    }, 500)
  }
  defineExpose({ open, close })
</script>

<template>
  <Transition appear>
    <div class="lottie-animation-wrapper" v-if="isModalOpen">
      <vue3-lottie :animation-data="lottieLoaderAnimation" :height="400" :width="400" />
      <p class="subtitle">Pas d'idée ? Ne t'inquiètes pas, on est la pour toi ! </p>
      <Transition>
        <prime-button
          rounded
          outlined
          class="go-btn"
          icon="pi pi-check"
          severity="secondary"
          aria-label="Search"
          @click="handleClick"
        />
      </Transition>
    </div>
  </Transition>
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
      transition: ease-in 50ms;
      &:hover {
        scale: 1.2;
        color: var(--accent-color);
      }
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
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
