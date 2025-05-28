<template>
    <Card class="bg-muted text-sm font-mono overflow-auto p-4 relative max-h-96">
        <pre class="whitespace-pre-wrap break-words">
      <code>{{ formattedJson }}</code>
    </pre>

        <Button variant="ghost" size="sm" class="absolute top-2 right-2 text-xs" @click="copyToClipboard">
            <span v-if="!copied">Copy</span>
            <span v-else>Copied!</span>
        </Button>
    </Card>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useClipboard, useTimeoutFn } from "@vueuse/core"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
    data: unknown
    indent?: number
}

const props = withDefaults(defineProps<Props>(), {
    indent: 2,
})

const formattedJson = computed(() => JSON.stringify(props.data, null, props.indent))

const { copy, copied } = useClipboard({ source: formattedJson })

const copyToClipboard = () => {
    copy()
    useTimeoutFn(() => {
        copied.value = false
    }, 2000)
}
</script>
