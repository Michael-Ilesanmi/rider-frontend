<script setup>
import { watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute();
watch(route, ()=>{
  document.title = `${route.meta.title} | iRider`
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
