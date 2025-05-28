interface ImportMetaEnv {
    readonly VITE_REMOTE_BOILERPLATE_ENV: string
    readonly VITE_EXAMPLE_API_KEY: string
    readonly VITE_EXAMPLE_BASE_URL_PUBLIC: string
    readonly VITE_EXAMPLE_BASE_URL_PRIVATE: string
    readonly VITE_EXAMPLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
