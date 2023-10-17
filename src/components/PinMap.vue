<script setup lang="ts">
  import { computed, inject, onMounted, ref, type Ref } from 'vue'
  import { saveDataToLocalStorage } from '@/utilities/save'
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Editor from 'primevue/editor'
import { useElementSize } from '@vueuse/core/index.mjs'

  export interface Board {
    image: string
    tags: Tag[]
  }

  export interface Tag {
    id: string
    title: string
    description: string
    x: number
    y: number
    size: string
    color: string
  }
  const tagSizes = ['15px', '20px', '25px'] as const
  type TagSizesType = (typeof tagSizes)[number]

  const initialState: Tag = {
    color: '',
    description: '',
    id: '',
    size: '',
    title: '',
    x: 0,
    y: 0
  }

  const image = inject('boardImage') as Ref<string>
  const tags = inject('boardTags') as Ref<Tag[]>
  const addTag = inject('addTag') as (value: Tag) => undefined
  const settings = ref<{ size: TagSizesType; color: string }>({ color: '#FF0000', size: '15px' })
  const newTag = ref<Tag>(initialState)
  const visible = ref<boolean>(false)
  const BoardImageRef = ref(null)
  const {width: imageWidth,height: imageHeight} = useElementSize(BoardImageRef)
  const emit = defineEmits(['click-tag'])

  function handleClick(event: MouseEvent) {
    if (image.value) {
      newTag.value.x = event.offsetX*100/imageWidth.value
      newTag.value.y = event.offsetY*100/imageHeight.value
       visible.value = !visible.value
    }
  }

  function handleDialogClose() {
    newTag.value.title = ''
    newTag.value.description = ''
  }

  function changePinSize(size: TagSizesType) {
    settings.value.size = size
  }

  function handleHighlightPoint(id: string) {
    const preview = document.getElementById(id)
    if (preview) {
      const mouseEnterEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true
      })

      preview.dispatchEvent(mouseEnterEvent)

      setTimeout(() => {
        const mouseLeaveEvent = new MouseEvent('mouseleave', {
          bubbles: true,
          cancelable: true
        })

        preview.dispatchEvent(mouseLeaveEvent)
      }, 500)
    }
  }

  function handleCreateTag() {
    if (image.value && tags.value && newTag.value) {
      visible.value = true
      const tagTitle = newTag.value.title
      const id = crypto.randomUUID()
      newTag.value = {
        ...newTag.value,
        id: id,
        title: tagTitle,
        size: settings.value.size,
        color: '#' + settings.value.color
      }
      createPoint(newTag.value)
      addTag(newTag.value)
      saveDataToLocalStorage('tag-me-up-image', image.value)
      saveDataToLocalStorage('tag-me-up-tags', tags.value)
      handleHighlightPoint(id)
      newTag.value = initialState
      visible.value = false
    }
  }

  function createPoint(point: Tag) {
    console.log(point)
    const wrapper = document.getElementById('board')
    const span = document.createElement('span')
    span.title = point.title
    span.className = 'tag'
    span.id = point.id
    span.onclick = () => emit('click-tag', point.id)

    span.style.position = 'absolute'
    span.style.left = `${point.x}%`
    span.style.top = `${point.y}%`
    span.style.transition = 'ease-in-out 100ms'
    span.style.transform = 'translate(-50%,-50%)'

    span.onmouseover = () => {
      span.style.outlineOffset = '.6rem'
      span.style.outline = '2px solid lightsalmon'

      span.style.cursor = 'pointer'
      span.style.scale = '1.3'
      span.style.backgroundColor = 'lightsalmon'
    }
    span.onmouseleave = () => {
      span.style.outline = 'none'
      span.style.scale = '1'
      span.style.backgroundColor = point.color || 'white'
    }

    span.style.zIndex = '10'
    span.style.width = point.size
    span.style.height = point.size
    span.style.borderRadius = '50%'
    span.style.backgroundColor = point.color || 'white'

    wrapper?.appendChild(span)
  }

  const isError = computed(() => {
    const input = newTag.value.title.trim()
    return input.length === 0 || input.length > 32
  })
  const getBackgroundImg = computed(() => {
    if (image.value &&  image.value !== '') {
      return image.value
    }
    return '/not_found.jpg'
  })

  onMounted(()=>{ 
    console.log(tags.value)
    tags.value.forEach((t)=>createPoint(t)) 
  })
</script>
<template>
  <section>
    <Dialog
      @after-hide="handleDialogClose"
      :dismissable-mask="true"
      v-model:visible="visible"
      header="Ajoutez une nouvelle épingle"
      modal
    >
      <form>
        <label for="title">Titre</label>
        <InputText
          minlength="1"
          maxlength="20"
          id="title"
          v-model="newTag.title"
          aria-describedby="title-help"
          placeholder="..."
        />
        <p
          v-show="isError"
          class="error-msg">Le titre ne peut pas être vide. </p>
        <br />
        <label for="title">Ajoutez une description</label>
        <Editor
          editor-style="height: 350px"
          id="description"
          v-model="newTag.description" />
        <div class="pen-tool">
          <label for="color">Couleur</label>
          <ColorPicker
            v-model="settings.color"
            for="color"></ColorPicker>
          <label for="size">Taille</label>
          <div class="pen-tool-size">
            <span
              v-for="(size, index) in tagSizes"
              :key="index"
              :style="{ width: size, height: size }"
              @click="changePinSize(size)"
            ></span>
          </div>
        </div>
      </form>
      <prime-button
        label="Confirmer"
        :disabled="isError"
        @click="handleCreateTag"></prime-button>
    </Dialog> 
    <div 
      class="board">
      <!-- Liste des épingles -->
      <div
        class="boardImg">
        <div
          id="board"
          class="pin-wrapper"
        >
          <img 
            ref="BoardImageRef"
            @click="handleClick"
            :src="getBackgroundImg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.board{  
  width: 80vw; 
  max-height: calc(80vh - var(--navbar-height));
  aspect-ratio: 1 / 1; 
}
.pin-wrapper{
  position: relative;
  width: fit-content;
  height: fit-content;
}
.boardImg{ 
  height: 100%; 
  width: 100%;
  display: flex;  
  justify-content: center;
  img{
    cursor: pointer;
    max-width:100%;
    max-height:100%; 
    min-height:300px ;
    min-width: 300px;
    margin:auto 0;
    position: relative;
    top: 0;
    left: 0;    
  }
}  
</style>
