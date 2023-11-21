export function saveDataToLocalStorage(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function downloadJSONFromLocalStorage() {
  const imageData = localStorage.getItem('tag-me-up-image')
  const tagsData = localStorage.getItem('tag-me-up-tags')
  if (imageData && tagsData) {
    const currentDate = new Date().toISOString()
    const fileName = `tagmeup-save-${currentDate}.json`
    const blob = new Blob([JSON.stringify({ tags: tagsData, image: imageData })], {
      type: 'application/json'
    })

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = fileName
    a.click()

    URL.revokeObjectURL(a.href)
    return undefined
  } else {
    return 'No data found in localStorage.'
  }
}
