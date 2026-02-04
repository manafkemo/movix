"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeEnforcer({ mode }: { mode: "light" | "dark" }) {
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        // 1. Force next-themes state
        setTheme(mode)

        // 2. Manual DOM enforcement (Brute force safety net)
        const html = document.documentElement
        if (mode === "dark") {
            html.classList.add("dark")
            html.classList.remove("light")
            html.style.colorScheme = "dark"
        } else {
            html.classList.remove("dark")
            html.classList.add("light")
            html.style.colorScheme = "light"
        }
    }, [mode, setTheme])

    return null
}
