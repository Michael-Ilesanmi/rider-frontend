<template>
  <div class="flex justify-center space-x-4 w-full">
    <fwb-avatar img="/images/avatar-1.jpg" />
    <fwb-avatar img="/images/avatar-1.jpg" rounded />
  </div>
</template>

<script setup>
import { FwbAvatar } from 'flowbite-vue'

import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user)
</script>