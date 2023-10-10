<template>
    <div>
        <prime-button label="Check" icon="pi pi-check" @click="generateRandomData('theme')">Générer un Thème</prime-button>
        <prime-button label="Check" icon="pi pi-check" @click="generateRandomData('subject')">Générer un
            Sujet</prime-button>
        <prime-button label="Check" icon="pi pi-check" @click="generateRandomData('time')">Générer un Temps</prime-button>
    </div>
</template>
  
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
  
<style scoped></style>
  