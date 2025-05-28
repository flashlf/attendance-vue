<template>
  <BaseCard class="flex justify-between p-6 w-full">
    <div>
        <h3 class="text-sm font-medium text-gray-700">Kuota Cuti</h3>
    </div>
    <div>
      <p class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950"><b>{{ quota }}</b></p>
    </div>
    <button class="text-sm text-blue-500 hover:underline">
      Cek Riwayat Pengambilan Cuti
    </button>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/card/Card.vue'
const props = defineProps({
  quota: {
    type: Number,
    required: true
  }
})
</script>
