import { defineStore } from "pinia"
import { useExampleApi } from "@/api/feature/ExampleApi"
import { BodMessageResponse, BodMessageType, Example, ExamplePayload } from "@/api/feature/model/Example.dto"
import { toast } from "vue-sonner"
import { listBodDataMapper } from "@/mapper/bod.mapper"

export const useExampleStore = defineStore("exampleStore", {
    state: () => ({
        examples: {
            data: [] as Example[],
            isLoading: <boolean>false,
            error: null as Error | null | string,
        },
        exampleDetail: {
            data: {} as Example,
            isLoading: <boolean>false,
            error: null as Error | null | string,
        },
        bods: {
            data: [] as BodMessageResponse[],
            isLoading: false,
            error: <Error | null>null,
        },
    }),
    actions: {
        fetchBodsMessage() {
            this.bods.isLoading = true
            this.bods.error = null
            return new Promise<void>((resolve, reject) => {
                useExampleApi
                    .getBodsMessage()
                    .onSuccess(response => {
                        this.bods.data = response.data.map((item: BodMessageType) => listBodDataMapper(item))
                        this.bods.isLoading = false
                        resolve()
                    })
                    .onError(error => {
                        toast({
                            title: error.message,
                            variant: "destructive",
                        })
                        this.bods.error = error instanceof Error ? error : new Error("An unknown error occurred")
                        this.bods.isLoading = false
                        reject(error)
                    })
            })
        },
        fetchExamples(): Promise<void> {
            this.examples.isLoading = true
            return new Promise<void>((resolve, reject) => {
                useExampleApi
                    .getExamples()
                    .onSuccess(response => {
                        this.examples.data = response.data
                        this.examples.isLoading = false
                        resolve()
                    })
                    .onError(error => {
                        reject(error)
                    })
            })
        },
        fetchExampleById(id: string): Promise<void> {
            this.exampleDetail.isLoading = true
            return new Promise<void>((resolve, reject) => {
                useExampleApi
                    .getExampleById(id)
                    .onSuccess(response => {
                        this.exampleDetail.data = response.data
                        this.exampleDetail.isLoading = false
                        resolve()
                    })
                    .onError(error => {
                        reject(error)
                    })
            })
        },
        createExample(payload: ExamplePayload) {
            this.examples.isLoading = true
            return new Promise<void>((resolve, reject) => {
                useExampleApi
                    .postExample(payload)
                    .onSuccess(() => {
                        toast("Example has been created", {
                            description: new Date(),
                        })
                        resolve()
                    })
                    .onError(error => {
                        this.examples.error = error.message
                        toast("Something Error", {
                            description: new Date(),
                        })
                        reject(error)
                    })
            })
        },
    },
})
