import './assets/base.css'
import mitt from 'mitt'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const bus = mitt()
const app = createApp(App)
app.config.globalProperties.$bus = bus

app.use(router)

app.mount('#app')
