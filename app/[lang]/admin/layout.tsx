"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/auth"
import { AdminLogin } from "@/components/AdminLogin"
import Navbar from "@/components/Navbar"
import { getDictionary } from "../dictionaries"
import { ThemeProvider } from "@/app/providers"
import { useParams, useRouter } from "next/navigation"

import LoadingScreen from "@/components/LoadingScreen"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [dict, setDict] = useState<any>(null)
    const params = useParams()
    const router = useRouter()
    const lang = (params?.lang as string) || "ar"

    useEffect(() => {
        // Load dictionary
        getDictionary(lang as any).then(setDict)

        // Check local auth session
        const session = auth.getSession()
        setUser(session)
        setLoading(false)
    }, [lang])

    if (loading || !dict) {
        return <LoadingScreen />
    }

    // If not logged in, show login page
    if (!user) {
        return (
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1 py-10">
                        <AdminLogin dict={dict} />
                    </main>
                </div>
            </ThemeProvider>
        )
    }

    // If logged in but not an authorized admin email
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "manafkemo@gmail.com"
    if (user.email !== adminEmail) {
        return (
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
                            <h1 className="text-2xl font-bold text-red-600">{dict.admin.login.unauthorized}</h1>
                            <p className="text-muted-foreground">Your account ({user.email}) is not authorized.</p>
                            <p className="text-sm text-muted-foreground">Redirecting to homepage...</p>
                            {setTimeout(() => router.push(`/${lang}/light`), 3000) && null}
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        )
    }

    // Authenticated as manafkemo@gmail.com
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    )
}
