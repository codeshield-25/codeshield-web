"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ScrollFade({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

