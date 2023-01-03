import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { IonicVue } from '@ionic/vue';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(IonicVue)
app.use(plugin, defaultConfig())

router.isReady().then(() => {
    app.mount('#app');
});
