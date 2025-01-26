import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueQrcode from 'vue-qrcode'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(ElementPlus)
app.component('vue-qrcode', VueQrcode)

app.mount('#app')
