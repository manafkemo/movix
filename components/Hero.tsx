"use client"

import { Button } from "@/components/ui/Button"
import { ArrowRight, Box, Clock, ShieldCheck, Truck } from "lucide-react"
import { motion } from "framer-motion"
import { RequestDeliveryModal } from "@/components/RequestDeliveryModal"
import Image from "next/image"

export default function Hero({ dict }: { dict: any }) {
    return (
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28 min-h-[90vh] flex items-center justify-center bg-background">

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        {dict.hero.badge}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-foreground"
                    >
                        {dict.hero.title.part1} <br className="hidden md:block" />
                        <span className="text-primary">{dict.hero.title.part2}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
                    >
                        {dict.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
                    >
                        <RequestDeliveryModal dict={dict}>
                            <Button size="lg" variant="default" className="group shadow-lg shadow-primary/20">
                                {dict.hero.ctaPrimary}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                            </Button>
                        </RequestDeliveryModal>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {dict.hero.ctaSecondary}
                        </Button>
                    </motion.div>

                    {/* Icon Stats - Monochrome/Red */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8"
                    >
                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-sm">
                            <Clock className="h-8 w-8 text-primary" />
                            <span className="font-semibold text-foreground">{dict.hero.stats.onDemand}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-sm">
                            <Truck className="h-8 w-8 text-primary" />
                            <span className="font-semibold text-foreground">{dict.hero.stats.localFleet}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-sm">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                            <span className="font-semibold text-foreground">{dict.hero.stats.secure}</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-sm">
                            <Box className="h-8 w-8 text-primary" />
                            <span className="font-semibold text-foreground">{dict.hero.stats.liveTracking}</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
