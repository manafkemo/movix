"use client"

import { useState } from "react"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadingScreen from "@/components/LoadingScreen"
import { useRouter } from "next/navigation"

export function AdminLogin({ dict }: { dict: any }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const result = auth.login(email, password)
            if (result.success) {
                window.location.reload()
            } else {
                setError(result.error || "Authentication failed.")
            }
        } catch (err: any) {
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            {loading && <LoadingScreen />}

            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl border border-border shadow-2xl relative overflow-hidden">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {dict.admin.login.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {dict.admin.login.description}
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{dict.admin.login.email}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="manafkemo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-muted/50 border-border focus:ring-primary h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">{dict.admin.login.password}</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-muted/50 border-border focus:ring-primary h-12"
                        />
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/50 text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]" variant="accent" disabled={loading}>
                        {dict.admin.login.button}
                    </Button>
                </form>

                <div className="pt-4 border-t border-border">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/")}
                        className="w-full text-muted-foreground hover:text-foreground gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        {dict.admin.dashboard.backToHome}
                    </Button>
                </div>
            </div>
        </div>
    )
}

