import { useUserStore } from '@/stores/user.js';
import router from "@/router";

const routeGuards = () => {  
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore();
        if (to.meta.requiresAuth && ! userStore.user) {
            return next({ name: "LoginPage" });
        }
        next();
    })
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore();
        if (to.meta.hasRiderGuard && userStore?.user?.role !== 'rider') {
            return next({ name: "DashboardIndex" });
        }
        next();
    })
};


export default routeGuards;