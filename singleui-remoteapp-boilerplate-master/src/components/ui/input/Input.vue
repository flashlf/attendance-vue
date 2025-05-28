<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  type?: string
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    :type="props.type || 'text'"
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'w-full border border-gray-300 rounded-md px-3 py-2 text-base text-gray-700',
      'focus:outline-none focus:ring-2 focus:ring-green-500',
      'placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  />
</template>
