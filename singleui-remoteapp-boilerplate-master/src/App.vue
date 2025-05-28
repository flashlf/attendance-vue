<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import Example from "@/views/Example.vue"
import AttendanceDonut from "@/views/DashboardView.vue"
</script>

<template id="app">

    <!-- <Example></Example> -->
     <nav>
        <router-link to="/">Example</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/attendance/form">Absen</router-link> |
        <router-link to="/attendance/confirmation">Konfirmasi Absen</router-link> |
        <router-link to="/attendance/card">Kartu Absensi</router-link>

    </nav>
    <router-view />
    <!-- <AttendanceDonut class="bg-[#81bb93] rounded-xl shadow-md"></AttendanceDonut> -->
    <Toaster
        position="bottom-right"
        :visibleToasts="5"
        :gap="16"
        :toastOptions="{
            classes: {
                toast:        'bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex gap-3 items-start',
                title:        'font-semibold text-gray-900 text-sm',
                description:  'text-gray-700 text-xs mt-1',
                actionButton: 'bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 transition',
                closeButton:  'text-gray-400 hover:text-gray-600',
            }
        }"
        :rich-colors="true"
        :duration="5000" />
</template>
