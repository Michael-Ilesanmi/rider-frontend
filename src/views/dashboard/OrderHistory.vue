<template>
  <main class="flex items-center justify-center p-4">
    <section class="rounded-md p-12 shadow-xl border mx-auto w-full md:w-5/6 lg:w-2/3">
        <h2 class="flex space-x-2 items-center">
            Order History
        </h2>
        <div>
          <div class="mt-4 space-y-4">
            <template  v-if="orders && orders.length > 0">
              <div class="rounded-md shadow-xl p-4 bg-orange-100 cursor-pointer hover:-translate-y-1 transition ease-out duration-300 spacey-3" v-for="order in orders" :key="order.id">
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]">
                  <div>
                    <small>Pickup</small>
                    <p>{{ order.pickup.city }}</p>
                  </div>
                  <div>
                    <small>Delivery</small>
                    <p>{{ order.delivery.city }}</p>
                  </div>
                </div>
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]">
                  <div>
                    <small>Order placed</small>
                    <p>{{ new Date(order.created_at).toLocaleDateString() }}</p>
                  </div>
                  <div>
                    <small>Order delivered</small>
                    <p>{{ new Date(order.updated_at).toLocaleDateString() }}</p>
                  </div>
                </div>
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]" v-if="user.role === 'user'">
                  <div>
                    <small>Rider Info</small>
                    <div class="flex items-start space-x-2">
                      <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" rounded />
                      <div class="leading-none">
                        <p >{{ `${order.rider.first_name} ${order.rider.last_name}`}}</p>
                        <small>{{ order.rider.phone_number }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]" v-if="user.role === 'rider'">
                  <div>
                    <small>User Info</small>
                    <div class="flex items-start space-x-2">
                      <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" rounded />
                      <div class="leading-none">
                        <p >{{ `${order.user.first_name} ${order.user.last_name}`}}</p>
                        <small>{{ order.user.phone_number }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full">
                  <div>
                    <fwb-rating :rating="order.rating" />
                  </div>
                </div>
              </div>
            </template>
            <p v-else>You have no orders</p>
          </div>
        </div>
    </section>
    
  </main>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import axios from 'axios';
import { computed, inject, onMounted, ref } from 'vue';
import { FwbAvatar, FwbRating } from 'flowbite-vue'
import { createToast } from 'mosha-vue-toastify';

const $loading = inject('$loading');
const orders = ref(null);
const userStore = useUserStore();
const user = computed(() => userStore.user);

const fetchOrderHistory = async () => {
  const loader = $loading.show()
  const { data } = await axios.get('auth/orders/history')
  orders.value = data.payload
  loader.hide();
}


onMounted(()=>{
  fetchOrderHistory();
})
</script>

<style>

</style>