<template>
  <div class="p-6 bg-white rounded-2xl shadow-lg">
    <!-- Header Section -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-base font-semibold text-gray-800">Rekap Kehadiran</h3>
        <p class="text-sm text-red-500 mt-1" v-if="todayAbsent">
          Anda belum melakukan absensi hari ini!
        </p>
      </div>
      <p class="text-sm text-gray-400">{{ monthLabel }}</p>
    </div>

    <!-- Chart and Legend Section -->
    <div class="grid grid-cols-3 gap-4 items-center">
      <!-- Chart (1/3 width) -->
      <div class="flex justify-center">
        <Doughnut :data="chartData" :options="chartOptions" class="w-40 h-40 drop-shadow-md" />
      </div>

      <!-- Legend (2/3 width) -->
      <div class="col-span-2">
        <ul class="space-y-3">
          <li
            v-for="item in legendItems"
            :key="item.label"
            class="flex items-center text-sm text-gray-700"
          >
            <span class="w-3 h-3 rounded-full mr-2" :class="item.colorClass"></span>
            {{ item.label }}:
            <p class="ml-1 text-gray-900">{{ item.value }} ({{ item.percent }}%)</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend)

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      hadir: 0,
      sakit: 0,
      cuti: 0,
      alpha: 0
    })
  },
  monthLabel: {
    type: String,
    default: 'Maret 2025'
  },
  todayAbsent: {
    type: Boolean,
    default: false
  }
})

// Colors & Labels
const colors = {
  hadir: 'bg-[#1fc57a]',
  sakit: 'bg-[#005e3a]',
  cuti: 'bg-[#ff984a]',
  alpha: 'bg-[#9CA3AF]'
}

// Chart Data
const chartData = computed(() => {
  const hadir = props.data?.hadir ?? 0
  const sakit = props.data?.sakit ?? 0
  const cuti = props.data?.cuti ?? 0
  const alpha = props.data?.alpha ?? 0

  return {
    labels: ['Hadir', 'Sakit', 'Cuti', 'Ketidakhadiran'],
    datasets: [
      {
        data: [hadir, sakit, cuti, alpha],
        backgroundColor: ['#1fc57a', '#005e3a', '#ff984a', '#ff984a'],
        borderWidth: 0
      }
    ]
  }
})

// Chart Options
const chartOptions = {
  cutout: '50%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  }
}

// Legend Items
const total = computed(() =>
  Object.values(props.data).reduce((sum, v) => sum + v, 0)
)

const legendItems = computed(() =>
  Object.entries(props.data).map(([key, val]) => ({
    label: key === 'alpha' ? 'Ketidakhadiran' : key.charAt(0).toUpperCase() + key.slice(1),
    value: val,
    percent: total.value ? ((val / total.value) * 100).toFixed(1) : 0,
    colorClass: colors[key]
  }))
)
</script>
