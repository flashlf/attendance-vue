import App from "./App.vue"
import router from "./router"
import Vue3Lottie from "vue3-lottie"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { Toaster } from 'vue-sonner'
import "@/style.css"

const app = createApp(App)
app.use(createPinia())
app.component('Toaster', Toaster)
app.use(router)
app.use(Vue3Lottie)
app.mount("#app")
