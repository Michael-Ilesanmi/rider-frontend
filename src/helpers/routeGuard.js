import { useUserStore } from '@/stores/user.js';
import router from "@/router";

const routeGuards = () => {  
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore();
        if (to.meta.requiresAuth && ! userStore.user) {
            console.log('first')
            return next({ name: "LoginPage" });
        }
        next();
    })
};


export default routeGuards;