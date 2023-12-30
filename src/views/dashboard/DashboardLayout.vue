<template>
  <main class="flex flex-row relative">
    <SideBar class="" />
    <div>
      <NavBar />
      <router-view></router-view>
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