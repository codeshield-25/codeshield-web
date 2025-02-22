"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  content: string
  expandedContent: string
  examples: string[]
}

export function FeatureCard({ icon, title, content, expandedContent, examples }: FeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative w-[300px] h-[400px] perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className={cn(
          "w-full h-full relative transition-all duration-500 preserve-3d cursor-pointer",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="h-full p-6 rounded-xl bg-gray-900/80 border border-emerald-500/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-300">
            <div className="text-emerald-400 w-16 h-16 flex items-center justify-center bg-emerald-500/10 rounded-lg">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-center text-emerald-400">{title}</h3>
            <p className="text-gray-300 text-center">{content}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full p-6 rounded-xl bg-gray-900/80 border border-emerald-500/20 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">{title}</h3>
            <p className="text-gray-300 mb-4">{expandedContent}</p>
            <ul className="text-sm text-gray-400 space-y-2">
              {examples.map((example, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

