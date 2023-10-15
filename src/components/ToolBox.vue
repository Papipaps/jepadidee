<script setup lang="ts">
import { defineEmits } from 'vue';
import { times } from '@/assets/ideas/time'
import { themes } from '@/assets/ideas/theme'
import { subjects } from '@/assets/ideas/subjects'

const emit = defineEmits(['theme', 'subject', 'time','palette']);

function generateRandomData(dataType: 'theme' | 'subject' | 'time') {
    const dataItems = dataType === 'theme' ? themes : dataType === 'subject' ? subjects : times;
    const generatedData = getRandomItem(dataItems);
    emit(dataType, generatedData);
}

function getRandomItem(items: string[]): string {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function getRandomPalette(number = 5) {
  const palette = [];

  for (let i = 0; i < number; i++) {
    const randomColor = {
      name: `Couleur ${i + 1}`,
      hex: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    palette.push(randomColor);
  }

  emit('palette',palette);
}

</script>

<template>
  <div class="tool-actions">
    <prime-button
      label="Générer une Durée"
      icon="pi pi-clock"
      raised
      rounded
      @click="generateRandomData('time')" />
    <prime-button
      label="Générer un Sujet"
      icon="pi pi-hashtag"
      raised
      rounded
      @click="generateRandomData('subject')" />
    <prime-button
      label="Générer un Thème"
      icon="pi pi-wrench"
      raised
      rounded
      @click="generateRandomData('theme')" />  
    <prime-button
      label="Générer une Palette"
      icon="pi pi-wrench"
      raised
      rounded
      @click="getRandomPalette()" /> 
  </div>
</template>
  
  
<style scoped>
.tool-actions>* {
    margin: 8px;
}
</style>
  