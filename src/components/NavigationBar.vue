<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useWindowSize } from '@vueuse/core'
  import router from '@/router'

  const { width } = useWindowSize()
  const isResponsive = ref(false)

  const toggleResponsive = () => {
    isResponsive.value = !isResponsive.value
  }
  function handleNavigation(to: string) {
    router.push(to).then(() => (isResponsive.value = false))
  }
  const isWindowSmall = computed(() => width.value < 600)
  const tabs = router.getRoutes()
    .filter(route=>route.name && route.name !== 'landing')
    .map(route => { 
      return {
        name: route.name,
        path: route.path
      }
    }) 
</script>
<template>
  <prime-modal
    modal
    header="Header"
    v-model:visible="isResponsive"
    :dismissable-mask="true"
    :show-header="false"
    :style="{
      width: '90vw',
      maxWidth: '1000px',
      backgroundColor: 'white'
    }"
    base-z-index="99"
    block-scroll
  >
    <template #container>
      <div class="actions responsive">
        <prime-button
          v-for="(tab, index) in tabs"
          class="responsive-action"
          :key="index"
          @click="handleNavigation(tab.path)"
        >
          {{ tab.name }}
        </prime-button>
      </div>
    </template>
  </prime-modal>
  <nav>
    <ul
      class="topnav"
      :class="{ responsive: isWindowSmall }">
      <div
        class="actions"
        v-show="!isWindowSmall">
        <router-link
          class="isactive"
          v-for="(tab, index) in tabs"
          :key="index"
          :to="tab.path">
          {{ tab.name }}
        </router-link>
      </div>
      <prime-button
        v-if="isWindowSmall"
        icon="pi pi-bars"
        aria-label="Menu"
        @click="toggleResponsive"
      >
      </prime-button>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .topnav {
    z-index: 100;
    position: fixed;
    display: flex;
    width: 100%;
    height: var(--navbar-height);
    top: 0;
    left: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: #333;
    .actions {
      display: flex;
      justify-content: space-around;
      width: 100%;
      a {
        color: #f2f2f2;
        text-align: center;
        line-height: 28px;
        text-decoration: none;
        width: 100%;
        height: 100%;
        &:hover {
          background-color: var(--accent-color);
          filter: opacity(0.9);
          color: black;
        }
      }
    }
    .p-button {
      float: right;
      width: 72px;
    }
  }
  .topnav.responsive {
    display: flex;
    justify-content: center;
    bottom: 0;
  }
  .actions.responsive {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--text-color);
    .responsive-action {
      text-decoration: none;
      color: var(--text-color-white);
      background-color: var(--text-color);
      height: 50px;
      text-align: center;
      line-height: 50px;
      &:hover {
        background-color: var(--accent-color);
        color: var(--text-color);
      }
    }
  }
</style>
