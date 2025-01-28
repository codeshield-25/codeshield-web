"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function FloatingAnimation({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}

