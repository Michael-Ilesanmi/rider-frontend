<template>
  <main>
    Welcome {{ user.first_name }}
  </main>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>

<style>

</style>