import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import mitt from 'mitt';
const app = createApp(App)

app.config.globalProperties.$bus = mitt();

app.use(router)

app.mount('#app')
