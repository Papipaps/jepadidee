import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-orange/theme.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import App from '@/App.vue'
import Vue3Lottie from 'vue3-lottie'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import router from '@/router'
import i18n from './assets/locales/i18n'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ToastService)
app.use(router)
app.use(PrimeVue)
app.use(i18n)
app.use(Vue3Lottie)
app.use(
  createAuth0({
    domain: '',
    clientId: '',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)

app.directive('tooltip', Tooltip)

app.component('PrimeButton', Button)
app.component('PrimeModal', Dialog)

app.mount('#app')
