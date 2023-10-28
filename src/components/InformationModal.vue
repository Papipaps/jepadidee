<script setup lang="ts">
import router from '@/router';
import { useModal } from '@/utilities/useModal';

const {isModalOpen,open} = useModal()
 
</script>

<template>
  <prime-modal
    v-model:visible="isModalOpen"
    modal
    :dismissable-mask="true"
    :header="`Comment fonctionne la page ${String(router.currentRoute.value.name)}`"
    :style="{ width: '50vw' }">
    <slot name="content">
      <p class="text-content">
        {{$t(`${router.currentRoute.value.path.replace("/",'')}.explaination`)}}
      </p>
    </slot>
  </prime-modal>
  <i
    @click="open"
    class="test pi pi-question-circle"
    style="font-size: 2rem">
  </i>
</template>

<style lang="scss" scoped>
.test{
  position: absolute;
  z-index: 100;
  top: calc(var(--navbar-height) + 2vh);
  right: 50vw;
  transform: translateX(50%);
  opacity: 0.5;
  cursor: pointer;
  &:hover{
    opacity: 1;
    color: var(--accent-color);
  }
  font-weight: 700;
  font-size: larger;
}

.text-content{
  text-align: justify;
  padding: 16px;
  // font-style: italic;
  line-height: 1.7rem;
  color: var(--text-color);
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
}
</style>