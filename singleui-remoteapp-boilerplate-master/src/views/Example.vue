<template>
    <div class="@container">
        <div class="container mx-auto px-6">
            <h2 class="text-center text-base/7 font-semibold text-lime">Remote App Boilerplate</h2>
            <p class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950">Example of Remote App for <br /><b>Single UI Ecosystem</b></p>
            <div class="mt-10 gap-4">
                <div class="relative">
                    <div class="absolute rounded-lg" />
                    <div class="relative flex h-full flex-col overflow-hidden">
                        <div class="@container relative h-230 w-full grow">
                            <div class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[4cqw] border-x-[1cqw] border-t-[1cqw] border-gray-700 shadow-2xl bg-[#F8F8F8]">
                                <img class="object-cover object-top mt-12" draggable="false" src="/showcase.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex justify-center">
                <button class="bg-lime-500 text-white p-4 rounded hover:bg-lime-800 m-2 cursor-pointer min-w-64 mt-10" @click="handleOpenModal()">Example API Call</button>
            </div>

            <ModalView :open="modalState.viewOpen" :onClose="() => closeModal()">
                <template v-if="!exampleStore.bods.isLoading">
                    <div class="p-6">
                        <h1 class="text-xl font-semibold mb-4">Preview</h1>
                        <BlockCode :data="exampleStore.bods.data" />
                    </div>
                </template>
            </ModalView>
        </div>
    </div>
</template>

<script setup lang="ts">
import BlockCode from "@/components/BlockCode.vue"
import ModalView from "@/components/modals/ModalView.vue"
import { useExampleStore } from "@/store/example.store"
import { onMounted, ref } from "vue"

const modalState = ref({
    viewOpen: false,
})

const exampleStore = useExampleStore()

const handleOpenModal = () => {
    modalState.value.viewOpen = true
}

const closeModal = () => {
    console.log("close")
    modalState.value = {
        viewOpen: false,
    }
}

onMounted(async () => {
    await exampleStore.fetchBodsMessage()
})
</script>

<style scoped></style>
