import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index.js'
import 'vfonts/Lato.css'// 通用字体
import 'vfonts/FiraCode.css'// 等宽字体
import nativeUI from './common/nativeUI'

const app = createApp(App)

app.use(nativeUI)
app.use(router)
app.use(store)
app.mount('#app')
