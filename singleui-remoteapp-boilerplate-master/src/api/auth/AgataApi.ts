import { ApiClient, ApiHeaders, Result } from "@pegadaian/common-network-lib"
import { AgataResponse } from "@/api/auth/model/Agata.dto"

class AgataApi extends ApiClient {
    private readonly clientID = import.meta.env.VITE_AGATA_CLIENT_ID
    private readonly clientSecret = import.meta.env.VITE_AGATA_CLIENT_SECRET

    constructor() {
        super(import.meta.env.VITE_AGATA_BASE_URL, "")
    }

    getToken(): Result<AgataResponse> {
        return this.post({
            endpoint: "/oauth/token",
            params: {
                grant_type: "client_credentials",
            },
            headers: new ApiHeaders({
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(this.clientID + ":" + this.clientSecret),
            }),
        })
    }
}

export const useAgataApi = new AgataApi()
