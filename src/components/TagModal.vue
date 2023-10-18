<script setup lang="ts">  
import type { Tag } from './PinMap.vue'
  import { inject, onMounted } from 'vue'
  interface Props {
    preview: Tag
  }
  const emit = defineEmits(['close'])
  const { preview } = defineProps<Props>()
  const deleteTag = inject('removeTag') as (id: string) => void
  
  function handleUpdate() {}
  
  function handleRemove(){
    deleteTag(preview.id)
    emit('close')
  }
  
  onMounted(() => {
    const parent = document.getElementById('tag-modal-description')
    parent?.insertAdjacentHTML('afterbegin', preview.description)
  })
</script>

<template>
  <div class="tag-modal-wrapper">
    <div
      id="tag-modal-description"
      class="tag-modal-description"></div>
    <div class="tag-actions">
      <prime-button
        @click="handleUpdate"
        label="Modifier"
        disabled/>
      <prime-button
        @click="handleRemove"
        label="Supprimer"/>
    </div>
  </div>
</template>


<style scoped>
  .tag-modal-description {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
