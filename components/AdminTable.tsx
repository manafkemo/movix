"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/Button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

export function AdminTable({ orders, dict, onUpdate }: {
    orders: any[],
    dict: any,
    onUpdate: () => void
}) {
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [sortNewest, setSortNewest] = useState(true)
    const updateOrderStatus = useMutation(api.orders.updateOrderStatus)

    const filteredOrders = orders
        .filter(order => filterStatus === "all" || order.status === filterStatus)
        .sort((a, b) => {
            const dateA = a._creationTime
            const dateB = b._creationTime
            return sortNewest ? dateB - dateA : dateA - dateB
        })

    const updateStatus = async (orderId: any, newStatus: string) => {
        try {
            await updateOrderStatus({ id: orderId, status: newStatus })
            onUpdate()
        } catch (error: any) {
            console.error("Error updating status:", error)
            alert(dict.admin.dashboard.error || "Update failed")
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            case "on_the_way": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{dict.admin.dashboard.filters.all}:</span>
                    <select
                        className="bg-background border border-border rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-primary"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">{dict.admin.dashboard.filters.all}</option>
                        <option value="pending">{dict.admin.dashboard.filters.pending}</option>
                        <option value="on_the_way">{dict.admin.dashboard.filters.on_the_way}</option>
                        <option value="delivered">{dict.admin.dashboard.filters.delivered}</option>
                        <option value="cancelled">{dict.admin.dashboard.filters.cancelled}</option>
                    </select>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSortNewest(!sortNewest)}
                    className="gap-2"
                >
                    <ArrowUpDown className="h-4 w-4" />
                    {sortNewest ? "Newest First" : "Oldest First"}
                </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.name}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.phone}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.pickup}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.dropoff}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.notes}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.status}</th>
                            <th className="px-4 py-3">{dict.admin.dashboard.table.date}</th>
                            <th className="px-4 py-3 text-right rtl:text-left">{dict.admin.dashboard.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground italic">
                                    {dict.admin.dashboard.empty}
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-4 py-3 font-medium">{order.name}</td>
                                    <td className="px-4 py-3">{order.phone}</td>
                                    <td className="px-4 py-3 max-w-[150px] truncate" title={order.pickup_location}>{order.pickup_location}</td>
                                    <td className="px-4 py-3 max-w-[150px] truncate" title={order.dropoff_location}>{order.dropoff_location}</td>
                                    <td className="px-4 py-3 max-w-[150px] truncate text-muted-foreground" title={order.notes}>{order.notes || "-"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {dict.admin.dashboard.filters[order.status] || order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                                        {new Date(order._creationTime).toLocaleDateString(dict.lang === 'ar' ? 'ar-EG' : 'en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-4 py-3 text-right rtl:text-left">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => updateStatus(order._id, "pending")}>
                                                    {dict.admin.dashboard.filters.pending}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order._id, "on_the_way")}>
                                                    {dict.admin.dashboard.filters.on_the_way}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order._id, "delivered")}>
                                                    {dict.admin.dashboard.filters.delivered}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order._id, "cancelled")}>
                                                    {dict.admin.dashboard.filters.cancelled}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
