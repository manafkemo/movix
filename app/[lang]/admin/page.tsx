"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/auth"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { AdminTable } from "@/components/AdminTable"
import { getDictionary } from "../dictionaries"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { LogOut, Package } from "lucide-react"

export default function AdminDashboard() {
    const orders = useQuery(api.orders.listOrders) || []
    const [dict, setDict] = useState<any>(null)
    const params = useParams()
    const router = useRouter()
    const lang = (params?.lang as string) || "ar"

    useEffect(() => {
        getDictionary(lang as any).then(setDict)
    }, [lang])

    const handleLogout = async () => {
        auth.logout()
        router.refresh()
    }

    if (!dict) {
        return (
            <div className="container py-10 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
        )
    }

    return (
        <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/${lang}/light`)}
                            className="items-center gap-2 -ms-2 text-muted-foreground hover:text-foreground"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            {dict.admin.dashboard.backToHome}
                        </Button>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{dict.admin.dashboard.title}</h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {dict.admin.dashboard.totalOrders}: <span className="font-bold text-foreground">{orders.length}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                    <Button variant="outline" size="sm" onClick={() => { }} className="gap-2" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <LogOut className="h-4 w-4" />
                        {dict.admin.dashboard.logout}
                    </Button>
                </div>
            </div>

            <AdminTable orders={orders} dict={dict} onUpdate={() => { }} />
        </div>
    )
}
