import './assets/main.css'
import "primevue/resources/themes/lara-light-indigo/theme.css";

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
