"use client"

import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useMutation, useAction } from "convex/react"
import { api } from "@/convex/_generated/api"

export function RequestDeliveryModal({ children, dict }: { children: React.ReactNode, dict: any }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const createOrder = useMutation(api.orders.createOrder)
    const sendTelegram = useAction(api.telegram.sendOrderNotification)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loading) return

        setLoading(true)
        setError(null)

        try {
            const formData = new FormData(e.currentTarget)
            const name = (formData.get("name") as string)?.trim() || ""
            const phone = (formData.get("phone") as string)?.trim() || ""
            const pickup = (formData.get("pickup") as string)?.trim() || ""
            const dropoff = (formData.get("dropoff") as string)?.trim() || ""
            const notes = (formData.get("notes") as string)?.trim() || null

            if (!name || !phone || !pickup || !dropoff) {
                setError("Missing required fields")
                return
            }

            const orderId = await createOrder({
                name,
                phone,
                pickup_location: pickup,
                dropoff_location: dropoff,
                notes: notes ?? undefined,
                status: "pending",
            })

            // Call Telegram notification instantly via Convex Action
            sendTelegram({
                orderId: String(orderId),
                name,
                phone,
                pickup_location: pickup,
                dropoff_location: dropoff,
                notes: notes || undefined
            }).catch(err => console.error("Async Telegram Notification Error:", err))

            setSuccess(true)
        } catch (err: any) {
            console.error("Convex Submission Error:", err)
            setError(`${dict.requestDelivery?.error || "Error"}: ${err.message || String(err)}`)
        } finally {
            setLoading(false)
        }
    }

    // Reset state when modal opens/closes
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (newOpen) {
            // Reset everything when opening for a fresh start
            setLoading(false)
            setError(null)
            setSuccess(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                <DialogHeader className="text-start">
                    <DialogTitle>{dict.requestDelivery.title}</DialogTitle>
                    <DialogDescription>
                        {dict.requestDelivery.description}
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                        <div className="text-green-500 rounded-full bg-green-100 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">{dict.requestDelivery?.successTitle || "Order Sent!"}</h3>
                            <p className="text-sm text-muted-foreground">{dict.requestDelivery?.successMessage || "We received your delivery request."}</p>
                        </div>
                        <Button variant="outline" onClick={() => setOpen(false)} className="mt-4">
                            {dict.requestDelivery?.close || "Close"}
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-start">
                                {dict.requestDelivery.labels.name}
                            </Label>
                            <Input id="name" name="name" defaultValue="" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-start">
                                {dict.requestDelivery.labels.phone}
                            </Label>
                            <Input id="phone" name="phone" type="tel" defaultValue="" className="col-span-3" required />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pickup" className="text-start">
                                {dict.requestDelivery.labels.pickup}
                            </Label>
                            <Input id="pickup" name="pickup" placeholder={dict.requestDelivery.placeholders.pickup} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dropoff" className="text-start">
                                {dict.requestDelivery.labels.dropoff}
                            </Label>
                            <Input id="dropoff" name="dropoff" placeholder={dict.requestDelivery.placeholders.dropoff} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-start">
                                {dict.requestDelivery.labels.notes}
                            </Label>
                            <Input id="notes" name="notes" placeholder={dict.requestDelivery.placeholders.notes} className="col-span-3" />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <DialogFooter className="sm:justify-between flex-row gap-2">
                            <Button type="submit" variant="accent" className="w-full" disabled={loading}>
                                {loading ? (dict.requestDelivery?.processing || "...") : dict.requestDelivery.button}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
