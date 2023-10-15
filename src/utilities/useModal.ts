import { onMounted, ref } from 'vue'
 
 export function useModal(openOnMount=false) {  
  const isModalOpen = ref(false)
  function close(){ 
    isModalOpen.value = false
  }
  function open(){ 
    isModalOpen.value = true
  }
  onMounted(()=>{
     openOnMount && open() 
})
 
  return {  isModalOpen, close, open }
}