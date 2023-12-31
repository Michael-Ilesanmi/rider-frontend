<template>
  <main class="flex flex-row relative h-screen">
    <nav class="relative w-64 h-screen hidden md:block">
      <SideBar />
    </nav>
    <div class="grow flex flex-col min-h-full">
      <NavBar />
      <div class="p-8 bg-gray-100 w-full grow overflow-y-auto">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue"
import NavBar from "@/components/NavBar.vue"
import { useUserStore } from '@/stores/user.js';

const store = useUserStore();

</script>

<style>

</style>