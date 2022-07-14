import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import getVant from './plugins/plugins'
import store from './store/store'
import 'vant/lib/index.css'
const app = createApp(App)
getVant(app)
app.use(router).use(store)
app.mount('#app')
