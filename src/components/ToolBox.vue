<script setup lang="ts">
import { defineEmits } from 'vue';
import { times } from '@/assets/ideas/time'
import { themes } from '@/assets/ideas/theme'
import { subjects } from '@/assets/ideas/subjects'

const emit = defineEmits(['theme', 'subject', 'time']);

function generateRandomData(dataType: 'theme' | 'subject' | 'time') {
    const dataItems = dataType === 'theme' ? themes : dataType === 'subject' ? subjects : times;
    const generatedData = getRandomItem(dataItems);
    emit(dataType, generatedData);
}

function getRandomItem(items: string[]): string {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
</script>

<template>
    <div class="tool-actions p-buttonset">
        <prime-button label="Générer un Temps" icon="pi pi-clock" @click="generateRandomData('time')" raised />
        <prime-button label="Générer un Sujet" icon="pi pi-hashtag" @click="generateRandomData('subject')" raised />
        <prime-button label="Générer un Thème" icon="pi pi-wrench" @click="generateRandomData('theme')" raised />
    </div>
</template>
  
  
<style scoped>
.tool-actions>* {
    margin: 8px;
}
</style>
  