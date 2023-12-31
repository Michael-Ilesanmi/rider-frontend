<template>
  <main class="flex items-center justify-center p-4">
    <section class="rounded-md p-12 shadow-xl border mx-auto w-full md:w-5/6 lg:w-2/3">
        <h2 class="flex space-x-2 items-center">
            Rating
        </h2>
        <div>
          <div class="mt-4 space-y-4">
            <fwb-rating
                :rating="rating.rating"
                :scale="5"
                review-link="#"
                size="lg"
                :review-text="`${rating.count} reviews`"
            >
                <template #besideText>
                <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                    {{ rating.rating }}
                </p>
                </template>
            </fwb-rating>
          </div>
        </div>
    </section>
    
  </main>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import axios from 'axios';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { FwbAvatar, FwbRating } from 'flowbite-vue'
import { createToast } from 'mosha-vue-toastify';

const $loading = inject('$loading');
const rating = ref({
    rating: 0,
    count: 0,
});
const userStore = useUserStore();
const user = computed(() => userStore.user);

const fetchRating = async () => {
  const loader = $loading.show()
  const { data } = await axios.get('auth/rating')
  rating.value.rating = Number(data.payload.rating).toFixed(2)
  rating.value.count = data.payload.count
  loader.hide();
}


onMounted(()=>{
  fetchRating();
})
</script>

<style>

</style>