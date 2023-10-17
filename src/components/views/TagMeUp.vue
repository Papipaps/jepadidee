<script setup lang="ts">
  import ToolMenu from '@/components/ToolMenu.vue'
  import PinMap, { type Tag } from '@/components/PinMap.vue'
  import { onMounted, provide, ref, type Ref } from 'vue'
  import PinList from '@/components/PinList.vue'
  import Dialog from 'primevue/dialog' 
  import TagModal from '@/components/TagModal.vue'
  const image = ref('')
  const tags = ref<Tag[]>([])

  const updateImage = (value: string) => {
    image.value = value
  }
  const clearImages = () => {
    image.value = ''
  }
  const updateTags = (value: Tag[]) => {
    tags.value = value
  }
  const clearTags = () => {
    tags.value = []
  }
  const addTag = (Tag: Tag) => {
    tags.value.push(Tag)
  }
  const removeTag = (id: string) => {
    tags.value = tags.value.filter((t) => t.id !== id)
  }

  provide<Ref<string>>('boardImage', image)
  provide<Ref<Tag[]>>('boardTags', tags)

  provide('updateImage', updateImage)
  provide('clearImage', clearImages)

  provide('updateTags', updateTags)
  provide('clearTags', clearTags)
  provide('addTag', addTag)
  provide('removeTag', removeTag)

  const isDialogVisible = ref<boolean>(false)
  const preview = ref<Tag | null>()

  function handleTagSelection(id: string) {
    const previewTag = tags.value.find((tag) => tag.id === id)
    if (previewTag) {
      preview.value = previewTag
      isDialogVisible.value = true
    }
  }

  function toggleDialog() { 
    isDialogVisible.value = !isDialogVisible.value
  }
  function handleDialogClose() {
    toggleDialog()
    preview.value = null
  }
  onMounted(() => {
    const saveImage = localStorage.getItem('tag-me-up-image')
    const saveTags = localStorage.getItem('tag-me-up-tags')
    if (saveImage && saveTags) {
      updateImage( JSON.parse(saveImage))
      updateTags(JSON.parse(saveTags)) 
    }
  })
</script>

<template>
  <main>
    <prime-button
      v-show="!isDialogVisible"
      @click="toggleDialog"
      class="toggle-pin-list"
      icon="pi pi-angle-left"
      aria-label="Filter"
      rounded/>
    <tool-menu />
    <div class="pin-map-wrapper">
      <pin-map
        class="pin-map"
        @click-tag="handleTagSelection" />
    </div>
    <section>
      <Dialog
        v-model:visible="isDialogVisible"
        :dismissable-mask="true"
        maximizable
        close-on-escape
        modal
        @after-hide="handleDialogClose"
        v-if="preview"
      >
        <template #header>
          <h2>{{ preview.title }}</h2>
        </template>
        <tag-modal
          :preview="preview"
          @close="handleDialogClose" />
      </Dialog>
      <Dialog
        v-else
        maximizable
        position="right"
        v-model:visible="isDialogVisible"
        close-on-escape
        modal
        :dismissable-mask="true"
      >
        <template #header>
          <h3>
            Retrouvez ici toutes vos épingles <br />
            (plus pratique que de chercher sur l'image 😎✌️)
          </h3>
        </template>
        <pin-list
          @click-tag="handleTagSelection"
          :tags="tags" />
        <template #footer>
          <prime-button
            @click="clearTags"
            label="Tout Supprimer"
            icon="pi pi-times"
            severity="danger"
            raised></prime-button>
        </template>
      </Dialog>
    </section>
  </main>
</template>

<style lang="scss" scoped> 
.pin-map-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle-pin-list{
  z-index: 10;
  position: absolute;
  scale: 1.5;
  right: 3vh;
  bottom: calc(50vh - var(--navbar-height));
  &:hover{
    scale: 1.7;
  }
  transition: ease-in 50ms;
}
</style>
