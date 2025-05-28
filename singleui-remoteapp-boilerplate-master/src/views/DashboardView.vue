<template>
  <div :class="['bg-green-gradient backdrop-blur-md bg-opacity-30 border border-white/30 rounded-lg p-6 bg-[#81bb93] rounded-xl shadow-md border', $attrs.class]" style="border-color: #fafdfa">
    <!-- Title Section -->
    <div>
      <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>
    </div>

    <!-- Content Grid -->
    <div class="grid gap-6 md:grid-cols-2">
      <AttendanceDonut
        :data="attendanceData"
        month-label="Maret 2025"
        :today-absent="true"
        class=""
      />
      <LeaveQuota :quota="21" class=""/>
    </div>
  </div>
</template>

<script setup>
import AttendanceDonut from '@/components/AttendanceDonut.vue'
import LeaveQuota from '@/components/LeaveQuota.vue'

defineOptions({ inheritAttrs: false })

const attendanceData = {
  hadir: 18,
  sakit: 2,
  cuti: 1,
  alpha: 0
}
</script>
