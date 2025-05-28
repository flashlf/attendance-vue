<script setup>
import { ref, computed } from 'vue'
import Button from '../components/ui/button/Button.vue'
import DataTable from '../components/ui/datatable/DataTable.vue'

const menuItems = [
  { label: 'Kartu Absensi', value: 'AttendanceCard' },
  { label: 'Dummy Data', value: 'dummyData' }
]

// Dummy data
const attendanceData = [
  { nama: 'Ahmad', tanggal: '2025-05-21', status: 'Check In' },
  { nama: 'Budi', tanggal: '2025-05-21', status: 'Check Out' }
]

const historyData = [
  { nama: 'Citra', tanggal: '2025-05-20', status: 'Check In' },
  { nama: 'Dewi', tanggal: '2025-05-19', status: 'Check Out' }
]

const lateReportData = [
  { nama: 'Eko', tanggal: '2025-05-21', status: 'Late Check In' }
]

let groupedColumns = []

const activeMenu = ref('AttendanceCard')

const filteredData = computed(() => {
  switch (activeMenu.value) {
    case 'AttendanceCard':
      groupedColumns = [
        {
          header: 'Info Absen',
          columns: [
            { accessorKey: 'nama', header: 'Nama' },
            { accessorKey: 'tanggal', header: 'Tanggal' },
            { accessorKey: 'status', header: 'Status' }
          ]
        }
      ]
      return attendanceData
    case 'dummyData':
      groupedColumns = [
        {
          header: 'Dummy Group',
          columns: [
            { accessorKey: 'nama', header: 'Nama' },
            { accessorKey: 'tanggal', header: 'Tanggal' },
            { accessorKey: 'status', header: 'Status' }
          ]
        }
      ]
      return lateReportData
    default:
      return []
  }
})
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex items-center space-x-2 text-[#252528] mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <h2 class="text-2xl">Kartu Absen</h2>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <!-- Sidebar -->
      <aside class="md:w-1/4 bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Kategori</h3>
        <div class="space-y-3">
          <Button
            v-for="menu in menuItems"
            :key="menu.value"
            @click="activeMenu = menu.value"
            :variant="activeMenu === menu.value ? 'outline' : 'default'"
            class="w-full justify-start rounded-md px-3 py-2 text-sm font-medium transition bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500"
            :class="{
              'ring-2 ring-green-500': activeMenu === menu.value,
              'bg-gray-200 text-gray-700 hover:bg-gray-300': activeMenu !== menu.value
            }"
          >
            {{ menu.label }}
          </Button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="md:w-3/4 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Data: {{ menuItems.find((m) => m.value === activeMenu)?.label }}
        </h3>

        <DataTable
          :data="filteredData || []"
          :filterPanel="true"
          :exportData="true"
          :columns="groupedColumns"
        />
      </main>
    </div>
  </div>
</template>

<style>
thead tr:first-child th {
  text-align: center;
  border-bottom: 2px solid #c9c9c9;
}
</style>
