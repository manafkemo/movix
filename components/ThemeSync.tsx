"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeSync({ mode }: { mode: "light" | "dark" }) {
    const { setTheme } = useTheme()

    useEffect(() => {
        setTheme(mode)
    }, [mode, setTheme])

    return null
}
