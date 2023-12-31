<template>
  <main class="flex items-center justify-center h-screen bg-gray-200">
    <div class="p-5 bg-gray-400 border-gray-800 shadow-lg rounded-lg mx-auto w-11/12 md:w-4/6 lg:w-1/3">
      <fwb-heading tag="h3" class="mb-4 text-right">Sign In</fwb-heading>
      <form @submit.prevent="login" class="space-y-4">
        <fwb-input
          v-model="payload.email"
          placeholder="enter your email"
          label="Email"
          type="email"
          required
        />
        <fwb-input
          v-model="payload.password"
          placeholder="enter your password"
          label="Password"
          type="password"
          required
        />
        <fwb-button color="alternative">Login</fwb-button>
        <p>Don't have an account? <router-link :to="{ name: 'UserSignUp'}" class="underline text-blue-600">Sign Up</router-link> </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { FwbInput, FwbButton, FwbHeading } from 'flowbite-vue';
import { inject, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';
import axios from 'axios';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore();
const router = useRouter()
const $loading = inject("$loading");

const payload = reactive({
  email: '',
  password: ''
})

const login = async () => {
  let loader = $loading.show()
  try {
    const { data } = await axios.post('/login', payload)
    userStore.setToken(data.payload.token)
    userStore.setUser(data.payload.user)
    loader.hide()
    createToast('Login successful', { type: "success" })
    return router.push({name: 'DashboardIndex'});
  } catch (error) {
    loader.hide()
    createToast(`${error?.response?.data?.payload ?? 'Unable to login. Try again later.'}`, { type: "danger" })
    console.log(error);    
  }
}

onMounted(()=>{
  if(userStore.user) return router.push({name: 'DashboardIndex'});
})
</script>