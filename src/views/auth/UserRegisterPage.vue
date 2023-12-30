<template>
  <main class="flex items-center justify-center h-screen bg-gray-200">
    <div class="p-5 bg-gray-400 border-gray-800 shadow-lg rounded-lg mx-auto w-11/12 md:w-4/6 lg:w-1/3">
      <fwb-heading tag="h3" class="mb-4 text-right">Sign Up</fwb-heading>
      <form @submit.prevent="register()" class="space-y-4">
        <div class="grid grid-cols-2 gap-x-4">
            <fwb-input
            v-model="payload.first_name"
            placeholder="enter your first name"
            label="First Name"
            required
            />
            <fwb-input
            v-model="payload.last_name"
            placeholder="enter your last name"
            label="Last Name"
            required
            />
        </div>
        <fwb-input
          v-model="payload.email"
          placeholder="enter your email"
          label="Email"
          type="email"
          required
        />
        <p class="text-sm font-medium text-gray-900 dark:text-white !-mb-4">Select account type</p>
        <div class="flex space-x-4 items-start w-fit">
            <fwb-radio v-model="payload.role" name="radio" label="User" value="user" />
            <fwb-radio v-model="payload.role" name="radio" label="Rider" value="rider" />
        </div>
        <fwb-input
          v-model="payload.phone_number"
          placeholder="enter your phone number"
          label="Phone Number"
          type="tel"
          required
        />
        <fwb-input
          v-model="payload.password"
          placeholder="enter your password"
          label="Password"
          type="password"
          required
        />
        <fwb-button color="alternative">Sign Up</fwb-button>
        <p>Already have an account? <router-link :to="{ name: 'LoginPage'}" class="underline text-blue-600">Sign In</router-link> </p>
      </form>
    </div>
  </main>
</template>

<script setup>
import { FwbInput, FwbButton, FwbRadio, FwbHeading } from 'flowbite-vue';
import { createToast } from 'mosha-vue-toastify';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore();
const router = useRouter()

const payload = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  password_confirm: '',
  role: 'user',
})

const register = async () => {
  try {
    const { data } = await axios.post('/register', payload)
    userStore.setToken(data.payload.token)
    userStore.setUser(data.payload.user)
    createToast('Registration successful', { type: "success" })
    return router.push({name: 'DashboardIndex'});
  } catch (error) {
    createToast(`${error?.response?.data ?? 'Unable to register. Try again later.'}`, { type: "danger" })
    console.log(error);    
  }
}

onMounted(()=>{
  if(userStore.user) return router.push({name: 'DashboardIndex'});
})
</script>