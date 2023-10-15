<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/utilities/useModal'; 
import { useToast } from 'primevue/usetoast'
import OpeningView from '@/components/OpeningView.vue'
import ToolBox from './components/ToolBox.vue';
import Toast from 'primevue/toast';
import AnimatedBackground from './assets/AnimatedBackground.vue';
interface Palette {
  name: string;
  hex: string;
}

interface PromptsOptions {
  theme: string;
  time: string;
  subject: string;
  palette: Palette[];
}

const initialPrompt:PromptsOptions = {
  palette:[
  { hex: '#FFF', name: 'white' },
  { hex: '#00FF00', name: 'Cyan' },
  { hex: '#FF0000', name: 'Magenta' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#000000', name: 'Key (Black)' }
],
  subject:'?',
  theme:'?',
  time:'?',
}

const promptsOptions = ref<PromptsOptions>(initialPrompt);
  const toast = useToast();

function handleTime(time: string) { 
    promptsOptions.value.time = time; 
}

function handleTheme(theme: string) { 
    promptsOptions.value.theme = theme; 
}

function handleSubject(subject: string) { 
    promptsOptions.value.subject = subject; 
}

function handlePalette(palette: Palette[]) { 
    promptsOptions.value.palette = palette; 
}

async function copyColorToClipboard(hexColor: string){
  await navigator.clipboard.writeText(hexColor)
  toast.add({ severity: 'success', summary: 'Copié', detail: 'Le code hexadecimal de la couleur selectionné est dans le presse-papier. Ctrl+V pour coller la valeur.', life: 5000 });
}

const getEmptyMessage = (message:string) => message || 'Aucune idée générée'
const {isModalOpen}=useModal(true) 
</script>

<template>
  <Toast/>
  <Transition>
    <opening-view/>
  </Transition>
  <main v-if="isModalOpen">
    <section class="centered-container">
      <div class="content">
        <tool-box
          @subject="handleSubject"
          @theme="handleTheme"
          @time="handleTime"
          @palette="handlePalette" />
        <div class="prompts">
          <span>Tu as </span>
          <p class="card subtitle">{{ getEmptyMessage(promptsOptions.time) }} </p>
          <span>pour dessiner </span>
          <p class="card subtitle">{{ getEmptyMessage(promptsOptions.subject) }}</p>
          <span>dans un theme </span>
          <p class="card subtitle">{{ getEmptyMessage(promptsOptions.theme) }}</p>
          <span>avec les couleurs suivante </span>
          <div class="card subtitle"> 
            <prime-button
              v-for="(palette, index) in promptsOptions.palette" 
              :key="index"
              v-tooltip.top="palette.name"
              class="color-square"
              :style="{backgroundColor: palette.hex || 'white'}"
              @click="copyColorToClipboard(palette.hex)"></prime-button>
          </div> 
          <i>Cliquez sur la couleur pour copier la valeur hex (note: #RougeVertBlanc, donc rouge = #FF0000)</i>
        </div>
      </div>
    </section>
  </main>
  <animated-background/> 
</template>

<style lang="scss" scoped> 

.color-square {
  cursor: pointer;
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 8px;
  border: 1px solid #000;
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

</style> 