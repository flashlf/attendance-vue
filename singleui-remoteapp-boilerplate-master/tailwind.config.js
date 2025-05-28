import animate from "tailwindcss-animate"
import { gwindTheme, gwindTwBase } from "@pegadaian/gwind"

/** @type {import('tailwindcss').Config} */
export const content = ["./pages/**/*.{ts,tsx,vue}", "./components/**/*.{ts,tsx,vue}", "./app/**/*.{ts,tsx,vue}", "./src/**/*.{ts,tsx,vue}"]
export const theme = {
    container: gwindTheme.container,
    extend: {
        fontSize: gwindTheme.fontSize,
        fontWeight: gwindTheme.fontWeight,
        colors: gwindTheme.colors,
        dropShadow: gwindTheme.extend.dropShadow,
        space: gwindTheme.extend.space,
        borderRadius: gwindTheme.extend.borderRadius,
        screens: gwindTheme.extend.screens,
        keyframes: gwindTheme.extend.keyframes,
        animation: gwindTheme.extend.animation,
        height: gwindTheme.extend.height,
        fontFamily: {
            sans: gwindTheme.extend.sans,
            nunitosans: "Nunito Sans",
        },
    },
}

export const plugins = [gwindTwBase, animate]
