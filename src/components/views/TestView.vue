<template>
  <main>
    <input type="file" @change="handleImageChange" />
    <button @click="uploadImage">Envoyer l'image</button>
    <img :src="`data:image/png;base64, ${displayedImage}`" />
    <button @click="fetchData">Recuperer l'image</button>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const imageRef = ref(null)
  const displayedImage = ref('')

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      imageRef.value = file
    }
  }

  const uploadImage = async () => {
    if (!imageRef.value) return null

    const formData = new FormData()
    formData.append('image', imageRef.value)
    formData.append('drawing', JSON.stringify({ title: 'titre' }))

    const response = await fetch(`http://localhost:8000/api/drawings/upload`, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.log('Image téléchargée avec succès!')
    } else {
      console.error("Erreur lors du téléchargement de l'image")
    }
  }

  async function fetchData() {
    const res = (await fetch(`http://localhost:8000/api/drawings`, { method: 'get' })).json()
    const image = await res
    displayedImage.value = image.filter((i) => i.image)[0].image
  }
</script>

<style scoped>
  main {
    padding: 400px;
  }
</style>
