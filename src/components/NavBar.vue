<template>
  <div class="flex justify-end items-center space-x-4 w-full py-4 px-6 border-b-2  shadow-xl">
    <p>Hello <strong>{{ `${user.first_name ?? ''}`}}</strong></p>
    <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" rounded />
  </div>
</template>

<script setup>
import { FwbAvatar } from 'flowbite-vue'

import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user)
</script>