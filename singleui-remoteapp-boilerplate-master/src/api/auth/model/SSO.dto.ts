export interface SSOParam {
    code: string
    state: string
}

export interface SSOResponse {
    user_name: string
    access_token: string
    refresh_token: string
    expires_in: number
}
