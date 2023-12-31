<template>
<!-- eslint-disable -->
  <main class="flex items-center justify-center p-4">
    <section class="rounded-md p-12 shadow-xl border mx-auto w-full md:w-5/6 lg:w-2/3">
        <h2 class="flex space-x-2 items-center">
            Hello {{ user.first_name }}
        </h2>
        <div v-if="user.role === 'user'">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="14" height="14" fill="none" stroke="none" /><path fill="currentColor" fill-rule="evenodd" d="M4 6.5H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m4-4.25a.75.75 0 0 0 0 1.5h.75v6.961a2.501 2.501 0 0 1 4.244 1.958C13.621 12.449 14 11.806 14 11c0-1.927-1.58-3.621-3.75-3.743v-.958c.22.128.477.201.75.201h1a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-1c-.273 0-.53.073-.75.2V3a.75.75 0 0 0-.75-.75zm.01 10.5a2.49 2.49 0 0 1 .321-1.5H8.25a.75.75 0 0 1-.75-.75V10a2.75 2.75 0 0 0-2.75-2.75h-2A2.75 2.75 0 0 0 0 10v2c0 .414.336.75.75.75h.26a2.501 2.501 0 1 1 4.977 0zm-6.012-.251a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0m7 0a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0" clip-rule="evenodd"/></svg>
          <h3>Active Orders</h3>
          <div class="mt-4 space-y-4">
            <template  v-if="orders && orders.length > 0">
              <div class="rounded-md shadow-xl p-4 bg-orange-100 cursor-pointer hover:-translate-y-1 transition ease-out duration-300 space-y-3" v-for="order in orders" :key="order.id">
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
                </div>
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]">
                  <div v-if="! order.rider">
                    <small>Rider Info</small>
                    <p >Unassigned</p>
                  </div>
                  <div v-else>
                    <small>Rider Info</small>
                    <div class="flex items-start space-x-2">
                      <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" rounded />
                      <div class="leading-none">
                        <p >{{ `${order.rider.first_name} ${order.rider.last_name}`}}</p>
                        <small>{{ order.rider.phone_number }}</small>
                      </div>
                    </div>
                    <button v-if="order.rider_accepted === 1" class="mt-4 rounded-md text-xs px-4 py-2 border border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-colors ease-linear duration-500 font-semibold" @click="isShowModal = true, order_id = order.id">
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <p v-else>You have no active orders</p>
          </div>
        </div>
        <div v-if="user.role === 'rider'">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="14" height="14" fill="none" stroke="none" /><path fill="currentColor" fill-rule="evenodd" d="M4 6.5H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m4-4.25a.75.75 0 0 0 0 1.5h.75v6.961a2.501 2.501 0 0 1 4.244 1.958C13.621 12.449 14 11.806 14 11c0-1.927-1.58-3.621-3.75-3.743v-.958c.22.128.477.201.75.201h1a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-1c-.273 0-.53.073-.75.2V3a.75.75 0 0 0-.75-.75zm.01 10.5a2.49 2.49 0 0 1 .321-1.5H8.25a.75.75 0 0 1-.75-.75V10a2.75 2.75 0 0 0-2.75-2.75h-2A2.75 2.75 0 0 0 0 10v2c0 .414.336.75.75.75h.26a2.501 2.501 0 1 1 4.977 0zm-6.012-.251a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0m7 0a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0" clip-rule="evenodd"/></svg>
          <h3>Active Orders</h3>
          <div class="mt-4 space-y-4">
            <template  v-if="orders && orders.length > 0">
              <div class="rounded-md shadow-xl p-4 bg-orange-100 cursor-pointer hover:-translate-y-1 transition ease-out duration-300 space-y-3" v-for="order in orders" :key="order.id">
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
                </div>
                <div class="w-full justify-between flex [&_p]:text-green-600 [&_p]:font-semibold [&_p]:text-sm [&_small]:text-[10px]">
                  <div>
                    <small>User Info</small>
                    <div class="flex items-start space-x-2">
                      <fwb-avatar img="https://api.iconify.design/iconoir/profile-circle.svg" rounded />
                      <div class="leading-none">
                        <p>{{ `${order.user.first_name} ${order.user.last_name}`}} </p>
                        <small>{{ order.user.phone_number }}</small>
                      </div>
                    </div>
                    <button v-if="! order.rider_id" class="mt-4 rounded-md text-xs px-4 py-2 border border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-colors ease-linear duration-500 font-semibold" @click="pickupOrder(order.id)">
                      Accept
                    </button>
                    <button v-if="order.rider_id === user.id && order.rider_accepted === 0" class="mt-4 rounded-md text-xs px-4 py-2 border border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-colors ease-linear duration-500 font-semibold" @click="deliverOrder(order.id)">
                      Deliver
                    </button>
                    <button v-if="order.rider_id === user.id && order.rider_accepted === 1 && order.user_accepted === 0" class="mt-4 rounded-md text-xs px-4 py-2 border border-gray-600 text-gray-600 bg-white font-semibold" disabled>
                      Waiting for user to confirm receipt of order
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <p v-else>You have no active orders</p>
          </div>
        </div>
    </section>

    <!--  -->
    <fwb-modal v-if="isShowModal" @close="isShowModal = false, order_id = null">
      <template #header>
        <div class="flex items-center text-lg">
          Rate Your Order
        </div>
      </template>
      <template #body>
        <star-rating v-model:rating="rating"></star-rating>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="isShowModal = false, order_id = null" color="alternative">
            Cancel
          </fwb-button>
          <fwb-button @click="acceptOrder()" color="green">
            Package Received
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
    
  </main>
</template>

<script setup>
import StarRating from 'vue-star-rating'
import { useUserStore } from '@/stores/user.js';
import axios from 'axios';
import { computed, inject, onMounted, ref } from 'vue';
import { FwbAvatar, FwbModal, FwbButton } from 'flowbite-vue'
import { createToast } from 'mosha-vue-toastify';

const $loading = inject('$loading');
const orders = ref(null);
const rating = ref(5);
const order_id = ref(null);
const isShowModal = ref(false);
const userStore = useUserStore();
const user = computed(() => userStore.user);
const fetchOrders = async () => {
  const loader = $loading.show()
  const { data } = await axios.get('auth/orders/pending')
  orders.value = data.payload
  loader.hide();
}
const pickupOrder = async (id) => {
  const loader = $loading.show()
  try {
    const { data } = await axios.post('auth/order/pickup', {id})
    orders.value = data.payload
    loader.hide();
    createToast(data.payload, {type:'success'})
    fetchOrders();
  } catch (error) {
    createToast(`${error?.response?.data?.payload ?? 'Unable to pickup order'}`, {type:'danger'})
    loader.hide();
  }

}
const deliverOrder = async (id) => {
  const loader = $loading.show()
  try {
    const { data } = await axios.post('auth/order/deliver', {id})
    orders.value = data.payload
    loader.hide();
    createToast(data.payload, {type:'success'})
    fetchOrders();
  } catch (error) {
    createToast(`${error?.response?.data?.payload ?? 'Try again'}`, {type:'danger'})
    loader.hide();
  }
}

const acceptOrder = async () => {
  isShowModal.value = false;
  const loader = $loading.show()
  try {
    const { data } = await axios.post('auth/order/accept', {id: order_id.value, rating: rating.value})
    orders.value = data.payload
    order_id.value = null
    loader.hide();
    createToast(data.payload, {type:'success'})
    fetchOrders();
  } catch (error) {
    console.error(error);
    createToast(`${error?.response?.data?.payload ?? 'Try again'}`, {type:'danger'})
    loader.hide();
  }

}
onMounted(()=>{
  fetchOrders();
})
</script>

<style>

</style>