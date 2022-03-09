import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { show_toast } from '@/utils/toast.js'
import './style/global.css'
import '@/utils/font_icon.js'

const app = createApp(App)

app.config.globalProperties.$showToast = show_toast

app.use(store).use(router).mount('#app')
