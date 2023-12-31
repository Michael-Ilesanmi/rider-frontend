import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/auth/LoginPage.vue'
import UserSignUp from '@/views/auth/UserRegisterPage.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import DashboardIndex from '@/views/dashboard/DashboardIndex.vue'
import PlaceOrder from '@/views/dashboard/PlaceOrder.vue'
import OrderHistory from '@/views/dashboard/OrderHistory.vue'
import Rating from '@/views/dashboard/Rating.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
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
          path: '',
          name: 'DashboardIndex',
          component: DashboardIndex
        },
        {
          path: 'order',
          name: 'PlaceOrder',
          component: PlaceOrder
        },
        {
          path: 'history',
          name: 'OrderHistory',
          component: OrderHistory
        },
        {
          meta:{
            hasRiderGuard: true,
          },
          path: 'rating',
          name: 'Rating',
          component: Rating
        },
      ]
    },
  ]
})

export default router
