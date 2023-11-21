<script setup lang="ts">
  import { ref } from 'vue'
  import { useToast } from 'primevue/usetoast'
  import ToolBox from '@/components/ToolBox.vue'
  import AnimatedBackground from '@/assets/AnimatedBackground.vue'
  interface Palette {
    name: string
    hex: string
  }

  interface PromptsOptions {
    style: string
    time: string
    subject: string
    palette: Palette[]
  }

  const initialPrompt: PromptsOptions = {
    palette: [
      { hex: '#FFF', name: 'white' },
      { hex: '#00FF00', name: 'Vert' },
      { hex: '#FF0000', name: 'Rouge' },
      { hex: '#0000FF', name: 'Bleu' },
      { hex: '#000000', name: 'Noir' }
    ],
    subject: '?',
    style: '?',
    time: '?'
  }

  const promptsOptions = ref<PromptsOptions>(initialPrompt)
  const toast = useToast()

  function handleTime(time: string) {
    promptsOptions.value.time = time
  }

  function handleStyle(style: string) {
    promptsOptions.value.style = style
  }

  function handleSubject(subject: string) {
    promptsOptions.value.subject = subject
  }

  function handlePalette(palette: Palette[]) {
    promptsOptions.value.palette = palette
  }

  async function copyColorToClipboard(palette: Palette) {
    await navigator.clipboard.writeText(palette.hex)
    toast.add({
      severity: 'success',
      summary: 'Copié !',
      detail: `Le code hexadecimal ${palette.hex} est dans le presse-papier. Ctrl+V pour coller la valeur.`,
      life: 5000
    })
  }
</script>

<template>
  <main>
    <section class="centered-container">
      <div class="content">
        <tool-box
          @subject="handleSubject"
          @style="handleStyle"
          @time="handleTime"
          @palette="handlePalette"
        />
        <div class="prompts">
          <span>Tu as </span>
          <p class="card subtitle">{{ promptsOptions.time }} </p>
          <span>pour dessiner </span>
          <p class="card subtitle">{{ promptsOptions.subject }}</p>
          <span>dans un style </span>
          <p class="card subtitle">{{ promptsOptions.style }}</p>
          <span>avec les couleurs suivante </span>
          <div class="card subtitle">
            <prime-button
              v-for="(palette, index) in promptsOptions.palette"
              :key="index"
              v-tooltip.top="palette.hex"
              class="color-square"
              :style="{ backgroundColor: palette.hex }"
              @click="copyColorToClipboard(palette)"
            ></prime-button>
          </div>
          <i
            >Cliquez sur la couleur pour copier la valeur hex (note: #RougeVertBleu, donc rouge =
            #FF0000)</i
          >
        </div>
      </div>
    </section>
  </main>
  <animated-background />
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
    width: 100vw;
    .content {
      padding: 24px;
      border-radius: 16px;
      background-color: white;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    }
    .prompts {
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
