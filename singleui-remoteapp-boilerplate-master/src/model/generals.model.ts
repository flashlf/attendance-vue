interface BaseSuccessResponse {
    responseCode: string
    responseDesc: string
}

export interface SuccessResponsePagination<TData> extends BaseSuccessResponse {
    data: {
        items: TData
        meta: Pagination
    }
}

export type SuccessResponseWithPagination<TData> = BaseSuccessResponse & {
    data: TData
    totalData: number
    totalPages: number
    page: number
    limit: number
}

export interface Pagination {
    page: number
    limit: number
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface SuccessResponse<TData> extends BaseSuccessResponse {
    data: TData
}
