import { ApiClient, ApiHeaders, authStore, Result } from "@pegadaian/common-network-lib"
import { BodMessageType, Example, ExamplePayload } from "./model/Example.dto"
import { ENDPOINT_API_EXAMPLE } from "@/constant/endpoint.constant"
import { SuccessResponse, SuccessResponseWithPagination } from "@/model/generals.model"

class ExampleApi extends ApiClient {
    private readonly API_POSTING = "/posts"
    private readonly API_BDO_EXAMPLE = "/api/v1/testimonials"

    constructor() {
        const exampleBaseUrl = authStore.isLoggedIn ? import.meta.env.VITE_EXAMPLE_BASE_URL_PRIVATE : import.meta.env.VITE_EXAMPLE_BASE_URL_PUBLIC
        const clientId = import.meta.env.VITE_EXAMPLE_CLIENT_ID
        super(exampleBaseUrl, clientId)
    }

    private get configHeaders() {
        return new ApiHeaders().set("x-api-key", import.meta.env.VITE_EXAMPLE_API_KEY)
    }

    private getHeaders() {
        return !authStore.isLoggedIn ? this.configHeaders : undefined
    }

    getBodsMessage(): Result<SuccessResponseWithPagination<BodMessageType[]>> {
        return this.get({
            endpoint: this.API_BDO_EXAMPLE,
            headers: this.getHeaders(),
        })
    }

    getExamples(): Result<Example> {
        return this.get({
            endpoint: ENDPOINT_API_EXAMPLE,
            headers: this.getHeaders(),
        })
    }

    getExampleById(id: string): Result<SuccessResponse<Example>> {
        return this.get({
            endpoint: `${this.API_POSTING}/${id}`,
            headers: this.getHeaders(),
        })
    }

    postExample(payload: ExamplePayload): Result<SuccessResponse<Example>> {
        return this.post({
            endpoint: ENDPOINT_API_EXAMPLE,
            params: payload,
            headers: this.getHeaders(),
        })
    }

    updateExample(id: string, payload: ExamplePayload): Result<SuccessResponse<Example>> {
        return this.put({
            endpoint: `${ENDPOINT_API_EXAMPLE}/${id}`,
            params: payload,
            headers: this.getHeaders(),
        })
    }

    deleteExample(id: string): Result<SuccessResponse<Example>> {
        return this.delete({
            endpoint: `${ENDPOINT_API_EXAMPLE}/${id}`,
            headers: this.getHeaders(),
        })
    }
}

export const useExampleApi = new ExampleApi()
