<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

defineProps<{
    open: boolean
    title?: string
    onClose: () => void
}>()
</script>

<template>
    <Dialog :open="open" @update:open="onClose">
        <DialogContent class="max-w-3xl">
            <DialogHeader>
                <DialogTitle>{{ title || "View Details" }}</DialogTitle>
            </DialogHeader>
            <slot />
            <!-- CONTENT BISA DINAMIS -->
        </DialogContent>
    </Dialog>
</template>
