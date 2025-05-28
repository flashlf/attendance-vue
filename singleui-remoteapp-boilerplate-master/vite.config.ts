import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import federation from "@originjs/vite-plugin-federation"
import { name } from "./package.json"
import Components from "unplugin-vue-components/vite"
import { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"
import { views, components, layouts } from "./exposed.config"

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        vueDevTools(),
        Components({ dts: true }),
        federation({
            name: name,
            filename: name + ".js",
            remotes: {
                dummy: "$dummy.js",
            },
            exposes: { ...views, ...components, ...layouts },
            shared: ["vue", "pinia", "vue-router"],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
                charset: false,
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
        assetsInlineLimit: 40960,
        chunkSizeWarningLimit: 1000,
        target: "ESNext",
        minify: true,
        cssCodeSplit: false,
        sourcemap: true,
        emptyOutDir: true,
        assetsDir: "",
        rollupOptions: {
            output: {
                format: "esm",
                entryFileNames: "[name].js",
                minifyInternalExports: true,
            },
            external: ["vue"],
        },
    },
})
