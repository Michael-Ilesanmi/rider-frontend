<template>
  <div class="flex items-center justify-between w-full border-b-2 shadow-xl py-4 px-6 ">
    <div class="flex items-center w-fit gap-x-2 md:hidden">
        <fwb-sidebar-logo name="My Rider" logo="https://api.iconify.design/pepicons-pencil/motorcycle-circle-filled.svg" tag="router-link" class="m-0 mb-0" />
        <fwb-badge type="red" class="py-1 w-fit capitalize">{{ `${user.role ?? ' '}`}}</fwb-badge>
    </div>
    <div class="flex justify-end items-center space-x-4 w-fit ml-auto">
      <p>Hello <strong>{{ `${user.first_name ?? ''}`}}</strong></p>
      <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" class="hidden md:block" rounded />
      <fwb-dropdown placement="left" class="md:hidden">
        <template #trigger>
          <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" class="cursor-pointer" rounded />
        </template>
        <div class="shadow [&>a]:border-b [&>a]:font-medium [&>a:hover]:font-semibold [&>a:hover]:bg-blue-300 [&>a]:py-3 [&>a]:px-4 [&>a]:transition [&>a]:ease-linear [&>a]:duration-500 flex flex-col">
          <router-link to="/">Home</router-link>
          <router-link to="/dashboard/order" v-if="user.role === 'user'">Order a ride</router-link>
          <router-link to="/dashboard/history">History</router-link>
          <router-link to="/dashboard/rating" v-if="user.role === 'rider'">My Rating</router-link>
          <router-link to="/dashboard/history">History</router-link>
          <a  @click="userStore.logout()" class="text-red-600 font-medium cursor-pointer">Sign Out</a>
        </div>
      </fwb-dropdown>
    </div>
  </div>
</template>

<script setup>
import { FwbAvatar, FwbSidebarLogo, FwbBadge, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user)
</script>