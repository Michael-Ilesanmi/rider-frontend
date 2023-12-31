<template>
    <fwb-sidebar>
        <div class="flex items-center justify-between">
            <fwb-sidebar-logo name="My Rider" logo="https://api.iconify.design/pepicons-pencil/motorcycle-circle-filled.svg" tag="router-link" class="pt-8 mb-8" />
            <fwb-badge type="red" class="py-1 w-fit capitalize">{{ `${user.role ?? ' '}`}}</fwb-badge>
        </div>
        <fwb-sidebar-item>
            <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21"/></g></svg>
            </template>
            <template #default>Home</template>
        </fwb-sidebar-item>
        <template v-if="user.role === 'user'">
            <fwb-sidebar-item link="/dashboard/order">
                <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="14" height="14" fill="none" stroke="none" /><path fill="currentColor" fill-rule="evenodd" d="M4 6.5H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m4-4.25a.75.75 0 0 0 0 1.5h.75v6.961a2.501 2.501 0 0 1 4.244 1.958C13.621 12.449 14 11.806 14 11c0-1.927-1.58-3.621-3.75-3.743v-.958c.22.128.477.201.75.201h1a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-1c-.273 0-.53.073-.75.2V3a.75.75 0 0 0-.75-.75zm.01 10.5a2.49 2.49 0 0 1 .321-1.5H8.25a.75.75 0 0 1-.75-.75V10a2.75 2.75 0 0 0-2.75-2.75h-2A2.75 2.75 0 0 0 0 10v2c0 .414.336.75.75.75h.26a2.501 2.501 0 1 1 4.977 0zm-6.012-.251a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0m7 0a1.501 1.501 0 1 0 3.002 0a1.501 1.501 0 0 0-3.002 0" clip-rule="evenodd"/></svg>
                </template>
                <template #default>Order a ride</template>
            </fwb-sidebar-item>
            <fwb-sidebar-item link="/dashboard/history">
                <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m4-1v5l4 2"/></g></svg>
                </template>
                <template #default>History</template>
            </fwb-sidebar-item>
        </template>
        <template v-if="user.role === 'rider'">
            <fwb-sidebar-item link="/dashboard/history">
                <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m4-1v5l4 2"/></g></svg>
                </template>
                <template #default>History</template>
            </fwb-sidebar-item>
            <fwb-sidebar-item link="/dashboard/rating">
                <template #icon>
                <svg 
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="0" y="0" width="512" height="512" fill="none" stroke="none" /><path fill="currentColor" d="m256.65 38.984l-49.697 100.702l-111.13 16.146l80.413 78.385l-18.982 110.68l99.396-52.256l99.397 52.256l-18.983-110.68l80.413-78.384l-111.127-16.146zM112 308.826l-26.674 54.05l-59.646 8.665l43.16 42.073l-10.188 59.403L112 444.97l53.348 28.046l-10.188-59.403l43.16-42.072l-59.646-8.665L112 308.825zm288 0l-26.674 54.05l-59.646 8.665l43.16 42.073l-10.188 59.403L400 444.97l53.348 28.046l-10.188-59.403l43.16-42.072l-59.646-8.665L400 308.825z"/></svg>
                </template>
                <template #default>My Rating</template>
            </fwb-sidebar-item>
        </template>
        <fwb-sidebar-item @click="userStore.logout()">
            <template #icon>
            <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
            >
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            </svg>
            </template>
            <template #default>Sign Out</template>
        </fwb-sidebar-item>
    </fwb-sidebar>
</template>
<script setup>
import { FwbSidebar, FwbSidebarItem, FwbSidebarLogo, FwbBadge } from 'flowbite-vue'

import { useUserStore } from '@/stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const user = computed(() => userStore.user)

</script>

<style scoped>
svg {
    @apply flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white;
}
</style>