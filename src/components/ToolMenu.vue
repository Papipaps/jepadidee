<script setup lang="ts">
  import { inject, type Ref } from 'vue'
  import { PrimeIcons } from 'primevue/api'
  import type { Tag } from './PinMap.vue'
  import { downloadJSONFromLocalStorage, saveDataToLocalStorage } from '@/utilities/save'
  import { useToast } from 'primevue/usetoast'

  const toast = useToast()
  const tags = inject<Ref<Tag[]>>('boardTags')
  const image = inject<Ref<string>>('boardImage')
  const updateImage = inject('updateImage') as (value: string) => void
  const updateTags = inject('updateTags') as (tags: Tag[]) => void
  const clearImage = inject('clearTags') as () => void
  const clearTags = inject('clearImage') as () => void

  function handleSelect(e: Event, mode: 'json' | 'image') {
    const files = (e.target as HTMLInputElement).files

    if (!files) return

    const file = files[0]

    const reader = new FileReader()
    if (mode === 'image') {
      if (!file || file.size > 1_048_576 * 5) {
        toast.add({
          severity: 'error',
          summary: 'Image trop grande',
          detail: "L'image doit faire moins de 5Mo !",
          life: 3000
        })
        return
      }
      reader.readAsDataURL(file)
    }
    if (mode === 'json') reader.readAsText(file)

    reader.onloadend = () => {
      const data = reader.result as string
      if (data) {
        if (mode === 'image') {
          updateImage(data)
        } else if (mode === 'json') {
          const fileContent = JSON.parse(data)
          const savedImage = JSON.parse(fileContent.image)
          const savedTags = JSON.parse(fileContent.tags)
          updateImage(savedImage)
          updateTags(savedTags)
          saveDataToLocalStorage('tag-me-up-image', image?.value)
          saveDataToLocalStorage('tag-me-up-tags', tags?.value)
        }
      }
    }
  }

  function clearBoard() {
    localStorage.removeItem('tag-me-up-image')
    localStorage.removeItem('tag-me-up-tags')
    clearTags()
    clearImage()
    updateTags([])
  }

  function exportBoard() {
    if (image?.value !== '' && !downloadJSONFromLocalStorage()) {
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Tableau enregistré avec succes !',
        life: 3000
      })
    } else {
      toast.add({
        severity: 'warn',
        summary: 'Action impossible',
        detail: 'Aucun tableau épinglé à enregistrer.',
        life: 3000
      })
    }
  }
</script>
<template>
  <div class="actions">
    <div class="btn-group">
      <prime-button v-tooltip.top="$t('tagmeup.load')" class="upload-wrapper-btn">
        <label for="imageUpload" :class="PrimeIcons.IMAGE" style="font-size: 1.5rem">
          <input
            @change="handleSelect($event, 'image')"
            type="file"
            id="imageUpload"
            accept="image/png, image/jpeg"
            style="display: none"
          />
        </label>
      </prime-button>
      <prime-button v-tooltip.top="$t('tagmeup.import')" class="upload-wrapper-btn">
        <label for="jsonUpload" :class="PrimeIcons.DOWNLOAD" style="font-size: 1.5rem">
          <input
            @change="handleSelect($event, 'json')"
            type="file"
            id="jsonUpload"
            accept="application/json,.json"
            style="display: none"
          />
        </label>
      </prime-button>
    </div>
    <div class="btn-group">
      <prime-button
        :icon="PrimeIcons.SAVE"
        v-tooltip.top="$t('tagmeup.save')"
        severity="success"
        @click="exportBoard"
      />
      <prime-button
        :icon="PrimeIcons.REFRESH"
        v-tooltip.top="$t('tagmeup.clear')"
        severity="danger"
        @click="clearBoard"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .actions {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    height: 100px;
    width: 200px;
    z-index: 2;
    transition: ease-in 200ms;
    position: absolute;
    background-color: white;
    box-shadow: 0 0 5px 5px rgba(255, 150, 0, 0.1);
    bottom: 2vh;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    border: 1px solid rgba(255, 150, 0, 0.3);
    .p-button {
      border: 1px solid white;
      width: 100%;
      height: 100%;
      padding: 0;
      label,
      i {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: auto 0;
      }
    }
    .btn-group {
      display: flex;
    }
  }
</style>
