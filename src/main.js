import './assets/main.css'
import "mosha-vue-toastify/dist/style.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user.js';
import routeGuards from './helpers/routeGuard';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// axios defaults
axios.defaults.baseURL = "https://rider-backend-production.up.railway.app/api/"


routeGuards();

export const app = createApp(App)
app
    .use(createPinia())
    .use(router)
    .use(LoadingPlugin);

const userStore = useUserStore();
userStore.auth().then(() => {
    app.mount('#app')
});

