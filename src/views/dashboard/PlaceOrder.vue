<template>
  <main class="flex items-center justify-center p-4">
    <section class="rounded-md p-12 shadow-xl border mx-auto w-full md:w-5/6 lg:w-2/3">
        <h2 class="flex space-x-2 items-center">
            Order a dispatch rider
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="14" height="14" fill="none" stroke="none" /><path fill="currentColor" fill-rule="evenodd" d="M4 6.5H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m4-4.25a.75.75 0 0 0 0 1.5h.75v6.961a2.501 2.501 0 0 1 4.244 1.958C13.621 12.449 14 11.806 14 11c0-1.927-1.58-3.621-3.75-3.743v-.958c.22.128.477.201.75.201h1a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-1c-.273 0-.53.073-.75.2V3a.75.75 0 0 0-.75-.75zm.01 10.5a2.49 2.49 0 0 1 .321-1.5H8.25a.75.75 0 0 1-.75-.75V10a2.75 2.75 0 0 0-2.75-2.75h-2A2.75 2.75 0 0 0 0 10v2c0 .414.336.75.75.75h.26a2.501 2.501 0 1 1 4.977 0zm-6.012-.251a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0m7 0a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0" clip-rule="evenodd"/></svg>
        </h2>
        <form class="space-y-4 mt-6" @submit.prevent="placeOrder()">
            <GoogleAddressAutocomplete 
                :apiKey="GOOGLE_MAPS_API_KEY"
                v-model="payload.pickup"
                @callback="assignPickupLocation"    
                class="w-full rounded-md border-gray-300 bg-gray-50"
                placeholder="Select pickup location"
            />
            <GoogleAddressAutocomplete 
                :apiKey="GOOGLE_MAPS_API_KEY"
                v-if="payload.pickup"
                v-model="payload.delivery"
                @callback="assignDeliveryLocation"    
                class="w-full rounded-md border-gray-300 bg-gray-50"
                placeholder="Select delivery location"
            />
            <fwb-select
                v-if="payload.delivery"
                v-model="payload.weight"
                :options="weight"
                label="Package weight (kg)"
            />
            <fwb-input
                v-if="payload.weight"
                v-model="payload.price"
                disabled
                readonly
                validation-status="success"
                placeholder="Amount"
                label="Cost"
            >
            <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 18V7.052a1.05 1.05 0 0 1 1.968-.51l6.064 10.916a1.05 1.05 0 0 0 1.968-.51V6M5 10h14M5 14h14"/></svg>
            </template>
            </fwb-input>
            <fwb-button v-if="payload.weight" color="green">Green</fwb-button>
        </form>
    </section>
  </main>
</template>

<script setup>
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'
import { computed, inject, reactive, ref, watch } from 'vue'
import { FwbSelect, FwbInput, FwbButton } from 'flowbite-vue'
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
import { useRouter } from 'vue-router';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const router = useRouter();
const $loading = inject("$loading");
const calcPrice = () => {
    const price = Math.floor(Math.random() * 10000) + 1000;
    return payload.price = price;
}

const payload = reactive({
    pickup: null,
    delivery: null,
    weight: null,
    price: null,
})

const computedPayload = computed(() => Object.assign({}, payload))

watch(computedPayload, (newPayload, oldPayload) => {
    if (
        (oldPayload.pickup !== newPayload.pickup) || 
        (oldPayload.delivery !== newPayload.delivery) || 
        (oldPayload.weight !== newPayload.weight)
    ) {
        calcPrice()
    }
}, { deep: true  })

const weight = [
  { value: '0-1', name: '0 - 1 kg' },
  { value: '2-5', name: '2 - 5 kg' },
  { value: '5+', name: 'above 5 kg' },
]

const placeOrder = async () => {
    const loader = $loading.show()
    try {
        const { data } = await axios.post('auth/order', payload)
        console.log(data);
        loader.hide()
        router.push({ name: 'DashboardIndex'});
        createToast('Order successful', { type: "success" })
    } catch (error) {
        loader.hide()
        console.error(error);
        createToast(`${error.response.data.payload ?? 'Unable to place order'}`, { type: "danger" })
    }
}
const assignPickupLocation = (place) => {
    const location = {
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    }
    payload.pickup = location;
}
const assignDeliveryLocation = (place) => {
    const location = {
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    }
    payload.delivery = location;
}
</script>

<style>

</style>