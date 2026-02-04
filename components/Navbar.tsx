"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import * as React from "react"
import Image from "next/image"

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Extract current lang from pathname
    const currentLang = pathname?.split('/')[1] || 'en'

    const toggleLang = () => {
        if (!pathname) return
        const newLang = currentLang === 'en' ? 'ar' : 'en'
        const segments = pathname.split('/')
        segments[1] = newLang
        const newPath = segments.join('/')
        router.push(newPath)
    }



    if (!mounted) {
        return null // prevent hydration mismatch
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                <Link href={`/${currentLang}/admin`} className="flex items-center gap-2 font-bold text-xl md:text-2xl text-primary">
                    {/* Light Mode Logo */}
                    <div className="h-9 w-auto dark:hidden">
                        <Image
                            src="/assist/images/movix-logo-light-mood.png"
                            alt="Movix"
                            width={1024}
                            height={110}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </div>
                    {/* Dark Mode Logo */}
                    <div className="relative w-48 h-12 hidden dark:block">
                        <Image
                            src="/assist/images/movix-logo-dark-mood.png"
                            alt="Movix"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                <div className="flex items-center gap-2 md:gap-4">
                    {/* Theme Toggle */}
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {
                        const segments = pathname?.split('/') || [];
                        // segments = ["", "lang", "mode", ...]
                        const currentMode = segments[2] || 'light';
                        const newMode = currentMode === 'dark' ? 'light' : 'dark';

                        // Construct new path: /[lang]/[newMode]/...
                        segments[2] = newMode;
                        const newPath = segments.join('/');
                        router.push(newPath, { scroll: false });
                    }}>
                        {/* Visuals now depend on URL mode inferred via segments or context if available, 
                            but for specific icon we might need to check the path or rely on theme provided by layout */}
                        {pathname?.includes('/dark') ? (
                            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                        ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Lang Toggle */}
                    <Button variant="ghost" size="sm" className="rounded-full font-bold w-12 h-10" onClick={toggleLang}>
                        {currentLang === 'en' ? 'AR' : 'EN'}
                    </Button>
                </div>
            </div>
        </header>
    )
}
