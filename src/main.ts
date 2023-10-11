import './assets/main.css'
import 'primeicons/primeicons.css';
import "primevue/resources/themes/saga-orange/theme.css";

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import Vue3Lottie from 'vue3-lottie'

import Button from "primevue/button"

const app = createApp(App)

app.use(PrimeVue);
app.use(Vue3Lottie)

app.component('PrimeButton', Button);

app.mount('#app')
