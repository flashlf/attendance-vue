export interface Example {
    id: number
    title: string
    body: string
    userId: number
}

export interface ExamplePayload {
    title: string
    body: string
    userId: number
}

export interface BodMessageResponse {
    id: string
    title: string
    description: string
    personName: string
    authorTitle: string
    image: string
    photoHash: string
    date: string
    dataItem?: BodMessageResponse[]
}

export interface BodMessageType {
    created_by: string
    created_date: string
    updated_by: string
    updated_date: string
    id: string
    title: string
    content: string
    authorName: string
    authorTitle: string
    photoUrl: string
    photoHash: string
    publishDate: string
}
