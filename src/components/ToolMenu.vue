<script setup lang="ts">
  import { useToast } from 'primevue/usetoast'
  import { downloadJSONFromLocalStorage, saveDataToLocalStorage } from '@/utilities/save'
  import { inject, type Ref } from 'vue'
  import type { Tag } from './PinMap.vue'
  import { PrimeIcons } from 'primevue/api' 
  const tags = inject<Ref<Tag[]>>('boardTags')
  const image = inject<Ref<string>>('boardImage')
  const updateImage = inject('updateImage') as (value: string) => void
  const updateTags = inject('updateTags') as (tags: Tag[]) => void
  const clearImage = inject('clearTags') as () => void
  const clearTags = inject('clearImage') as () => void
  const toast = useToast()

  function handleSelect(e: Event, mode: 'json' | 'image') {
    const files = (e.target as HTMLInputElement).files
    if(!files) return
    const file = files[0]
    const reader = new FileReader()
    if (mode === 'image') reader.readAsDataURL(file)
    if (mode === 'json') reader.readAsText(file)

    reader.onloadend = () => {
      const data = reader.result as string
      if (data) {
        if (mode === 'image') {
          updateImage(data)
        } else if (mode === 'json') {
          const fileContent = JSON.parse(data as string)
          updateImage(JSON.parse(fileContent.image))
          updateTags(JSON.parse(fileContent.tags))
          saveDataToLocalStorage('tag-me-up-image', image)
          saveDataToLocalStorage('tag-me-up-tags', tags)
        }
      }
    }
  }

  function clearBoard() {
    localStorage.removeItem('tag-me-up-image')
    localStorage.removeItem('tag-me-up-tags')
    const pinList = document.getElementById('board')
    if (pinList) {
      const tagElements = pinList.querySelectorAll('.tag')
      tagElements.forEach((element) => {
        element.remove()
      })
    }
    clearTags()
    clearImage()
  }

  function exportBoard() {
    if (image?.value !== '') {
      downloadJSONFromLocalStorage().then(() => {
        toast.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Tableau enregistré avec succes !',
          group: 'br',
          life: 3000
        })
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Action impossible',
        detail: 'Aucun tableau à enregistrer',
        group: 'br',
        life: 3000
      })
    }
  }
</script>
<template>
  <Toast
    position="top-right"
    group="br" />
  <div class="actions"> 
    <div>
      <prime-button
        v-tooltip.top="$t('load')"
        class="upload-wrapper-btn"
      >
        <label
          for="imageUpload"
          :class="PrimeIcons.IMAGE "
          style="font-size: 1.5rem"
        >
          <input
            @change="handleSelect($event,'image')"
            type="file"
            id="imageUpload"
            accept="image/*"
            style="display: none"
          >
        </label>
      </prime-button>

      <prime-button
        v-tooltip.top="$t('import')"
        class="upload-wrapper-btn"
      >
        <label
          for="imageUpload"
        >
          <i
            :class="PrimeIcons.DOWNLOAD"
            style="font-size: 1.5rem"
          />
        </label>
        <input
          @change="handleSelect($event,'json')"
          type="file"
          id="imageUpload"
          accept="application/json"
          style="display: none"
        >
      </prime-button>
    </div>
    <div>

      <prime-button
        :icon="PrimeIcons.SAVE"
        v-tooltip.top="$t('save')"
        severity="success"
        @click="exportBoard"
      />
      <prime-button
        :icon="PrimeIcons.REFRESH"
        v-tooltip.top="$t('clear')"
        severity="danger"
        @click="clearBoard"
      /> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
 .actions {
  button {
    cursor: pointer;
  } 
  z-index: 2;
  transition: ease-in 200ms; 
  position: absolute;
  bottom: 2vh;
  background-color: white;
  padding: 20px;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  gap: 5px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.3);
}
</style>
