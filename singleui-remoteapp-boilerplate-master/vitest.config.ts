import { configDefaults, defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import * as path from "node:path"

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: "jsdom",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            reportsDirectory: "./test/report/unit/coverage",
        },
        root: path.resolve(__dirname, "./"),
        reporters: ["html", "verbose"],
        exclude: [...configDefaults.exclude, "**/playwright/**"],
        include: ["./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        disableConsoleIntercept: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@test": path.resolve(__dirname, "./test"),
        },
    },
})
