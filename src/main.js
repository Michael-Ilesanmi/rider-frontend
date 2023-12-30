import './assets/main.css'
import "mosha-vue-toastify/dist/style.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/user.js';
import routeGuards from './helpers/routeGuard';

// axios defaults
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"

const app = createApp(App)
app.use(createPinia()).use(router);

const userStore = useUserStore();
userStore.auth().then(() => {
    routeGuards();
    app.mount('#app')
});

