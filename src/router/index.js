import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/auth/LoginPage.vue'
import UserSignUp from '@/views/auth/UserRegisterPage.vue'
import DashboardIndex from '@/views/dashboard/DashboardIndex.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'

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
      ]
    },
  ]
})

export default router
