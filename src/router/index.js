import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/auth/LoginPage.vue'
import UserSignUp from '@/views/auth/UserRegisterPage.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import DashboardIndex from '@/views/dashboard/DashboardIndex.vue'
import PlaceOrder from '@/views/dashboard/PlaceOrder.vue'
import OrderHistory from '@/views/dashboard/OrderHistory.vue'
import Rating from '@/views/dashboard/Rating.vue'

const routes = [
  {
    meta:{
      title: 'Sign In',
    },
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    meta:{
      title: 'Sign Up',
    },
    path: '/register',
    name: 'UserSignUp',
    component: UserSignUp
  },
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    component: DashboardLayout,
    meta:{
      requiresAuth: true,
    },
    children:[
      {
        meta:{
          title: 'Home',
        },
        path: '',
        name: 'DashboardIndex',
        component: DashboardIndex
      },
      {
        meta:{
          title: 'Place Order',
        },
        path: 'order',
        name: 'PlaceOrder',
        component: PlaceOrder
      },
      {
        meta:{
          title: 'My Order History',
        },
        path: 'history',
        name: 'OrderHistory',
        component: OrderHistory
      },
      {
        meta:{
          hasRiderGuard: true,
          title: 'My Ratings',
        },
        path: 'rating',
        name: 'Rating',
        component: Rating
      },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { left: 0, top: 0 };
  },
})

export default router
