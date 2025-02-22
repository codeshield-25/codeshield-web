"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface AnimatedCardProps {
  icon: React.ReactNode
  title: string
  content: string
  expandedContent: string
  delay: number
  isActive: boolean
  onClick: () => void
}

export function AnimatedCard({ icon, title, content, expandedContent, delay, isActive, onClick }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      style={{ y }}
      className={`p-6 rounded-lg ${
        isActive ? "bg-gradient-to-br from-cyan-500 to-blue-700 text-white" : "bg-gray-900 text-gray-100"
      } shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer border border-cyan-500/30`}
      onClick={onClick}
    >
      <div className="mb-4 text-cyan-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <motion.p
        initial={false}
        animate={{ height: isActive ? "auto" : "4.5rem" }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-gray-300"
      >
        {isActive ? expandedContent : content}
      </motion.p>
    </motion.div>
  )
}

