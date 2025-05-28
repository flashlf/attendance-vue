import { ApiClient, Result } from "@pegadaian/common-network-lib"
import { SSOParam, SSOResponse } from "@/api/auth/model/SSO.dto"
import axios from "axios"

class SSOApi extends ApiClient {
    private readonly SSO_AUTH_TOKEN = "/oauth/token"

    constructor() {
        const ssoBaseUrl = import.meta.env.VITE_SSO_BASE_URL
        const clientId = import.meta.env.VITE_CLIENT_ID_HC_ESS
        super(ssoBaseUrl, clientId)
    }

    getToken(param: SSOParam): Result<SSOResponse> {
        const ssoBaseUrl = import.meta.env.VITE_SSO_BASE_URL
        const ssoClientId = import.meta.env.VITE_CLIENT_ID_SSO
        const clientSecret = import.meta.env.VITE_CLIENT_SECRET_SSO
        const redirectUri = import.meta.env.VITE_REDIRECT_URI_SSO

        const data = new URLSearchParams({
            grant_type: "authorization_code",
            code: param.code,
            state: param.state,
            redirect_uri: redirectUri,
        })

        const result = new Result<SSOResponse>()
        axios
            .post(`${ssoBaseUrl}${this.SSO_AUTH_TOKEN}`, data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + `${btoa(`${ssoClientId}:${clientSecret}`)}`,
                },
            })
            .then(response => {
                result.handleSuccess(response.data)
            })
            .catch(error => {
                result.handleError(error)
            })

        return result
    }
}

export const useSSOApi = new SSOApi()
