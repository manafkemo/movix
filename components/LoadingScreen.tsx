"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
            <div className="relative flex flex-col items-center gap-6">
                {/* Logo with pulsing animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.1, 1],
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="relative w-48 h-12"
                >
                    <Image
                        src="/assist/images/movix-logo-light-mood.png"
                        alt="Movix Logo"
                        fill
                        className="object-contain dark:hidden"
                        priority
                    />
                    <Image
                        src="/assist/images/movix-logo-dark-mood.png"
                        alt="Movix Logo"
                        fill
                        className="object-contain hidden dark:block"
                        priority
                    />
                </motion.div>

                {/* Loading bar animation */}
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-primary"
                    />
                </div>
            </div>
        </div>
    )
}
